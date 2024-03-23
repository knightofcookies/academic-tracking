const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const adminRouter = require("./controllers/admin");

const app = express();

logger.info(`Server running on port ${config.PORT}`);

app.use(cors());
// app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/users", middleware.userExtractor, usersRouter);
app.use("/api/admin", middleware.adminExtractor, adminRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
