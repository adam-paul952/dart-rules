const User = require("../models/user.model");

// Create and save new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty`,
    });
  }

  // Create User
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    password_confirm: req.body.password_confirm,
  });
  // Save User in database
  User.create(user, (err, data) => {
    if (err) {
      if (err.kind === `in_use`) {
        res.status(409).send({
          message: `Username is already in use`,
        });
      } else if (err.kind === `bad_password_match`) {
        res.status(409).send({ message: `Passwords do not match` });
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

// Retrieve all users from database
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

exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No user found with ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with Id ${req.params.userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

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

exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No found user with Id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete player with Id ${req.params.userId}`,
        });
      }
    } else {
      res.send({ message: `Player was successfully deleted!` });
    }
  });
};
