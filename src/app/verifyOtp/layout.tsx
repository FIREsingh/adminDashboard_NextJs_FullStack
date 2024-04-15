import React, { FC, ReactNode } from "react";

interface VerifyOtpLayoutProps {
  children: ReactNode;
}
const VerifyOtpLayout: FC<VerifyOtpLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center items-starts items-center">
      {children}
    </div>
  );
};

export default VerifyOtpLayout;
