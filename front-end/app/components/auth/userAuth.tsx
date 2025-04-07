import { useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, setUser: () => {} }; // Return default values instead of throwing an error
  }
  return context;
};

export default useAuth;
