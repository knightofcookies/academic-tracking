const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const dbConn = require("../utils/db");
const jwt = require("jsonwebtoken");

// https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt

loginRouter.post("/user", async (request, response) => {
    const { username, password } = request.body;

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
});

loginRouter.post("/admin", async (request, response) => {
    const { username, password } = request.body;

    const query = "SELECT * FROM administrator WHERE username=?";

    const [administratorWithUsername] = await dbConn.query(query, [username]);

    if (!administratorWithUsername) {
        return response.status(401).json({
            error: "Invalid username",
        });
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        administratorWithUsername.password_hash
    );

    if (!passwordCorrect) {
        return response.status(401).json({
            error: "Invalid password",
        });
    }

    const administratorForToken = {
        username: administratorWithUsername.username,
        email: administratorWithUsername.email,
    };

    const token = jwt.sign(administratorForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    });

    response.status(200).send({
        token,
        username: administratorWithUsername.username,
        email: administratorWithUsername.email,
        type: "administrator",
    });
});

module.exports = loginRouter;
