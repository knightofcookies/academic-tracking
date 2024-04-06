import axios from "axios";

const baseUrl = "http://localhost:3653/api";

const signupUser = async (credentials) => {
    const response = await axios.post(baseUrl + "/signup", credentials);
    return response.data;
};

export default { signupUser };