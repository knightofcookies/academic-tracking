CREATE TABLE takes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester_number INT NOT NULL,
    FOREIGN KEY student_id REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id),
);