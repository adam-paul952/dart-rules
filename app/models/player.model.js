const sql = require("./db.js");

// Constructor
class Player {
  constructor(player) {
    this.email = player.email;
    this.name = player.name;
    this.active = player.active;
  }
  static create(newPlayer, result) {
    sql.query("INSERT INTO players SET ?", newPlayer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created player: ", { id: res.insertId, ...newPlayer });
      result(null, { id: res.insertId, ...newPlayer });
    });
  }
  static findById(playerId, result) {
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
      result({ kind: "not_found" }, null);
    });
  }
  static getAll(result) {
    sql.query("SELECT * FROM players", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("players: ", res);
      result(null, result);
    });
  }
  static updateById(id, customer, result) {
    sql.query(
      "UPDATE players SET email=?, name=?, active=? WHERE id =?",
      [player.email, player.name, player.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated players: ", { id: id, ...player });
        result(null, { id: id, ...player });
      }
    );
  }
  static remove(id, result) {
    sql.query("DELETE FROM players WHERE id=?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted player with id: ", id);
      result(null, res);
    });
  }
}

module.exports = Player;
