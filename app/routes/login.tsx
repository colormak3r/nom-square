import React, { useState } from "react";
import NavBar from "../components/common/navbar";

export default function Login() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  return (
    <div className="h-screen bg-gradient-to-b from-red-300 to-orange-200 overflow-hidden">
      <NavBar />
      <div className="container mx-auto p-4 flex flex-col justify-center items-center h-full">
        <div className="p-4 rounded-lg shadow-md w-100 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-stone-900">Login</h1>
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col items-center"
          >
            <label className="text-stone-700 mt-4">Email</label>
            <input
              // name="email"
              // value={email}
              // onChange={handleChange}
              type="email"
              className="p-2 border border-stone-300 rounded-md"
            />
            <label className="text-stone-700 mt-4">Password</label>
            <input
              // name="password"
              // value={password}
              // onChange={handleChange}
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
    </div>
  );
}
