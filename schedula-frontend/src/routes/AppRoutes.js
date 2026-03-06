import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LandingPage from '../components/LandingPage';
import Signup from '../components/Signup';
import Login from '../components/Login';
import DoctorDashboard from '../components/DoctorDashboard';
import PatientDashboard from '../components/PatientDashboard';


const AppRoutes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        auth.token ? (auth.role === 'DOCTOR' ? <DoctorDashboard /> : <PatientDashboard />) : <Navigate to="/login" />
      } />
    </Routes>
  );
};

export default AppRoutes;