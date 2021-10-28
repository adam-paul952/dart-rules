const mysql = require("mysql2");
const env = require("dotenv").config();

// Create connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Replace with your host
  user: process.env.DB_USER, // Replace with your user
  password: process.env.DB_PASSWORD, //  Replace with your password
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);

  connection.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  const sqlUser =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255), username varchar(25) NOT NULL, password varchar(255) NOT NULL, created_on DATETIME NOT NULL DEFAULT NOW(), CONSTRAINT users_ak_1 UNIQUE (username)) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";

  connection.query(sqlUser, function (err, result) {
    if (err) throw err;
    console.log("Users created");
  });

  const sqlPlayer =
    "CREATE TABLE IF NOT EXISTS players (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, playerName varchar(25) NOT NULL, users_id int NOT NULL, CONSTRAINT player_fk FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";
  connection.query(sqlPlayer, function (err, result) {
    if (err) throw err;
    console.log("Players created");
  });

  const sqlStats =
    "CREATE TABLE IF NOT EXISTS stats(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, gamesPlayed int DEFAULT 0, gamesWon int DEFAULT 0, winPercentage int DEFAULT 0, player_id int NOT NULL, CONSTRAINT playerStat_ak_1 UNIQUE (player_id), CONSTRAINT playerStat_fk FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE cascade) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;";

  connection.query(sqlStats, function (err, result) {
    if (err) throw err;
    console.log("Stats created");
  });
});
