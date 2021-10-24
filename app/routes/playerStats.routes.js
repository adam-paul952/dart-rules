module.exports = (app) => {
  const playerStats = require("../controllers/playerStats.controller");

  // Get All Player Stats
  app.get("/playerStats/", playerStats.findAllStats);

  // Find stats for a single Player
  app.get("/playerStats/:playerId", playerStats.findStatsForOne);

  // Create new stats for new player
  app.post("/playerStats/:playerId", playerStats.create);

  // Update all player Stats
  app.put("/playerStats/", playerStats.updateGamesPlayedStat);

  // Update Player Stats
  app.put("/playerStats/:playerId", playerStats.updateWinningPlayerStats);
};
