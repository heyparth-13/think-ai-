import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Database, Layout, Code2, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceQuery: string) => void;
}

export const SERVICES_LIST = [
  {
    title: 'AI & Machine Learning Development',
    description: 'Custom LLMs, autonomous agents, RAG assistants, computer vision, and NLP.',
    icon: <Bot size={18} className="text-indigo-500" />,
    query: 'What AI solutions and custom LLMs does Think AI build?'
  },
  {
    title: 'Data Engineering & Cloud Warehousing',
    description: 'ETL pipelines, Snowflake, BigQuery, Databricks, Kafka, and data modeling.',
    icon: <Database size={18} className="text-cyan-500" />,
    query: 'What data engineering and data pipeline services do you offer?'
  },
  {
    title: 'Data Science & Predictive Analytics',
    description: 'Statistical modeling, churn prediction, forecasting, and data mining.',
    icon: <TrendingUp size={18} className="text-emerald-500" />,
    query: 'How does Think AI handle data science and predictive analytics?'
  },
  {
    title: 'Web & Custom SaaS Development',
    description: 'Full-stack Next.js, React, Node.js, Python, microservices, and cloud DevOps.',
    icon: <Code2 size={18} className="text-blue-500" />,
    query: 'Can Think AI build a custom SaaS platform or full-stack web application?'
  },
  {
    title: 'UI/UX Design & Systems',
    description: 'User research, wireframing, Figma interactive prototypes, and design systems.',
    icon: <Layout size={18} className="text-purple-500" />,
    query: 'What is Think AI’s UI/UX design process and capabilities?'
  },
  {
    title: 'Digital Marketing & Growth',
    description: 'Technical SEO, PPC campaigns (Google/Meta), SMM, and conversion rate optimization.',
    icon: <TrendingUp size={18} className="text-rose-500" />,
    query: 'How does Think AI provide digital marketing and SEO growth?'
  },
  {
    title: 'Hiring Talent & Dedicated Pods',
    description: 'Hire vetted AI developers, data engineers, and UI/UX designers on demand.',
    icon: <Users size={18} className="text-amber-500" />,
    query: 'How can I hire dedicated developers or engineers from Think AI?'
  }
];

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onSelectService
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 bg-slate-950/60 backdrop-blur-sm sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 sm:right-5 sm:top-5"
          >
            <X size={18} />
          </button>

          <h3 className="mb-1 break-words pr-10 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            Think AI Services & Capabilities
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Click any capability to ask Think AI about our implementation methodology, tech stack, or case studies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES_LIST.map((srv, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onClose();
                  onSelectService(srv.query);
                }}
                className="group text-left p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-xs">
                      {srv.icon}
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {srv.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Ask AI</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
