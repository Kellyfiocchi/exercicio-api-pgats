const { createApp } = require("./app");
const createAuthService = require("./services/authService");
const createUserModel = require("./models/userModel");

const userModel = createUserModel();
const authService = createAuthService({ userModel });
const app = createApp({ authService });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
