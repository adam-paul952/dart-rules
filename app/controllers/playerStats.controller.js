const PlayerStats = require("../models/playerStats.model");

// Find all Player stats in database
exports.findAllStats = (req, res) => {
  PlayerStats.findAllPlayerStats(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while fetching player stats`,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.create = (req, res) => {
  PlayerStats.create(req.params.playerId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while creating new occurance`,
      });
    } else {
      res
        .status(200)
        .send({ message: `Successfully created Stat row for player` });
    }
  });
};

// Find Stats for a single player
exports.findStatsForOne = (req, res) => {
  PlayerStats.findStatsForSinglePlayer(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === `no_players_found`) {
        res.status(404).send({
          message: `There were no players found with Id ${req.params.playerId}`,
        });
      } else
        res.status(500).send({
          message: err.message || `Error occured while fetching player Stats`,
        });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.updateGamesPlayedStat = (req, res) => {
  const { gamesPlayed, gamesWon, winPercentage } = req.body;
  PlayerStats.updateGamesPlayedAllPlayers((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Error occured while updating players`,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.updateWinningPlayerStats = (req, res) => {
  if (req.params.playerId) {
    PlayerStats.updateWinningPlayerStats(req.params.playerId, (err, data) => {
      if (err) {
        if (err.kind === `not_found`) {
          res.status(404).send({
            message: `No player found with Id ${req.params.playerId}`,
          });
        } else
          res.status(500).send({
            message: err.message || `Error occured while updating players`,
          });
      } else {
        res.status(200).send(data);
      }
    });
  }
};
