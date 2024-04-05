"use strict";

const sessionsRouter = require("express").Router();
const dbConn = require("../utils/db");

sessionsRouter.get("/", async (request, response) => {
    const sessions = await dbConn.query("SELECT * FROM session");
    return response.json(sessions);
});

sessionsRouter.get("/:session_id", async (req, res) => {
    let { session_id } = request.params;

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

    const [session] = sessionWithId;
    return response.json(session);
});

sessionsRouter.get("/:session_id/courses", async (req, res) => {
    let { session_id } = request.params;

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

    const coursesQuery = `SELECT course_id, course.title, course.code, 
        course.dept_name course_dept_name,
        instructor_id, name, designation,
        instructor.department_id instructor_dept_id
        FROM teaches 
        JOIN instructor ON instructor.id = instructor_id 
        JOIN course ON course.id = course_id 
        JOIN session ON session.id = session_id
        WHERE session_id=?;`;

    const courses = await dbConn.query(coursesQuery, [session_id]);

    return response.json(courses);
});

sessionsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { start_year, season } = request.body;

    if (!start_year) {
        return response.status(400).json({
            error: "start_year missing in request body",
        });
    }

    if (!season) {
        return response.status(400).json({
            error: "season missing in request body",
        });
    }

    season = season.trim().toLowerCase();
    start_year = start_year.trim();

    if (!(season === "monsoon") && !(season === "winter")) {
        return response.status(400).json({
            error: "season must be monsoon or winter",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !start_year instanceof Number ||
        start_year % 1 != 0 ||
        !(1950 <= start_year <= currentYear)
    ) {
        return response.status(400).json({
            error: `start_year must be an integer from 1950 to ${currentYear}`,
        });
    }

    const session = await dbConn.query(
        "SELECT * FROM session WHERE start_year=? AND season=?",
        [start_year, season]
    );
    if (session.length !== 0) {
        return response.status(400).json({
            error: "A session with the same start_year and season values already exists",
        });
    }

    const res = await dbConn.query(
        "INSERT INTO session (start_year, season) VALUES (?, ?)",
        [start_year, season]
    );
    return response.status(201).json({
        id: res.insertId,
    });
});

sessionsRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    let { start_year, season } = request.body;

    if (!start_year) {
        return response.status(400).json({
            error: "start_year missing in request body",
        });
    }

    if (!season) {
        return response.status(400).json({
            error: "season missing in request body",
        });
    }

    season = season.trim().toLowerCase();
    start_year = start_year.trim();

    if (!season === "monsoon" || !season === "winter") {
        return response.status(400).json({
            error: "season must be monsoon or winter",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !start_year instanceof Number ||
        start_year % 1 != 0 ||
        !(1950 <= start_year <= currentYear)
    ) {
        return response.status(400).json({
            error: `start_year must be an integer from 1950 to ${currentYear}`,
        });
    }

    const session = await dbConn.query(
        "SELECT * FROM session WHERE start_year=? AND season=?",
        [start_year, season]
    );
    if (session.length === 0) {
        return response.status(400).json({
            error: "A session with the same start_year and season values already exists",
        });
    }

    const sessionWithId = await dbConn.query(
        "SELECT * FROM session WHERE id=?",
        [id]
    );

    if (sessionWithId.legnth === 0) {
        return response.status(404).json({
            error: "No such session exists.",
        });
    }

    await dbConn.query("UPDATE session SET start_year=?, season=? WHERE id=?", [
        start_year,
        season,
        id,
    ]);
    return response.status(200).end();
});

sessionsRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    const sessionWithId = await dbConn.query(
        "SELECT * FROM session WHERE id=?",
        [id]
    );

    if (sessionWithId.legnth === 0) {
        return response.status(404).json({
            error: "No such session exists.",
        });
    }

    await dbConn.query("DELETE FROM session WHERE id=?", [id]);
    return response.status(204).end();
});

module.exports = sessionsRouter;
