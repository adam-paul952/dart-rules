const sql = require("./db");

// Constructor
const Player = function (player) {
  this.name = player.name;
  this.users_id = player.users_id;
};

Player.create = (newPlayer, result) => {
  sql.query(`INSERT INTO players SET ?`, newPlayer, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    console.log(`created player: `, { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.findById = (playerId, result) => {
  sql.query(`SELECT * FROM players WHERE id = ${playerId}`, (err, res) => {
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
    result({ kind: `not_found` }, null);
  });
};

Player.getAll = (result) => {
  sql.query(`SELECT * FROM players`, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    console.log(`players: `, res);
    result(null, res);
  });
};

Player.updateById = (id, player, result) => {
  sql.query(
    `UPDATE players SET name = ? WHERE id = ?`,
    [player.name, id],
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
      console.log(`updated players: `, { id: id, ...player });
      result(null, { id: id, ...player });
    }
  );
};

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
    console.log(`deleted player with id: `, id);
    result(null, res);
  });
};

module.exports = Player;
