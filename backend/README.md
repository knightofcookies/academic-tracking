# Backend for Academic Performance Tracker

## Prerequisites to run

Create a file named `.env` file in the `backend` directory with the following contents
```
PORT=3653
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=academic_tracking
MYSQL_TEST_DATABASE=test_academic_tracking
SECRET = <secret key>
```

Use `require("crypto").randomBytes(32).toString("hex")` to generate `SECRET` for JWT.

MySQL is required with the tables in `schemas` created in the database specified in `.env`.