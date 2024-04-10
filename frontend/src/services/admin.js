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
    localStorage.removeItem("loggedAcademicTrackingAdmin");
    window.location.reload();
};

const axiosPOST = async (endpoint, data) => {
    try {
        const response = await axios.post(baseUrl + endpoint, data, config);
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            handleJWTExpiry();
        } else {
            throw Error(error.response.data.error);
        }
    }
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

const createAdmin = async (data) => {
    return axiosPOST("admin", data);
};

const createUser = async (data) => {
    return axiosPOST("users", data);
};

const addDepartment = async (data) => {
    return axiosPOST("departments", data);
};

const addInstructor = async (data) => {
    return axiosPOST("instructors", data);
};

const addSession = async (data) => {
    return axiosPOST("sessions", data);
};

const getAllDepartments = async () => {
    return axiosGET("departments");
};

const addProgramme = async (data) => {
    return axiosPOST("programmes", data);
};

const addCourse = async (data) => {
    return axiosPOST("courses", data);
};

const getAllProgrammes = async () => {
    return axiosGET("programmes");
};

const addStudent = async (data) => {
    return axiosPOST("students", data);
};

const changeAdminPassword = async (data) => {
    return axiosPOST("admin/changepassword", data, config);
};

const getDepartmentCount = async () => {
    return axiosGET("departments/count", config);
};

export default {
    setToken,
    createAdmin,
    addDepartment,
    addInstructor,
    addSession,
    getAllDepartments,
    addProgramme,
    addCourse,
    getAllProgrammes,
    addStudent,
    createUser,
    changeAdminPassword,
    getDepartmentCount,
};
