import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import adminServices from '../services/admin';
import CardAnalytics from './CardAnalytics';
import Grid from '@mui/material/Grid';
import Programme from '../assets/programme_image.png';
import '../styles/ProgrammePage.css'; 

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
                console.log(data);
            })
            .catch((error) =>
                console.error("Error fetching Programmes:", error)
            );
    
  }, [])

  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <ErrorMessage errorMessage={errorMessage} />
      <div className="container-programme">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {programmes.map(prog => (
              <Grid item xs={2} sm={4} md={4} key={prog.id}>
                <CardAnalytics title = {prog.degree}
                              subTitle = {prog.name} 
                              image_src = {Programme}/>
                </Grid>
                ))}
        </Grid>
      </div>
    </div>
  )
};

export default ProgrammePage;
