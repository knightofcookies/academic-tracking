"use strict";

// https://www.w3schools.com/js/js_strict.asp

const usersRouter = require("express").Router();
const dbConn = require("../utils/db");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

// TODO Display warning on frontend that password cannot be padded with spaces

usersRouter.get("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }
    const query = "SELECT username, email FROM user";
    const users = await dbConn.query(query);
    response.json(users);
});

usersRouter.post("/", async (request, response) => {
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

usersRouter.post("/changepassword", async (request, response) => {
    if (!request.user) {
        return response.status(403).end();
    }

    const user = request.user;
    let { new_password, current_password } = request.body;

    if (!new_password) {
        return response.status(400).json({
            error: "new_password not provided",
        });
    }
    new_password = new_password.trim();
    if (new_password.length < 3) {
        return response.status(400).json({
            error: "new_password should be at least three characters long",
        });
    } else if (!current_password) {
        return response.status(400).json({
            error: "current_password not provided",
        });
    }

    const passwordCorrect = await bcrypt.compare(
        current_password,
        user.password_hash
    );

    if (!passwordCorrect) {
        return response.status(400).json({
            error: "Incorrect current password",
        });
    }
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(new_password, saltRounds);
    await dbConn.query("UPDATE user SET password_hash=? WHERE username=?", [
        newPasswordHash,
        user.username,
    ]);

    return response.status(200).end();
});

usersRouter.put("/:username", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { username } = request.params;
    let { new_username, email, password } = request.body;

    const userSearch = dbConn.query(
        "SELECT username, email FROM user WHERE username=?",
        [username]
    );
    if (userSearch.length === 0) {
        return response.status(400).json({
            error: "A user with the username given in the request parameters does not exist.",
        });
    }

    const user = userSearch[0];

    if (!new_username) {
        return response.status(400).json({
            error: "new_username missing in request body",
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

    new_username = new_username.trim();
    password = password.trim();
    email = email.trim();

    if (!new_username || new_username.length < 3) {
        return response.status(400).json({
            error: "new_username must be at least 3 characters long",
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
        [new_username]
    );

    if (username !== new_username && userWithUsername.length !== 0) {
        return response.status(409).json({
            error: `A user with the username ${new_username} already exists`,
        });
    }

    const userWithEmail = await dbConn.query(
        "SELECT * FROM user WHERE email=?",
        [email]
    );

    if (user.email !== email && userWithEmail.length !== 0) {
        return response.status(409).json({
            error: "A user with that email already exists",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await dbConn.query(
        "UPDATE user SET username=?, password_hash=?, email=? WHERE username=?",
        [new_username, passwordHash, email, username]
    );
    return response.status(200).end();
});

usersRouter.delete("/:username", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { username } = request.params;
    await dbConn.query("DELETE FROM user WHERE username=?", [username]);
    return response.status(204).end();
});

module.exports = usersRouter;
