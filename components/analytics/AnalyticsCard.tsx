import React from "react";
import { formatAmount } from "@/lib/utils";
import AnimatedCounter from "@/components/AnimatedCounter";

const changeUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      clipRule="evenodd"
      d="M9.60003 5.6C9.38786 5.6 9.18438 5.51571 9.03435 5.36569C8.88432 5.21566 8.80003 5.01217 8.80003 4.8C8.80003 4.58783 8.88432 4.38434 9.03435 4.23431C9.18438 4.08429 9.38786 4 9.60003 4H13.6C13.8122 4 14.0157 4.08429 14.1657 4.23431C14.3157 4.38434 14.4 4.58783 14.4 4.8V8.8C14.4 9.01217 14.3157 9.21566 14.1657 9.36569C14.0157 9.51571 13.8122 9.6 13.6 9.6C13.3879 9.6 13.1844 9.51571 13.0343 9.36569C12.8843 9.21566 12.8 9.01217 12.8 8.8V6.7312L9.36563 10.1656C9.21561 10.3156 9.01216 10.3998 8.80003 10.3998C8.5879 10.3998 8.38446 10.3156 8.23443 10.1656L6.40003 8.3312L2.96563 11.7656C2.81475 11.9113 2.61267 11.992 2.40291 11.9901C2.19315 11.9883 1.9925 11.9042 1.84418 11.7559C1.69585 11.6075 1.61172 11.4069 1.60989 11.1971C1.60807 10.9874 1.68871 10.7853 1.83443 10.6344L5.83443 6.6344C5.98446 6.48442 6.1879 6.40017 6.40003 6.40017C6.61216 6.40017 6.81561 6.48442 6.96563 6.6344L8.80003 8.4688L11.6688 5.6H9.60003Z"
      fill="#57534E"
    />
  </svg>
);

const changeDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      clipRule="evenodd"
      d="M11.9999 12.9999C11.7347 12.9999 11.4803 13.1053 11.2928 13.2928C11.1053 13.4803 10.9999 13.7347 10.9999 13.9999C10.9999 14.2651 11.1053 14.5195 11.2928 14.707C11.4803 14.8946 11.7347 14.9999 11.9999 14.9999H16.9999C17.2651 14.9999 17.5195 14.8946 17.707 14.707C17.8946 14.5195 17.9999 14.2651 17.9999 13.9999V8.99992C17.9999 8.7347 17.8946 8.48035 17.707 8.29281C17.5195 8.10528 17.2651 7.99992 16.9999 7.99992C16.7347 7.99992 16.4803 8.10528 16.2928 8.29281C16.1053 8.48035 15.9999 8.7347 15.9999 8.99992V11.5859L11.7069 7.29292C11.5194 7.10545 11.2651 7.00013 10.9999 7.00013C10.7348 7.00013 10.4804 7.10545 10.2929 7.29292L7.99992 9.58592L3.70692 5.29292C3.51832 5.11076 3.26571 5.00997 3.00352 5.01224C2.74132 5.01452 2.49051 5.11969 2.3051 5.3051C2.11969 5.49051 2.01452 5.74132 2.01224 6.00352C2.00997 6.26571 2.11076 6.51832 2.29292 6.70692L7.29292 11.7069C7.48045 11.8944 7.73475 11.9997 7.99992 11.9997C8.26508 11.9997 8.51939 11.8944 8.70692 11.7069L10.9999 9.41392L14.5859 12.9999H11.9999Z"
      fill="#292524"
    />
  </svg>
);

interface AnalyticsCardProps {
  amount: number; // assuming amount is a number
  label: string;
  change: number; // assuming change is a number to represent percentage change
  active: boolean;
}

const AnalyticsCard = ({
  amount,
  label,
  change,
  active,
}: AnalyticsCardProps) => {
  return (
    <div className={`analytics-card ${active ? "is-active" : ""}`}>
      <div className="flex flex-col">
        <AnimatedCounter className="analytics-amount" amount={amount} />
        <p>{label}</p>
      </div>
      <div className="flex flex-row items-center">
        <div>{change > 0 ? changeUp : changeDown}</div>
        {change}%
      </div>
    </div>
  );
};

export default AnalyticsCard;
