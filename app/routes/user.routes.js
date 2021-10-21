module.exports = (app) => {
  const users = require("../controllers/user.controller");
  // Create new user
  app.post("/users", users.create);

  // Login user
  app.post("/users/login", users.login);

  // Update user
  app.put("/users/:userId", users.update);

  // Delete User
  app.delete("/users/:userId", users.delete);
};
