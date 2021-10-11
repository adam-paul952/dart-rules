const sql = require("./db");

// Constructor
const User = function (user) {
  this.name = user.name;
  this.username = user.username;
  this.password = user.password;
};

// Register new user into the database
User.create = (newUser, result) => {
  sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log(`Created User: `, newUser);
    result(null, {
      id: res.insertId,
      ...newUser,
    });
  });
};

// Return all users
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

// Find user by Id
User.findUserByUsername = (username, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, res) => {
      if (err) {
        console.log(`Error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`Found User: `, res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: `not_found` }, null);
    }
  );
};

// Update user by Id
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
      if (res.affectedRows === 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`Updated User: `, { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

// Delete user by Id
User.remove = (id, result) => {
  sql.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`Error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`Deleted player with ID: `, id);
    result(null, res);
  });
};

module.exports = User;
