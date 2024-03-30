import React from "react";
import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (

    <div className="flex gap-5 w-screen">

    <div className="grid grid-cols-[280px_auto] gap-7">

      <Sidebar />
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
}
