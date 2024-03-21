const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const dbConn = require("../utils/db");

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    response.status(400).json({
      error: "username and password should each be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const query = "INSERT INTO user (username, password_hash) VALUES (?, ?);";

  dbConn.query(query, [username, passwordHash], (err, res) => {
    if (err) {
      response.status(500).end();
    }
    console.log(res);
    response.status(201).end();
  });
});

usersRouter.get("/", async (request, response) => {
  const query = "SELECT username FROM user;";

  dbConn.query(query, (err, res) => {
    if (err) {
      response.status(500).end();
    }
    response.json(res);
  });
});

module.exports = usersRouter;
