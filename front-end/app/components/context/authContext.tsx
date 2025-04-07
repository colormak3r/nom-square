import type { EmployeeInfo } from "../../types/types";
import { createContext } from "react";

interface AuthContextProps {
  user: EmployeeInfo | null;
  setUser: (user: EmployeeInfo | null) => void;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
