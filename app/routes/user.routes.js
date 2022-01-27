const checkAuth = require("../auth/checkAuth");

module.exports = (app) => {
  const users = require("../controllers/user.controller");
  // Send ping request to server
  app.get("/users/ping", users.ping);

  // Create new user
  app.post("/users", users.create);

  // Login user
  app.post("/users/login", users.login);

  // Update user
  app.put("/users/:userUuid", checkAuth, users.update);

  // Delete User
  app.delete("/users/:userUuid", checkAuth, users.delete);

  // Logout and end session
  app.post("/logout", users.logout);
};
