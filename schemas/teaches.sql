CREATE TABLE teaches (
    instructor_id INT NOT NULL,
    course_id INT NOT NULL,
    session_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructor(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE,
    PRIMARY KEY (instructor_id, course_id, session_id)
);