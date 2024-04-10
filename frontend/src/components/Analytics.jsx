import React, { useEffect, useState } from 'react'
import CardAnalytics from './CardAnalytics'
import adminServices from '../services/admin'
import Department from '../assets/department_image.png'
import Instructor from '../assets/instructor_image.png'
import Student from '../assets/student_image.jpeg'
import Book from '../assets/book_icon.png'
import Session from '../assets/session_image.png'
import Programme from '../assets/programme_image.png'
import '../styles/Analytics.css'

export default function Analytics() {
  const [departmentCount, setDepartmentCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [programmeCount, setProgrammeCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin"));

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
  }, [])

  return (
    <div className='container'>
      <div><CardAnalytics count = {departmentCount} title = {"Department"} image_src = {Department} /></div>
      <div><CardAnalytics count = {instructorCount} title = {"Faculty"} image_src = {Instructor}/></div>
      <div><CardAnalytics count = {studentCount} title = {"Student"} image_src = {Student}/></div>
      <div><CardAnalytics count = {courseCount} title = {"Courses Offered"} image_src = {Book}/></div>
      <div><CardAnalytics count = {programmeCount} title = {"Programmes Offered"} image_src = {Programme}/></div>
      <div><CardAnalytics count = {sessionCount} title = {"Session Offered"} image_src = {Session}/></div>
    </div>
  )
}
