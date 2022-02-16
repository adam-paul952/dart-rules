require("dotenv").config();

let databaseHost;
let databaseUser;
let databasePassword;
let databaseName;
let connectionPort;

if (process.env.NODE_ENV === "test") {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB_TEST;
  connectionPort = process.env.PORT;
} else if (process.env.NODE_ENV === "build") {
  databaseHost = process.env.RDS_HOSTNAME;
  databaseUser = process.env.RDS_USERNAME;
  databasePassword = process.env.RDS_PASSWORD;
  databaseName = process.env.RDS_DB_NAME;
  connectionPort = 8080;
} else {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB;
  connectionPort = process.env.PORT;
}

module.exports = {
  databaseHost,
  databaseUser,
  databasePassword,
  databaseName,
  connectionPort,
};
