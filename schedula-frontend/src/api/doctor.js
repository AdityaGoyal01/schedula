import api from "./axiosInstance";

// Logged in doctor profile
export const getDoctorProfile = (id) =>
  api.get(`/doctors/${id}`);

// Create slot
export const createSlot = (doctorId,data) =>
  api.post(`/doctors/${doctorId}/slots`, data);

// Get doctor's slots
export const getDoctorSlots = (doctorId) =>
  api.get(`doctors/${doctorId}/slots`);


export const getDoctorSlotDetails = (doctorId) =>
  api.get(`/doctors/${doctorId}/details`);
