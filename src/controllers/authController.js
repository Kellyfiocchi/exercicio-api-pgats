const crypto = require("crypto");

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

module.exports = function createAuthService({ userModel }) {
  return {
    async login(req, res, next) {
      try {
        const { email, password } = req.body || {};

        if (!email || !password) {
          return res
            .status(400)
            .json({ error: "email and password are required" });
        }

        const { token, user } = await authService.login({ email, password });

        const safeUser = { id: user.id, name: user.name, email: user.email };

        return res.status(200).json({
          token,
          user: safeUser,
        });
      } catch (err) {
        if (err.name === "InvalidCredentialsError") {
          return res.status(401).json({ error: "invalid credentials" });
        }

        console.error("Erro no Controller:", err); // Log do erro

        // Para erros genéricos, retorna erro 500
        return res.status(500).json({ error: "internal error" });
      }
    },
  };
};
