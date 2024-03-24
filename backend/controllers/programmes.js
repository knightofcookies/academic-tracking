const programmesRouter = require("express").Router();
const dbConn = require("../utils/db");

programmesRouter.get("/", async (request, response) => {
    const programmes = await dbConn.query("SELECT * FROM programme");
    return response.json(programmes);
});

programmesRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let {dept_name, degree, name } = request.body;

    if (!degree) {
        return response.status(400).json({
            error: "degree missing in request body",
        });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!dept_name) {
        return response.status(400).json({
            error: "dept_name missing in request body",
        });
    }

    degree = degree.trim();
    name = name.trim();
    dept_name = dept_name.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    if (degree.length < 2) {
        return response.status(400).json({
            error: "degree cannot be less than 2 characters long",
        });
    }

    if (dept_name.length < 2) {
        return response.status(400).json({
            error: "dept_name cannot be less than 2 characters long",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [dept_name]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid dept_name",
        });
    }

    await dbConn.query(
        "INSERT INTO programme (name, degree, dept_name) VALUES (?, ?, ?)",
        [name, degree, dept_name]
    );
    return response.status(201).end();
});

module.exports = programmesRouter;
