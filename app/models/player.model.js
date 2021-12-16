const sql = require("./db");

// Constructor
const Player = function (player) {
  this.playerName = player.playerName;
  this.users_id = player.users_id;
};

Player.create = (newPlayer, result) => {
  sql.query(`INSERT INTO players SET ?`, newPlayer, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    } else {
      console.log(`created player: `, {
        id: res.insertId,
        playerName: newPlayer.playerName,
      });
      result(null, { id: res.insertId, playerName: newPlayer.playerName });
    }
  });
};

// Find a single player by Name
Player.findByName = (playerName, result) => {
  sql.query(
    `SELECT * FROM players WHERE playerName = '${playerName}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`found player: `, res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: `no_player_found` }, null);
    }
  );
};

// Find all players for a single user
Player.getByUserId = (userId, result) => {
  sql.query(
    `SELECT * FROM players WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`players: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_players_found` }, null);
    }
  );
};

// Update Player by Id
Player.updateById = (id, player, result) => {
  sql.query(
    `UPDATE players SET playerName = ? WHERE id = ?`,
    [player.playerName, id],
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`updated players: `, {
        id: id,
        playerName: player.playerName,
      });
      result(null, { id: id, playerName: player.playerName });
    }
  );
};

// Delete a player by Id
Player.remove = (id, result) => {
  sql.query(`DELETE FROM players WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted player with id: ${id}`);
    result(null, res);
  });
};

module.exports = Player;
