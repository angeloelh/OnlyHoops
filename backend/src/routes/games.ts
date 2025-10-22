import { Router } from "express";
import { db } from "../lib/db";
import { z } from "zod";

const router = Router();

const GameSchema = z.object({
    tournamentId: z.number(),
    dateTime: z.string(),
    gym: z.string().optional(),
    teamA: z.string(),
    teamB: z.string(),
    scoreA: z.number().nullable().optional(),
    scoreB: z.number().nullable().optional(),
    videoUrl: z.string().url().nullable().optional(),
});

// GET /api/games?past=true
router.get("/", async (req, res) => {
    try {
        const past = req.query.past === "true";
        const sql = past
            ? `SELECT * FROM games WHERE date_time < NOW() ORDER BY date_time DESC`
            : `SELECT * FROM games ORDER BY date_time DESC`;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /api/games
router.post("/", async (req, res) => {
    try {
        const parsed = GameSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json(parsed.error.flatten());

        const g = parsed.data;
        await db.query(
            `INSERT INTO games (tournament_id, date_time, gym, team_a, team_b, score_a, score_b, video_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [g.tournamentId, g.dateTime, g.gym ?? null, g.teamA, g.teamB, g.scoreA ?? null, g.scoreB ?? null, g.videoUrl ?? null]
        );
        res.status(201).json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
