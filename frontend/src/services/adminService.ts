import API from "./api";

export const getDashboard = async () => {

    const response = await API.get("/admin/dashboard");

    return response.data;

};
