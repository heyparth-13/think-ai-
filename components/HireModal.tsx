import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Bot, Database, Code2, Layout, ArrowRight, Check } from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHireRole: (roleQuery: string) => void;
}

export const HIRE_ROLES = [
  {
    role: 'AI & Machine Learning Engineers',
    skills: 'PyTorch, LangChain, LlamaIndex, OpenAI, Custom LLM fine-tuning, RAG pipelines',
    query: 'How can I hire dedicated AI and ML engineers from Think AI?'
  },
  {
    role: 'Data Engineers & Architects',
    skills: 'Snowflake, BigQuery, Databricks, Apache Kafka, Spark, dbt, Airflow',
    query: 'How can I hire data engineers for our data warehouse project?'
  },
  {
    role: 'Full-Stack Software Developers',
    skills: 'Next.js, React, Node.js, Python (FastAPI/Django), TypeScript, PostgreSQL',
    query: 'Can I hire full-stack developers for our custom SaaS application?'
  },
  {
    role: 'UI/UX & Product Designers',
    skills: 'Figma, Design Systems, Wireframing, UX Research, Interactive Prototyping',
    query: 'How do I hire senior UI/UX designers from Think AI?'
  }
];

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose, onHireRole }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 bg-slate-950/60 backdrop-blur-sm sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-slate-900 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6 md:p-8"
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
              HIRE TALENT
            </span>
            <h3 className="min-w-0 flex-1 break-words text-base sm:text-xl font-bold text-slate-900 dark:text-white">
              Hire Vetted Dedicated Engineers & Pods
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Scale your product roadmap with Think AI's pre-vetted senior tech talent under flexible engagement models.
          </p>

          <div className="space-y-3">
            {HIRE_ROLES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Users size={15} className="text-black dark:text-[#A3E635]" />
                    <span>{item.role}</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <strong className="text-slate-700 dark:text-slate-300">Stack:</strong> {item.skills}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onHireRole(item.query);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-[#A3E635] hover:bg-[#bef264] text-black shrink-0 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
            <span className="min-w-0 flex-1">Flexible Models: Dedicated Pods | Staff Augmentation | Milestones</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
