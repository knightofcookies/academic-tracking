const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const dbConn = require("../utils/db");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

// https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt

usersRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const query = "SELECT * FROM user WHERE username=?";

    const [userWithUsername] = await dbConn.query(query, [username]);

    if (!userWithUsername) {
      return response.status(401).json({
        error: "Invalid username",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      userWithUsername.password_hash
    );

    if (!passwordCorrect) {
      return response.status(401).json({
        error: "Invalid password",
      });
    }

    const userForToken = {
      username: userWithUsername.username,
      email: userWithUsername.email,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(200).send({
      token,
      username: userWithUsername.username,
      email: userWithUsername.email,
      type: "standard_user",
    });
  } catch (err) {
    return response.status(500).end();
  }
});

module.exports = usersRouter;
