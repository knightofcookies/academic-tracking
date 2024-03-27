const bcrypt = require("bcrypt");
const adminRouter = require("express").Router();
const dbConn = require("../utils/db");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

// TODO Add PUT and DELETE requests
// https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt
// TODO Display warning on frontend that password and security_answer cannot be padded with spaces

adminRouter.post("/", async (request, response) => {
    let { username, email, password, security_question, security_answer } =
        request.body;

    if (
        !username ||
        !password ||
        !email ||
        !security_question ||
        !security_answer
    ) {
        return response.status(400).json({
            error: "username, email, password, security_question or security_answer missing in request body",
        });
    }

    username = username.trim();
    password = password.trim();
    email = email.trim();
    security_question = security_question.trim();
    security_answer = security_answer.trim();

    if (!username || username.length < 3 || !password || password.length < 3) {
        return response.status(400).json({
            error: "username and password should each be at least 3 characters long",
        });
    }

    if (!email || !validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (!security_question || security_question.length < 10) {
        return response.status(400).json({
            error: "security_question should be at least 10 characters long",
        });
    }

    if (!security_answer || security_answer.length < 3) {
        return response.status(400).json({
            error: "security_answer should be at least 3 characters long",
        });
    }

    const administratorWithUsername = await dbConn.query(
        "SELECT * FROM administrator WHERE username=?",
        [username]
    );

    if (administratorWithUsername.length !== 0) {
        return response.status(409).json({
            error: "An administrator with that username already exists",
        });
    }

    const administratorWithEmail = await dbConn.query(
        "SELECT * FROM administrator WHERE email=?",
        [email]
    );

    if (administratorWithEmail.length !== 0) {
        return response.status(409).json({
            error: "An administrator with that email already exists",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const securityAnswerHash = await bcrypt.hash(security_answer, saltRounds);

    const query =
        "INSERT INTO administrator (username, email, password_hash, security_question, security_answer_hash) VALUES (?, ?, ?, ?, ?)";

    await dbConn.query(query, [
        username,
        email,
        passwordHash,
        security_question,
        securityAnswerHash,
    ]);

    return response.status(201).end();
});

adminRouter.get("/", async (request, response) => {
    const query = "SELECT username, email FROM administrator";
    const qres = await dbConn.query(query);
    response.json(qres);
});

adminRouter.post("/changepassword", async (request, response) => {
    const administrator = request.administrator;
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
        administrator.password_hash
    );

    if (!passwordCorrect) {
        return response.status(400).json({
            error: "Incorrect current_password",
        });
    }
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(new_password, saltRounds);
    await dbConn.query(
        "UPDATE administrator SET password_hash=? WHERE username=?",
        [newPasswordHash, administrator.username]
    );

    return response.status(200).end();
});

adminRouter.put("/:username", async (request, response) => {
    const { curr_username } = request.params;
    let { username, email, password, security_question, security_answer } =
        request.body;

    const adminSearch = dbConn.query(
        "SELECT username, email, security_question, security_answer_hash FROM administrator WHERE username=?",
        [curr_username]
    );
    if (adminSearch.length === 0) {
        return response.status(400).json({
            error: "An administrator with the username given in the request parameters does not exist.",
        });
    }

    const administrator = adminSearch[0];

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

    if (!security_question) {
        return response.status(400).json({
            error: "security_question missing in request body",
        });
    }

    if (!security_answer) {
        return response.status(400).json({
            error: "security_answer missing in request body",
        });
    }

    username = username.trim();
    password = password.trim();
    email = email.trim();
    security_question = security_question.trim();
    security_answer = security_answer.trim();

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

    if (!security_question || security_question.length < 10) {
        return response.status(400).json({
            error: "security_question should be at least 10 characters long",
        });
    }

    if (!security_answer || security_answer.length < 3) {
        return response.status(400).json({
            error: "security_answer should be at least 3 characters long",
        });
    }

    const administratorWithUsername = await dbConn.query(
        "SELECT * FROM administrator WHERE username=?",
        [username]
    );

    if (curr_username !== username && administratorWithUsername.length !== 0) {
        return response.status(409).json({
            error: "An administrator with that username already exists",
        });
    }

    const administratorWithEmail = await dbConn.query(
        "SELECT * FROM administrator WHERE email=?",
        [email]
    );

    if (administrator.email !== email && administratorWithEmail.length !== 0) {
        return response.status(409).json({
            error: "An administrator with that email already exists",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const securityAnswerHash = await bcrypt.hash(security_answer, saltRounds);

    await dbConn.query(
        "UPDATE administrator SET username=?, password_hash=?, email=?, security_question=?, security_answer_hash=? WHERE username=?",
        [
            username,
            passwordHash,
            email,
            security_answer.securityAnswerHash,
            curr_username,
        ]
    );
    return response.status(200).end();
});

adminRouter.delete("/:username", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { username } = request.params;
    await dbConn.query("DELETE FROM administrator WHERE username=?", [
        username,
    ]);
    return response.status(204).end();
});

module.exports = adminRouter;
