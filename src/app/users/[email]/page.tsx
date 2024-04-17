"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";

type User = {
  username: string;
  email: string;
  _id: string;
  role: string;
};

type Props = {
  params: { email: string };
};

const UserDetailPage = ({ params }: Props) => {
  const { email } = params;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/userData/${email}`);
        setUser(response.data?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  return (
    <>
      <PageTitle title="User Details" />
      <div className="flex h-full justify-center items-center m-auto">
        {user ? (
          <div className="p-10 rounded-2xl text-lg bg-slate-50 hover:scale-125 transition-all ease-out delay-100 shadow-md">
            <div className=" space-y-3">
              <p className=" text-4xl">
                <strong>Name:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>ID:</strong> {user._id}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default UserDetailPage;
