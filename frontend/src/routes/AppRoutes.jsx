import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/Dashboard";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* Protected routes-Student */}
      <Route
        path="/student"
        element={
          //<ProtectedRoute>
          <StudentDashboard />
          //</ProtectedRoute>
        }
      />
      {/* Protected routes-Admin */}
    </Routes>
  );
};

export default AppRoutes;
