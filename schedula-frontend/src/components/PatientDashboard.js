import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

import {
  getAllDoctors,
  getDoctorSlots,
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getPatientProfile
} from "../api/patient";

const PatientDashboard = () => {

  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reasonMap, setReasonMap] = useState({});

  const patientId = localStorage.getItem("patientId");

  // ===============================
  // INITIAL LOAD
  // ===============================
  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
   logoutUser(navigate);
  };

  // ===============================
  // FETCH PATIENT PROFILE
  // ===============================
  const fetchPatientProfile = async () => {
    try {
      const res = await getPatientProfile(patientId);
      setPatient(res.data);
    } catch (err) {
      console.error("Error fetching patient profile:", err);
    }
  };

  // ===============================
  // FETCH DOCTORS
  // ===============================
  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // FETCH SLOTS
  // ===============================
  const fetchSlots = async (doctorId) => {
    try {
      const res = await getDoctorSlots(doctorId);
      setSlots(res.data);
      setSelectedDoctor(doctorId);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // FETCH MY APPOINTMENTS
  // ===============================
  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments(patientId);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // BOOK APPOINTMENT
  // ===============================
  const handleBook = async (slot) => {

    const reason = reasonMap[slot.id];

    if (!reason) {
      alert("Please enter reason");
      return;
    }

    try {
      await bookAppointment({
        doctorId: slot.doctorId,
        patientId: patientId,
        slotId: slot.id,
        reason: reason
      });

      alert("Appointment booked successfully!");

      setReasonMap(prev => ({ ...prev, [slot.id]: "" }));

      fetchSlots(slot.doctorId);
      fetchAppointments();

    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  // ===============================
  // CANCEL APPOINTMENT
  // ===============================
  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId, patientId);
      alert("Appointment canceled");

      fetchAppointments();
      if (selectedDoctor) fetchSlots(selectedDoctor);

    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  // ===============================
  // HELPER: Get Doctor Name
  // ===============================
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : doctorId;
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* Top Bar */}
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">Patient Dashboard</h2>

      <button
        onClick={handleLogout}
        className="text-blue-600 font-bold underline px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>

    {/* ================= PATIENT PROFILE ================= */}
    {patient && (
      <section className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3">Your Profile : </h3>

        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Age:</strong> {patient.age}</p>
      </section>
    )}

    {/* ================= DOCTORS ================= */}
    <section className="mb-10">

  <h3 className="text-2xl font-semibold mb-4">
    Available Doctors
  </h3>

  {doctors.length === 0 ? (
    <p>No doctors available.</p>
  ) : (

    <div className="bg-white rounded-xl shadow-md divide-y">

      {doctors.map((doc) => (
        <div
          key={doc.id}
          className="flex justify-between items-center p-5"
        >

          {/* Left Side */}
          <div>
            <p className="text-lg font-semibold">
              {doc.name}
            </p>

            <p className="text-gray-600">
              {doc.specialization}
            </p>

           
          </div>

          {/* Right Side */}
          <button
            onClick={() => fetchSlots(doc.id)}
            className="font-bold hover:underline text-gray-700 px-4 py-2 rounded-lg"
          >
            View Slots
          </button>

        </div>
      ))}

    </div>

  )}

</section>

    {/* ================= SLOTS ================= */}
    {selectedDoctor && (
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Doctor Slots</h3>

        {slots.length === 0 ? (
          <p>No slots available today.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {slots.map((slot) => {

              const available = slot.capacity - slot.bookedCount;

              return (
                <div
                  key={slot.id}
                  className="bg-white shadow-md rounded-xl p-5"
                >

                  <p className="font-semibold mb-2">
                    {slot.date} | {slot.startTime} - {slot.endTime}
                  </p>

                  <p className="mb-3">
                    Available Slots: {available}
                  </p>

                  {available > 0 ? (
                    <>
                      <input
                        type="text"
                        placeholder="Reason"
                        value={reasonMap[slot.id] || ""}
                        onChange={(e) =>
                          setReasonMap(prev => ({
                            ...prev,
                            [slot.id]: e.target.value
                          }))
                        }
                        className="w-full border p-2 rounded-lg mb-3"
                      />

                      <button
                        onClick={() => handleBook(slot)}
                        className="w-full font-bold hover:bg-gray-200 text-gray-700 py-2 rounded-lg"
                      >
                        Book Appointment
                      </button>
                    </>
                  ) : (
                    <p className="text-red-500 font-medium">
                      Slot Full
                    </p>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </section>
    )}

    {/* ================= MY APPOINTMENTS ================= */}
    <section>
      <h3 className="text-2xl font-semibold mb-4">My Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white shadow-md rounded-xl p-5"
            >

              <p className="font-semibold mb-2">
                Doctor: {getDoctorName(appt.doctorId)}
              </p>

              <p>Date: {appt.date}</p>
              <p>
                Time: {appt.startTime} - {appt.endTime}
              </p>

              <p className="mb-3">
                Reason: {appt.reason}
              </p>

              <button
                onClick={() => handleCancel(appt.id)}
                className="text-gray-700 font-bold hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-600 "
              >
                Cancel
              </button>

            </div>
          ))}

        </div>
      )}
    </section>

  </div>
);
};

export default PatientDashboard;