import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolIcon from '@mui/icons-material/School';
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

  const handleAddInstructorClick = (event) => {
    event.preventDefault();
    console.log("Add Instructor");
    navigate('/admin/instructors');  
  }

  const handleAddStudentClick = (event) => {
    event.preventDefault();
    console.log("Add Student");
    navigate('/admin/students');
  }

  const handleAddDepartmentClick = (event) => {
    event.preventDefault();
    console.log("Add Department");
    navigate('/admin/departments'); 
  }

  const handleAddCourseClick = (event) => {
    event.preventDefault();
    console.log("Add Course");
    navigate('/admin/courses');
  }

  const handleAddSessionClick = (event) => {
    event.preventDefault();
    console.log("Add Session");
    navigate('/admin/sessions');
  }

  const handleAddProgrammeClick = (event) => {
    event.preventDefault();
    console.log("Add Programme");
    navigate('/admin/programmes');
  }

  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem icon={<MenuOutlinedIcon />} style={{ textAlign: "center" }}>
          <h2>Admin</h2>
        </MenuItem>
        <MenuItem icon={<HomeOutlinedIcon />} onClick={handleHomeClick}>Home</MenuItem>
        <MenuItem icon={<LockPersonIcon />} onClick={handleAddAdminClick}>Add Admin</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />} onClick={handleAddInstructorClick}>Add Instructor</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />} onClick={handleAddStudentClick}>Add Student</MenuItem>
        <MenuItem icon={<ApartmentIcon />} onClick={handleAddDepartmentClick}>Add Department</MenuItem>
        <MenuItem icon={<LibraryBooksIcon />} onClick={handleAddCourseClick}>Add Course</MenuItem>
        <MenuItem icon={<ReceiptOutlinedIcon />} onClick={handleAddSessionClick}>Add Session</MenuItem>
        <MenuItem icon={<SchoolIcon />} onClick={handleAddProgrammeClick}>Add Programme</MenuItem>
      </Menu>
    </Sidebar>
  );
}