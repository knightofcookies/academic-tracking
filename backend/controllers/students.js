const studentsRouter = require("express").Router();
const dbConn = require("../utils/db");
const validator = require("email-validator");

studentsRouter.get("/", async (request, response) => {
    const students = await dbConn.query("SELECT * FROM student");
    return response.json(students);
});

// TODO Implement the VARCHAR upper limit on the backend
// TODO Prevent SQL Injection

studentsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { roll, name, email, programme_id, year_of_joining } = request.body;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request body",
        });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!email) {
        return response.status(400).json({
            error: "email missing in request body",
        });
    }

    if (!programme_id) {
        return response.status(400).json({
            error: "programme_id missing in request body",
        });
    }

    if (!year_of_joining) {
        return response.status(400).json({
            error: "year_of_joining missing in request body",
        });
    }

    roll = roll.trim();
    name = name.trim();
    email = email.trim();
    programme_id = programme_id.trim();
    year_of_joining = year_of_joining.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    if (!validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (name.length < 2 || name.length > 100) {
        return response.status(400).json({
            error: "name must be from 2 to 100 characters long",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length !== 0) {
        return response.status(409).json({
            error: "A student with that roll number already exists",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !year_of_joining instanceof Number ||
        year_of_joining % 1 != 0 ||
        !(1950 <= year_of_joining <= currentYear)
    ) {
        return response.status(400).json({
            error: `year_of_joining must be an integer from 1950 to ${currentYear}`,
        });
    }

    if (!programme_id instanceof Number || programme_id % 1 != 0) {
        return response.status(400).json({
            error: "programme_id must be an integer",
        });
    }

    const programme = await dbConn.query("SELECT * FROM programme WHERE id=?", [
        programme_id,
    ]);
    if (programme.length === 0) {
        return response.status(400).json({
            error: "Invalid programme_id",
        });
    }

    const query =
        "INSERT INTO student (roll, name, email, programme_id, year_of_joining) VALUES (?, ?, ?, ?, ?);";

    await dbConn.query(query, [
        roll,
        name,
        email,
        programme_id,
        year_of_joining,
    ]);

    return response.status(201).end();
});

studentsRouter.put("/:roll", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { roll } = request.params;
    let { name, email, programme_id, year_of_joining } = request.body;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!email) {
        return response.status(400).json({
            error: "email missing in request body",
        });
    }

    if (!programme_id) {
        return response.status(400).json({
            error: "programme_id missing in request body",
        });
    }

    if (!year_of_joining) {
        return response.status(400).json({
            error: "year_of_joining missing in request body",
        });
    }

    roll = roll.trim();
    name = name.trim();
    email = email.trim();
    programme_id = programme_id.trim();
    year_of_joining = year_of_joining.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    if (!validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (name.length < 2 || name.length > 100) {
        return response.status(400).json({
            error: "name must be from 2 to 100 characters long",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !year_of_joining instanceof Number ||
        year_of_joining % 1 != 0 ||
        !(1950 <= year_of_joining <= currentYear)
    ) {
        return response.status(400).json({
            error: `year_of_joining must be an integer from 1950 to ${currentYear}`,
        });
    }

    if (!programme_id instanceof Number || programme_id % 1 != 0) {
        return response.status(400).json({
            error: "programme_id must be an integer",
        });
    }

    const programme = await dbConn.query("SELECT * FROM programme WHERE id=?", [
        programme_id,
    ]);
    if (programme.length === 0) {
        return response.status(400).json({
            error: "Invalid programme_id",
        });
    }

    await dbConn.query(
        "UPDATE student SET name=?, email=?, programme_id=?, year_of_joining=? WHERE roll=?",
        [name, email, programme_id, year_of_joining, roll]
    );
    return response.status(200).end();
});

studentsRouter.delete("/:roll", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { roll } = request.params;
    await dbConn.query("DELETE FROM student WHERE roll=?", [roll]);
    return response.status(204).end();
});

module.exports = studentsRouter;
