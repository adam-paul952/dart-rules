const sql = require("./db");
const bcrypt = require("bcryptjs");

// Constructor
const User = function (user) {
  this.name = user.name;
  this.username = user.username;
  this.password = user.password;
};

// Register new user into the database
User.register = (newUser, result) => {
  sql.query(
    `SELECT username FROM users WHERE username = ?`,
    [newUser.username],
    async (err, res) => {
      if (err) {
        console.log(`Error: `, err);
      }
      if (res.length > 0) {
        console.log(`Username is already in use`);
        result({ kind: "in_use" }, null);
        return;
      }

      let hashedPassword = await bcrypt.hash(newUser.password, 8);
      newUser = {
        name: newUser.name,
        username: newUser.username,
        password: hashedPassword,
      };

      sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
        if (err) {
          console.log(`error: `, err);
          result(err, null);
          return;
        }
        console.log(`Created User: `, newUser);
        result(null, {
          id: res.insertId,
          ...newUser,
        });
      });
    }
  );
};

// Log a user into the database
User.login = (username, password, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, res) => {
      console.log(`username: ${username}`);
      if (err) {
        console.log(`Error: `, err);
        result(err, null);
        return;
      } else {
        if (res.length === 0) {
          console.log(`No user found`);
          result({ kind: "incorrect_credentials" }, null);
          return;
        } else {
          const hashedPassword = res[0].password;
          if (await bcrypt.compare(password, hashedPassword)) {
            console.log(`Successful Login!`);
            result(null, res[0]);
          } else {
            console.log(`Password Incorrect`);
            result({ kind: "incorrect_credentials" }, null);
          }
        }
      }
    }
  );
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
User.findByUsername = (username, result) => {
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
