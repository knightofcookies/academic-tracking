import axios from "axios";

const baseUrl = "http://localhost:3653/api/";

let token = null;
let config = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    config = {
        headers: {
            Authorization: token,
        },
    };
};

const handleJWTExpiry = () => {
    localStorage.removeItem("loggedAcademicTrackingUser");
    window.location.reload();
};

const axiosGET = async (endpoint) => {
    try {
        const response = await axios.get(baseUrl + endpoint, config);
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            handleJWTExpiry();
        } else {
            throw Error(error.response.data.error);
        }
    }
};

const getAllDepartments = async () => {
    return axiosGET("departments");
};

const getAllProgrammes = async () => {
    return axiosGET("programmes");
};

const getDepartmentCount = async () => {
    return axiosGET("departments/count", config);
};

const getAllCourses = async () => {
    return axiosGET("courses", config);
};

const getAllInstructors = async () => {
    return axiosGET("instructors", config);
};

const getAllSessions = async () => {
    return axiosGET("sessions", config);
};

const getAllStudents = async () => {
    return axiosGET("students", config);
};

const getInstructorCount = async () => {
    return axiosGET("instructors/count", config);
};

const getStudentCount = async () => {
    return axiosGET("students/count", config);
};

const getCourseCount = async () => {
    return axiosGET("courses/count", config);
};

const getProgrammesCount = async () => {
    return axiosGET("programmes/count", config);
};

const getSessionCount = async () => {
    return axiosGET("sessions/count", config);
};

const getInstructor = async (id) => {
    return axiosGET(`instructors/${id}`);
};

const getCourseInstructor = async (id) => {
    return axiosGET(`instructors/${id}/courses`);
};

const getDetailsOfCourse = async (id) => {
    return axiosGET(`courses/${id}/sessions`);
};

const getCourse = async (id) => {
    return axiosGET(`courses/${id}`);
};

const getDepartment = async (id) => {
    return axiosGET(`departments/${id}`);
};

const getSessionDetails = async (id) => {
    return axiosGET(`sessions/${id}/courses`);
};

const getSession = async (id) => {
    return axiosGET(`sessions/${id}`);
};

export default {
    setToken,
    getAllDepartments,
    getAllProgrammes,
    getDepartmentCount,
    getAllCourses,
    getAllInstructors,
    getAllSessions,
    getStudentCount,
    getSessionCount,
    getInstructorCount,
    getCourseCount,
    getProgrammesCount,
    getAllStudents,
    getInstructor,
    getCourseInstructor,
    getDetailsOfCourse,
    getCourse,
    getDepartment,
    getSessionDetails,
    getSession,
};
