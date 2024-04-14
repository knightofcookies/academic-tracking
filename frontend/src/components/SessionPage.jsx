import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import CardAnalytics from "./CardAnalytics";
import Grid from "@mui/material/Grid";
import services from "../services/admin";
import Department from "../assets/department_image.png";
import "../styles/DepartmentPage.css";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

export default function SessionPage() {
    const [sessions, setSessions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("loggedAcademicTrackingAdmin") ||
            localStorage.getItem("loggedAcademicTrackingUser")
    );
    useEffect(() => {
        services.setToken(user.token);
        services
            .getAllSessions()
            .then((data) => setSessions(data))
            .catch((error) => setErrorMessage(error));
    }, []);

    const handleClick = async (sessionId) => {
        navigate(`/analytics/session/${sessionId}`);
    }

    return (
        <SideBar>
            <ErrorMessage errorMessage={errorMessage} />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
            >
                {sessions.map((session) => (
                    <Grid item xs={2} sm={4} md={4} key={session.id} onClick={ () => handleClick(session.id)}>
                        {/* <Item><CardAnalytics title={department.name}/></Item> */}
                        <CardAnalytics
                            title={`${session.start_year} ${session.season.toUpperCase()}`}
                            image_src={Department}
                        />
                    </Grid>
                ))}
            </Grid>
        </SideBar>
    );
}
