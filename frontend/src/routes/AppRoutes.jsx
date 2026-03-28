import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/Dashboard";
import StudentDashboardLayout from "../pages/student/StudentDashboardLayout";
import Groups from "../components/ui/GroupsList";
import Assignments from "../components/ui/AssignmentListPage";
import Submissions from "../components/ui/Submissions";
import AdminDashboardLayout from "../pages/admin/AdminDashboardLayout";
import AdminDashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* Protected routes-Student */}
      <Route path="/student" element={<StudentDashboardLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="groups" element={<Groups />} />
        <Route path="assignments" element={<Assignments />} />
      </Route>
      {/* Protected routes-Admin */}
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
