const sql = require("./db");

const PlayerStats = function (playerStats) {
  this.gamesPlayed = playerStats.gamesPlayed;
  this.gamesWon = playerStats.gamesWon;
  this.winPercentage = playerStats.winPercentage;
  this.player_id = playerStats.player_id;
};
// Find all player Stats
PlayerStats.findAllPlayerStats = (userId, result) => {
  sql.query(
    `SELECT player_id, playerName, gamesPlayed, gamesWon, winPercentage
    FROM stats
    INNER JOIN players ON stats.player_id = players.id
    INNER JOIN users ON players.users_id = users.uuid
    WHERE users_id = ? `,
    userId,
    (err, res) => {
      if (err) {
        console.log(`error:`, err);
        result(err, null);
        return;
      }
      console.log(`All Player Stats: `, res);
      result(null, res);
    }
  );
};

// Create new Stats for player
PlayerStats.create = (playerId, result) => {
  sql.query(
    `INSERT INTO stats SET id = ${playerId}, player_id = ${playerId}`,
    playerId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log(`Created new stats instance for player`);
      result(null, { id: res.insertId });
    }
  );
};

PlayerStats.findStatsForSinglePlayer = (playerId, result) => {
  sql.query(`SELECT * from stats WHERE player_id = ?`, playerId, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }

    console.log(`Stats for single player: `, res);
    result(null, res);
  });
};

PlayerStats.updateGamesPlayedAllPlayers = (playerId, result) => {
  sql.query(
    `UPDATE stats SET gamesWon = gamesWon, gamesPlayed = gamesPlayed + 1, winPercentage = (gamesWon / gamesPlayed) * 100 WHERE player_id = ${playerId}`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      } else {
        console.log(`updated games played`);
        result(null, res);
      }
    }
  );
};

PlayerStats.updateWinningPlayerStats = (playerId, result) => {
  sql.query(
    `UPDATE stats SET gamesWon = gamesWon + 1, gamesPlayed = gamesPlayed, winPercentage = (gamesWon / gamesPlayed) * 100 WHERE player_id = ${playerId}`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
      } else {
        console.log(`updated games won`);
        result(null, res);
      }
    }
  );
};

module.exports = PlayerStats;
