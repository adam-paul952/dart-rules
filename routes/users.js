const express = require('express');
const app = express();
const router = express.Router();
const db = require('../startServer');
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

app.get('/users/create', function(req, res, next) {
res.send('users');
});
app.post('/create', function(req, res, next) {

    // store all the user input data
    const userName = req.body;

  // insert user data into players table
    const sql = 'INSERT INTO players SET ?';
    db.query(sql, userName,function (err, data) {
        if (err) throw err;
        console.log("Player name is inserted successfully ");
    });
 res.redirect('/createUser');  // redirect to user form page after inserting the data
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// module.exports = router;
// module.exports = app;