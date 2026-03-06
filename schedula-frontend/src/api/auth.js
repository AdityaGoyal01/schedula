import api from "./axiosInstance";

export const registerDoctor = (data) =>
  api.post("auth/register/doctor", data);

export const registerPatient = (data) =>
  api.post("auth/register/patient", data);

export const loginUser = (data) =>
  api.post("auth/login", data);

export const logoutUser = (navigate) => {
  localStorage.clear();   // sab remove karega
  navigate("/", { replace: true });
};