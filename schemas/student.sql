CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roll INT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    programme_id INT NOT NULL,
    cpi NUMERIC(4, 2) NOT NULL
    FOREIGN KEY (programme_id) REFERENCES programme(id)
);