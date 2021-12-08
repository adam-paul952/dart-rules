const request = require("supertest");
const app = require("../../../app");
const sql = require("../../models/db");

const testUser = { username: "test@test.com", password: "test12" };

beforeAll(() => {
  sql.query("DELETE FROM users WHERE username = ?", [testUser.username]);
});

// Create User

test("Should create a user", async () => {
  await request(app).post("/users").send(testUser).expect(200);
});

test("Should create error for improper username or password", async () => {
  await request(app)
    .post("/users")
    .send({
      username: "",
      password: "",
    })
    .expect(400);
});

// Foreign key constraint error
// test("Should find already existing user", async () => {
//   await request(app)
//     .post("/users")
//     .send({ username: "test@test.com", password: "test12" })
//     .expect(400);
// });

// User log in
test("Should log a user in", async () => {
  await request(app).post("/users/login").send(testUser).expect(200);
});

test("Should return no user found", async () => {
  await request(app)
    .post("/users/login")
    .send({ username: "test11@test.com", password: "test1" })
    .expect(400);
});

test("Should return incorrect password", async () => {
  await request(app)
    .post("/users/login")
    .send({ username: testUser.username, password: "test" })
    .expect(409);
});
