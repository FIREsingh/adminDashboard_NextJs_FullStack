"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  email: string;
  _id: string;
  role: string;
};

type Props = {
  params: { email: string };
};

const EditByEmail = ({ params }: Props) => {
  const router = useRouter();
  const { email } = params;

  const [user, setUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/userData/${email}`);
        setUser(response.data?.data);
        setEditingUser(response.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log(editingUser);
    console.log("email ===>", email);
    try {
      const res = await axios.put(`/api/editByMail/${editingUser?.email}`, {
        username: editingUser?.username,
        role: editingUser?.role,
      });
      console.log(res);
      setUser(editingUser);
      setIsEditing(false);
      router.push("/users");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <PageTitle title="Edit User's Detail" />
      <div className="flex h-full justify-center items-center m-auto">
        {user ? (
          <div className="p-10 rounded-2xl text-lg">
            {isEditing ? (
              <div className="space-y-3 text-2xl">
                <div>
                  <strong>Name:</strong>
                  <input
                    className=" p-1 ml-3 border-b"
                    type="text"
                    name="username"
                    value={editingUser?.username || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <input
                    className="p-1 ml-3"
                    type="email"
                    name="email"
                    value={editingUser?.email || ""}
                    disabled // Disable editing for email
                  />
                </div>
                <div>
                  <strong>Role:</strong>{" "}
                  <select
                    className="p-1 ml-3 border-b"
                    name="role"
                    value={editingUser?.role || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="teacher">teacher</option>
                    <option value="student">student</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-2xl">
                <p>
                  <strong>Name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              {isEditing ? (
                <Button onClick={handleSave}>Save</Button>
              ) : (
                <Button onClick={handleEdit}>Edit</Button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default EditByEmail;
