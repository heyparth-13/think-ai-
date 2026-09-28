import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SuggestionChips } from './SuggestionChips';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectQuestion: (question: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectQuestion
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center my-auto py-2.5 sm:py-10 px-2 sm:px-4 max-w-5xl mx-auto"
    >
      {/* Top Trust Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs font-semibold shadow-xs mb-3 sm:mb-5"
      >
        <Sparkles size={12} className="text-[#84CC16] dark:text-[#A3E635] sm:w-[13px] sm:h-[13px]" />
        <span>Trusted by Growing Businesses</span>
      </motion.div>

      {/* Main Headline */}
      <h1 className="text-xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.2] sm:leading-[1.15] mb-2 sm:mb-3 max-w-3xl">
        How can <span className="underline decoration-[#A3E635] decoration-wavy decoration-2">Think AI</span> help you build smarter digital solutions?
      </h1>

      {/* Supporting text */}
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mb-3.5 sm:mb-8 leading-relaxed font-medium px-2">
        Ask about our AI development, data engineering, custom SaaS, UI/UX design systems, and digital growth capabilities.
      </p>

      {/* Suggestion Chips and Categories */}
      <div className="w-full">
        <SuggestionChips
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onSelectQuestion={onSelectQuestion}
        />
      </div>
    </motion.div>
  );
};
