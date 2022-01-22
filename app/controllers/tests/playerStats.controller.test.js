const request = require("supertest");
const app = require("../../../app");
const connection = require("../../models/db");
const { createStatTable, dropStatTable } = require("./util/createStats");
const {
  createUserTable,
  dropUserTable,
  testUser,
  createDatabase,
  dropDatabase,
} = require("./util/createUser");
const {
  createPlayerTable,
  dropPlayerTable,
  testPlayer,
} = require("./util/createPlayer");

jest.mock("uuid", () => ({ v4: () => "test" }));

describe("player stats controller", () => {
  beforeAll(async () => {
    await createDatabase();
    await createUserTable();
    await createPlayerTable();
    await request(app).post("/users").send(testUser);
    await request(app).post("/players").send(testPlayer);
  });
  beforeEach(async () => {
    createStatTable();
  });

  afterEach(async () => {
    dropStatTable();
  });

  afterAll(async () => {
    await dropPlayerTable();
    await dropUserTable();
    await dropDatabase();
    await connection.end();
  });

  // Create player stats
  it("should create a row for stats for created player", async () => {
    const response = await request(app)
      .post("/playerStats/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toBe(
      "Successfully created Stat row for player"
    );
  });

  const expectedForUser = [
    {
      playerName: testPlayer.playerName,
      gamesPlayed: 0,
      gamesWon: 0,
      winPercentage: 0,
    },
  ];

  // Get all player stats for user
  it("should return array of players based on user id", async () => {
    await request(app).post("/playerStats/1");
    await request(app)
      .get("/playerStats/byUser/test")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect.arrayContaining(expectedForUser);
  });

  const expectedForPlayer = [
    {
      id: 1,
      gamesPlayed: 0,
      gamesWon: 0,
      winPercentage: 0,
      player_id: 1,
    },
  ];

  // Get player stats for single player
  it("should return object containing stats for a single player", async () => {
    await request(app).post("/playerStats/1");
    await request(app)
      .get("/playerStats/byPlayer/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect.arrayContaining(expectedForPlayer);
  });

  // Update games played for all players
  it("should add 1 to all players `Games Played`", async () => {
    await request(app).post("/playerStats/1");
    const response = await request(app)
      .put("/playerStats/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toBe(
      "Successfully updated games played for a single player"
    );
  });

  //Update games won for winning player
  it("should add 1 to games played for winning player", async () => {
    await request(app).post("/playerStats/1");
    await request(app).put("/playerStats/1");
    const response = await request(app)
      .put("/playerStats/winner/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toBe(
      "Successfully updated games won for winning player"
    );
  });

  it("should return player not found", async () => {
    await request(app).post("/playerStats/1");
    const response = await request(app)
      .put("/playerStats/winner/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe("No player found with Id 2");
  });
});
