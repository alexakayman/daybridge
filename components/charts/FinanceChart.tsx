"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Dec", amount: 12654 },
  { month: "Jan", amount: 12654 },
  { month: "Feb", amount: 12654 },
  { month: "Mar", amount: 12654 },
  { month: "Apr", amount: 12654 },
  { month: "May", amount: 12654 },
  { month: "Jun", amount: 12654 },
];

const FinanceChart: React.FC = () => {
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Monthly Finance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Amount"]}
            labelStyle={{ color: "#666" }}
            contentStyle={{ backgroundColor: "#f3f4f6", border: "none" }}
          />
          <Bar
            dataKey="amount"
            fill="#9CA3AF"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
