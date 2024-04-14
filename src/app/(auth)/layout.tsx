import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className=" m-auto bg-slate-200 p-8 w-24 rounded-md shadow-md min-w-96	 ">
      {children}
    </div>
  );
};

export default AuthLayout;
