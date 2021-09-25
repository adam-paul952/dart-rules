module.exports = (app) => {
  const players = require("../controllers/player.controller.js");

  // Create new player
  app.post("/players", players.create);

  // Retrieve all Players
  app.get("/players", players.findAll);

  //Retrieve a single player by ID
  app.get("/players/:playerId", players.findOne);

  // Update a player by Id
  app.put("/players/:playerId", players.update);

  // Delete a player by Id
  app.post("/players", players.delete);
};
