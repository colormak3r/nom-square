import { useContext } from "react";
import { auth } from "../../config/firebaseConfig";
import type { User } from "firebase/auth"; // Import the User type correctly
import { signOut } from "firebase/auth";
import AuthContext from "../context/authContext";

export default function Navbar() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, loading } = context;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-red-400 sticky top-0 shadow-md z-50">
      <a
        href="/"
        className="text-xl font-bold text-stone-700 border rounded-2xl p-4"
      >
        Nom<sup>2</sup>
      </a>
      <div className="flex flex-row space-x-4">
        <a
          href="/"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          Home
        </a>
        <p className="text-stone-700 font-semibold">•</p>
        <a
          href="/about"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          About Us
        </a>
        {!loading && user && (
          <>
            <p className="text-stone-700 font-semibold">•</p>
            <a
              href="/menuedit"
              className="text-stone-700 font-semibold hover:text-stone-900"
            >
              Menu Editor
            </a>

            {user.role === "Admin" && (
              <>
                <p className="text-stone-700 font-semibold">•</p>
                <a
                  href="/employeelist"
                  className="text-stone-700 font-semibold hover:text-stone-900"
                >
                  Employee List
                </a>
              </>
            )}
          </>
        )}
        <p className="text-stone-700 font-semibold">•</p>
        {!loading &&
          (user ? (
            <button
              onClick={handleLogout}
              className="text-stone-700 font-semibold hover:text-stone-900"
            >
              Logout
            </button>
          ) : (
            <a
              href="/employee"
              className="text-stone-700 font-semibold hover:text-stone-900"
            >
              Employee
            </a>
          ))}
      </div>
    </nav>
  );
}
