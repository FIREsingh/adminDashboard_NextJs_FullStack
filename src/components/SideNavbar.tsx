"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";
import {
  Inbox,
  PanelRightClose,
  SquareChevronLeft,
  UsersRound,
} from "lucide-react";
import { Button } from "./ui/button";
type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[80px] border-r h-screen shadow-lg px-3 pb-10 pt-24 ">
      <div className=" absolute right-[-20px] top-7">
        <Button
          variant="secondary"
          onClick={toggleSidebar}
          className=" rounded-full p-2"
        >
          {isCollapsed ? <PanelRightClose /> : <SquareChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Admin Page",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "User Page",
            href: "/home",
            icon: Inbox,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
