import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TutorSearch from "./pages/student/TutorSearch";
import SessionBooking from "./pages/student/SessionBooking";
import Profile from "./pages/tutor/Profile";
import Earnings from "./pages/tutor/Earnings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  {/* ✅ Login is now the default page */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/student/tutor-search" element={<TutorSearch />} />
      <Route path="/student/book-session/:tutorId" element={<SessionBooking />} />
      <Route path="/tutor/profile" element={<Profile />} />
      <Route path="/tutor/earnings" element={<Earnings />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
