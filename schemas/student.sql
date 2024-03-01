CREATE TABLE student (
    roll INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    programme_id INT NOT NULL,
    cpi NUMERIC(4, 2),
    FOREIGN KEY (programme_id) REFERENCES programme(id) ON DELETE CASCADE
);