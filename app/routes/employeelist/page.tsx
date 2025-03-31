import Navbar from "~/components/common/navbar";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function EmployeeList() {
  const data = [
    {
      id: "1",
      name: "John Doe",
      role: "Manager",
      email: "admin@gmail.com",
      password: "admin123",
      status: "active",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
