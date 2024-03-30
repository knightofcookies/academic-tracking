"use strict";

const departmentsRouter = require("express").Router();
const dbConn = require("../utils/db");

// TODO Update all missing x to x missing
// TODO Decapitalize parameter names in error messages
// TODO Check for null after trimming strings

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

    if (!name || name.length < 2) {
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

departmentsRouter.put("/:name", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { name } = request.params;
    const { new_name } = request.body;

    if (!new_name) {
        return response.status(400).json({
            error: "new_name missing in request body",
        });
    }

    name = name.trim();
    new_name = new_name.trim();

    if (!new_name || new_name.length < 2) {
        return response.status(400).json({
            error: "new_name cannot be less than 2 characters long",
        });
    }

    const departmentWithName = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [new_name]
    );
    if (departmentWithName.length != 0) {
        return response.status(409).json({
            error: "A department with that name already exists",
        });
    }

    await dbConn.query("UPDATE department SET name=? WHERE name=?", [
        new_name,
        name,
    ]);
    return response.status(200).end();
});

departmentsRouter.delete("/:name", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { name } = request.params;
    await dbConn.query("DELETE FROM department WHERE name=?", [name]);
    return response.status(204).end();
});

module.exports = departmentsRouter;
