module.exports = function createUserModel() {
  const users = [
    {
      id: "1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "123456",
    },
  ];
  return {
    async findByEmail(email) {
      return users.find((u) => u.email === email) || null;
    },
  };
};
