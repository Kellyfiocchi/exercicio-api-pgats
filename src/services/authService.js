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
      const user = await userModel.findByEmail(email);
      if (!user || user.password !== password) {
        throw new InvalidCredentialsError();
      }
      // token fake só pra exemplo
      const token = crypto.randomBytes(12).toString("hex");
      return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      };
    },
  };
};
