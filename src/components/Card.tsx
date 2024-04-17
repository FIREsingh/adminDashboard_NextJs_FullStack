import { LucideIcon } from "lucide-react";
import React from "react";

type CardProps = {
  title: string;
  icon: LucideIcon;
  count: string;
};

export default function Card(props: CardProps) {
  return (
    <div className=" shadow-md border p-7 flex justify-between rounded-3xl ">
      <div className=" space-y-8">
        <p className=" text-2xl text-gray-500">{props.title}</p>
        <p className=" text-5xl font-semibold ">{props.count}</p>
      </div>
      <div className=" ">
        {" "}
        <props.icon className=" h-10 w-10 text-gray-500 " />
      </div>
    </div>
  );
}
