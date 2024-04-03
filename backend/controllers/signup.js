"use strict";

const signupRouter = require("express").Router();
const dbConn = require("../utils/db");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

// TODO Display warning on frontend that password cannot be padded with spaces

signupRouter.post("/", async (request, response) => {
    let { username, email, password } = request.body;

    if (!username) {
        return response.status(400).json({
            error: "username missing in request body",
        });
    }

    if (!password) {
        return response.status(400).json({
            error: "password missing in request body",
        });
    }

    if (!email) {
        return response.status(400).json({
            error: "email missing in request body",
        });
    }

    username = username.trim();
    password = password.trim();
    email = email.trim();

    if (!username || username.length < 3) {
        return response.status(400).json({
            error: "username must be at least 3 characters long",
        });
    }

    if (!password || password.length < 3) {
        return response.status(400).json({
            error: "password must be at least 3 characters long",
        });
    }

    if (!email || !validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    const userWithUsername = await dbConn.query(
        "SELECT * FROM user WHERE username=?",
        [username]
    );

    if (userWithUsername.length !== 0) {
        return response.status(409).json({
            error: "A user with that username already exists",
        });
    }

    const userWithEmail = await dbConn.query(
        "SELECT * FROM user WHERE email=?",
        [email]
    );

    if (userWithEmail.length !== 0) {
        return response.status(409).json({
            error: "A user with that email already exists",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query =
        "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?);";

    await dbConn.query(query, [username, email, passwordHash]);

    return response.status(201).end();
});

module.exports = signupRouter;
