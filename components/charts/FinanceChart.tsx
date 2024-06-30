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
import { formatAmount } from "@/lib/utils";

const data = [
  { month: "Dec", amount: 12654 },
  { month: "Jan", amount: 14201 },
  { month: "Feb", amount: 20386 },
  { month: "Mar", amount: 10893 },
  { month: "Apr", amount: 13847 },
  { month: "May", amount: 18402 },
  { month: "Jun", amount: 11976 },
];
const sum = data.reduce((acc, curr) => acc + curr.amount, 0);

const FinanceChart: React.FC = () => {
  return (
    <div className="w-full h-96">
      <h2>Net Worth</h2>
      <p className="mb-4">{formatAmount(sum)}</p>
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
            formatter={(value) => [`${formatAmount(value)}`, "Amount"]}
            labelStyle={{ color: "#666" }}
            contentStyle={{ backgroundColor: "#f3f4f6", border: "none" }}
          />
          <Bar
            dataKey="amount"
            fill="url(#gradient)"
            radius={12}
            barSize={90}
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="-39.24%"
            >
              <stop offset="0%" stopColor="#404248" />
              <stop offset="112.04%" stopColor="#717683" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
