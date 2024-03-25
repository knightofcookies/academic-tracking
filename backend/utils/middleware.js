const logger = require("./logger");
const jwt = require("jsonwebtoken");
const dbConn = require("./db");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message });
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    } else {
        request.token = null;
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.username) {
        return response.status(401).json({ error: "Token invalid" });
    }
    const user = await dbConn.query("SELECT * FROM user WHERE username=?", [
        decodedToken.username,
    ]);
    if (user.length !== 0) {
        request.user = user[0];
    } else {
        throw Error("Token invalid");
    }
    next();
};

const adminExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.username) {
        return response.status(401).json({ error: "Token invalid" });
    }
    const administrator = await dbConn.query(
        "SELECT * FROM administrator WHERE username=?",
        [decodedToken.username]
    );
    if (administrator.length !== 0) {
        request.administrator = administrator[0];
    } else {
        throw Error("Token invalid");
    }

    next();
}; // TODO Check if admin only routes can be accessed by user and vice versa

const userAdminExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.username) {
        return response.status(401).json({ error: "Token invalid" });
    }
    const administrator = await dbConn.query(
        "SELECT * FROM administrator WHERE username=?",
        [decodedToken.username]
    );
    if (administrator.length !== 0) {
        request.administrator = administrator[0];
    } else {
        const user = await dbConn.query("SELECT * FROM user WHERE username=?", [
            decodedToken.username,
        ]);
        if (user.length !== 0) {
            request.user = user[0];
        } else {
            throw Error("Token invalid");
        }
    }
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    adminExtractor,
    userAdminExtractor,
};
