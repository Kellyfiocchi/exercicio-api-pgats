const express = require("express");
const authRoutesFactory = require("./routes/authRoutes");

function createApp({ authService }) {
  const app = express();
  app.use(express.json());

  app.use("/auth", authRoutesFactory({ authService }));
  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

  app.use((err, _req, res, _next) => {
    if (err && err.name === "InvalidCredentialsError") {
      return res.status(401).json({ error: "invalid credentials" });
    }
    console.error("Unhandled error:", err); // veja o stack no terminal
    res.status(500).json({ error: "internal error" });
  });

  return app;
}

module.exports = { createApp };
