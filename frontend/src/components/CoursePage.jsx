import React, { useEffect, useState } from 'react'
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import adminServices from '../services/admin';
import CardAnalytics from './CardAnalytics';
import Grid from '@mui/material/Grid';
import Course from '../assets/course_image.png';
import '../styles/CoursePage.css'; 

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));
  
  useEffect(() => {
    adminServices.setToken(user?.token);
    adminServices
            .getAllCourses()
            .then((data) => {
                setCourses(data);
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Courses:", error)
            );
    
  }, [])

  return (
      <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="grid-container">
              {courses.map(course => (
              <Grid item xs={2} sm={4} md={4} key={course.id}>
                <CardAnalytics title = {course.code} 
                              subTitle = {course.title} 
                              image_src = {Course}/>
                </Grid>
                ))}
        </Grid>
      </SideBar>
  )
};

export default CoursePage;
