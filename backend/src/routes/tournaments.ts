import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const [upcoming] = await db.query(
            `SELECT * FROM tournaments
       WHERE (end_date IS NULL OR end_date > CURDATE())
       ORDER BY start_date ASC`
        );
        const [past] = await db.query(
            `SELECT * FROM tournaments
       WHERE end_date IS NOT NULL AND end_date <= CURDATE()
       ORDER BY start_date DESC`
        );
        res.json({ upcoming, past });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query(`SELECT * FROM tournaments WHERE id = ?`, [id]);
        const one = Array.isArray(rows) ? (rows as any[])[0] : undefined;
        if (!one) return res.status(404).json({ error: "Tournament not found" });
        res.json(one);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id/games", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [rows] = await db.query(
            `SELECT * FROM games WHERE tournament_id = ? ORDER BY date_time ASC`,
            [id]
        );
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
