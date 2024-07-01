import Image from "next/image";
import React from "react";

// eventually integrate auth & user info here

const UserCard = () => {
  return (
    <div className="UserCard">
      <div>
        <div className="bio-content flex flex-row gap-2">
          <Image
            className="bio-image"
            src={"/assets/userheadshot.png"}
            height={45}
            width={45}
            alt="User Profile"
          />
          <div className="bio-text flex flex-col gap-1">
            <p className="bio-name">Alexa Kayman</p>
            <p className="bio-email">alexa@kayman.ventures</p>
          </div>
        </div>
      </div>
      <button className="dark-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M4.83333 8.83333V10.8333M7.5 8.83333V10.8333M10.1667 8.83333V10.8333M1.5 13.5H13.5M1.5 6.16667H13.5M1.5 4.16667L7.5 1.5L13.5 4.16667M2.16667 6.16667H12.8333V13.5H2.16667V6.16667Z"
            stroke="#F5F5F4"
            strokeWidth="1.33333"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Integrations
      </button>
    </div>
  );
};

export default UserCard;
