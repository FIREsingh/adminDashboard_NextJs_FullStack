import React, { useState } from "react";
import { Trash2, Pencil, Eye } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  email: string;
  role: string;
  password: string;
};

type Props = {
  users: User[];
};

const roleOptions = ["student", "teacher", "admin"];

//================ user controller ====================
const Users: React.FC<Props> = ({ users }) => {
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const router = useRouter();

  const handleDelete = (index: number) => {
    // Implement delete functionality here
    console.log(`Deleting user at index ${index}`);
  };

  //edit button handler
  const handleEdit = (index: number) => {
    setEditableIndex(index);
    setEditedUser(users[index]);
  };

  //onChange handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof User
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [key]: e.target.value });
    }
  };

  // save button handler
  const handleSave = () => {
    console.log("Saving changes:", editedUser);
    setEditableIndex(null);
    setEditedUser(null);
  };

  //view button handler
  const viewHandler = async (email: string) => {
    try {
      console.log("ok");
      console.log("email is ==>", email);
      router.push(`/users/${email}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <table className="border-collapse border rounded w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="border p-2">
              {editableIndex === index ? (
                <input
                  type="text"
                  className=" border-b-2 p-1"
                  value={editedUser?.username}
                  onChange={(e) => handleChange(e, "username")}
                />
              ) : (
                user.username
              )}
            </td>
            <td className="border p-2">
              {editableIndex === index ? (
                <input
                  type="text"
                  className=" border-b-2 p-1"
                  value={editedUser?.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              ) : (
                user.email
              )}
            </td>
            <td className="border p-2">
              {editableIndex === index ? (
                <select
                  value={editedUser?.role}
                  onChange={(e) => handleChange(e, "role")}
                  className="px-2 py-1 border rounded"
                >
                  {roleOptions.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              ) : (
                user.role
              )}
            </td>
            <td className="border p-2 flex space-x-2">
              {editableIndex === index ? (
                <Button onClick={handleSave}> Save </Button>
              ) : (
                <div className=" flex space-x-4">
                  <Pencil
                    className="hover:scale-90  hover:transition-all"
                    onClick={() => handleEdit(index)}
                  />
                  <Eye
                    onClick={() => viewHandler(user.email)}
                    className=" hover:scale-90 text-blue-600 hover:transition-all  "
                  />
                  <Trash2
                    className="hover:scale-90  hover:transition-all  text-red-400"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
