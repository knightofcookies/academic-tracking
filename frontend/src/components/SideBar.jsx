import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolIcon from '@mui/icons-material/School';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const handleHomeClick = (event) => {
    event.preventDefault();
    console.log("Home");
    navigate("/admin/dashboard");
  }

  const handleAddAdminClick = (event) => {
    event.preventDefault();
    console.log("Add Admin");
    navigate('/admin/add_admin');
  }

  const handleAddUserClick = (event) => {
    event.preventDefault();
    console.log("Add User");
    navigate('/admin/add_user')
  }

  const handleAddInstructorClick = (event) => {
    event.preventDefault();
    console.log("Add Instructor");
    navigate('/admin/instructors')
  }

  const handleAddProgrammeClick = (event) => {
    event.preventDefault();
    console.log("Add Programme");
    navigate("/admin/programmes")
  }

  const handleAddStudentClick = (event) => {
    event.preventDefault();
    console.log("Add Student");
  }

  const handleAddDepartmentClick = (event) => {
    event.preventDefault();
    console.log("Add Department");
    navigate('/admin/departments');
  }

  const handleAddCourseClick = (event) => {
    event.preventDefault();
    console.log("Add Course");
  }

  const handleAddSessionClick = (event) => {
    event.preventDefault();
    console.log("Add Session");
    navigate('/admin/sessions');
  }

  const handleAnalyticsClick = (event) => {
    event.preventDefault();
    console.log("Analytics");
    navigate('/analytics')
  }

  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem icon={<MenuOutlinedIcon />} style={{ textAlign: "center" }}>
          <h2>Admin</h2>
        </MenuItem>
        <MenuItem icon={<HomeOutlinedIcon />} onClick={handleHomeClick}>Home</MenuItem>
        <MenuItem icon={<LockPersonIcon />} onClick={handleAddAdminClick}>Add Admin</MenuItem>
        <MenuItem icon={<PersonIcon />} onClick={handleAddUserClick}>Add User</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />} onClick={handleAddInstructorClick}>Add Instructor</MenuItem>
        <MenuItem icon={<SchoolIcon />} onClick={handleAddProgrammeClick}>Add Programme</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />} onClick={handleAddStudentClick}>Add Student</MenuItem>
        <MenuItem icon={<ApartmentIcon />} onClick={handleAddDepartmentClick}>Add Department</MenuItem>
        <MenuItem icon={<LibraryBooksIcon />} onClick={handleAddCourseClick}>Add Course</MenuItem>
        <MenuItem icon={<ReceiptOutlinedIcon />} onClick={handleAddSessionClick}>Add Session</MenuItem>
        <MenuItem icon={<AnalyticsIcon />} onClick={handleAnalyticsClick}>Analytics</MenuItem>
      </Menu>
    </Sidebar>
  );
}

