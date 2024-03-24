const sessionsRouter = require("express").Router();
const dbConn = require("../utils/db");

sessionsRouter.get("/", async (request, response) => {
    const sessions = await dbConn.query("SELECT * FROM session");
    return response.json(sessions);
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

    await dbConn.query(
        "INSERT INTO session (start_year, season) VALUES (?, ?)",
        [start_year, season]
    );
    return response.status(201).end();
});

module.exports = sessionsRouter;
