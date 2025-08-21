const express = require("express");
const authRoutesFactory = require("./routes/authRoutes");

function createApp({ authService }) {
  const app = express();
  app.use(express.json());

  // log simples (ajuda a depurar)
  app.use((req, _res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url}`,
      req.body || {}
    );
    next();
  });

  // Suas rotas principais
  app.use("/auth", authRoutesFactory({ authService }));
  app.get("/health", (_req, res) => res.json({ ok: true }));

  // Middleware para capturar rota não encontrada (erro 404)
  app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

  // Middleware de erro genérico (500)
  app.use((err, _req, res, _next) => {
    if (err && err.name === "InvalidCredentialsError") {
      return res.status(401).json({ error: "invalid credentials" });
    }
    console.error("Unhandled error:", err); // Log do erro no terminal
    res.status(500).json({ error: "internal error" });
  });

  return app;
}

module.exports = { createApp };
