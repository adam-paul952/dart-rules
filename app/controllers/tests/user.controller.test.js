const request = require("supertest");
const app = require("../../../app");
const sql = require("../../models/db");

const testUser = { username: "test12@test.com", password: "test12" };

afterAll(() => {
  sql.end();
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

test("Should log a user in", async () => {
  await request(app).post("/users/login").send(testUser).expect(200);
});

// Update user
test("Should return content cannot be empty", async () => {
  await request(app)
    .put("/users/42")
    .send({ username: "", password: "" })
    .expect(404);
});

// Delete user
test("Should delete a user", async () => {
  await request(app)
    .delete("/users/f8d6c4f6-a5a8-4137-8173-4499149654a5")
    .expect(200);
});

test("Should return user not found", async () => {
  await request(app).delete("/users/8").expect(404);
});
