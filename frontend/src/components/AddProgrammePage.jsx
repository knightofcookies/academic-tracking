import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { ProSidebarProvider } from "react-pro-sidebar";
import ResponsiveAppBar from './ResponsiveAppBar';
import ErrorMessage from './ErrorMessage';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import adminServices from '../services/admin';

const AddProgrammePage = () => {
    return (
        <div>This is the Programme page.</div>
    )
};

export default AddProgrammePage;