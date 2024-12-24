import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminRegistration } from './components/admin/AdminRegistration';
import { AdminDashboard } from './components/admin/Dashboard';
import { UserDashboard } from './components/user/UserDashboard';
import { ThankYou } from './components/ThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/thank-you" element={<ThankYou userType="user" />} />
        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/admin/thank-you" element={<ThankYou userType="admin" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}