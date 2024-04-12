import { useEffect, useState } from 'react'
import services from '../services/admin'
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import CardAnalytics from './CardAnalytics';
import '../styles/InstructorPage.css'
import Instructor from '../assets/instructorImage.png';
import { useNavigate } from 'react-router-dom';
import CustomThemeProvider from './CustomThemeProvider';

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // TODO Handle this
  const user = JSON.parse(
    localStorage.getItem("loggedAcademicTrackingAdmin") ||
    localStorage.getItem("loggedAcademicTrackingUser")
  );

  useEffect(() => {
    services.setToken(user?.token);
    services
      .getAllInstructors()
      .then((data) => {
        setInstructors(data);
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching instructors");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });

  }, [user]);

  const handleClick = (id) => {
    console.log(id);
    navigate(`/analytics/instructors/instructor_page/${id}`);
  }
  return (
    <CustomThemeProvider>
      <ResponsiveAppBar />
      <ErrorMessage errorMessage={errorMessage} />
      <div className='container-instructor'>
        {instructors.map(instructor => (
          <div key={instructor.id} onClick={() => handleClick(instructor.id)}>
            <CardAnalytics title={instructor.name}
              subTitle={instructor.designation}
              image_src={Instructor} />
          </div>
        ))}
      </div>
    </CustomThemeProvider>
  );
}
