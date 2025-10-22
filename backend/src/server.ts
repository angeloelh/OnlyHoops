import "dotenv/config";
import express from "express";
import cors from "cors";

import tournaments from "./routes/tournaments";
import games from "./routes/games";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/tournaments", tournaments);
app.use("/api/games", games);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
