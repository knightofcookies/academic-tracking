CREATE TABLE takes (
    student_roll INT NOT NULL,
    course_id INT NOT NULL,
    grade INT NOT NULL,
    semester_number INT NOT NULL,
    taught_by INT NOT NULL,
    FOREIGN KEY (student_roll) REFERENCES student(roll) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (taught_by) REFERENCES teaches(id) ON DELETE CASCADE,
    PRIMARY KEY (student_roll, course_id, taught_by)  
);