"use client";

import React from "react";
import Image from "next/image";
import UserCard from "./UserCard";
import Link from "next/link";
import { sidebarLinks } from "../../constants";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <Image
          src={"/assets/Logo.svg"}
          width={202}
          height={36}
          alt="Daybridge"
        />
        <div className="nav-links">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              className={"nav-link"}
              href={`/dashboard/${link.route}`}
            >
              <Image
                src={link.imgURL}
                width={24}
                height={24}
                alt={link.label}
              />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <UserCard />
    </div>
  );
};

export default Sidebar;
