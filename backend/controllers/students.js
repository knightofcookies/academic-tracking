const studentsRouter = require("express").Router();
const dbConn = require("../utils/db");
const validator = require("email-validator");

studentsRouter.get("/", async (request, response) => {
    const students = await dbConn.query("SELECT * FROM student");
    return response.json(students);
});

// TODO Implement the VARCHAR upper limit on the backend
// TODO Prevent SQL Injection

studentsRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { roll, name, email, programme_id, year_of_joining } = request.body;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request body",
        });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!email) {
        return response.status(400).json({
            error: "email missing in request body",
        });
    }

    if (!programme_id) {
        return response.status(400).json({
            error: "programme_id missing in request body",
        });
    }

    if (!year_of_joining) {
        return response.status(400).json({
            error: "year_of_joining missing in request body",
        });
    }

    roll = roll.trim();
    name = name.trim();
    email = email.trim();
    programme_id = programme_id.trim();
    year_of_joining = year_of_joining.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    if (!validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (name.length < 2 || name.length > 100) {
        return response.status(400).json({
            error: "name must be from 2 to 100 characters long",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length !== 0) {
        return response.status(409).json({
            error: "A student with that roll number already exist",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !year_of_joining instanceof Number ||
        year_of_joining % 1 != 0 ||
        !(1950 <= year_of_joining <= currentYear)
    ) {
        return response.status(400).json({
            error: `year_of_joining must be an integer from 1950 to ${currentYear}`,
        });
    }

    if (!programme_id instanceof Number || programme_id % 1 != 0) {
        return response.status(400).json({
            error: "programme_id must be an integer",
        });
    }

    const programme = await dbConn.query("SELECT * FROM programme WHERE id=?", [
        programme_id,
    ]);
    if (programme.length === 0) {
        return response.status(400).json({
            error: "Invalid programme_id",
        });
    }

    const query =
        "INSERT INTO student (roll, name, email, programme_id, year_of_joining) VALUES (?, ?, ?, ?, ?);";

    await dbConn.query(query, [
        roll,
        name,
        email,
        programme_id,
        year_of_joining,
    ]);

    return response.status(201).end();
});

studentsRouter.get("/:roll", async (request, response) => {
    let { roll } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    return response.json({
        ...studentWithRoll[0],
    });
});

studentsRouter.get("/:roll/courses", async (request, response) => {
    let { roll } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const coursesQuery = `SELECT semester_number, grade,
        course_id, course.title, course.code, 
        course.dept_name course_dept_name,
        session_id, session.start_year, session.season,
        taught_by instructor_id, instructor.name instructor_name,
        instructor.designation instructor_designation,
        instructor.dept_name instructor_dept_name
        FROM takes 
        JOIN student ON student.roll = student_roll 
        JOIN course ON course.id = course_id
        JOIN session ON session.id = session_id
        JOIN instructor ON instructor.id = taught_by
        WHERE roll=?
        ORDER BY semester_number;`;

    const courses = await dbConn.query(coursesQuery, [roll]);

    return response.json(courses);
});

studentsRouter.get("/:roll/courses/:courseid", async (request, response) => {
    let { roll, courseid } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (!courseid) {
        return response.status(400).json({
            error: "courseid missing in request parameters",
        });
    }

    courseid = courseid.trim();

    if (!courseid instanceof Number || courseid % 1 != 0) {
        return response.status(400).json({
            error: "courseid must be an integer",
        });
    }

    const courseQuery = `SELECT semester_number, grade,
        course_id, course.title, course.code, 
        course.dept_name course_dept_name,
        session_id, session.start_year, session.season,
        taught_by instructor_id, instructor.name instructor_name,
        instructor.designation instructor_designation,
        instructor.dept_name instructor_dept_name
        FROM takes 
        JOIN student ON student.roll = student_roll 
        JOIN course ON course.id = course_id
        JOIN session ON session.id = session_id
        JOIN instructor ON instructor.id = taught_by
        WHERE roll=? AND course_id=?;`;

    const course = await dbConn.query(courseQuery, [roll, courseid]);

    if (course.length === 0) {
        return response.status(404).json({
            error: `Student ${roll} does not take a course with id ${courseid}`,
        });
    }

    return response.json(course);
});

studentsRouter.get("/:roll/semesters/", async (request, response) => {
    let { roll } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const semestersQuery = `SELECT DISTINCT semester_number
        FROM takes 
        WHERE student_roll=?;`;

    const semesters = await dbConn.query(semestersQuery, [roll]);

    return response.json(semesters);
});

studentsRouter.get(
    "/:roll/semesters/:semester_number",
    async (request, response) => {
        let { roll, semester_number } = request.params;

        if (!roll) {
            return response.status(400).json({
                error: "roll missing in request parameters",
            });
        }

        roll = roll.trim();

        if (!roll instanceof Number || roll % 1 != 0) {
            return response.status(400).json({
                error: "roll must be an integer",
            });
        }

        if (!semester_number) {
            return response.status(400).json({
                error: "semester_number missing in request parameters",
            });
        }

        semester_number = semester_number.trim();

        if (!semester_number instanceof Number || semester_number % 1 != 0) {
            return response.status(400).json({
                error: "semester_number must be an integer",
            });
        }

        const studentWithRoll = await dbConn.query(
            "SELECT * FROM student WHERE roll=?",
            [roll]
        );

        if (studentWithRoll.length === 0) {
            return response.status(404).json({
                error: "A student with that roll number does not exist",
            });
        }

        const coursesQuery = `SELECT grade,
        course_id, course.title, course.code, 
        course.dept_name course_dept_name,
        session_id, session.start_year, session.season,
        taught_by instructor_id, instructor.name instructor_name,
        instructor.designation instructor_designation,
        instructor.dept_name instructor_dept_name
        FROM takes 
        JOIN student ON student.roll = student_roll 
        JOIN course ON course.id = course_id
        JOIN session ON session.id = session_id
        JOIN instructor ON instructor.id = taught_by
        WHERE roll=? AND semester_number=?;`;

        const courses = await dbConn.query(coursesQuery, [
            roll,
            semester_number,
        ]);

        if (courses.length == 0) {
            return response.status(404).json({
                error: `Student ${roll} takes no courses in semester ${semester_number}`,
            });
        }

        return response.json(courses);
    }
);

studentsRouter.get("/:roll/cpi", async (request, response) => {
    let { roll } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const cpiQuery = `WITH max_grades(course_id, grade) AS (
        SELECT course_id, MAX(grade)
        FROM takes
        WHERE student_roll=?
        GROUP BY course_id
        ) SELECT AVG(grade) AS cpi FROM max_grades;`;

    const [cpi] = await dbConn.query(cpiQuery, [roll]);

    if (!cpi["cpi"]) {
        return response.status(404).json({
            error: `Student ${roll} takes no courses`,
        });
    }

    return response.json(cpi);
});

studentsRouter.get("/:roll/spi/:semester_number", async (request, response) => {
    let { roll, semester_number } = request.params;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    roll = roll.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    if (!semester_number) {
        return response.status(400).json({
            error: "semester_number missing in request parameters",
        });
    }

    semester_number = semester_number.trim();

    if (!semester_number instanceof Number || semester_number % 1 != 0) {
        return response.status(400).json({
            error: "semester_number must be an integer",
        });
    }

    const spiQuery = `SELECT AVG(grade) AS spi
    FROM takes 
    WHERE student_roll=? AND semester_number=?;`;

    const [spi] = await dbConn.query(spiQuery, [roll, semester_number]);

    if (!spi["spi"]) {
        return response.status(404).json({
            error: `Student ${roll} takes no courses in semester ${semester_number}`,
        });
    }

    return response.json(spi);
});

studentsRouter.put("/:roll", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { roll } = request.params;
    let { name, email, programme_id, year_of_joining } = request.body;

    if (!roll) {
        return response.status(400).json({
            error: "roll missing in request parameters",
        });
    }

    if (!name) {
        return response.status(400).json({
            error: "name missing in request body",
        });
    }

    if (!email) {
        return response.status(400).json({
            error: "email missing in request body",
        });
    }

    if (!programme_id) {
        return response.status(400).json({
            error: "programme_id missing in request body",
        });
    }

    if (!year_of_joining) {
        return response.status(400).json({
            error: "year_of_joining missing in request body",
        });
    }

    roll = roll.trim();
    name = name.trim();
    email = email.trim();
    programme_id = programme_id.trim();
    year_of_joining = year_of_joining.trim();

    if (!roll instanceof Number || roll % 1 != 0) {
        return response.status(400).json({
            error: "roll must be an integer",
        });
    }

    if (!validator.validate(email)) {
        return response.status(400).json({
            error: "Invalid email",
        });
    }

    if (name.length < 2 || name.length > 100) {
        return response.status(400).json({
            error: "name must be from 2 to 100 characters long",
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        !year_of_joining instanceof Number ||
        year_of_joining % 1 != 0 ||
        !(1950 <= year_of_joining <= currentYear)
    ) {
        return response.status(400).json({
            error: `year_of_joining must be an integer from 1950 to ${currentYear}`,
        });
    }

    if (!programme_id instanceof Number || programme_id % 1 != 0) {
        return response.status(400).json({
            error: "programme_id must be an integer",
        });
    }

    const studentWithRoll = await dbConn.query(
        "SELECT * FROM student WHERE roll=?",
        [roll]
    );

    if (studentWithRoll.length === 0) {
        return response.status(404).json({
            error: "A student with that roll number does not exist",
        });
    }

    const programme = await dbConn.query("SELECT * FROM programme WHERE id=?", [
        programme_id,
    ]);
    if (programme.length === 0) {
        return response.status(400).json({
            error: "Invalid programme_id",
        });
    }

    await dbConn.query(
        "UPDATE student SET name=?, email=?, programme_id=?, year_of_joining=? WHERE roll=?",
        [name, email, programme_id, year_of_joining, roll]
    );
    return response.status(200).end();
});

studentsRouter.delete("/:roll", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { roll } = request.params;
    await dbConn.query("DELETE FROM student WHERE roll=?", [roll]);
    return response.status(204).end();
});

module.exports = studentsRouter;
