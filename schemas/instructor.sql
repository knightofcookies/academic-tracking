CREATE TABLE instructor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    dept_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (dept_name) REFERENCES department(name) ON DELETE CASCADE
);