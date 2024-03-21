INSERT INTO session (start_year, season) VALUES (2023, "Winter");
INSERT INTO session (start_year, season) VALUES (2023, "Monsoon");

INSERT INTO department (name) VALUES ("Computer Science and Engineering");

INSERT INTO programme (dept_name, degree, name) VALUES ("Computer Science and Engineering", "B. Tech.", "Computer Science and Engineering");

INSERT INTO student (roll, name, email, programme_id, year_of_joining) VALUES
	(2201011, "Alan Turing", "alan.turing@abc.edu", 1, 2022),
    (2201061, "Nikola Tesla", "nikola.tesla@abc.edu", 1, 2022);
