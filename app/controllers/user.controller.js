const User = require("../models/user.model");

const bcrypt = require("bcryptjs");

// Create and save new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty`,
    });
  }
  const { name, username, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 8);

  // Create User
  const user = new User({
    name,
    username,
    password: hashedPassword,
  });
  // Save User in database
  User.register(user, (err, data) => {
    if (err) {
      if (err.kind === `in_use`) {
        res.status(409).send({
          message: `Username is already in use`,
        });
      } else {
        res.status(500).send({
          message: err.message || `Error occured while creating User`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Log in user
exports.login = (req, res) => {
  const { username, password } = req.body;
  User.login(username, async (err, data) => {
    if (!data) {
      console.log(`No user found`);
      res.status(409).send({ message: `Username not found` });
      return;
    }
    const hashedPassword = data.password;
    if (err) {
      if (err.kind === "incorrect_username") {
        res.status(409).send({
          message: `Wrong username`,
        });
      } else {
        res.status(500).send({
          message: err.message || `Error occured while retrieving user`,
        });
      }
    } else if (!(await bcrypt.compare(password, hashedPassword))) {
      res.status(409).send({ message: `Incorrect password` });
    } else {
      console.log(`Successful login!`);
      res.status(200).send(data);
    }
  });
};

// Find all users in the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while fetching Users`,
      });
    } else {
      res.send(data);
    }
  });
};

// Find a user by Id
exports.findOneByUsername = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No user found with username ${req.params.username}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving ${req.params.username}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a user by Id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty`,
    });
  }
  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `Error updating user with Id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error updating User with Id ${req.params.userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete user by Id
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No found user with Id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete user with Id ${req.params.userId}`,
        });
      }
    } else {
      res.send({ message: `User was successfully deleted!` });
    }
  });
};
