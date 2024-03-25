const coursesRouter = require("express").Router();
const dbConn = require("../utils/db");

coursesRouter.get("/", async (request, response) => {
    const courses = await dbConn.query("SELECT * FROM course");
    return response.json(courses);
});

coursesRouter.post("/", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    let { dept_name, code, title } = request.body;

    if (!code) {
        return response.status(400).json({
            error: "code missing in request body",
        });
    }

    if (!title) {
        return response.status(400).json({
            error: "title missing in request body",
        });
    }

    if (!dept_name) {
        return response.status(400).json({
            error: "dept_name missing in request body",
        });
    }

    code = code.trim();
    title = title.trim();
    dept_name = dept_name.trim();

    if (!title || title.length < 2) {
        return response.status(400).json({
            error: "title cannot be less than 2 characters long",
        });
    }

    if (!code || code.length < 2) {
        return response.status(400).json({
            error: "code cannot be less than 2 characters long",
        });
    }

    if (!dept_name || dept_name.length < 2) {
        return response.status(400).json({
            error: "dept_name cannot be less than 2 characters long",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [dept_name]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid dept_name",
        });
    }

    const res = await dbConn.query(
        "INSERT INTO course (title, code, dept_name) VALUES (?, ?, ?)",
        [title, code, dept_name]
    );
    return response.status(201).json({
        id: res.insertId,
    });
});

coursesRouter.put("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    let { title, code, dept_name } = request.body;

    if (!code) {
        return response.status(400).json({
            error: "code missing in request body",
        });
    }

    if (!title) {
        return response.status(400).json({
            error: "title missing in request body",
        });
    }

    if (!dept_name) {
        return response.status(400).json({
            error: "dept_name missing in request body",
        });
    }

    code = code.trim();
    title = title.trim();
    dept_name = dept_name.trim();

    if (!title || title.length < 2) {
        return response.status(400).json({
            error: "title cannot be less than 2 characters long",
        });
    }

    if (!code || code.length < 2) {
        return response.status(400).json({
            error: "code cannot be less than 2 characters long",
        });
    }

    if (!dept_name || dept_name.length < 2) {
        return response.status(400).json({
            error: "dept_name cannot be less than 2 characters long",
        });
    }

    const department = await dbConn.query(
        "SELECT * FROM department WHERE name=?",
        [dept_name]
    );
    if (department.length === 0) {
        return response.status(400).json({
            error: "Invalid dept_name",
        });
    }

    await dbConn.query(
        "UPDATE course SET title=?, code=?, dept_name=? WHERE id=?",
        [title, code, dept_name, id]
    );
    return response.status(200).end();
});

coursesRouter.delete("/:id", async (request, response) => {
    if (!request.administrator) {
        return response.status(403).end();
    }

    const { id } = request.params;
    await dbConn.query("DELETE FROM course WHERE id=?", [id]);
    return response.status(204).end();
});

module.exports = coursesRouter;
