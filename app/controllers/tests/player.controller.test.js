const request = require("supertest");
const app = require("../../../app");
const connection = require("../../models/db");
const {
  createUserTable,
  dropUserTable,
  testUser,
  createDatabase,
} = require("./util/createUser");
const {
  createPlayerTable,
  dropPlayerTable,
  testPlayer,
  testPlayer1,
} = require("./util/createPlayer");

jest.mock("uuid", () => ({ v4: () => "test" }));

describe("player controller", () => {
  let session;
  beforeAll(async () => {
    await createDatabase();
    await createUserTable();
    await request(app).post("/users").send(testUser);
    const response = await request(app).post("/users/login").send(testUser);
    session = response.headers["set-cookie"];
  });
  beforeEach(async () => {
    await createPlayerTable();
  });

  afterEach(async () => {
    await dropPlayerTable();
  });

  afterAll(async () => {
    await dropUserTable();
    await connection.end();
  });

  // // Create Player
  it("should return content can not be empty", async () => {
    const response = await request(app)
      .post("/players")
      .set("Accept", "application/json")
      .set("Cookie", session)
      .send({ playerName: "", users_id: "test" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe(`Content cannot be empty!`);
  });

  it("should successfully create player", async () => {
    const response = await request(app)
      .post("/players")
      .set("Accept", "application/json")
      .set("Cookie", session)
      .send(testPlayer)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.playerName).toBe("test");
  });

  // // Find player by name
  it("should return no player found", async () => {
    const response = await request(app)
      .get("/players/byName/test1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe(`No test1 found.`);
  });

  it("should return player found", async () => {
    await request(app).post("/players").send(testPlayer).set("Cookie", session);
    const response = await request(app)
      .get("/players/byName/test")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.playerName).toBe("test");
  });

  // Find all players for a user
  const expected = [
    { id: 1, playerName: "test", users_id: "test" },
    { id: 2, playerName: "test1", users_id: "test" },
  ];
  it("should return a list of players by users_id", async () => {
    await request(app).post("/players").send(testPlayer).set("Cookie", session);
    await request(app)
      .post("/players")
      .send(testPlayer1)
      .set("Cookie", session);
    await request(app)
      .get("/players/byuser")
      .set("Accept", "application/json")
      .set("Cookie", session)
      .expect("Content-Type", /json/)
      .expect(200);
    expect.arrayContaining(expected);
  });

  it("should return no players found for user", async () => {
    const response = await request(app)
      .get("/players/byuser")
      .set("Accept", "application/json")
      .set("Cookie", session)
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe(`There were no players found`);
  });

  // Update player
  it("should update player based on playerId", async () => {
    await request(app).post("/players").send(testPlayer).set("Cookie", session);
    const response = await request(app)
      .put("/players/1")
      .set("Accept", "application/json")
      .send({ playerName: "test24", users_id: testPlayer.users_id })
      .expect(200);
    expect(response.body.playerName).toBe("test24");
  });

  it("should return player not found for updating", async () => {
    const response = await request(app)
      .put("/players/2")
      .set("Accept", "application/json")
      .send({ playerName: "test24", users_id: testPlayer.users_id })
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe(`No Player found with Id 2`);
  });

  it("should return content cannot be empty!", async () => {
    await request(app).post("/players").send(testPlayer).set("Cookie", session);
    const response = await request(app)
      .put("/players/1")
      .set("Accept", "application/json")
      .send({ playerName: "", users_id: testPlayer.users_id })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe(`Content cannot be empty!`);
  });

  // // Delete a player by Id
  it("should return player not found", async () => {
    const response = await request(app)
      .delete("/players/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe(`No player found with Id 1`);
  });

  it("should return player deleted", async () => {
    await request(app).post("/players").send(testPlayer).set("Cookie", session);
    const response = await request(app)
      .delete("/players/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toBe(`Player 1 was successfully deleted`);
  });
});
