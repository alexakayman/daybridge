import React from "react";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";

const AnalyticsCardRow = () => {
  return (
    <div className="analytics-row flex flex-row items-stretch w-full">
      <AnalyticsCard
        amount={7249.01}
        label={"Bond ladder"}
        change={3.24}
        active={false}
      />
      <AnalyticsCard
        amount={12937.29}
        label={"Roth 401k"}
        change={3.24}
        active={true}
      />
      <AnalyticsCard
        amount={16824.72}
        label={"Roth IRA"}
        change={3.24}
        active={false}
      />
      <AnalyticsCard
        amount={9562.32}
        label={"Treasury Bills"}
        change={3.24}
        active={false}
      />
    </div>
  );
};

export default AnalyticsCardRow;
