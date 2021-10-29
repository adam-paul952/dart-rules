const mysql = require("mysql2");
const env = require("dotenv").config();
const connection = require("../app/models/db");

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);

  const sqlUser =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255), username varchar(25) NOT NULL, password varchar(255) NOT NULL, created_on DATETIME NOT NULL DEFAULT NOW(), CONSTRAINT users_ak_1 UNIQUE (username)) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";

  connection.query(sqlUser, function (err, result) {
    if (err) throw err;
    console.log("Users Table created");
  });

  const sqlPlayer =
    "CREATE TABLE IF NOT EXISTS players (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, playerName varchar(25) NOT NULL, users_id int NOT NULL, CONSTRAINT player_fk FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";

  connection.query(sqlPlayer, function (err, result) {
    if (err) throw err;
    console.log("Players Table created");
  });

  const sqlStats =
    "CREATE TABLE IF NOT EXISTS stats(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, gamesPlayed int DEFAULT 0, gamesWon int DEFAULT 0, winPercentage int DEFAULT 0, player_id int NOT NULL, CONSTRAINT playerStat_ak_1 UNIQUE (player_id), CONSTRAINT playerStat_fk FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE cascade) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";

  connection.query(sqlStats, function (err, result) {
    if (err) throw err;
    console.log("Stats Table created");

    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Connection ended`);
    });
  });
});
