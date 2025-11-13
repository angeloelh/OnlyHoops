import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { db } from "../lib/db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_dev_key";

router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const [existing]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const isApproved = role === "player" ? 1 : 0;

        await db.query(
            "INSERT INTO users (username, email, password, role, isApproved) VALUES (?, ?, ?, ?, ?)",
            [username, email, hashed, role, isApproved]
        );

        res.status(201).json({ message: "Compte créé avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        if (user.role === "admin" && !user.isApproved) {
            return res.status(403).json({ error: "Admin non approuvé par le superadmin" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

export default router;
