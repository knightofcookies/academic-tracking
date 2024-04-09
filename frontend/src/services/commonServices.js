import axios from "axios";

const baseUrl = "http://localhost:3653/api";

let token  = null;
let config = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    config = {
      headers: {
        Authorization: token,
      },
    };
};

const changeAdminPassword = async (credentials) => {
    const response = await axios.post(baseUrl + "/admin/changepassword", credentials, config);
    return response.data;
}

const fetchStudents = async () => {
  
}

export default {changeAdminPassword, setToken};