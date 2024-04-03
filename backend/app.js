"use strict";

const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const adminRouter = require("./controllers/admin");
const loginRouter = require("./controllers/login");
const programmesRouter = require("./controllers/programmes");
const departmentsRouter = require("./controllers/departments");
const coursesRouter = require("./controllers/courses");
const instructorsRouter = require("./controllers/instructors");
const studentsRouter = require("./controllers/students");
const sessionsRouter = require("./controllers/sessions");
const signupRouter = require("./controllers/signup");

const app = express();

logger.info(`Server running on port ${config.PORT}`);

app.use(cors());
// app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/users", middleware.userAdminExtractor, usersRouter);
app.use("/api/admin", middleware.adminExtractor, adminRouter);
app.use("/api/login", loginRouter);
app.use("/api/programmes", middleware.userAdminExtractor, programmesRouter);
app.use("/api/departments", middleware.userAdminExtractor, departmentsRouter);
app.use("/api/courses", middleware.userAdminExtractor, coursesRouter);
app.use("/api/sessions", middleware.userAdminExtractor, sessionsRouter);
app.use("/api/instructors", middleware.userAdminExtractor, instructorsRouter);
app.use("/api/students", middleware.userAdminExtractor, studentsRouter);
app.use("/api/signup", signupRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
