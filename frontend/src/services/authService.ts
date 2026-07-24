import API from "./api";

export const login = async (email: string, password: string) => {
  console.log("BaseURL:", API.defaults.baseURL);

  const response = await API.post("/login", {
    email,
    password,
  });

  console.log("Status:", response.status);
  console.log("Data:", response.data);

  localStorage.setItem(
    "token",
    response.data.token
);

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};
export const register = async (user: any) => {

    const response = await API.post(
        "/register",
        user
    );

    return response.data;

};