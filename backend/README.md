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

An existing MySQL installation with the databases `MYSQL_DATABASE` and `MYSQL_TEST_DATABASE` is required.
All the tables in `schemas` need to be created manually.

## Creating the first administrator

Since an administrator can be created only by another administrator, the first administrator needs to be manually created.

To create an administrator without using the API, run `node utils\create_admin.js` from the current (`backend`) directory and provide the requested values.
