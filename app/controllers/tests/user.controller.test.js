const request = require("supertest");
const app = require("../../../app");
const connection = require("../../models/db");
const {
  createUserTable,
  dropUserTable,
  testUser,
  createDatabase,
  dropDatabase,
} = require("./util/createUser");

jest.mock("uuid", () => ({ v4: () => "test" }));

describe("user controller", () => {
  beforeAll(async () => {
    await createDatabase();
  });

  beforeEach(async () => {
    await createUserTable();
  });

  afterEach(async () => {
    await dropUserTable();
  });

  afterAll(async () => {
    // await dropDatabase();
    await connection.end();
  });

  // Create User
  it("should create a user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Accept", "application/json")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.username).toBe("test12@test.com");
  });

  it("should create error username and password can not be empty", async () => {
    const response = await request(app)
      .post("/users")
      .set("Accept", "application/json")
      .send({
        username: "",
        password: "",
      })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe("Username / Password cannot be empty");
  });

  // Foreign key constraint error
  // test("Should find already existing user", async () => {
  //   await request(app).post("/users").send(testUser);
  //   const response = await request(app)
  //     .post("/users")
  //     .send({ username: testUser.username, password: "password" })
  //     .expect("Content-Type", /json/)
  //     .expect(400);
  //   expect(response.body.message).toBe("Username is taken");
  // });

  // User log in

  it("should return no user found", async () => {
    const response = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send({ username: "test11@test.com", password: "test1" })
      .expect(400);
    expect(response.body.message).toBe("No user found");
  });

  it("should return incorrect password", async () => {
    await request(app).post("/users").send(testUser);
    const response = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send({ username: testUser.username, password: "test" })
      .expect(401);
    expect(response.body.message).toBe("Incorrect password");
  });

  it("should log a user in", async () => {
    await request(app).post("/users").send(testUser);
    const response = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.username).toBe("test12@test.com");
  });

  // Update user
  it("should return content cannot be empty", async () => {
    const response = await request(app)
      .put("/users/42")
      .set("Accept", "application/json")
      .send({ username: "", password: "" })
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe("No user found with that Id");
  });

  it("should edit user", async () => {
    await request(app).post("/users").send(testUser);
    await request(app)
      .put("/users/test")
      .set("Accept", "application/json")
      .send({ username: "test@email.com", password: "test" })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  // Delete user
  it("should delete a user", async () => {
    await request(app).post("/users").send(testUser);
    const response = await request(app)
      .delete("/users/test")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toBe("User was successfully deleted!");
  });

  it("should return user not found", async () => {
    const response = await request(app)
      .delete("/users/8")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toBe("No user found with that Id");
  });
});
