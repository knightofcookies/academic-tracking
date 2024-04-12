import ResponsiveAppBar from './ResponsiveAppBar';
import SideBar from './SideBar';
import Analytics from './Analytics';
import '../styles/AdminDashboard.css'
import CustomThemeProvider from './CustomThemeProvider';


const AdminDashBoard = () => {
  console.log('Homepage under construction.');
  return (
    <CustomThemeProvider>
      <ResponsiveAppBar />
      <div className='parent'>
        <div className='child'><SideBar /></div>
        <div className='analytics-child'><Analytics /></div>
      </div>
    </CustomThemeProvider>
  );
};

export default AdminDashBoard;
