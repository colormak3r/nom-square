import React from "react";
import NavBar from "../common/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
