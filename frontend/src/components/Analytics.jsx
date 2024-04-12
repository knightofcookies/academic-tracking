import { useEffect, useState } from 'react'
import CardAnalytics from './CardAnalytics'
import adminServices from '../services/admin'
import Department from '../assets/department_image.png'
import Instructor from '../assets/instructor_image.png'
import Student from '../assets/student_image.jpeg'
import Book from '../assets/book_icon.png'
import Session from '../assets/session_image.png'
import Programme from '../assets/programme_image.png'
import { useNavigate } from 'react-router-dom'
import '../styles/Analytics.css'
import CustomThemeProvider from './CustomThemeProvider';

export default function Analytics() {
  const navigate = useNavigate();
  const [departmentCount, setDepartmentCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [programmeCount, setProgrammeCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));

  useEffect(() => {
    adminServices.setToken(user?.token);
    adminServices.getDepartmentCount()
      .then((count) => {
        setDepartmentCount(count);
      })
      .catch(error => console.error("Error fetching programmes:", error));
    adminServices.getInstructorCount()
      .then((instructorCount) => {
        setInstructorCount(instructorCount);
      })
      .catch(error => console.error('Error getting instructors count', error));
    adminServices.getStudentCount()
      .then((studentCount) => {
        setStudentCount(studentCount);
      })
      .catch(error => console.error('Error getting students count', error));
    adminServices.getCourseCount()
      .then((courseCount) => {
        setCourseCount(courseCount);
      })
      .catch(error => console.error('Error getting students count', error));
    adminServices.getProgrammesCount()
      .then((programmeCount) => {
        setProgrammeCount(programmeCount);
      })
      .catch(error => console.error('Error getting students count', error));
    adminServices.getSessionCount()
      .then((sessionCount) => {
        setSessionCount(sessionCount);
      })
      .catch((error) => {
        console.error('Error fetching Session Count', error);
      })
  }, [user])

  return (
    <CustomThemeProvider>
      <div className='container'>
        <div><CardAnalytics title={departmentCount} subTitle={"Department"} image_src={Department} /></div>
        <div onClick={() => navigate("/analytics/instructors")}><CardAnalytics title={instructorCount} subTitle={"Faculty"} image_src={Instructor} /></div>
        <div><CardAnalytics title={studentCount} subTitle={"Student"} image_src={Student} /></div>
        <div><CardAnalytics title={courseCount} subTitle={"Courses Offered"} image_src={Book} /></div>
        <div><CardAnalytics title={programmeCount} subTitle={"Programmes Offered"} image_src={Programme} /></div>
        <div><CardAnalytics title={sessionCount} subTitle={"Session Offered"} image_src={Session} /></div>
      </div>
    </CustomThemeProvider>
  )
}
