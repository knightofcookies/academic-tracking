CREATE TABLE semester_result (
    student_roll INT NOT NULL,
    semester_number INT NOT NULL,
    session INT NOT NULL,
    spi NUMERIC(4, 2) NOT NULL,
    FOREIGN KEY (student_roll) REFERENCES student(roll) ON DELETE CASCADE,
    FOREIGN KEY (session) REFERENCES session(id) ON DELETE CASCADE,
    PRIMARY KEY (student_roll, semester_number, session)
);