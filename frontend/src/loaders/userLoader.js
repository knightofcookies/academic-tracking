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
    console.log(user);
    if (!user) {
        return redirect("/signin");
    }
    return { user };
};

export default userLoader;