import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className=" bg-slate-600 p-8 rounded-md w-2/5">{children}</div>;
};

export default AuthLayout;
