import { redirect } from "react-router-dom";

const getAdminFromLocalStorage = () => {
    const loggedContributorJSON = window.localStorage.getItem("loggedAcademicTrackingAdmin");
    if (loggedContributorJSON) {
      return JSON.parse(loggedContributorJSON);
    }
    return null;
};

const adminLoginLoader = async () => {
    const admin = getAdminFromLocalStorage();
    if (admin) {
        return redirect("/admin/dashboard");
    }
    return { admin };
}

export default adminLoginLoader;