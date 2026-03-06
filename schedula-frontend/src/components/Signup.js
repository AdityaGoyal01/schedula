import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDoctor, registerPatient } from '../api/auth';

const Signup = () => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(role === 'doctor') await registerDoctor(formData);
      else await registerPatient(formData);
      alert('Registered successfully!');
      navigate('/login');
    } catch(err) {
      alert('Error: ' + err.response?.data?.message || err.message);
    }
  }

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">

    {/* Heading */}
    <h1 className="text-4xl font-bold text-gray-800 mb-8">
      Create Your Account
    </h1>

    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Common Fields */}

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        {/* Doctor Fields */}

        {role === 'doctor' && (
          <>
            <input
              name="specialization"
              placeholder="Specialization"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />

            <input
              name="experience"
              type="number"
              placeholder="Experience (years)"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </>
        )}

        {/* Patient Fields */}

        {role === 'patient' && (
          <>
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />

            <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </>
        )}

        {/* Submit */}

        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
        >
          Signup
        </button>

      </form>

    </div>
  </div>
);
};

export default Signup;