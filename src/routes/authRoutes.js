const authControllerFactory = require("../controllers/authController");

module.exports = function authRoutesFactory({ authService }) {
  // Cria o controller passando o authService
  const controller = authControllerFactory({ authService });

  // Cria o roteador de autenticação
  const router = require("express").Router();

  // Define as rotas para o login
  router.post("/login", controller.login);

  return router;
};
