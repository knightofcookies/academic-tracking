const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
// const middleware = require("./utils/middleware");
// const usersRouter = require("./controllers/users");
// const loginRouter = require("./controllers/login");
// const booksRouter = require("./controllers/books");
// const librariansRouter = require("./controllers/librarians");
// const managementRouter = require("./controllers/management");

const app = express();

// require("crypto").randomBytes(32).toString("hex") 

logger.info(`Server running on port ${config.PORT}`);

app.use(cors());
// app.use(express.static("dist"));
app.use(express.json());
// app.use(middleware.requestLogger);
// app.use(middleware.tokenExtractor);

// app.use("/api/users", usersRouter);
// app.use("/api/login", loginRouter);
// app.use("/api/books", middleware.userExtractor, booksRouter);
// app.use("/api/librarians", librariansRouter);
// app.use("/api/manage", middleware.librarianExtractor, managementRouter);

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;