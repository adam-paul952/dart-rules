const mysql = require('mysql2');
const env = require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path');

const db = mysql.createPool ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${listener.address().port}`)
});

// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

app.get('/', (req, res) => {
  const sql = `SELECT * FROM ${process.env.DB}.players;`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

// app.post('/allPlayers', (req, res) => {
//   res.json(req.body);
// });
