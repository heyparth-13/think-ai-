import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Target, Zap, Shield, ArrowRight, ExternalLink } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAbout: (query: string) => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onAskAbout }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 bg-slate-950/60 backdrop-blur-sm sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2.5 mb-4 pr-8">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm shrink-0">
              T
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                About Think AI
              </h3>
              <p className="text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Think. Build. Disrupt.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Think AI is a premier digital solutions and AI engineering partner. We specialize in transforming complex business challenges into scalable AI systems, modern data pipelines, bespoke SaaS platforms, and user-centric digital experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-1 text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                <Target size={14} />
                <span>Strategic Vision</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Architecting products that drive tangible revenue growth and operational agility.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-1 text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                <Zap size={14} />
                <span>Elite Engineering</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Top-tier AI researchers, data architects, and senior full-stack engineers.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Ask Think AI directly:
            </h4>
            <button
              onClick={() => {
                onClose();
                onAskAbout('What is Think AI\'s philosophy and company mission?');
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs text-indigo-700 dark:text-indigo-300 transition flex items-center justify-between cursor-pointer"
            >
              <span className="min-w-0 break-words">"What is Think AI's philosophy and company mission?"</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>
            <button
              onClick={() => {
                onClose();
                onAskAbout('How does Think AI help businesses scale?');
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs text-indigo-700 dark:text-indigo-300 transition flex items-center justify-between cursor-pointer"
            >
              <span className="min-w-0 break-words">"How does Think AI help businesses scale?"</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
            <a
              href="https://www.thinkarq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Visit thinkai.com</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
