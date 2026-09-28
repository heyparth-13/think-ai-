import React from 'react';

interface ThinkArqLogoProps {
  className?: string;
  height?: number;
}

export const ThinkArqLogo: React.FC<ThinkArqLogoProps> = ({ className = '', height = 28 }) => {
  return (
    <div className={`flex items-center gap-1 font-extrabold tracking-tight select-none ${className}`}>
      <svg
        height={height}
        viewBox="0 0 130 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-950 dark:text-white transition-colors"
      >
        {/* Think */}
        <text
          x="2"
          y="27"
          fontFamily="system-ui, -apple-system, 'Inter', 'Outfit', sans-serif"
          fontSize="28"
          fontWeight="900"
          fill="currentColor"
          letterSpacing="-0.8px"
        >
          Think
        </text>
        {/* AI */}
        <text
          x="75"
          y="27"
          fontFamily="system-ui, -apple-system, 'Inter', 'Outfit', sans-serif"
          fontSize="28"
          fontWeight="900"
          fill="currentColor"
          letterSpacing="-0.8px"
        >
          AI
        </text>
      </svg>
    </div>
  );
};
