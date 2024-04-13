import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import adminServices from '../services/admin';

const AddTakesPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSession, setSelectedSession] = useState("");

    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin")
    );

    useEffect(() => {
        adminServices.setToken(user.token);
        adminServices
            .getAllCourses()
            .then((data) => {
                setCourses(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching Courses:", error));
        adminServices
            .getAllSessions()
            .then((data) => {
                setSessions(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching Sessions:", error));
        adminServices
            .getAllInstructors()
            .then((data) => {
                setInstructors(data);
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Instructors:", error)
            );
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const roll = formData.get("roll");
        const grade = formData.get("grade");
        const semester_number = formData.get("semester_number");
        if (!roll ||
            !selectedCourse ||
            !selectedSession ||
            !grade ||
            !semester_number ||
            !selectedInstructor
        ) {
            setErrorMessage("Missing required fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        const courseId = courses.find(
            (course) => course.code === selectedCourse
        )?.id;

        const sessionDetails = selectedSession.split(" ");
        const sessionId = sessions.find(
            (session) =>
                session.season == sessionDetails[0].toLowerCase() &&
                session.start_year == sessionDetails[1]
        )?.id;

        const instructorId = instructors.find(
            (instructor) => instructor.name === selectedInstructor
        )?.id;


        const credentials = {
            course_id: courseId,
            session_id: sessionId,
            instructor_id: instructorId,
            semester_number: semester_number,
            grade: grade
        };

        adminServices.setToken(user?.token);
        adminServices
            .addTakes(roll, credentials)
            .then(() => {
                alert("Data Added Successfully!!!!!");
                event.target.reset();
                setSelectedCourse("");
                setSelectedInstructor("");
                setSelectedSession("");
            })
            .catch((error) => {
                if (error.message) {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                } else {
                    setErrorMessage(
                        "Error logging in : Please check the console for more details"
                    );
                    console.error(error);
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            });
    };

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Box display="flex">
                <Box flexGrow={1}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "85vh",
                        }}
                    >
                        <Paper style={{ padding: 24, borderRadius: 8 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Add Data
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
                                    <TextField
                                        label="Roll Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="roll"
                                        name="roll"
                                    />
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="course">
                                            Courses
                                        </InputLabel>
                                        <Select
                                            labelId="course"
                                            value={selectedCourse}
                                            onChange={(event) =>
                                                setSelectedCourse(
                                                    event.target.value
                                                )
                                            }
                                            label="Courses"
                                        >
                                            {courses.map((course) => (
                                                <MenuItem
                                                    key={course.id}
                                                    value={course.code}
                                                >
                                                    {`${course.code} ${course.title}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="session">
                                            Session
                                        </InputLabel>
                                        <Select
                                            labelId="session"
                                            value={selectedSession}
                                            onChange={(event) =>
                                                setSelectedSession(
                                                    event.target.value
                                                )
                                            }
                                            label="Session"
                                        >
                                            {sessions.map((session) => (
                                                <MenuItem
                                                    key={session.id}
                                                    value={`${session.season.toUpperCase()} ${session.start_year
                                                        }`}
                                                >
                                                    {`${session.season.toUpperCase()} ${session.start_year
                                                        }`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Grade"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="grade"
                                        name="grade"
                                    />
                                    <TextField
                                        label="Semester Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        id="semester_number"
                                        name="semester_number"
                                    />
                                    <FormControl
                                        style={{ marginTop: 16, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="instructor">
                                            Instructors
                                        </InputLabel>
                                        <Select
                                            labelId="instructor"
                                            value={selectedInstructor}
                                            onChange={(event) =>
                                                setSelectedInstructor(
                                                    event.target.value
                                                )
                                            }
                                            label="Instructors"
                                        >
                                            {instructors.map((instructor) => (
                                                <MenuItem
                                                    key={instructor.id}
                                                    value={instructor.name}
                                                >
                                                    {instructor.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: 24 }}
                                        fullWidth
                                        type="submit"
                                    >
                                        Add Data
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </Box>
            </Box>
        </SideBar>
    );
};

export default AddTakesPage;