import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import EditMenu from "./routes/menuedit";
import About from "./routes/about";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="employee" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="menuedit" element={<EditMenu />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
