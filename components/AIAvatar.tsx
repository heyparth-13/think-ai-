import React from 'react';
import { Bot } from 'lucide-react';

interface AIAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  isThinking?: boolean;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ size = 'md', isThinking = false }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-black text-[#A3E635] border border-slate-800 shadow-md shrink-0 ${sizeClasses[size]} ${
        isThinking ? 'animate-pulse' : ''
      }`}
    >
      <Bot size={iconSizes[size]} className="text-[#A3E635]" />
      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A3E635]"></span>
      </span>
    </div>
  );
};
