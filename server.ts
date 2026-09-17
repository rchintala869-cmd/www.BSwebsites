import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  const DATA_DIR = path.join(process.cwd(), "data");
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");

  // API Routes for Permanent Storage
  app.get("/api/portfolio", (req, res) => {
    try {
      if (fs.existsSync(PORTFOLIO_FILE)) {
        const data = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, "utf-8"));
        return res.json(data);
      }
    } catch (err) {
      console.error("Error reading portfolio file:", err);
    }
    return res.json(null);
  });

  app.post("/api/portfolio", (req, res) => {
    try {
      const items = req.body;
      fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(items, null, 2), "utf-8");
      return res.json({ success: true, count: Array.isArray(items) ? items.length : 0 });
    } catch (err) {
      console.error("Error saving portfolio file:", err);
      return res.status(500).json({ error: "Failed to save portfolio items permanently." });
    }
  });

  // Vite middleware for development vs static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
