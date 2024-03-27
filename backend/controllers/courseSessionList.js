const courseSessionList = require("express").Router();
const dbConn = require("../utils/db");

courseSessionList.get("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;

    const details = await dbConn.query(`SELECT session_id from teaches where teaches.course_id = ?`, [id]);
    
    if (details.length == 0) {
        return response.status(400).json({
            error: "Course does not exist",
        });
    }

    return response.json(details);

})

module.exports = courseSessionList;