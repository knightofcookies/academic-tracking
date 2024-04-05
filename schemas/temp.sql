USE academic_tracking;
SELECT * FROM course;
DESCRIBE course;a
INSERT INTO course (title, code, dept_name) VALUES 
	("Artificial Intelligence", "CS235", "CSE"),
    ("Database Management Systems", "CS240", "CSE"),
    ("Operating Systems", "CS231", "CSE");
SELECT * FROM instructor;
INSERT INTO course (title, code, dept_name) VALUES 
	("Artificial Intelligence Lab", "CS236", "CSE"),
    ("Database Management Systems Lab", "CS241", "CSE"),
    ("Operating Systems Lab", "CS232", "CSE");
INSERT INTO instructor (name, designation, dept_name) VALUES
	("Sumit Mishra", "Assistant Professor", "CSE"),
	("Upasana Talukdar", "Assistant Professor", "CSE"),
	("Rohit Tripathi", "Assistant Professor", "CSE");
SELECT * FROM session;
INSERT INTO teaches (instructor_id, session_id, course_id) VALUES
	(1, 2, 2),
    (1, 2, 5),
    (2, 2, 1),
    (2, 2, 4),
    (3, 2, 3),
    (3, 2, 6);
SELECT instructor.name instructor_name, instructor.designation instructor_designation, instructor.dept_name instructor_dept_name, 
	session.start_year, session.season, 
    course.code course_code, course.title course_title, course.dept_name course_dept_name 
    FROM teaches JOIN session ON session.id = teaches.session_id 
    JOIN instructor ON instructor.id = teaches.instructor_id 
    JOIN course ON course.id = teaches.course_id
    WHERE instructor.id=1;
UPDATE teaches SET session_id=3 WHERE session_id=2;
SELECT session_id, start_year, season, 
    instructor_id, name instructor_name, designation instructor_designation, instructor.dept_name instructor_dept_name 
    FROM teaches 
    JOIN session ON session.id = session_id 
    JOIN course ON course_id = course.id 
    JOIN instructor ON instructor_id = instructor.id WHERE course_id=1;
    
SELECT student.roll, student.name, student.email, student.programme_id, 
	programme.degree, programme.name programme_name, programme.dept_name,
    taught_by instructor_id, instructor.name instructor_name, instructor.designation instructor_designation, instructor.dept_name instructor_dept_name
FROM takes 
JOIN student ON student.roll = student_roll 
JOIN instructor ON taught_by = instructor.id 
JOIN course ON course_id = course.id
JOIN session ON session_id = session.id
JOIN programme ON student.programme_id = programme.id
WHERE course_id=? AND session_id=?;

INSERT INTO takes (student_roll, taught_by, session_id, course_id, grade, semester_number) VALUES 
	(2201017, 1, 3, 3, 10, 4),
    (2201024, 1, 3, 2, 10, 4);
		
SELECT semester_number, grade,
course_id, course.title, course.code, 
course.dept_name course_dept_name,
session_id, session.start_year, session.season,
taught_by instructor_id, instructor.name instructor_name,
instructor.designation instructor_designation,
instructor.dept_name instructor_dept_name
FROM takes 
JOIN student ON student.roll = student_roll 
JOIN course ON course.id = course_id
JOIN session ON session.id = session_id
JOIN instructor ON instructor.id = taught_by
WHERE roll=2201017
ORDER BY semester_number;

SELECT DISTINCT semester_number FROM takes WHERE student_roll=2201024;

SELECT course_id, course.title, course.code, 
course.dept_name course_dept_name,
instructor_id, name, designation,
instructor.dept_name instructor_dept_name 
FROM teaches 
JOIN instructor ON instructor.id = instructor_id 
JOIN course ON course.id = course_id 
JOIN session ON session.id = session_id
WHERE session_id=3;

WITH max_grades(course_id, grade) AS (
	SELECT course_id, MAX(grade)
    FROM takes
    WHERE student_roll=2201017
    GROUP BY course_id
) SELECT AVG(grade) AS cpi FROM max_grades;