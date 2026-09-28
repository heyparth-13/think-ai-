import React from 'react';
import { motion } from 'framer-motion';
import { AIAvatar } from './AIAvatar';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-3 w-full max-w-2xl"
    >
      <AIAvatar size="md" isThinking={true} />
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
          Think AI is analyzing
        </span>
        <div className="flex items-center gap-1">
          <motion.span
            className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
