const crypto = require("crypto");

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

module.exports = function createAuthService({ userModel }) {
  return {
    async login({ email, password }) {
      try {
        // Encontra o usuário com o email fornecido
        const user = await userModel.findByEmail(email);

        // Verifica se o usuário existe e se a senha está correta
        if (!user || user.password !== password) {
          throw new InvalidCredentialsError(); // Lança erro se as credenciais forem inválidas
        }

        // Simulando erro genérico (por exemplo, problema no banco de dados)
        // Você pode ajustar esse erro conforme sua lógica
        throw new Error("DB down"); // Simula o erro genérico

        // Se as credenciais forem válidas, gera o token
        const token = crypto.randomBytes(12).toString("hex");
        return {
          token,
          user: { id: user.id, name: user.name, email: user.email },
        };
      } catch (error) {
        // Se a falha for por causa de credenciais inválidas, lanças o erro
        if (error.name === "InvalidCredentialsError") {
          throw error;
        }

        // Lança erro genérico para ser tratado no Controller
        console.error("Erro no Service:", error); // Log do erro
        throw new Error("DB down"); // Simula um erro genérico
      }
    },
  };
};
