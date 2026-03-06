import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { getDoctorProfile, createSlot, getDoctorSlotDetails } from "../api/doctor";

const DoctorDashboard = () => {

  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);


  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    mode: "STREAM",
    slotDuration: "",
    capacity: ""
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate);
  };

  useEffect(() => {
    const profileId = localStorage.getItem("doctorId");
    fetchProfile(profileId);
    fetchSlotDetails(profileId);
  }, []);

  const fetchProfile = async (id) => {
    try {
      const res = await getDoctorProfile(id);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSlotDetails = async (id) => {
    try {
      const res = await getDoctorSlotDetails(id);
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorId = localStorage.getItem("doctorId");

    const requestBody = {
      startTime: formData.startTime,
      endTime: formData.endTime,
      mode: formData.mode,
      slotDuration: Number(formData.slotDuration),
      capacity:
        formData.mode === "WAVE"
          ? Number(formData.capacity)
          : null
    };

    try {
      await createSlot(doctorId, requestBody);
      alert("Slot created successfully!");

      setFormData({
        startTime: "",
        endTime: "",
        mode: "STREAM",
        slotDuration: "",
        capacity: ""
      });

      fetchSlotDetails(doctorId);

    } catch (err) {
      console.error(err);
      alert("Error creating slot");
    }
  };

 return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* Top Bar */}
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h2>

      <button
        onClick={handleLogout}
        className="text-blue-600 font-bold underline px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>

    {/* Doctor Info + Create Slot */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

      {/* Profile Info */}
      {profile && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Your Profile</h3>

          <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
          <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
          <p className="mb-2"><strong>Experience:</strong> 10+ yrs</p>
          <p className="mb-2"><strong>Address:</strong> Karol Bagh,West Delhi, NCR</p>  
          <p className="mb-2"><strong>Phone-No:</strong> 9988456XX</p>  


        </div>
      )}

      {/* Create Slot Form */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Create Slot</h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="slotDuration"
            placeholder="Slot Duration (minutes)"
            value={formData.slotDuration}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="STREAM">STREAM</option>
            <option value="WAVE">WAVE</option>
          </select>

          {formData.mode === "WAVE" && (
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
          >
            Create Slot
          </button>

        </form>
      </div>

    </div>

    {/* Slots Section */}
    <section>
      <h3 className="text-2xl font-semibold mb-4">Your Slots</h3>

      {slots.length === 0 ? (
        <p>No slots created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {slots.map(slot => (

            <div
              key={slot.slotId || slot.id}
              className="bg-white shadow-md rounded-xl p-5"
            >

              <h3 className="font-semibold text-lg mb-2">
                {slot.date} | {slot.startTime} - {slot.endTime}
              </h3>
              <p>Capacity: {slot.capacity}</p>
              <p>Booked: {slot.bookedCount}</p>
              <p>Available: {slot.availableCount}</p>

              <h4 className="font-semibold mt-3">Patients</h4>

              {slot.appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No bookings yet</p>
              ) : (
                <ul className="text-sm mt-1 space-y-1">
                  {slot.appointments.map(app => (
                    <li key={app.appointmentId}>
                      <p>Name: {app.patientName}, Email: {app.patientEmail}</p>
                      
                    </li>
                  ))}
                </ul>
              )}

            </div>

          ))}

        </div>
      )}
    </section>

  </div>
);
};

export default DoctorDashboard;