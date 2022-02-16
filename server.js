const app = require("./app");
const { connectionPort } = require("./app/config/dbConfig");

app.listen(connectionPort, () => {
  console.log(`Server is running on port ${connectionPort}.`);
});
