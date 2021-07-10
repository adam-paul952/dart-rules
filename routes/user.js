const express = require('express');
const database = require('../database');

const router = express.Router();

router
    .get('/', async (req, res) => {
        const users = await database.query(`
        SELECT
            *
        FROM
            players
    `);

        res.contentType('html');

        res.end(`
        ${users.map((user) => {
            return `<p>${user.user_name} AKA ${user.nick_name}</p>`;
        }).join('')}
    `);
    })

    .post('/', async (req, res) => {
        const body = req.body;

        await database.execute(`
        INSERT INTO players (
            user_name,
            nick_name,
            date_added
        ) VALUES (
            @firstName,
            @nickName,
            NOW()
        )
    `, {
            firstName: body.first,
            nickName: body.nickName
        });

        res.end('Added player');
    });

module.exports = router;
