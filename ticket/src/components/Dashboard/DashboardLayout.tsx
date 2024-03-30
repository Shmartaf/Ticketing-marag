import React from "react";
import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex gap-5 w-screen">
      <Sidebar />
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
}
