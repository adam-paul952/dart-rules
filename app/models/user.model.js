const sql = require("./db");

// Constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    console.log(`Created User: `, { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log(`Error: `, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`Found Player: `, res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: `not_found` }, null);
  });
};

User.getAll = (result) => {
  sql.query(`SELECT * from users`, (err, res) => {
    if (err) {
      console.log(`Error: `, err);
      result(err, null);
      return;
    }
    console.log(`Users: `, res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    `UPDATE users SET username = ? WHERE id = ?`,
    [user.username, id],
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`Updated User: `, { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`Error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`Deleted player with ID: `, id);
    result(null, res);
  });
};

module.exports = User;
