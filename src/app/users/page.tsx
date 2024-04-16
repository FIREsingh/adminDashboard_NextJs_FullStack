"use client";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import User from "@/components/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

type User = {
  username: string;
  email: string;
  role: string;
  password: string;
};

type Props = {};

const dummyUsers = [
  { username: "John Doe", email: "john@example.com", role: "Admin" },
  { username: "Jane Smith", email: "jane@example.com", role: "User" },
  { username: "Mike Johnson", email: "mike@example.com", role: "Moderator" },
  // Add more dummy user data as needed
];

const Users: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    role: "",
    password: "",
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

  const handleAddUser = async () => {
    setUsers([...users, newUser]);
    await axios
      .post("/api/adminRegister", newUser)
      .then((res) => {
        console.log("res is: ======>", res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewUser({ username: "", email: "", role: "", password: "" });
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
        <div className=" fixed -top-10 inset-0 flex items-center justify-center bg-black  bg-opacity-60">
          <div className="bg-white p-6 shadow-2xl min-w-72 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="mb-4">
              <Input
                name="username"
                placeholder="User's name"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Input
                name="email"
                placeholder="User's email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Input
                name="password"
                placeholder="User's password"
                value={newUser.password}
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
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
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
