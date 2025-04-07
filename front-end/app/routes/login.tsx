import React, { use, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@app/config/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "@app/components/auth/userAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/menuedit", { replace: true });
    }
  }, [user, navigate, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Please fill out all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        console.log("User:", userCredential.user);
        navigate("/menuedit");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="p-4 rounded-lg shadow-md w-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-stone-900">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="text-stone-700 mt-4">Email</label>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            className="p-2 border border-stone-300 rounded-md"
          />
          <label className="text-stone-700 mt-4">Password</label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            className="p-2 border border-stone-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-stone-900 text-white p-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
