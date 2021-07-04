const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "players",
});

// Function to read data from user input
// function insertNameInTable(name, nickname) {
  let userName = "INSERT INTO players (name, nickname) VALUES ('Raelene', 'Rae')";
  con.query(userName, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
// }

// // Test Connection
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// // Create new Database
// con.query("CREATE DATABASE players", function (err, result) {
//   if (err) throw err;
//   console.log("Database created");
// });

// // Create table inside database
// const sql = "CREATE TABLE players (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), nickname VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });