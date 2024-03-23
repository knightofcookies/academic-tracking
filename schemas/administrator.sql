CREATE TABLE administrator (
	username VARCHAR(25) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
    security_question VARCHAR(250) NOT NULL,
    security_answer_hash CHAR(60) NOT NULL
);