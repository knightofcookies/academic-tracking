"use strict";

const instructorsRouter = require("express").Router();
const dbConn = require("../utils/db");

instructorsRouter.get("/", async (request, response) => {
    const instructors = await dbConn.query("SELECT * FROM instructor");
    return response.json(instructors);
});

instructorsRouter.get("/count", async (request, response) => {
    const instructorCount = await dbConn.query('SELECT COUNT(*) as count FROM instructor');
    return response.json(instructorCount[0].count);
});

instructorsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const instructorList = await dbConn.query(
        "SELECT * FROM instructor WHERE id=?",
        [id]
    );

    if (instructorList.length === 0) {
        return response
            .status(404)
            .json({ error: `Instructor with id ${id} not found` });
    }

    const [instructor] = instructorList;

    return response.json(instructor);
});

instructorsRouter.get("/:id/courses", async (request, response) => {
    const { id } = request.params;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const instructorList = await dbConn.query(
        "SELECT * FROM instructor WHERE id=?",
        [id]
    );

    if (instructorList.length === 0) {
        return response
            .status(404)
            .json({ error: `Instructor with id ${id} not found` });
    }

    const query = `SELECT session_id, session.start_year, session.season, 
    course_id, course.code course_code, course.title course_title, 
    course.department_id course_dept_id 
    FROM teaches JOIN session ON session.id = teaches.session_id 
    JOIN instructor ON instructor.id = teaches.instructor_id 
    JOIN course ON course.id = teaches.course_id
    WHERE instructor.id=?;`;

    const courses = await dbConn.query(query, [id]);

    return response.json(courses);
});

instructorsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { name, designation, department_id } = request.body;

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!designation) {
        return response.status(400).json({
            error: "designation missing in request body",
        });
    }

    if (!department_id) {
        return response.status(400).json({
            error: "department_id missing in request body",
        });
    }

    name = name.trim();
    designation = designation.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    if (designation.length < 2) {
        return response.status(400).json({
            error: "designation cannot be less than 2 characters long",
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
        "INSERT INTO instructor (name, designation, department_id) VALUES (?, ?, ?)",
        [name, designation, department_id]
    );
    return response.status(201).json({
        id: res.insertId,
    });
});

instructorsRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    let { name, designation, department_id } = request.body;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const instructorList = await dbConn.query(
        "SELECT id, name, designation, department_id FROM instructor WHERE id=?",
        [id]
    );

    if (instructorList.length === 0) {
        return response
            .status(404)
            .json({ error: `Instructor with id ${id} not found` });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!designation) {
        return response.status(400).json({
            error: "designation missing in request body",
        });
    }

    if (!department_id) {
        return response.status(400).json({
            error: "department_id missing in request body",
        });
    }

    name = name.trim();
    designation = designation.trim();

    if (name.length < 2) {
        return response.status(400).json({
            error: "name cannot be less than 2 characters long",
        });
    }

    if (designation.length < 2) {
        return response.status(400).json({
            error: "designation cannot be less than 2 characters long",
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

    await dbConn.query(
        "UPDATE instructor SET name=?, designation=?, department_id=? WHERE id=?",
        [name, designation, department_id, id]
    );
    return response.status(200).end();
});

instructorsRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const instructorList = await dbConn.query(
        "SELECT id, name, designation, dept_name FROM instructor WHERE id=?",
        [id]
    );

    if (instructorList.length === 0) {
        return response
            .status(404)
            .json({ error: `Instructor with id ${id} not found` });
    }

    await dbConn.query("DELETE FROM instructor WHERE id=?", [id]);
    return response.status(204).end();
});

instructorsRouter.post("/:id/teaches", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { id } = request.params;
    let { course_id, session_id } = request.body;

    if (!id instanceof Number || id % 1 !== 0) {
        return response.status(400).json({ error: "'id' must be a number." });
    }

    const instructorList = await dbConn.query(
        "SELECT * FROM instructor WHERE id=?",
        [id]
    );

    if (instructorList.length === 0) {
        return response
            .status(404)
            .json({ error: `Instructor with id ${id} not found` });
    }

    if (!session_id) {
        return response.status(400).json({
            error: "session_id missing in request body",
        });
    }

    if (!session_id instanceof Number || session_id % 1 != 0) {
        return response.status(400).json({
            error: "session_id must be an integer",
        });
    }

    const sessionWithId = await dbConn.query(
        "SELECT * FROM session WHERE id=?",
        [session_id]
    );

    if (sessionWithId.length === 0) {
        return response
            .status(404)
            .json({ error: `No session with ID ${session_id}` });
    }

    if (!course_id) {
        return response.status(400).json({
            error: "course_id missing in request body",
        });
    }

    if (!course_id instanceof Number || course_id % 1 != 0) {
        return response.status(400).json({
            error: "course_id must be an integer",
        });
    }

    const courseWithId = await dbConn.query("SELECT * FROM course WHERE id=?", [
        course_id,
    ]);

    if (courseWithId.length === 0) {
        return response
            .status(404)
            .json({ error: `No course with ID ${course_id}` });
    }

    const preExistingRecords = await dbConn.query(
        "SELECT * FROM teaches WHERE instructor_id=? AND course_id=? AND session_id=?",
        [id, course_id, session_id]
    );

    if (preExistingRecords.length !== 0) {
        return response.status(409).json({
            error: "Duplicate entry",
        });
    }

    await dbConn.query(
        `INSERT INTO teaches (instructor_id, course_id, session_id) VALUES (?, ?, ?)`,
        [id, course_id, session_id]
    );

    return response.status(201).end();
});

module.exports = instructorsRouter;
