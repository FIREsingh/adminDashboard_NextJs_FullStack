import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className=" bg-slate-100 fixed p-8 w-24 m-auto rounded-2xl shadow-2xl min-w-96	 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
