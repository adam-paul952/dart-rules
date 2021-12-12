module.exports = (app) => {
  const players = require("../controllers/player.controller");
  // Create new player
  app.post("/players", players.create);

  // Find a single player by Name
  app.get("/players/byName/:playerName", players.findOneByName);

  // Find all players for a user
  app.get("/players/:userId", players.findAllByUserId);

  // Update a player by Id
  app.put("/players/:playerId", players.update);

  // Delete a player by Id
  app.delete("/players/:playerId", players.delete);
};
