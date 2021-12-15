const connection = require("../../../models/db");

const createUserTable = () => {
  const sqlUser = `CREATE TABLE IF NOT EXISTS users 
      (id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      uuid varchar(40) NOT NULL,
      name varchar(255), username varchar(25) NOT NULL, 
      password varchar(255) NOT NULL, 
      created_on DATETIME NOT NULL DEFAULT NOW(), 
      CONSTRAINT users_ak_1 UNIQUE (username),
      CONSTRAINT users_ak_2 UNIQUE (uuid))
    ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;`;
  connection.query(sqlUser);
};

const dropUserTable = () => {
  const dropUsersTable = `DROP TABLE IF EXISTS users;`;
  connection.query(dropUsersTable);
};

const testUser = { username: "test12@test.com", password: "testpassword" };

module.exports = {
  createUserTable: createUserTable,
  dropUserTable: dropUserTable,
  testUser: testUser,
};
