import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, ArrowRight, X } from 'lucide-react';
import { THINKARQ_KNOWLEDGE_BASE } from '@/lib/knowledge-base';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskTopic: (query: string) => void;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({ isOpen, onClose, onAskTopic }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 bg-slate-950/60 backdrop-blur-sm sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={event => event.stopPropagation()}
          className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-slate-900 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6 md:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="mb-2 flex min-w-0 flex-wrap items-center gap-2 pr-8">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-[#A3E635] text-black font-extrabold text-[11px] sm:text-xs shrink-0">
              KNOWLEDGE LIBRARY
            </span>
            <h3 className="min-w-0 flex-1 break-words text-base sm:text-xl font-bold text-slate-900 dark:text-white">
              ThinkArq Verified Documentation & Topics
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-5">
            Browse our knowledge base indexed directly from thinkarq.com. Click any article to ask the AI assistant.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THINKARQ_KNOWLEDGE_BASE.map(chunk => (
              <button
                key={chunk.id}
                onClick={() => {
                  onClose();
                  onAskTopic(`Tell me about ${chunk.section}: ${chunk.title}`);
                }}
                className="group text-left p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 hover:bg-[#A3E635]/15 border border-slate-200 dark:border-slate-700 hover:border-[#84CC16] transition flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">
                    {chunk.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-[#A3E635] mt-1">
                    {chunk.section}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {chunk.content}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-[#84CC16] font-bold">Ask AI →</span>
                  <span className="max-w-[55%] truncate text-right text-[10px] text-slate-400">{chunk.url.replace('https://www.thinkarq.com', '') || '/'}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
