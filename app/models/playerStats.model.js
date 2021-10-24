const sql = require("./db");

const PlayerStats = function (playerStats) {
  this.gamesPlayed = playerStats.gamesPlayed;
  this.gamesWon = playerStats.gamesWon;
  this.winPercentage = playerStats.winPercentage;
  this.player_id = playerStats.player_id;
};
// Find all player Stats
PlayerStats.findAllPlayerStatsById = (result) => {
  sql.query(`SELECT * FROM stats`, (err, res) => {
    if (err) {
      console.log(`error:`, err);
      result(err, null);
      return;
    }
    console.log(`Player Stats: `, res);
    result(null, res);
  });
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
      result(null, err);
      return;
    }
    if (res.length) {
      console.log(`players: `, res);
      result(null, res);
      return;
    } else {
      result({ kind: `no_players_found` }, null);
    }
  });
};

PlayerStats.updateGamesPlayedAllPlayers = (result) => {
  sql.query(
    `UPDATE stats SET gamesPlayed = gamesPlayed + 1, winPercentage = (gamesWon / gamesPlayed) * 100`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
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
    `UPDATE stats SET gamesWon = gamesWon + 1, winPercentage = (gamesWon / gamesPlayed) * 100 WHERE player_id = ${playerId}`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
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
