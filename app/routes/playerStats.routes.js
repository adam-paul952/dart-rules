module.exports = (app) => {
  const playerStats = require("../controllers/playerStats.controller");

  // Find stats for a single Player
  app.get("/playerStats/byPlayer/:playerId", playerStats.findStatsForOne);

  // Get All Player Stats Based on user id
  app.get("/playerStats/byUser/:userId", playerStats.findAllStats);

  // Create new stats for new player
  app.post("/playerStats/:playerId", playerStats.create);

  // Update all player Stats games played
  app.put("/playerStats/:playerId", playerStats.updateGamesPlayedStat);

  // Update Player Stats games won
  app.put(
    "/playerStats/winner/:playerId",
    playerStats.updateWinningPlayerStats
  );
};
