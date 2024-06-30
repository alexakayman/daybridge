import React from "react";

interface CreditScoreIndicatorProps {
  score: number;
  minScore: number;
  maxScore: number;
}

const CreditScoreIndicator: React.FC<CreditScoreIndicatorProps> = ({
  score = 850,
  minScore = 300,
  maxScore = 850,
}) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedScore = (score - minScore) / (maxScore - minScore);
  const arc = normalizedScore * Math.PI;
  const circumference = Math.PI * radius;

  const gradientId = "scoreGradient";

  return (
    <div>
      <svg className="w-full h-full" viewBox="0 0 180 180">
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
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
        />

        {/* Colored arc */}
        <path
          d={`M 10 90 A ${radius} ${radius} 0 0 1 170 90`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - normalizedScore)}
          strokeLinecap="round"
        />

        {/* Score text */}
        <text
          x="90"
          y="80"
          textAnchor="middle"
          fontSize="26"
          fontWeight="normal"
          fill="#292524"
        >
          {score}
        </text>

        {/* Min score */}
        <text x="10" y="110" fontSize="12" fill="#9f9693">
          {minScore}
        </text>

        {/* Max score */}
        <text x="170" y="110" fontSize="12" fill="#9f9693" textAnchor="end">
          {maxScore}
        </text>
      </svg>
    </div>
  );
};

export default CreditScoreIndicator;
