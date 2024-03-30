"use strict";

// Ensure this is run from the backend/ directory and not inside util/

const readlineSync = require("readline-sync");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const mysql = require("mysql");
const config = require("./config");
const util = require("util");

console.log(config.MYSQL_HOST);

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MYSQL database");
    connection.on("error", function (err) {
        console.error(err.code);
    });

    connection.query = util.promisify(connection.query).bind(connection);
    fn();
});

const fn = async () => {
    try {
        console.log(
            "Enter the following details to create a new administrator."
        );
        console.log(
            "Keep in mind that backspace and delete operations do not work when",
            "filling the password and security answer fields."
        );
        let username = readlineSync.question("Please enter the username: ");
        let password = readlineSync.question("Please enter the password: ", {
            hideEchoBack: true,
        });
        let email = readlineSync.question("Please enter the email address: ");
        let security_question = readlineSync.question(
            "Please enter the security question: "
        );
        let security_answer = readlineSync.question(
            "Please enter the security answer: ",
            {
                hideEchoBack: true,
            }
        );

        if (
            !username ||
            !password ||
            !email ||
            !security_question ||
            !security_answer
        ) {
            throw Error(
                "username, email, password, security_question or security_answer missing"
            );
        }

        username = username.trim();
        password = password.trim();
        email = email.trim();
        security_question = security_question.trim();
        security_answer = security_answer.trim();

        if (
            !username ||
            username.length < 3 ||
            !password ||
            password.length < 3
        ) {
            throw Error(
                "username and password should each be at least 3 characters long"
            );
        }

        if (!email || !validator.validate(email)) {
            throw Error("Invalid email");
        }

        if (!security_question || security_question.length < 10) {
            throw Error(
                "security_question should be at least 10 characters long"
            );
        }

        if (!security_answer || security_answer.length < 3) {
            throw Error("security_answer should be at least 3 characters long");
        }

        const administratorWithUsername = await connection.query(
            "SELECT * FROM administrator WHERE username=?",
            [username]
        );

        if (administratorWithUsername.length !== 0) {
            throw Error("An administrator with that username already exists");
        }

        const administratorWithEmail = await connection.query(
            "SELECT * FROM administrator WHERE email=?",
            [email]
        );

        if (administratorWithEmail.length !== 0) {
            throw Error("An administrator with that email already exists");
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const securityAnswerHash = await bcrypt.hash(
            security_answer,
            saltRounds
        );

        const query =
            "INSERT INTO administrator (username, email, password_hash, security_question, security_answer_hash) VALUES (?, ?, ?, ?, ?)";

        await connection.query(query, [
            username,
            email,
            passwordHash,
            security_question,
            securityAnswerHash,
        ]);

        console.log("Administrator created successfully");
    } catch (err) {
        console.log(err.message);
    } finally {
        connection.destroy();
    }
};
