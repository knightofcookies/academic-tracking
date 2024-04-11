import React, { useEffect, useState } from 'react'
import services from '../services/admin'
import { CssBaseline } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import CardAnalytics from './CardAnalytics';
import '../styles/InstructorPage.css'
import Instructor from '../assets/instructorImage.png';
import { useNavigate } from 'react-router-dom';

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));
  useEffect(() => {
    services.setToken(user?.token);
    services
            .getAllInstructors()
            .then((data) => {
                setInstructors(data);
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Instructors:", error)
            );
    
  }, [])

  const handleClick = (id) => {
    console.log(id);
    navigate(`/analytics/instructors/instructor_page/${id}`);
  }
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <ErrorMessage errorMessage={errorMessage} />
      <div className='container-instructor'>
        {instructors.map(instructor => (
          <div key={instructor.id} onClick = {() => handleClick(instructor.id)}><CardAnalytics title = {instructor.name} subTitle = {instructor.designation} image_src = {Instructor}/></div>
        ))}
      </div>
    </div>
  )
}
