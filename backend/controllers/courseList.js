const courseList = require("express").Router();
const dbConn = require("../utils/db");

courseList.get("/:id", async (request, respose) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    const details =
        await dbConn.query(`SELECT course_id, session_id, code, title FROM takes 
                JOIN course ON takes.course_id = course.id
                WHERE student_roll = ?`, [id]);
        
    return respose.json(details);
});
