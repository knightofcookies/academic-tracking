import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import SideBar from './SideBar';
import { CssBaseline } from '@mui/material';

const AdminDashBoard = () => {
  return (
    <div>
      <CssBaseline/>
      <ResponsiveAppBar />
      <SideBar />
    </div>
  )
}

export default AdminDashBoard;
