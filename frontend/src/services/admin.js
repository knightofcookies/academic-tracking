import axios from "axios";

const baseUrl = "http://localhost:3653/api/admin";

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

const createAdmin = async (credentials) => {
    const response = await axios.post(baseUrl, credentials, config);
    return response.data;
}

export default { setToken, createAdmin};