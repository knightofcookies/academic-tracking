import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import adminServices from '../services/admin';

const AddCoursePage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState([]); // State to store department names
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State to store selected department name
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin"));

  useEffect(() => {
    // Fetch department names when component mounts
    adminServices.setToken(user.token)
    adminServices.getAllDepartments()
      .then(data => {
        setDepartments(data);
        console.log(data);
      })
      .catch(error => console.error("Error fetching departments:", error));
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');
    const code = formData.get('code');
    if (!title || !code || !selectedDepartment) {
      setErrorMessage("Missing required fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    const departmentId = departments.find(dep => dep.name === selectedDepartment)?.id;
    if (!departmentId) {
      setErrorMessage("Invalid department selected");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    const credentials = {
      title: title,
      code: code,
      department_id: departmentId
    };

    adminServices.setToken(user?.token);
    adminServices
      .addCourse(credentials)
      .then(() => {
        alert("Course Added Successfully!!!");
        event.target.reset();
        setSelectedDepartment("");
      })
      .catch((error) => {
        if (error.message) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(
            "Error adding course. Please check the console for more details"
          );
          console.error("Error adding course:", error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  }

  return (
    <SideBar>
      <ErrorMessage errorMessage={errorMessage} />
      <Box display="flex">
        <Box flexGrow={1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
            <Paper style={{ padding: 24, borderRadius: 8 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Add Course
              </Typography>
              <form onSubmit={handleSubmit}>
                <div style={{ width: '100%' }}>
                  <TextField label="Course Title" variant="outlined" fullWidth margin="normal" id='title' name='title' />
                  <TextField label="Course Code" variant="outlined" fullWidth margin="normal" id='code' name='code' />
                  {/* <FormControl fullWidth margin="normal">
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      value={selectedDepartment}
                      onChange={(event) => setSelectedDepartment(event.target.value)}
                    >
                      {departments.map((dep) => (
                        <MenuItem key={dep.id} value={dep.name}>{dep.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <FormControl style={{ marginTop: 16, minWidth: 120 }} fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      value={selectedDepartment}
                      onChange={(event) => setSelectedDepartment(event.target.value)}
                      label="Department"
                    >
                      {departments.map((dep) => (
                          <MenuItem key={dep.id} value={dep.name}>{dep.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Button variant="contained" color="primary" style={{ marginTop: 24 }} fullWidth type='submit'>
                    Add Course
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

export default AddCoursePage;
