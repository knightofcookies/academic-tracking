import React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import SideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import { CssBaseline } from '@mui/material';

const AdminDashBoard = () => {
  console.log('Homepage under construction.');
  return (
    <div>
      <CssBaseline/>
      <ResponsiveAppBar />
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>
    </div>
  )
}

export default AdminDashBoard