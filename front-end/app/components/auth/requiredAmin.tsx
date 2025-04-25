import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext"; // fix path if needed

type Props = {
  children: JSX.Element;
};

export default function RequireAdmin({ children }: Props) {
  const context = useContext(AuthContext);
  if (!context) return null;

  const { user, loading } = context;

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "Admin") {
    return <Navigate to="/401" replace />;
  }

  return children;
}
