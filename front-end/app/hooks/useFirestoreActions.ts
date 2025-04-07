import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { toast } from "sonner";

// pass collection name as parameter
export function useFirestoreActions(collectionName: string) {
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

      console.log("Response from backend:", response);
      if (!response.ok) {
        throw new Error("Failed to delete user from backend");
      }
    }
    catch (error) {
      console.error("Error deleting user from backend:", error);
      toast.error("Failed to delete user from backend.");
      return;
    }
  }

  const updateDocument = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
      });
      toast.success("Document updated successfully!");
    } catch (err) {
      console.error(`Error updating ${collectionName}:`, err);
      toast.error("Failed to update.");
    }
  }

  return { deleteDocument, updateDocument  };
}
