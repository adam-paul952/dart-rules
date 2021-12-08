const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Adam's application" });
});

require("./app/routes/player.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/playerStats.routes")(app);

module.exports = app;
