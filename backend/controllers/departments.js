const departmentsRouter = require("express").Router();
const dbConn = require("../utils/db");

// TODO Add PUT and DELETE requests
// TODO Update all missing x to x missing
// TODO Decapitalize parameter names in error messages

departmentsRouter.get("/", async (request, response) => {
    const departments = await dbConn.query("SELECT * FROM department");
    return response.json(departments);
});

departmentsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { name } = request.body;

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    name = name.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    const departmentWithName = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [name]
    );
    if (departmentWithName.length != 0) {
        return response.status(409).json({
            error: "A department with that name already exists",
        });
    }

    await dbConn.query("INSERT INTO department (name) VALUES (?)", [name]);
    return response.status(201).end();
});

module.exports = departmentsRouter;
