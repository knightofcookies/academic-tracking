import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import services from '../services/admin'
import CardAnalytics from './CardAnalytics';
import '../styles/InstructorDetails.css';
import Book from '../assets/book_image.png';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

export default function InstructorDetails() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState([]);
  const [details, setDetails] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));
  const navigate = useNavigate();


  useEffect(() => {
    services.setToken(user.token);
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
  }, []);

  const handleClick = (id) => {
    navigate(`/analytics/course/${id}`);
  }

  return (
    <SideBar>
      <Typography variant="h4" component="h4" className='typography-detail'>
        Courses offered by Dr {instructor.name}
      </Typography>
      <div className='container-instructor-detail'>
        {details.map(detail => (
          <div key={detail.course_id} onClick={() => handleClick(detail.course_id)}><CardAnalytics title={`${detail.course_code} ${detail.course_title}`} subTitle={`${detail.start_year} ${detail.season}`} image_src={Book} /></div>
        ))}
      </div>
    </SideBar>
  );
}
