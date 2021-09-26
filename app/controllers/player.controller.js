const Player = require("../models/player.model.js");

// Create and save new player
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create Player
  const player = new Player({
    name: req.body.name,
  });
  // Save player in database
  Player.create(player, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error occured while creating the player",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all players from the datatbase
exports.findAll = (req, res) => {
  Player.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Unwanted error message.",
      });
    else res.send(data);
  });
};

// Find a single player by Id
exports.findOne = (req, res) => {
  Player.findById(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No found player with id ${req.params.playerId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Player with Id ${req.params.playerId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a player identified by playerId
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }
  Player.updateById(req.params.playerId, new Player(req.body), (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `Error updating Player with Id ${req.params.playerId}`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Player with Id ${req.params.playerId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a player with the specified playerId
exports.delete = (req, res) => {
  Player.remove(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with Id ${req.params.playerId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Player with id ${req.params.playerId}`,
        });
      }
    } else {
      res.send({ message: `Player was successfully deleted` });
    }
  });
};
