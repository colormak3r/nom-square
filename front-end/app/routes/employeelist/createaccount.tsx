import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "app/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "app/components/ui/select";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";
import type { CreateEmployeeAccountInfo } from "../../types/types";
import { toast } from "sonner";

export default function CreateAccountDialog() {
  const [employeeInfo, setEmployeeInfo] = useState<CreateEmployeeAccountInfo>({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeInfo),
      });
      if (!response.ok) {
        throw new Error("Failed to create user from backend");
      }
      const data = await response.json();
      console.log("Response from backend:", data);
      toast.success("Account created successfully!");
      setEmployeeInfo({
        name: "",
        email: "",
        password: "",
        role: "Admin",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating account from backend:", error);
      toast.error("Failed to create user from backend.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription>
            Fill in the account details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={employeeInfo.name}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={employeeInfo.email}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={employeeInfo.password}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={employeeInfo.role}
              onValueChange={(value) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  role: value as "Admin" | "Manager" | "Chef" | "Waiter",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Chef">Chef</SelectItem>
                <SelectItem value="Waiter">Waiter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
