const usersRouter = require("express").Router();
const dbConn = require("../utils/db");

// TODO Add PUT and DELETE requests

usersRouter.get("/users", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }
    const query = "SELECT username, email FROM user";
    const qres = await dbConn.query(query);
    response.json(qres);
});

usersRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { username, email, password } = request.body;

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

    if (username.length < 3) {
        return response.status(400).json({
            error: "username must be at least 3 characters long",
        });
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: "password must be at least 3 characters long",
        });
    }

    if (!validator.validate(email)) {
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
    const { new_password, current_password } = request.body;

    if (!new_password) {
        return response.status(400).json({
            error: "New password not provided",
        });
    } else if (new_password.length < 3) {
        return response.status(400).json({
            error: "New password should be at least five characters long",
        });
    } else if (!current_password) {
        return response.status(400).json({
            error: "Current password not provided",
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

module.exports = usersRouter;
