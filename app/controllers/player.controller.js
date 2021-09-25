const Player = require("../models/player.model");

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
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  });
  // Savew player in database
  Player.create(player, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating the player",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all players from the datatbase
exports.findAll = (req, res) => {
  Player.findAll = (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving players",
      });
    } else {
      res.send(data);
    }
  };
};

// Find a single player by Id
exports.findOne = (req, res) => {
  Player.findById = (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found customer with id ${req.params.playerId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Player with Id ${req.params.playerId}`,
        });
      }
    } else {
      res.send(data);
    }
  };
};

// Update a player identified by playerId
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }
  Player.updateById(
    reqreq.params.playerId,
    new Player(req.body),
    (err, data) => {
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
    }
  );
};

// Delete a player with the specified playerId
exports.delete = (req, res) => {
  Player.remove(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
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
