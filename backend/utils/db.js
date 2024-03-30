"use strict";

const mysql = require("mysql");
const config = require("./config");
const util = require("util");

// TODO Use connection pooling
// TODO https://www.npmjs.com/package/mysql-error-keys

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MYSQL database");
});

connection.on("error", function (err) {
    console.error(err.code);
});

connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;
