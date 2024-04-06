import axios from "axios";

const baseUrl = "http://localhost:3653/api/login";

const loginAdmin = async (credentials) => {
    const response = await axios.post(baseUrl + "/admin", credentials);
    return response.data;
};

const loginUser = async (credentials) => {
    const response = await axios.post(baseUrl + "/user", credentials);
    return response.data;
}

export default { loginAdmin, loginUser };