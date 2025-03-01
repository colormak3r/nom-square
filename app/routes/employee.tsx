import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import type { Employee as EmployeeType } from "../types/types";

export default function Employee() {
  const [employees, setEmployees] = useState<EmployeeType>({
    name: "",
    age: 0,
    role: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployees((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "employees"), employees);
      console.log("Document written with ID: ", docRef.id);
      // Reset form
      setEmployees({
        name: "",
        age: 0,
        role: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen bg-gradient-to-b from-red-300 to-orange-200">
        <div className="container mx-auto p-4 flex flex-col justify-center items-center">
          <div className="p-4 rounded-lg shadow-md w-100 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-stone-900">Employee</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <label className="text-stone-700 mt-4">Name</label>
              <input
                name="name"
                value={employees.name}
                onChange={handleChange}
                type="text"
                className="p-2 border border-stone-300 rounded-md"
              />
              <label className="text-stone-700 mt-4">Age</label>
              <input
                name="age"
                value={employees.age}
                onChange={handleChange}
                type="number"
                className="p-2 border border-stone-300 rounded-md"
              />
              <label className="text-stone-700 mt-4">Role</label>
              <input
                name="role"
                value={employees.role}
                onChange={handleChange}
                type="text"
                className="p-2 border border-stone-300 rounded-md"
              />
              <button
                className="p-2 mt-4 bg-stone-700 text-white rounded-md"
                type="submit"
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
