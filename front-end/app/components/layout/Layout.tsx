import React from "react";
import NavBar from "../common/navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-red-300 to-orange-200">
      <NavBar />
      <main className="mt-4">
        <Outlet />
        <Toaster position="top-right" />
      </main>
    </div>
  );
};

export default Layout;
