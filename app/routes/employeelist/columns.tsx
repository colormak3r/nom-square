import type { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Payment>[] = [
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
];
