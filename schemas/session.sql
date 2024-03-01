CREATE TABLE session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year_from YEAR NOT NULL,
    year_to YEAR NOT NULL,
    season VARCHAR(50) NOT NULL
);