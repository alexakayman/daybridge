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

const CustomXAxisTick: React.FC<any> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x="-20"
        y="0"
        width="40"
        height="24"
        rx="12"
        ry="12"
        fill="#292524"
        stroke="white"
        strokeWidth="1"
        z-index={5}
      />
      <text x="0" y="16" textAnchor="middle" fill="white" fontSize="12">
        {payload.value}
      </text>
    </g>
  );
};

const FinanceChart: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="mb-2">Net Worth</h2>
      <p className="mb-4">{formatAmount(sum)}</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxisTick />}
            interval={0}
          />
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
            z-index={1}
            label={{ position: "top" }}
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
