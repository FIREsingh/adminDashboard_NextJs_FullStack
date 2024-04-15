import PageTitle from "@/components/PageTitle";
import LoginForm from "@/components/form/LoginForm";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="  justify-center flex flex-col items-center">
      <PageTitle title="Login" />
      <LoginForm />
    </div>
  );
}
