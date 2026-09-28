import React from 'react';
import { Calendar, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface ContactCTAProps {
  onBookCall: () => void;
  onContactUs: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onBookCall, onContactUs }) => {
  return (
    <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]">
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
        <span className="px-2 py-0.5 rounded-md bg-[#A3E635] text-black font-extrabold text-[10px] sm:text-[11px] shrink-0">
          PROJECT INQUIRY
        </span>
        <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
          Ready to build with Think AI?
        </h4>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
        Our solutions architects can review your requirements, provide an estimate, and map out a technical blueprint.
      </p>
      <div className="flex flex-col xs:flex-row sm:flex-row flex-wrap items-stretch sm:items-center gap-2">
        <button
          onClick={onBookCall}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold bg-[#A3E635] hover:bg-[#bef264] text-black shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Calendar size={13} />
          <span>Book Free Strategy Call</span>
        </button>
        <button
          onClick={onContactUs}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold bg-black dark:bg-slate-800 hover:bg-slate-800 text-white shadow-xs transition-all cursor-pointer"
        >
          <Mail size={13} />
          <span>Share Requirements</span>
          <ArrowRight size={12} className="text-[#A3E635]" />
        </button>
      </div>
    </div>
  );
};
