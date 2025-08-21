// src/controllers/authController.js
module.exports = function authControllerFactory({ authService }) {
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
        return res.status(200).json({ token, user: safeUser });
      } catch (err) {
        next(err);
      }
    },
  };
};
