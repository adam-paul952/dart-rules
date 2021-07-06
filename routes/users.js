const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/createUser', function(req, res, next) {
res.send('createUser');
});
router.post('/create', function(req, res, next) {

    // store all the user input data
    const userName = req.body;

  // insert user data into players table
    const sql = 'INSERT INTO players SET ?';
    db.query(sql, userName,function (err, data) {
        if (err) throw err;
        console.log("User name is inserted successfully ");
    });
 res.redirect('/createUser');  // redirect to user form page after inserting the data
});

module.exports = router;