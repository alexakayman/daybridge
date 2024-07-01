import React from "react";
import Image from "next/image";
import UserCard from "./UserCard";
import Link from "next/link";

// Define the navLinks array with objects containing imgURL, route, and label for each link
const navLinks = [
  {
    imgURL: "/assets/icons/dashboard.svg", // Update with actual path to SVG or the SVG content itself
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/icons/accounts.svg",
    route: "/accounts",
    label: "Accounts",
  },
  {
    imgURL: "/assets/icons/transactions.svg",
    route: "/transactions",
    label: "Transactions",
  },
  {
    imgURL: "/assets/icons/recurring.svg",
    route: "/recurring",
    label: "Recurring",
  },
  {
    imgURL: "/assets/icons/taxes.svg",
    route: "/taxes",
    label: "Taxes",
  },
];

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
          {navLinks.map((link, index) => (
            <Link key={index} className="nav-link" href={link.route}>
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
