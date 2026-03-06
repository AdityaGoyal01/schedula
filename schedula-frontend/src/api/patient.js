import axios from "./axiosInstance";

export const getPatientProfile = (patientId) => {
  return axios.get(`/patient/${patientId}`);
};
// GET ALL DOCTORS
export const getAllDoctors = () => {
  return axios.get("/doctors");
};

// GET DOCTOR SLOTS
export const getDoctorSlots = (doctorId) => {
  return axios.get(`/doctors/${doctorId}/slots`);
};

// BOOK APPOINTMENT
export const bookAppointment = (data) => {
  return axios.post("/appointments/book", data);
};

// GET MY APPOINTMENTS
export const getMyAppointments = (patientId) => {
  return axios.get(`/appointments/me?patientId=${patientId}`);
};

// CANCEL APPOINTMENT
export const cancelAppointment = (appointmentId, patientId) => {
  return axios.delete(
    `/appointments/${appointmentId}?patientId=${patientId}`
  );
};