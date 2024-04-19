"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import User from "@/components/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type User = {
  username: string;
  email: string;
  role: string;
  password: string;
};

type Props = {};

const Users: React.FC<Props> = () => {
  const limit = 3;
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, count]);

  const fetchData = async () => {
    const res = await axios.get(
      `/api/allUserData?page=${currentPage}&limit=${limit}`
    );
    setCount(res.data?.count);
    setUsers(
      res.data?.data.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
      })
    );
  };

  // Add pagination controls
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  //add button-handler inside modal
  const handleAddUser = async () => {
    console.log(newUser);
    setCount(count + 1);

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

  // Calculate pageCount
  const pageCount = Math.ceil(count / limit);

  // Generate pagination links
  const paginationLinks = [];
  for (let i = 1; i <= pageCount; i++) {
    paginationLinks.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          onClick={() => setCurrentPage(i)}
          className={
            currentPage === i ? "text-blue-500 border bg-slate-50 " : ""
          }
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="w-auto space-y-10">
      <div>
        <PageTitle title="All Users" />
      </div>
      <div className="flex justify-between">
        <div className="w-2/12">
          <Input placeholder="Search for users..." />
        </div>
        <Button onClick={openModal}>+Add User</Button>
      </div>

      <User
        users={users}
        setUsers={setUsers}
        count={count}
        setCount={setCount}
      />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={prevPage} />
          </PaginationItem>
          {paginationLinks}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={nextPage}
              disabled={currentPage >= pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
