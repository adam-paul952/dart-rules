const Player = require("../models/player.model");

// Create and save new player
exports.create = (req, res) => {
  const { playerName, users_id } = req.body;
  // Validate request
  if (!playerName) {
    return res.status(400).send({
      message: `Content can not be empty!`,
    });
  }

  // Create Player
  const player = new Player({
    playerName,
    users_id,
  });
  // Save player in database
  Player.create(player, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while creating the player`,
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single player by Name
exports.findOneByName = (req, res) => {
  Player.findByName(req.params.playerName, (err, data) => {
    if (err) {
      if (err.kind === `no_player_found`) {
        res.status(404).send({
          message: `No ${req.params.playerName} found.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving ${req.params.playerName}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Find all players for a single user
exports.findAllByUserId = (req, res) => {
  Player.getByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === `no_players_found`) {
        res.status(404).send({
          message: `There were no players found`,
        });
      } else {
        res.status(500).send({
          message: err.message || `Error getting players.`,
        });
      }
    } else res.send(data);
  });
};

// Update a player identified by playerId
exports.update = (req, res) => {
  // Validate request
  const { playerName } = req.body;
  if (!playerName) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }
  Player.updateById(req.params.playerId, new Player(req.body), (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No Player found with Id ${req.params.playerId}`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Player with Id ${req.params.playerId}`,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
};

// Delete a player by Id
exports.delete = (req, res) => {
  Player.remove(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`) {
        res.status(404).send({
          message: `No player found with Id ${req.params.playerId}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Player with id ${req.params.playerId}`,
        });
      }
    } else {
      res.status(200).send({
        message: `Player ${req.params.playerId} was successfully deleted`,
      });
    }
  });
};
