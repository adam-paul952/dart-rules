const mysql = require('mysql2');
const env = require('dotenv').config();
const express = require('express');
const app = express();

const db = mysql.createPool ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.use(express.json());
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${listener.address().port}`)
});

app.get('/allPlayers', (req, res) => {
  const sql = `SELECT * FROM ${process.env.DB}.players;`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})
