const User = require("../models/user.model");

const bcrypt = require("bcryptjs");

// Create and save new user
exports.create = async (req, res) => {
  // Validate request
  const { name, username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: `Username / Password can not be empty` });
    return;
  }

  const userFound = User.findUserByUsername(username, (err, data) => {
    if (data) {
      res.status(400).send({ message: `Username is taken` });
      console.log(`Username is taken`);
      return data;
    }
    return null;
  });

  if (!userFound) {
    return;
  }

  let hashedPassword = await bcrypt.hash(password, 8);

  // Create User
  const user = new User({
    name,
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
};

// Log in user
exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findUserByUsername(username, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(409).send({
          message: `No user found`,
        });
        return;
      } else {
        res.status(500).send({
          message: err.message || `Error occured while retrieving user`,
        });
      }
    }
    const hashedPassword = data.password;
    const passwordCompared = await bcrypt.compare(password, hashedPassword);
    if (passwordCompared) {
      console.log(`Successful login!`);
      res.status(200).send(data);
    } else {
      console.log(`Incorrect Password`);
      res.status(409).send({ message: `Incorrect password` });
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
      res.status(200).send(data);
    }
  });
};

// Find a user by Id
exports.findOneByUsername = (req, res) => {
  User.findUserByUsername(req.params.username, (err, data) => {
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
      res.status(200).send(data);
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
      res.status(200).send(data);
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
      res.status(200).send({ message: `User was successfully deleted!` });
    }
  });
};
