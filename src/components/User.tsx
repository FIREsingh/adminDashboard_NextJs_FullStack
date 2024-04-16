// Users.tsx
import React, { useState } from "react";
import { Trash2, Pencil, Eye } from "lucide-react";
import { Button } from "./ui/button";

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

const Users: React.FC<Props> = ({ users }) => {
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const handleDelete = (index: number) => {
    // Implement delete functionality here
    console.log(`Deleting user at index ${index}`);
  };

  const handleEdit = (index: number) => {
    setEditableIndex(index);
    setEditedUser(users[index]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof User
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [key]: e.target.value });
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Saving changes:", editedUser);
    setEditableIndex(null);
    setEditedUser(null);
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
                  onChange={(e) => handleChange(e, "name")}
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
                // <button className="btn btn-xs btn-success" onClick={handleSave}>
                //   Save
                // </button>
                <Button onClick={handleSave}> Save </Button>
              ) : (
                <Pencil onClick={() => handleEdit(index)} />
              )}
              <Eye className=" text-blue-600" />
              <Trash2
                className=" text-red-400"
                onClick={() => handleDelete(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
