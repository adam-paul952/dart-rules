const sql = require("./db");
// const bcrypt = require("bcryptjs");

// Constructor
const User = function (user) {
  this.name = user.name;
  this.username = user.username;
  this.password = user.password;
  this.password_confirm = user.password_confirm;
};

User.create = (newUser, result) => {
  sql.query(
    `SELECT username FROM users WHERE username = ?`,
    [newUser.username],
    (err, res) => {
      if (err) {
        console.log(`Error: `, err);
      }
      if (res.length > 0) {
        console.log(`Username is already in use`);
        result({ kind: "in_use" }, null);
        return;
      } else if (newUser.password !== newUser.password_confirm) {
        console.log(`Passwords do not match`);
        result({ kind: "bad_password_match" }, null);
        return;
      }

      // let hashedPassword = await bcrypt.hash(newUser.password, 8);
      // console.log(hashedPassword);

      sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
        if (err) {
          console.log(`error: `, err);
          result(err, null);
          return;
        }
        console.log(`Created User: `, {
          id: res.insertId,
          name: newUser.name,
          username: newUser.username,
          password: hashedPassword,
        });
        result(null, {
          id: res.insertId,
          name: newUser.name,
          username: newUser.username,
          password: hashedPassword,
        });
      });
    }
  );
};

User.findById = (username, result) => {
  sql.query(
    `SELECT username FROM users WHERE username = ?`,
    [username],
    (err, res) => {
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
    }
  );
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
