import React, { useEffect, useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import ErrorMessage from "./ErrorMessage";
import SideBar from "./SideBar";
import { Box } from "@mui/system";
import adminServices from "../services/admin";

const AddTeachesPage = () => {
    const [securityQuestion, setSecurityQuestion] = useState("");
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

    const handleSecurityQuestionChange = (event) => {
        setSecurityQuestion(event.target.value);
    };

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
            .getAllInstructors()
            .then((data) => {
                setInstructors(data);
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Instructors:", error)
            );
        adminServices
            .getAllSessions()
            .then((data) => {
                setSessions(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching Sessions:", error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!selectedCourse || !selectedInstructor || !selectedSession) {
            setErrorMessage("Missing required fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        const sessionDetails = selectedSession.split(" ");
        const instructorId = instructors.find(
            (instructor) => instructor.name === selectedInstructor
        )?.id;
        const courseId = courses.find(
            (course) => course.code === selectedCourse
        )?.id;
        const sessionId = sessions.find(
            (session) =>
                session.season == sessionDetails[0].toLowerCase() &&
                session.start_year == sessionDetails[1]
        )?.id;

        const credentials = {
            course_id: courseId,
            session_id: sessionId,
        };

        adminServices.setToken(user?.token);
        adminServices
            .addTeaches(instructorId, credentials)
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
        <div>
            <ErrorMessage errorMessage={errorMessage} />
            <Box display="flex">
                <SideBar />
                <Box flexGrow={1}>
                    <ResponsiveAppBar />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            backgroundImage:
                                "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)",
                        }}
                    >
                        <CssBaseline />
                        <Paper style={{ padding: 24, borderRadius: 8 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Create Admin
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>
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
                                                    value={`${session.season.toUpperCase()} ${
                                                        session.start_year
                                                    }`}
                                                >
                                                    {`${session.season.toUpperCase()} ${
                                                        session.start_year
                                                    }`}
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
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default AddTeachesPage;
