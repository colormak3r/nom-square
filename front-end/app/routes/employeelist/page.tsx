import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CreateAccountDialog from "./createaccount";
import { db } from "@app/config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { useFirestoreActions } from "@app/hooks/useFirestoreActions";
export default function EmployeeList() {
  const [employeeData, setEmployeeData] = useState<any[]>([]);

  const { deleteDocument } = useFirestoreActions("employees");

  const fetchEmployeeData = async () => {
    const q = query(collection(db, "employees"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: new Date(doc.data().createdAt.seconds * 1000).toLocaleString(),
      updatedAt: new Date(doc.data().updatedAt.seconds * 1000).toLocaleString(),
    }));
    setEmployeeData(data);
    console.log("Employee Data:", data);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center gap-4 p-4 container mx-auto">
      <div className="flex items-center justify-center w-full gap-4">
        <h1 className="text-4xl font-bold text-stone-900 flex-grow text-center">
          Employee List
        </h1>
        <CreateAccountDialog />
      </div>
      <DataTable columns={columns} data={employeeData} />
    </div>
  );
}
