CREATE TABLE semester_result (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    semester_number INT NOT NULL,
    programme_id INT NOT NULL
    spi NUMERIC(4, 2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (programme_id) REFERENCES programme(id)
);