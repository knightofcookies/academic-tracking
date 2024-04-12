import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GradingIcon from '@mui/icons-material/Grading';
import ClassIcon from '@mui/icons-material/Class';
import { useNavigate } from "react-router-dom";
import CustomThemeProvider from "./CustomThemeProvider";
import ResponsiveAppBar from "./ResponsiveAppBar";

const drawerWidth = 240;

export default function SideBar(props) {
    const navigate = useNavigate();

    const items1 = [
        {
            name: 'Home',
            icon: <HomeOutlinedIcon />,
            link: '/admin/dashboard'
        },
        {
            name: 'Add Admin',
            icon: <LockPersonIcon />,
            link: '/admin/add_admin'
        },
        {
            name: 'Add User',
            icon: <PersonIcon />,
            link: '/admin/add_user'
        },
        {
            name: 'Add Instructor',
            icon: <PeopleOutlinedIcon />,
            link: '/admin/instructors'
        },
        {
            name: 'Add Programme',
            icon: <SchoolIcon />,
            link: '/admin/programmes'
        },
        {
            name: 'Add Student',
            icon: <PeopleOutlinedIcon />,
            link: '/admin/students'
        },
        {
            name: 'Add Department',
            icon: <ApartmentIcon />,
            link: '/admin/departments'
        },
        {
            name: 'Add Course',
            icon: <LibraryBooksIcon />,
            link: '/admin/courses'
        },
        {
            name: 'Add Session',
            icon: <ReceiptOutlinedIcon />,
            link: '/admin/sessions'
        },
        {
            name: 'Add Instructor Data',
            icon: <ClassIcon />,
            link: '/admin/teaches'
        },
        {
            name: 'Add Student Data',
            icon: <GradingIcon />,
            link: '/admin/dashboard'
        },
    ];

    const items2 = [
        {
            name: 'Analytics',
            icon: <AnalyticsIcon />,
            link: '/analytics'
        },
    ];

    return (
        <CustomThemeProvider>
            <Box sx={{ display: 'flex' }}>
                <ResponsiveAppBar />
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {items1.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => navigate(item.link)}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {items2.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => navigate(item.link)}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>
        </CustomThemeProvider>
    );
}
