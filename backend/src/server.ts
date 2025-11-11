import express from "express";
import cors from "cors";
import { db } from "./lib/db";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
    try {
        const [rows] = await db.query("SELECT 1");
        res.json({ status: "ok", db: "connected" });
    } catch (err) {
        res.status(500).json({ status: "error", error: err });
    }
});

app.use("/api/auth", authRoutes);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
