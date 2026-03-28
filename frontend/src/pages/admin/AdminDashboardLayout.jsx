import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const AdminDashboardLayout = () => {
  return (
    <div className="flex mr-10">
      <aside className="w-64 bg-gray-100 h-screen mr-10">
        <Sidebar />
      </aside>
      <main className="flex-1 pt-4">
        <Outlet className="ml-20 mr-10 min-h-screen pb-24" />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
