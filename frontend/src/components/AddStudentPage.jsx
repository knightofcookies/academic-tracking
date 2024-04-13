import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import adminServices from '../services/admin';

const AddStudentPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [programmes, setProgrammes] = useState([]); // State to store department names
  const [selectedProgramme, setSelectedProgramme] = useState(""); // State to store selected department name
  const [selectedDegree, setSelectedDegree] = useState(""); // State to store selected department name
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin"));

  useEffect(() => {
    // Fetch department names when component mounts
    adminServices.setToken(user.token);
    adminServices.getAllProgrammes()
      .then(data => {
        setProgrammes(data);
        console.log(data);
      })
      .catch(error => console.error("Error fetching programmes:", error));
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roll = formData.get('roll');
    const name = formData.get('name');
    const email = formData.get('email');
    const year_of_joining = formData.get('year_of_joining');
    if (!roll ||
      !name ||
      !email ||
      !selectedProgramme
      || !year_of_joining) {
      setErrorMessage("Missing required fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const programmeId = programmes.find(prog => (prog.degree === selectedDegree &&
      prog.name === selectedProgramme))?.id;
    if (!programmeId) {
      setErrorMessage("Invalid combination of degree and name selected!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const credentials = {
      roll: roll,
      name: name,
      email: email,
      programme_id: programmeId.toString(),
      year_of_joining: year_of_joining
    };

    console.log(credentials);
    adminServices.setToken(user?.token);
    adminServices
      .addStudent(credentials)
      .then(() => {
        alert("Student Added Successfully!!!");
        event.target.reset();
        setSelectedDegree("");
        setSelectedProgramme("");
      })
      .catch((error) => {
        if (error.message) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(
            "Error adding student. Please check the console for more details"
          );
          console.error("Error adding student:", error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  }

  const uniqueDegrees = [...new Set(programmes.map(prog => prog.degree))];
  const uniqueProgrammeNames = [...new Set(programmes.map(prog => prog.name))];

  return (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Box display="flex">
        <Box flexGrow={1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
            <Paper style={{ padding: 24, borderRadius: 8 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Add Student
              </Typography>
              <form onSubmit={handleSubmit}>
                <div style={{ width: '100%' }}>

                  <TextField label="Roll number" variant="outlined" fullWidth margin="normal" id='roll' name='roll' />
                  <TextField label="Name" variant="outlined" fullWidth margin="normal" id='name' name='name' />
                  <TextField label="Email ID" variant="outlined" fullWidth margin="normal" id='email' name='email' />

                  {/* <FormControl fullWidth margin="normal">
                    <InputLabel id="degree-label">Degree</InputLabel>
                    <Select
                      labelId="degree-label"
                      id="degree"
                      value={selectedDegree}
                      onChange={(event) => setSelectedDegree(event.target.value)}
                    >
                      {uniqueDegrees.map(degree => (
                        <MenuItem key={degree} value={degree}>{degree}</MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  {/* here is degree */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="degree-label">Degree</InputLabel>
                    <Select
                      labelId="degree-label"
                      value={selectedDegree}
                      onChange={(event) => setSelectedDegree(event.target.value)}
                      label="degree-label"
                    >
                      {uniqueDegrees.map(degree => (
                        <MenuItem key={degree} value={degree}>{degree}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* <FormControl fullWidth margin="normal">
                    <InputLabel id="programme-label">Programme</InputLabel>
                    <Select
                      labelId="programme-label"
                      id="programme"
                      value={selectedProgramme}
                      onChange={(event) => setSelectedProgramme(event.target.value)}
                    >
                      {uniqueProgrammeNames.map(name => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="programme-label">Programme</InputLabel>
                    <Select
                      labelId="programme-label"
                      value={selectedProgramme}
                      onChange={(event) => setSelectedProgramme(event.target.value)}
                      label="degree-label"
                    >
                      {uniqueProgrammeNames.map(name => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField label="Year of Joining" variant="outlined" fullWidth margin="normal" id='year_of_joining' name='year_of_joining' />
                  <Button variant="contained" color="primary" style={{ marginTop: 24 }} fullWidth type='submit'>
                    Add Student
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </Box>
      </Box>
    </SideBar>
  );
};

export default AddStudentPage;
