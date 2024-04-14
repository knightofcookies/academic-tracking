import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import services from '../services/admin'
import CardAnalytics from './CardAnalytics';
import '../styles/InstructorDetails.css';
import Book from '../assets/book_image.png';
import SideBar from './SideBar';

export default function CourseDetails() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState([]);
  const [course, setCourse] = useState([]);
  const [department, setDepartment] = useState([]);
  const [details, setDetails] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));

  useEffect(() => {
    services.setToken(user.token);
    services
      .getDetailsOfCourse(id)
      .then((data) => {
        setDetails(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching details of Course:", error));
    services
      .getCourse(id)
      .then((course) => {
        setCourse(course);
        console.log(course);
        
        services
            .getDepartment(course.department_id)
            .then ((department) => {
                setDepartment(department);
                console.log(department);
            })
            .catch((error) => console.error("Error fetching Department:", error));
      })
      .catch((error) => console.error("Error fetching Course:", error));
  }, []);

  

  return (
    <SideBar>
      <Typography variant="h4" component="h4" className='typography-detail'>
        Details of {`${course.code} ${course.title}`}
      </Typography>
      <div className='container-instructor-detail'>
        {details.map(detail => (
          <div key={`${detail.session_id} ${id} ${detail.instructor_id}`}><CardAnalytics title={`${detail.instructor_name} ${department.name}`} subTitle={`${detail.start_year} ${detail.season.toUpperCase()}`} image_src={Book} /></div>
        ))}
      </div>
    </SideBar>
  );
}
