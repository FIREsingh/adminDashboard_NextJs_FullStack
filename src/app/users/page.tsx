"use client";
import React, { useEffect, useState } from "react";
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

const Users: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);

  //fetch all users
  useEffect(() => {
    fetchedData();
  }, []);
  const fetchedData = async () => {
    const res = await axios.get("/api/allUserData");
    setUsers(res.data?.data);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  //add new-user handler
  const handleAddUser = async () => {
    console.log(newUser);
    setUsers([...users, newUser]);

    //==-================================================
    console.log("user:::====>>>", users);
    await axios
      .post("/api/adminRegister", newUser)
      .then((res) => {
        console.log(users);
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

      <User users={users} setUsers={setUsers} />

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
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
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
