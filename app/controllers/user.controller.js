const User = require("../models/user.model");

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");

// Create and save new user
exports.create = async (req, res) => {
  // Validate request
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: `Username / Password cannot be empty` });
    return;
  }

  User.findUserByUsername(username, async (err, data) => {
    if (!data) {
      let hashedPassword = await bcrypt.hash(password, 8);

      // Create User
      const user = new User({
        uuid: uuidv4(),
        username,
        password: hashedPassword,
      });

      // Save User in database
      User.create(user, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || `Error occured while creating User`,
          });
        } else {
          res.status(200).send(data);
        }
      });
    } else {
      return res.status(400).send({ message: `Username already exists` });
    }
  });
};

// Log in user
exports.login = (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        console.log(`User not found`);
        res.status(400).send({
          message: `No user found`,
        });
      } else if (err.kind === `incorrect_password`) {
        console.log(`Incorrect password`);
        res.status(401).send({
          message: `Incorrect password`,
        });
      } else {
        res.status(500).send({
          message: err.message || `Error occured while retrieving user`,
        });
      }
    } else {
      req.logIn(user, () => {
        return res.status(200).send(user);
      });
    }
  })(req, res);
};

// Find all users in the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while fetching Users`,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Update a user by Id
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty`,
    });
  }
  const { username, password } = req.body;

  let hashedPassword = await bcrypt.hash(password, 8);

  User.updateById(
    req.params.userUuid,
    new User({ username, password: hashedPassword }),
    (err, data) => {
      if (err) {
        if (err.kind === `not_found`) {
          res.status(404).send({
            message: `No user found with that Id`,
          });
        } else {
          res.status(500).send({
            message: `Error updating User with Id ${req.params.userUuid}`,
          });
        }
      } else {
        res.status(200).send(data);
      }
    }
  );
};

// Delete user by Id
exports.delete = (req, res) => {
  User.remove(req.params.userUuid, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No user found with that Id`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete user with Id ${req.params.userUuid}`,
        });
      }
    } else {
      res.status(200).send({ message: `User was successfully deleted!` });
    }
  });
};

exports.ping = (req, res) => {
  if (!res) {
    res.status(500).send({ message: `No server Connection` });
  }
  res.status(200).send({ message: `Successful ping` });
  console.log(`Successful ping`);
};
