import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { toast } from "sonner";

// pass collection name as parameter
export function useFirestoreActions(collectionName: string) {

  const createEmployeeAccount = async (data: any) => {
    try {
      const response = await fetch(`http://localhost:4000/api/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create user from backend");
      } else {
        toast.success("User created successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating user from backend:", error);
      toast.error("Failed to create user from backend.");
    }
  }

  // call api from backend to delete user
  const deleteDocument = async (id: string, uid: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete user from backend");
      } else {
        toast.success("User deleted successfully!");
        window.location.reload();
      }
    }
    catch (error) {
      console.error("Error deleting user from backend:", error);
      toast.error("Failed to delete user from backend.");
      return;
    }
  }

  const fetchEmployeesData = async (id: string, uid:string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/get-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, id }),
      });
      console.log("Response from backend:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch users from backend");
      }
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error fetching users from backend:", error);
    }
  };

  return { deleteDocument, createEmployeeAccount, fetchEmployeesData };
}
