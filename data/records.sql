-- session
INSERT INTO session (start_year, season) VALUES
('2022', 'Monsoon'),
('2022', 'Winter'),
('2023', 'Monsoon'),
('2023', 'Winter'),
('2024', 'Monsoon'),
('2024', 'Winter'),
('2025', 'Monsoon'),
('2025', 'Winter'),
('2026', 'Monsoon'),
('2026', 'Winter');

-- department
INSERT INTO department (name) VALUES
('CSE'),
('ECE');

-- programme
INSERT INTO programme (dept_name, degree, name) VALUES
('CSE', 'B.Tech.', 'Computer Science and Engineering'),
('CSE', 'M.Tech.', 'Computer Science and Engineering'),
('CSE', 'Ph.D.', 'Computer Science and Engineering'),
('ECE', 'B.Tech.', 'Electronics and Communication Engineering'),
('ECE', 'M.Tech.', 'Electronics and Communication Engineering'),
('ECE', 'Ph.D.', 'Electronics and Communication Engineering');

-- instructor
INSERT INTO instructor (name, designation, dept_name) VALUES
('John Doe', 'Professor', 'CSE'),
('Jane Smith', 'Assistant Professor', 'CSE'),
('Alice Johnson', 'Associate Professor', 'CSE'),
('Bob Brown', 'Lecturer', 'CSE'),
('Emily Davis', 'Professor', 'ECE'),
('Michael Wilson', 'Associate Professor', 'ECE'),
('Sarah Miller', 'Assistant Professor', 'ECE'),
('David Garcia', 'Professor', 'ECE');

-- student
INSERT INTO student (roll, name, email, programme_id, year_of_joining) VALUES
(2201001, 'Alex Johnson', 'alex@iiit.ac.in', 1, 2022),
(2201002, 'Emma Davis', 'emma@iiit.ac.in', 1, 2022),
(2201003, 'James Wilson', 'james@iiit.ac.in', 1, 2022),
(2201004, 'Olivia Brown', 'olivia@iiit.ac.in', 1, 2022),
(2201005, 'William Garcia', 'william@iiit.ac.in', 1, 2022),
(2202001, 'Sophia Miller', 'sophia@iiit.ac.in', 2, 2022),
(2202002, 'Daniel Martinez', 'daniel@iiit.ac.in', 2, 2022),
(2203001, 'Ava Anderson', 'ava@iiit.ac.in', 3, 2022),
(2203002, 'Alexander Taylor', 'alexander@iiit.ac.in', 3, 2022),
(2203003, 'Mia Thomas', 'mia@iiit.ac.in', 3, 2022);

-- course
INSERT INTO course (title, code, dept_name) VALUES
('Data Structures', 'CS101', 'CSE'),
('Digital Electronics', 'EC101', 'ECE'),
('Algorithms', 'CS201', 'CSE'),
('Communication Systems', 'EC201', 'ECE'),
('Database Management', 'CS301', 'CSE'),
('Embedded Systems', 'EC301', 'ECE'),
('Machine Learning', 'CS401', 'CSE'),
('VLSI Design', 'EC401', 'ECE'),
('Computer Networks', 'CS501', 'CSE'),
('Signal Processing', 'EC501', 'ECE');

-- takes
INSERT INTO takes (student_roll, course_id, session_id, grade, semester_number, taught_by) VALUES
(2201001, 1, 1, 8, 1, 1),
(2201002, 2, 1, 9, 1, 2),
(2201003, 3, 1, 9, 1, 3),
(2201004, 4, 1, 10, 1, 4),
(2201005, 5, 1, 8, 1, 1),
(2202001, 6, 1, 9, 1, 2),
(2202002, 7, 1, 9, 1, 3),
(2203001, 8, 1, 10, 1, 4),
(2203002, 9, 1, 8, 1, 1),
(2203003, 10, 1, 9, 1, 2);

-- teaches
INSERT INTO teaches (instructor_id, course_id, session_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(1, 9, 1),
(2, 10, 1);

-- user
INSERT INTO user (username, email, password_hash) VALUES
('user1', 'user1@iiit.ac.in', 'password1'),
('user2', 'user2@iiit.ac.in', 'password2'),
('user3', 'user3@iiit.ac.in', 'password3');

-- administrator
INSERT INTO administrator (username, email, password_hash, security_question, security_answer_hash) VALUES
('admin1', 'admin1@iiit.ac.in', 'admin_password1', 'What is your favorite color?', 'answer_hash1'),
('admin2', 'admin2@iiit.ac.in', 'admin_password2', 'What is your pet\'s name?', 'answer_hash2');
