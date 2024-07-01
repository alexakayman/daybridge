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
import AnimatedCounter from "@/components/AnimatedCounter";

const data = [
  { month: "December", amount: 12654.24 },
  { month: "January", amount: 14201.57 },
  { month: "February", amount: 20386.23 },
  { month: "March", amount: 10893.01 },
  { month: "April", amount: 13847.53 },
  { month: "May", amount: 18402.05 },
  { month: "June", amount: 11976.28 },
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
        {payload.value.substring(0, 3)}
      </text>
    </g>
  );
};

const FinanceChart: React.FC = () => {
  return (
    <div className="w-full h-full">
      <h2 className="mb-2">Net Worth</h2>
      <div className="mb-4">
        <AnimatedCounter amount={sum} />
      </div>

      <ResponsiveContainer width="100%" height="100%" minHeight={350}>
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
            tickFormatter={(value: number) => `$${value / 1000}k`} // Specify type as number
          />
          <Tooltip
            formatter={(value: number) => [`${formatAmount(value)}`, "Amount"]} // Specify type as number
            labelStyle={{ color: "#292524" }}
            contentStyle={{
              backgroundColor: "#FFF",
              border: "none",
              borderRadius: "12px",
            }}
          />
          <Bar
            dataKey="amount"
            fill="url(#gradient)"
            radius={12}
            barSize={90}
            z-index={1}
            label={{
              position: "top",
              formatter: (value: number) => formatAmount(value),
              fontSize: "14px",
            }}
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
