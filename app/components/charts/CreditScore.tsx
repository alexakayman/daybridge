"use client";

import React from "react";
interface CreditScoreIndicatorProps {
  score: number;
}

const CreditScoreIndicator: React.FC<CreditScoreIndicatorProps> = ({
  score = 850,
}) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedScore = (score - 300) / (850 - 300);
  const arc = normalizedScore * Math.PI;
  const circumference = Math.PI * radius;

  const gradientId = "scoreGradient";

  return (
    <div className="max-h-56">
      <svg className="w-full" viewBox="0 0 180 180">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9494" />
            <stop offset="50%" stopColor="#F8FF90" />
            <stop offset="100%" stopColor="#8DFF8D" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={`M 10 90 A ${radius} ${radius} 0 0 1 170 90`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Colored arc */}
        <path
          d={`M 10 90 A ${radius} ${radius} 0 0 1 170 90`}
          fill="none"
          stroke={"rgba(255, 255, 255, 1)"}
          strokeWidth={strokeWidth / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - normalizedScore)}
          strokeLinecap="round"
        />

        {/* Score text */}
        <text
          x="90"
          y="95"
          textAnchor="middle"
          fontSize="24"
          fontWeight="normal"
          fill="#292524"
        >
          {score}
        </text>

        {/* Min score */}
        <text x="0" y="110" fontSize="10" fill="#9f9693">
          300
        </text>

        {/* Max score */}
        <text x="180" y="110" fontSize="10" fill="#9f9693" textAnchor="end">
          850
        </text>
      </svg>
    </div>
  );
};

export default CreditScoreIndicator;
