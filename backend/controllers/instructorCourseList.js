const instructorCourseList = require("express").Router();
const dbConn = require("../utils/db");

instructorCourseList.get("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }
    
    const { id } = request.params;     // Getting the id from the request url

    const details = await dbConn.query(`SELECT session_id, code, title FROM teaches
                                            JOIN course ON teaches.course_id = course.id
                                            WHERE teaches.instructor_id = ?
                                            GROUP BY session_id, code, title; `, [id]);

    if(details.length == 0) {
        return response.status(400).json({
            error: "Instructor does not exist",
        });
    }

    return response.json(details);
})

module.exports = instructorCourseList;