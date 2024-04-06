import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { ProSidebarProvider } from "react-pro-sidebar";
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import adminServices from '../services/admin';
import { useLoaderData } from 'react-router-dom';

const securityQuestions = [
  'What was the name of your first pet?',
  'What was the name of your first school?',
  'What is your favorite book?',
  'In which city were you born?'
];

const seasons = [
    'Monsoon',
    'Winter' 
]

const AddSession = () => {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [season, setSeason] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin"));

  const handleSecurityQuestionChange = (event) => {
    setSecurityQuestion(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const start_year = formData.get('start_year');
    console.log(start_year, season);
    if (!start_year) {
      setErrorMessage("Missing start year");
      setTimeout(() => {
          setErrorMessage("");
      }, 5000);
      return;
    }
    const season_lower = season.toLowerCase();
    const credentials = {
        start_year,
        season: season_lower
    }

    adminServices.setToken(user?.token);
    adminServices
          .addSession(credentials)
          .then(() => {
            alert("Session Added Successfully");
            event.target.reset();
          })
          .catch((error) => {
            console.log("inside error");
            console.log(error);
            if (error.response.data.error) {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                setErrorMessage(
                    "Error logging in : Please check the console for more details"
                );
                console.error(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            }
        });
  }

  return (
    <ProSidebarProvider>
      <ErrorMessage errorMessage={errorMessage} />
      <Box display="flex">
        <SideBar />
        <Box flexGrow={1}>
          <ResponsiveAppBar />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)' }}>
            <CssBaseline />
            <Paper style={{ padding: 24, borderRadius: 8 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Add Session
              </Typography>
              <form onSubmit={handleSubmit}>
                <div style={{ width: '100%' }}>
                  <TextField label="Start Year" variant="outlined" fullWidth margin="normal" id='start_year' name='start_year' />
                  <FormControl style={{ marginTop: 16, minWidth: 120 }} fullWidth>
                    <InputLabel id="season">Season</InputLabel>
                    <Select
                      labelId="season"
                      value={season}
                      onChange={handleSeasonChange}
                      label="Season"
                    >
                      {seasons.map((season) => (
                        <MenuItem key={season} value={season}>
                          {season}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="contained" color="primary" style={{ marginTop: 24 }} fullWidth type='submit'>
                    Add Session
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </Box>
      </Box>
    </ProSidebarProvider>
  );
};

export default AddSession;