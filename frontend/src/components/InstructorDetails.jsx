import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { CssBaseline } from '@mui/material';
import { Typography } from '@mui/material';
import services from '../services/admin'
import ResponsiveAppBar from './ResponsiveAppBar';
import CardAnalytics from './CardAnalytics';
import '../styles/InstructorDetails.css';
import Book from '../assets/book_image.png';

export default function InstructorDetails() {
  const { id }= useParams();
  const [instructor, setInstructor] = useState([]);
  const [details, setDetails] = useState([]);
  const user = useLoaderData();
  useEffect(() => {
    services.setToken(user.admin.token);
    services
          .getInstructor(id)
          .then((data) => {
            setInstructor(data);
            console.log(data);
          })
          .catch((error) => console.error("Error fetching Instructor:", error));
    services
          .getCourseInstructor(id)
          .then((data) => {
            setDetails(data);
            console.log(data);
          }) 
          .catch((error) => console.error("Error fetching Courses:", error));
  }, [])
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <Typography variant="h4" component="h4" className='typography-detail'>
        Courses offered by Dr {instructor.name}
      </Typography>
      <div className='container-instructor-detail'>
        {details.map(detail => (
          <div key={detail.course_id}><CardAnalytics title = {`${detail.course_code} ${detail.course_title}`} subTitle = {`${detail.start_year} ${detail.season}`} image_src = {Book}/></div>
        ))}
      </div>
    </div>
  )
}
