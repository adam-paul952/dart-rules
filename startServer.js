const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password123!",
  database: "players",
});

// Test Connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Server Connected!");
});

con.end();

module.exports = con;

// // Create new Database
// con.query("CREATE DATABASE players", function (err, result) {
//   if (err) throw err;
//   console.log("Database created");
// });

// // Create table inside database
// const sql = "CREATE TABLE players.players (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), nickname VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });