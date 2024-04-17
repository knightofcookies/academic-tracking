import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import userLoader from './loaders/userLoader';
import userLoginLoader from './loaders/userLoginLoader';
import adminLoader from './loaders/adminLoader';
import adminLoginLoader from './loaders/adminLoginLoader';
import adminUserLoader from './loaders/adminUserLoader.js';
import ErrorPage from './components/ErrorPage.jsx';
import AdminSignIn from './components/AdminSignIn.jsx';
import SignInSide from './components/SignInSide.jsx';
import SignUpSide from './components/SignUpSide.jsx';
import AdminDashBoard from './components/AdminDashBoard.jsx';
import AddAdminPage from './components/AddAdminPage.jsx';
import AddDepartment from './components/AddDepartment.jsx';
import AddSession from './components/AddSession.jsx';
import AddInstructorPage from './components/AddInstructorPage.jsx';
import AddProgrammePage from './components/AddProgrammePage.jsx';
import AddStudentPage from './components/AddStudentPage.jsx';
import AddCoursePage from './components/AddCoursePage.jsx';
import AddUser from './components/AddUser.jsx';
import AddTeachesPage from './components/AddTeachesPage.jsx';
import AddTakesPage from './components/AddTakesPage.jsx';
import Analytics from './components/Analytics.jsx';
import InstructorPage from './components/InstructorPage.jsx';
import InstructorDetails from './components/InstructorDetails.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import SessionPage from './components/SessionPage.jsx';
import SessionDetails from './components/SessionDetails.jsx';
import CoursePage from './components/CoursePage.jsx';
import ProgrammePage from './components/ProgrammePage.jsx';
import DepartmentPage from './components/DepartmentPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "/signin",
    element: <SignInSide />,
    errorElement: <ErrorPage />,
    loader: userLoginLoader,
  },
  {
    path: "/signup",
    element: <SignUpSide />,
    errorElement: <ErrorPage />,
    loader: userLoginLoader,
  },
  {
    path: "/admin/signin",
    element: <AdminSignIn />,
    errorElement: <ErrorPage />,
    loader: adminLoginLoader,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashBoard />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/add_admin",
    element: <AddAdminPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/departments",
    element: <AddDepartment />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/instructors",
    element: <AddInstructorPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/programmes",
    element: <AddProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/sessions",
    element: <AddSession />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/courses",
    element: <AddCoursePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/programme",
    element: <AddProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/admin/students",
    element: <AddStudentPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
  },
  {
    path: "/analytics",
    element: <Analytics />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader,
  },
  {
    path: "/admin/add_user",
    element: <AddUser />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/teaches",
    element: <AddTeachesPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "/admin/takes",
    element: <AddTakesPage />,
    errorElement: <ErrorPage />,
    loader: adminLoader
  },
  {
    path: "analytics/instructors",
    element: <InstructorPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/instructors/instructor_page/:id",
    element: <InstructorDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/courses",
    element: <CoursePage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/course/:id",
    element: <CourseDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/sessions",
    element: <SessionPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/programmes",
    element: <ProgrammePage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/departments",
    element: <DepartmentPage />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  },
  {
    path: "analytics/session/:id",
    element: <SessionDetails />,
    errorElement: <ErrorPage />,
    loader: adminUserLoader
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
