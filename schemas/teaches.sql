CREATE TABLE takes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instructor_id INT NOT NULL,
    course_id INT NOT NULL,
    semester_number INT NOT NULL,
    FOREIGN KEY instructor_id REFERENCES instructor(id),
    FOREIGN KEY (course_id) REFERENCES course(id),
);