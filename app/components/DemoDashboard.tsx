import React from "react";
import AnalyticsCardRow from "@/components/analytics/AnalyticsCardRow";
import Transactions from "@/components/Transactions";
import FinancialHealth from "@/components/FinancialHealth";
import FinanceChart from "@/components/charts/FinanceChart";
import { AuthButton } from "@/components/AuthButton";

const DemoDashboard: React.FC = () => {
  return (
    <section className="home flex flex-col flex-1 p-6 w-full">
      <div className="home-content w-full">
        <header className="flex flex-row justify-between w-full mb-6">
          <div className="flex flex-row gap-4 items-center w-full">
            <h1>Demo Overview</h1>
            <button className="button-timerange">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
              >
                <path
                  clipRule="evenodd"
                  d="M0.292787 0.299429C0.480314 0.111958 0.734622 0.00664243 0.999786 0.00664243C1.26495 0.00664243 1.51926 0.111958 1.70679 0.299429L4.99979 3.59243L8.29279 0.299429C8.38503 0.203919 8.49538 0.127736 8.61738 0.0753275C8.73939 0.0229185 8.87061 -0.0046678 9.00339 -0.00582162C9.13616 -0.00697543 9.26784 0.0183261 9.39074 0.0686069C9.51364 0.118888 9.62529 0.193141 9.71918 0.287034C9.81307 0.380926 9.88733 0.492578 9.93761 0.615475C9.98789 0.738371 10.0132 0.870051 10.012 1.00283C10.0109 1.13561 9.9833 1.26683 9.93089 1.38883C9.87848 1.51084 9.8023 1.62118 9.70679 1.71343L5.70679 5.71343C5.51926 5.9009 5.26495 6.00622 4.99979 6.00622C4.73462 6.00622 4.48031 5.9009 4.29279 5.71343L0.292787 1.71343C0.105316 1.5259 0 1.27159 0 1.00643C0 0.741265 0.105316 0.486957 0.292787 0.299429Z"
                  fill="#57534E"
                />
              </svg>
              Year to Date
            </button>
          </div>
          <AuthButton />
        </header>
        <div className="flex flex-col gap-6  w-full">
          <AnalyticsCardRow />
          <div className="card flex flex-row gap-6">
            <div className="flex flex-col w-9/12 gap-4">
              <FinanceChart />
              <Transactions />
            </div>
            <div className="flex flex-col w-3/12">
              <FinancialHealth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoDashboard;
