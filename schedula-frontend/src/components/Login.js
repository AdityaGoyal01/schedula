import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);
    console.log(res.data);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);

    // 🔥 ROLE BASED STORAGE
    if (res.data.role === "DOCTOR") {
      localStorage.setItem('doctorId', res.data.id);
      localStorage.removeItem('patientId'); // safety
    }

    if (res.data.role === "PATIENT") {
      localStorage.setItem('patientId', res.data.id);
      localStorage.removeItem('doctorId'); // safety
    }

    setAuth({ token: res.data.token, role: res.data.role });

    navigate('/dashboard');

  } catch (err) {
    alert('Login failed: ' + (err.response?.data?.message || err.message));
  }
};

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20">

    {/* Heading */}
    <h1 className="text-4xl font-bold text-gray-800 mb-8">
      Login to Schedula
    </h1>

    {/* Login Card */}
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition duration-300"
        >
          Login
        </button>

      </form>

    </div>

  </div>
);
};

export default Login;