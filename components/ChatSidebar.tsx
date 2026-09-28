import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenSquare,
  BookOpen,
  FolderKanban,
  Search,
  PanelLeftClose,
  PanelLeft,
  Trash2,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { ThinkArqLogo } from './ThinkArqLogo';

export interface ProjectChatOption {
  id: string;
  title: string;
  prompt: string;
}

export const PROJECT_CHAT_OPTIONS: ProjectChatOption[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    prompt: "I want help with an AI and machine learning project. Ask what I'm building and what stage it's at, then help with project-specific questions, technical decisions, progress updates, and next steps based on the details I share."
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    prompt: "I want help with a data engineering and analytics project. Ask about my data sources, goals, and current stage, then help with project-specific questions, implementation decisions, progress updates, and next steps based on the details I share."
  },
  {
    id: 'saas-software',
    title: 'SaaS & Software',
    prompt: "I want help with a SaaS or custom software project. Ask what we're building, who it's for, and its current stage, then help with project-specific questions, architecture, implementation, progress updates, and next steps based on the details I share."
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    prompt: "I want help with a UI/UX and product design project. Ask about the product, its users, and its current stage, then help with design questions, product decisions, progress updates, and next steps based on the details I share."
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    prompt: "I want help with a cloud architecture and DevOps project. Ask about my platform, constraints, and current stage, then help with architecture questions, implementation decisions, progress updates, and next steps based on the details I share."
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth',
    prompt: "I want help with a digital growth project. Ask about my business, audience, goals, and current stage, then help with marketing questions, strategy decisions, progress updates, and next steps based on the details I share."
  }
];

export interface ChatSession {
  id: string;
  title: string;
  timestamp: number;
  messages: any[];
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onClearHistory: () => void;
  onOpenLibrary: () => void;
  onSelectProject: (project: ProjectChatOption) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onToggle,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onClearHistory,
  onOpenLibrary,
  onSelectProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const filteredSessions = sessions.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 260 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 bottom-0 z-50 max-w-full bg-[#F9FAFB] dark:bg-[#0D0E15] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col overflow-hidden select-none ${
          isOpen ? 'shadow-xl lg:shadow-none' : 'pointer-events-none'
        }`}
      >
        <div className="w-full max-w-[260px] h-full flex flex-col p-3.5">
          {/* Top Header: Logo + Search + Collapse Button */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <ThinkArqLogo height={22} />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearch(prev => !prev)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Search past chats"
              >
                <Search size={16} />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Close sidebar"
              >
                <PanelLeftClose size={17} />
              </button>
            </div>
          </div>

          {/* Search Bar Input (when expanded) */}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                autoFocus
                className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-lime-500"
              />
            </motion.div>
          )}

          {/* New Chat Primary Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full mb-3 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-900 dark:text-slate-100 font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer group"
          >
            <PenSquare size={15} className="text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform" />
            <span>New chat</span>
          </button>

          {/* Navigation Links: Library & Projects */}
          <div className="space-y-1 mb-4">
            <button
              onClick={() => {
                onOpenLibrary();
                if (window.innerWidth < 1024) onToggle();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white text-xs font-medium transition cursor-pointer"
            >
              <BookOpen size={15} className="text-slate-500" />
              <span>Library</span>
            </button>
            <button
              type="button"
              aria-expanded={projectsOpen}
              onClick={() => setProjectsOpen(open => !open)}
              className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white text-xs font-medium transition cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <FolderKanban size={15} className="text-slate-500" />
                <span>Projects</span>
              </span>
              <ChevronDown size={14} className={`transition-transform ${projectsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {projectsOpen && (
            <div className="-mt-3 mb-3 ml-3 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-800">
              {PROJECT_CHAT_OPTIONS.map(project => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    onSelectProject(project);
                    setProjectsOpen(false);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                >
                  <MessageSquare size={13} className="shrink-0 text-lime-600 dark:text-lime-400" />
                  <span className="truncate">{project.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* RECENTS Section Header */}
          <div className="px-3 pb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
            Recents
          </div>

          {/* Recents Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredSessions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-slate-400 dark:text-slate-600">
                {sessions.length === 0 ? 'No conversations yet' : 'No matching chats'}
              </div>
            ) : (
              filteredSessions.map(session => {
                const isActive = session.id === currentSessionId;
                return (
                  <button
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session.id);
                      if (window.innerWidth < 1024) onToggle();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition cursor-pointer truncate flex items-center gap-2 ${
                      isActive
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white font-medium shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare size={13} className="shrink-0 text-slate-400" />
                    <span className="truncate">{session.title}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Actions: Clear History */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <button
              onClick={onClearHistory}
              disabled={sessions.length === 0}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Clear history</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
