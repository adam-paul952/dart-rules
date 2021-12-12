const request = require("supertest");
const app = require("../../../app");
const sql = require("../../models/db");

afterAll(() => {
  sql.end();
});
// Create player stats
test("Should create a row for stats for created player", async () => {
  await request(app).post("/playerStats/9").expect(200);
});
