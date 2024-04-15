import PageTitle from "@/components/PageTitle";
import RegisterForm from "@/components/form/RegisterForm";
import React from "react";

type Props = {};

export default function RegisterPage({}: Props) {
  return (
    <div className=" h-auto justify-center flex flex-col items-center">
      <PageTitle title="Register" />
      <RegisterForm />
    </div>
  );
}
