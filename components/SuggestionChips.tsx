import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface SuggestionCategory {
  id: string;
  label: string;
}

export const CATEGORIES: SuggestionCategory[] = [
  { id: 'all', label: 'All Services' },
  { id: 'ai', label: 'AI Solutions' },
  { id: 'data', label: 'Data & Analytics' },
  { id: 'software', label: 'Web & Software' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'growth', label: 'Digital Growth' }
];

export interface SuggestionQuestion {
  id: string;
  category: string;
  badge1: string;
  badge2: string;
  text: string;
  isLimeTheme?: boolean;
}

export const SUGGESTED_QUESTIONS: SuggestionQuestion[] = [
  {
    id: 'ai-1',
    category: 'ai',
    badge1: 'AI Development',
    badge2: 'Services',
    text: 'What AI solutions and custom LLMs does Think AI build?',
    isLimeTheme: true
  },
  {
    id: 'data-1',
    category: 'data',
    badge1: 'Data Analytics',
    badge2: 'Services',
    text: 'What data engineering and analytics pipelines do you provide?',
    isLimeTheme: false
  },
  {
    id: 'data-2',
    category: 'data',
    badge1: 'Data Science',
    badge2: 'Services',
    text: 'How does Think AI turn raw data into predictive intelligence?',
    isLimeTheme: true
  },
  {
    id: 'software-1',
    category: 'software',
    badge1: 'Web & Software',
    badge2: 'Development',
    text: 'Can Think AI build a custom SaaS platform or enterprise app?',
    isLimeTheme: false
  },
  {
    id: 'design-1',
    category: 'design',
    badge1: 'UI/UX Design',
    badge2: 'Systems',
    text: 'Can you design a modern UI/UX and design system for my product?',
    isLimeTheme: true
  },
  {
    id: 'data-3',
    category: 'data',
    badge1: 'Data Engineering',
    badge2: 'Services',
    text: 'What cloud data warehousing solutions (Snowflake/BigQuery) do you support?',
    isLimeTheme: false
  },
  {
    id: 'growth-1',
    category: 'growth',
    badge1: 'Digital Growth',
    badge2: 'Marketing',
    text: 'How does Think AI help businesses scale with SEO and PPC growth?',
    isLimeTheme: true
  },
  {
    id: 'contact-1',
    category: 'all',
    badge1: 'Consultation',
    badge2: 'Book a Call',
    text: 'How can I contact Think AI or hire dedicated developers?',
    isLimeTheme: false
  }
];

interface SuggestionChipsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectQuestion: (questionText: string) => void;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectQuestion
}) => {
  const filteredQuestions = selectedCategory === 'all'
    ? SUGGESTED_QUESTIONS
    : SUGGESTED_QUESTIONS.filter(q => q.category === selectedCategory || q.category === 'all');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3.5 sm:space-y-5">
      {/* Category Filter Pills (horizontal scroll on mobile, flex-wrap on tablet/desktop) */}
      <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 px-1 -mx-1 sm:mx-0 sm:flex-wrap">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#A3E635] text-black shadow-xs'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Think AI Style Cards Grid: 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 px-0.5 sm:px-1">
        {filteredQuestions.slice(0, 4).map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            onClick={() => onSelectQuestion(q.text)}
            className={`group relative text-left p-3 sm:p-5 rounded-2xl sm:rounded-[1.75rem] border-2 border-slate-900 dark:border-slate-700 transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.15)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] cursor-pointer flex flex-col justify-between min-h-[120px] sm:min-h-[160px] ${
              q.isLimeTheme
                ? 'bg-[#A3E635] text-black'
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
            }`}
          >
            {/* Top Badges */}
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-block">
                <span
                  className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-sm sm:rounded-md text-[9px] sm:text-xs font-black tracking-tight ${
                    q.isLimeTheme
                      ? 'bg-white text-black shadow-xs'
                      : 'bg-[#A3E635] text-black'
                  }`}
                >
                  {q.badge1}
                </span>
              </div>
              <div className="hidden xs:block sm:block">
                <span
                  className={`px-1.5 py-0.2 sm:px-2.5 sm:py-0.5 rounded-sm sm:rounded-md text-[9px] sm:text-xs font-black tracking-tight ${
                    q.isLimeTheme
                      ? 'bg-white text-black shadow-xs'
                      : 'bg-[#A3E635] text-black'
                  }`}
                >
                  {q.badge2}
                </span>
              </div>
            </div>

            {/* Bottom Action: Question snippet + Circular arrow button */}
            <div className="mt-2.5 sm:mt-4 flex items-end justify-between gap-1.5 sm:gap-2">
              <p className={`text-[11px] sm:text-xs font-medium line-clamp-2 leading-tight sm:leading-snug ${
                q.isLimeTheme ? 'text-black/85 font-semibold' : 'text-slate-600 dark:text-slate-300'
              }`}>
                {q.text}
              </p>

              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                <ArrowRight size={11} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
