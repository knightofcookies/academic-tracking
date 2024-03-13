const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MYSQL database');
});

module.exports = connection;
