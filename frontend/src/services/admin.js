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

const changeUserPassword = async (data) => {
    return axiosPOST("users/changepassword", data, config);
}

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

const addTeaches = async (id, data) => {
    return axiosPOST(`instructors/${id}/teaches`, data);
};

const addTakes = async (roll, data) => {
    return axiosPOST(`students/${roll}/takes`, data);
};

const getInstructorCount = async () => {
    return axiosGET("instructors/count", config);
}

const getStudentCount = async () => {
    return axiosGET("students/count", config);
}

const getCourseCount = async () => {
    return axiosGET("courses/count", config);
}

const getProgrammesCount = async () => {
    return axiosGET("programmes/count", config);
}

const getSessionCount = async () => {
    return axiosGET("sessions/count", config);
}

const getInstructor = async (id) => {
    return axiosGET(`instructors/${id}`);
}

const getCourseInstructor = async (id) => {
    return axiosGET(`instructors/${id}/courses`);
}

const getDetailsOfCourse = async (id) => {
    return axiosGET(`courses/${id}/sessions`);
}

const getCourse = async (id) => {
    return axiosGET(`courses/${id}`);
}

const getDepartment = async (id) => {
    return axiosGET(`departments/${id}`);
}

const getSessionDetails = async (id) => {
    return axiosGET (`sessions/${id}/courses`);
}

const getSession = async (id) => {
    return axiosGET(`sessions/${id}`);
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
    changeUserPassword,
    getDepartmentCount,
    getAllCourses,
    getAllInstructors,
    getAllSessions,
    addTeaches,
    getStudentCount,
    getSessionCount,
    getInstructorCount,
    getCourseCount,
    getProgrammesCount,
    getAllStudents,
    addTakes, 
    getInstructor, 
    getCourseInstructor,
    getDetailsOfCourse,
    getCourse,
    getDepartment,
    getSessionDetails,
    getSession
};
