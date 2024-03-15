CREATE TABLE student (
    roll INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    programme_id INT NOT NULL,
    year_of_joining INT NOT NULL,
    FOREIGN KEY (programme_id) REFERENCES programme(id) ON DELETE CASCADE
);