const User = require("../models/user.model");

// Create and save new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty`,
    });
  }
  const { name, username, password } = req.body;

  // Create User
  const user = new User({
    name,
    username,
    password,
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
  User.login(username, password, (err, data) => {
    if (err) {
      if (err.kind === "incorrect_credentials") {
        res.status(409).send({
          message: `Wrong username/password combination`,
        });
      } else {
        res.status(500).send({
          message: err.message || `Error occured while retrieving user`,
        });
      }
    } else {
      res.send(data);
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
