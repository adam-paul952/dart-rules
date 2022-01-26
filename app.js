const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./app/passportConfig")(passport);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the back-end for Dart-Scoreboard!" });
});

require("./app/routes/player.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/playerStats.routes")(app);

module.exports = app;
