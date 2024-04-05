"use strict";

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

    let { department_id, degree, name } = request.body;

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

    if (!department_id) {
        return response.status(400).json({
            error: "department_id missing in request body",
        });
    }

    degree = degree.trim();
    name = name.trim();

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

    if (!department_id instanceof Number || department_id % 1 !== 0) {
        return response.status(400).json({
            error: "department_id has to be a number",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE id=?",
        [department_id]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid department_id",
        });
    }

    const res = await dbConn.query(
        "INSERT INTO programme (name, degree, department_id) VALUES (?, ?, ?)",
        [name, degree, department_id]
    );
    return response.status(201).json({
        id: res.insertId,
    });
});

programmesRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    let { department_id, degree, name } = request.body;

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

    if (!department_id) {
        return response.status(400).json({
            error: "department_id missing in request body",
        });
    }

    degree = degree.trim();
    name = name.trim();

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

    if (!department_id instanceof Number || department_id % 1 !== 0) {
        return response.status(400).json({
            error: "department_id has to be a number",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE id=?",
        [department_id]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid department_id",
        });
    }

    const programmeWithId = await dbConn.query(
        "SELECT * FROM programme WHERE id=?",
        [id]
    );

    if (programmeWithId.legnth === 0) {
        return response.status(404).json({
            error: "No such programme exists.",
        });
    }

    await dbConn.query(
        "UPDATE programme SET name=?, degree=?, department_id=? WHERE id=?",
        [name, degree, department_id, id]
    );
    return response.status(200).end();
});

programmesRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    const programmeWithId = await dbConn.query(
        "SELECT * FROM programme WHERE id=?",
        [id]
    );

    if (programmeWithId.legnth === 0) {
        return response.status(404).json({
            error: "No such programme exists.",
        });
    }

    await dbConn.query("DELETE FROM programme WHERE id=?", [id]);
    return response.status(204).end();
});

module.exports = programmesRouter;
