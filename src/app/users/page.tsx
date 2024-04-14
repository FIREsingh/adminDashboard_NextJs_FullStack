"use client";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import User from "@/components/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = {
  name: string;
  email: string;
  role: string;
};

type Props = {};

const dummyUsers = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
  { name: "Mike Johnson", email: "mike@example.com", role: "Moderator" },
  // Add more dummy user data as needed
];

const Users: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    role: "",
  });
  const [users, setUsers] = useState<User[]>(dummyUsers);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", role: "" });
    closeModal();
  };

  return (
    <div className="w-auto space-y-10">
      <div>
        <PageTitle title="Users" />
      </div>
      <div className="flex justify-between">
        <div className="w-2/12">
          <Input placeholder="Search for users..." />
        </div>
        <Button onClick={openModal}>+Add User</Button>
      </div>

      <User users={users} />

      {isModalOpen && (
        <div className="fixed -top-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="mb-4">
              <Input
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Input
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddUser}>Add</Button>
              <Button onClick={closeModal} variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
