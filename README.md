## Dart Scoreboard Server

---

### **Description**

This project is a Node.js, Express.js, REST API that accompanies my React application [Dart-Scoreboard](https://github.com/adam-paul952/dart-scoreboard).

The scoreboard alone will only hold player names until the browser is closed. This application allows users to create a profile and add players into a database. Users can then select which players they would like to select to play the game with.

---

#### **Getting Started**

In order to use this database you'll need to install MySQL, here is a great starter link by [W3schools](https://www.w3schools.com/nodejs/nodejs_mysql.asp).

Once you're ready to create a connection open `createDatabase.js` and replace `'host'`, `'user'` and `'password'` with your MySQL credentials copy and paste your credentials in `db.js` then replace `'database'` with the commented database name.

In your editor type:

    npm run createDb

And thats it, your server instance and database are all up and running you can go ahead and create an account to keep track of your players!

---

**Built With**

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Bcryptjs](https://openbase.com/js/bcryptjs/documentation)
- [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [morgan](https://www.npmjs.com/package/morgan)
- [MySQL](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)
