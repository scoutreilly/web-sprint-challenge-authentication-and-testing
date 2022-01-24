const request = require("supertest");
const server = require("./server");

// Write your tests here
test("sanity", () => {
  expect(true).toBe(false);
});

describe("[POST] /register", () => {
  it("throws an error when no username is given", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "",
      password: "foobar",
    });
    expect(res.body).toMatchObject({
      message: "username and password required",
    });
  });

  it("throws an error when no password is given", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "Captain",
      password: "",
    });
    expect(res.body).toMatchObject({
      message: "username and password required",
    });
  });
});

describe("[POST] /login", () => {
  it("throws an error when no username is given", async () => {
    const res = await request(server).post("/login").send({
      username: "",
      password: "foobar",
    });
    expect(res.status).toBe(404);
  });
  it("throws an error when no password is given", async () => {
    const res = await request(server).post("/api/auth/login").send({
      username: "Captain",
      password: "",
    });
    expect(res.body).toMatchObject({
      message: "username and password required",
    });
  });
});
