import React, { useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import type { EmployeeInfo } from "@app/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@app/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<EmployeeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "employees", firebaseUser.uid));
        const role = docSnap.exists() ? docSnap.data().role : "user";

        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "admin",
          role: role,
          orders: [],
        });

        localStorage.setItem("userRole", role);
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
