import { useEffect, useState } from 'react'
import ErrorMessage from './ErrorMessage';
import adminServices from '../services/admin';
import CardAnalytics from './CardAnalytics';
import Grid from '@mui/material/Grid';
import Programme from '../assets/programme_image.png';
import '../styles/ProgrammePage.css';
import SideBar from './SideBar';

const ProgrammePage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));

  useEffect(() => {
    adminServices.setToken(user?.token);
    adminServices
      .getAllProgrammes()
      .then((data) => {
        setProgrammes(data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching programmes.");
        console.error(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }, [user?.token]);

  return (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <div className="container-programme">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {programmes.map(prog => (
            <Grid item xs={2} sm={4} md={4} key={prog.id}>
              <CardAnalytics title={prog.degree}
                subTitle={prog.name}
                image_src={Programme} />
            </Grid>
          ))}
        </Grid>
      </div>
    </SideBar>
  )
};

export default ProgrammePage;
