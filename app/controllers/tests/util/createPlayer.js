const connection = require("../../../models/db");

const createPlayerTable = () => {
  const sqlPlayer = `CREATE TABLE IF NOT EXISTS players 
      (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
      playerName varchar(25) NOT NULL, 
      users_id varchar(40) NOT NULL, 
      CONSTRAINT player_fk FOREIGN KEY (users_id) 
      REFERENCES users(uuid) ON DELETE CASCADE ) 
    ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;`;
  connection.query(sqlPlayer);
};

const dropPlayerTable = () => {
  const dropPlayersTable = `DROP TABLE IF EXISTS players;`;
  connection.query(dropPlayersTable);
};

const testPlayer = { playerName: "test", users_id: "test" };
const testPlayer1 = { playerName: "test1", users_id: "test" };

module.exports = {
  createPlayerTable: createPlayerTable,
  dropPlayerTable: dropPlayerTable,
  testPlayer: testPlayer,
  testPlayer1: testPlayer1,
};
