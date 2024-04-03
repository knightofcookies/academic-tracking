import { redirect } from "react-router-dom";

const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem(
        "loggedAcademicTrackingUser"
    );
    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
    }
    return null;
};

const loginLoader = async () => {
    const user = getUserFromLocalStorage();
    if (user) {
        return redirect("/");
    }
    return { user };
};

export default loginLoader;
