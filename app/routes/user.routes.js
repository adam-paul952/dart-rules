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
  app.put("/users/edit", checkAuth, users.update);

  // Delete User
  app.delete("/users/delete", checkAuth, users.delete);

  // Logout and end session
  app.post("/logout", users.logout);
};
