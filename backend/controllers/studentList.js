const studentList = require("express").Router();
const dbConn = require("../utils/db");

studentList.get("/:courseid", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const courseId = request.params.courseid;

    const details = await dbConn.query(
        `SELECT session_id from takes where takes.course_id = ?`,
        [courseId]
    );

    if (details.length == 0) {
        return response.status(400).json({
            error: "Course does not exist",
        });
    }

    return response.json(details);
});

studentList.get("/:courseid/:sessionid", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const courseId = request.params.courseid;
    const sessionId = request.params.sessionid;

    const details = await dbConn.query(`SELECT * FROM student WHERE roll IN (
                SELECT student_roll FROM takes WHERE takes.course_id = ? and takes.session_id = ?
        )`, [courseId, sessionId]);

    return response.json(details);
});

module.export = studentList;