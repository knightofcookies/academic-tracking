const bcrypt = require("bcrypt");
const adminRouter = require("express").Router();
const dbConn = require("../utils/db");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

// TODO Add PUT and DELETE requests
// TODO Add change password
// https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt
// TODO https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

adminRouter.post("/", async (request, response) => {
    const { username, email, password, security_question, security_answer } =
        request.body;

    if (!username || username.length < 3 || !password || password.length < 3) {
        return response.status(400).json({
            error: "Username and password should each be at least 3 characters long",
        });
    }

    if (!validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (!security_question || security_question.length < 10) {
        return response.status(400).json({
            error: "Security question should be at least 10 characters long",
        });
    }

    if (!security_answer || security_answer.length < 3) {
        return response.status(400).json({
            error: "The answer to the security question should be at least 3 characters long",
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

module.exports = adminRouter;
