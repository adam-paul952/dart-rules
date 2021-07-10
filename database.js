const mysql = require('mysql2');

const con = mysql.createConnection ({
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

// con.end();

module.exports = con;
