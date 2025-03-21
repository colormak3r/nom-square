import React, { useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import type { EmployeeInfo } from "~/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/config/firebaseConfig";

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<EmployeeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          name: user.displayName || "admin",
          role: "user",
          orders: [],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
