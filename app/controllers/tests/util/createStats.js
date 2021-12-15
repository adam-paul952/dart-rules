const connection = require("../../../models/db");

const createStatTable = () => {
  const sqlStats = `CREATE TABLE IF NOT EXISTS stats
      (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
      gamesPlayed int DEFAULT 0, 
      gamesWon int DEFAULT 0, 
      winPercentage int DEFAULT 0, 
      player_id int NOT NULL, 
      CONSTRAINT playerStat_ak_1 UNIQUE (player_id), 
      CONSTRAINT playerStat_fk FOREIGN KEY (player_id) 
      REFERENCES players(id) ON DELETE cascade) 
    ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;`;
  connection.query(sqlStats);
};

const dropStatTable = () => {
  const dropStatsTable = `DROP TABLE IF EXISTS stats`;
  connection.query(dropStatsTable);
};

module.exports = {
  createStatTable: createStatTable,
  dropStatTable: dropStatTable,
};
