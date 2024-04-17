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
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const roleOptions = ["student", "teacher", "admin"];

//================ user controller ====================
const Users: React.FC<Props> = ({ users, setUsers }) => {
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const router = useRouter();

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
      router.push(`/users/${email}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //delete button handler
  const handleDelete = (user: User) => {
    console.log(user);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete.email);
      await axios.get(`/api/deleteUser/${userToDelete.email}`);
      console.log("deleted");
      setUsers(users.filter((user) => user.email !== userToDelete.email));
      setShowDeleteModal(false);
    }
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  return (
    <div>
      <table className="border-collapse border rounded w-full">
        {/* Table Header */}
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
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 flex space-x-2">
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
                    onClick={() => handleDelete(user)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          message={`Do you want to delete ${userToDelete?.username}?`}
          onYes={handleDeleteConfirmed}
          onNo={() => setShowDeleteModal(false)}
        />
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <Modal
          message="Add user functionality goes here"
          onYes={() => {
            setShowAddModal(false);
          }}
          onNo={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

// Modal Component
const Modal: React.FC<{
  message: string;
  onYes: () => void;
  onNo: () => void;
}> = ({ message, onYes, onNo }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-xl">
        <p>{message}</p>
        <div className="flex justify-end mt-4 space-x-1">
          <Button onClick={onYes}>Yes</Button>
          <Button onClick={onNo}>No</Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
