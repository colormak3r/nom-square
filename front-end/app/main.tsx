import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./App";
import AuthProvider from "./components/auth/authProvider";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  //</React.StrictMode>
);
