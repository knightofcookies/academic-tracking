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
const addStudent = async (credentials) => {
  const response = await axios.post(baseUrl + "/students", credentials, config);
  return response.data;
}

const getAllCourses = async () => {
  const response = await axios.get(baseUrl + "/courses", config);
  return response.data;
}

const getAllInstructors = async () => {
  const response = await axios.get(baseUrl + "/instructors", config);
  return response.data;
}

const getAllSessions = async () => {
  const response = await axios.get(baseUrl + "/sessions", config);
  return response.data;
}

const addTeaches = async (id, credentials) => {
  const response = await axios.post(baseUrl + `/instructors/${id}/teaches`, credentials, config);
  return response.data;
}

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
export default { setToken, createAdmin, addDepartment, addInstructor, addSession, 
          getAllDepartments, addProgramme, addCourse, getAllProgrammes, addStudent, createUser, getAllCourses, 
          getAllInstructors, getAllSessions, addTeaches };
