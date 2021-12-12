const request = require("supertest");
const app = require("../../../app");
const sql = require("../../models/db");

afterAll(() => {
  sql.end();
});

// Create Player
test("Content can not be empty", async () => {
  await request(app)
    .post("/players")
    .send({ playerName: "", users_id: "" })
    .expect(500);
});

test("Successful player creation", async () => {
  await request(app)
    .post("/players")
    .send({ playerName: "test", users_id: "1" })
    .expect(200);
});

// Find player by name
test("Should return no player found", async () => {
  await request(app).get("/players/byName/test1").expect(404);
});

test("Should return player found", async () => {
  await request(app).get("/players/byName/test").expect(200);
});

// Find all players for a user
test("Should return a list of players by users_id", async () => {
  await request(app).get("/players/1").expect(200);
});

test("Should return no players found for user", async () => {
  await request(app).get("/players/18").expect(404);
});

test("Should update player based on playerId", async () => {
  await request(app)
    .put("/players/2")
    .send({ playerName: "test24", users_id: "1" })
    .expect(200);
});

test("Should return player not found", async () => {
  await request(app).put("/players/1").expect(404);
});

// Delete a player by Id
test("Should return player not found", async () => {
  await request(app).delete("/players/1").expect(404);
});

test("Should return player deleted", async () => {
  await request(app).delete("/players/8").expect(200);
});
