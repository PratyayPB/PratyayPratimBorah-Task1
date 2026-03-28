import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
const StudentDashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1 pt-4">{children}</main>
    </div>
  );
};

export default StudentDashboardLayout;
