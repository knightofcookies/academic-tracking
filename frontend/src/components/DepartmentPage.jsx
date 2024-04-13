import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import CardAnalytics from './CardAnalytics';
import Grid from '@mui/material/Grid';
import services from '../services/admin';
import Department from '../assets/department_image.png';
import '../styles/DepartmentPage.css'
import SideBar from './SideBar';

export default function DepartmentPage() {
    const [departments, setDepartments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));
    useEffect(() => {
        services.setToken(user.token);
        services.getAllDepartments()
            .then(data => setDepartments(data))
            .catch((error) =>
                setErrorMessage(error)
            );
    }, []);
  return (
    <div>
        <ResponsiveAppBar />
        <ErrorMessage errorMessage={errorMessage} />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='grid-container'>
                {departments.map(department => (
                    <Grid item xs={2} sm={4} md={4} key={department.id}>
                        {/* <Item><CardAnalytics title={department.name}/></Item> */}
                        <CardAnalytics title={department.name} image_src={Department}/>
                    </Grid>
                ))}
        </Grid>
    </div>
  )
}