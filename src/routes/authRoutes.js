const { authControllerFactory } = require("../controllers/authController");
const { Router } = require("express");

module.exports = function authRoutesFactory({ authService }) {
  const router = Router();
  const controller = authControllerFactory({ authService });

  router.post("/login", controller.login);

  return router;
};
