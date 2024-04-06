import { redirect } from "react-router-dom";

const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedAcademicTrackingUser");
    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
    }
    return null;
};

const userLoader = async () => {
    const user = getUserFromLocalStorage();
    if (user) {
        return redirect("/user/dashboard");
    }
    return { user };
};

export default userLoader;