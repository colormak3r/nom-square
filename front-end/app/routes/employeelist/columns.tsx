import type { ColumnDef } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useFirestoreActions } from ".../../../front-end/app/hooks/useFirestoreActions";

const { deleteDocument } = useFirestoreActions("employees");

export type EmployeeList = {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  uid: string; // Assuming uid is part of the data
};

export const columns: ColumnDef<EmployeeList>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: (info) => (
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => {
            const id = info.getValue() as string;
            const uid = info.row.original.uid as string;
            deleteDocument(id, uid);
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
];
