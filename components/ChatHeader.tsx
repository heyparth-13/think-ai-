import React, { useState } from 'react';
import {
  PanelLeft,
  Calendar,
  Download,
  Plus,
  Moon,
  Sun,
  Check
} from 'lucide-react';
import { ThinkArqLogo } from './ThinkArqLogo';

interface ChatHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
  onBookCall: () => void;
  onExportChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onToggleSidebar,
  onBookCall,
  onExportChat,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportClick = () => {
    onExportChat();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-1.5 sm:top-2 z-30 w-full max-w-6xl mx-auto px-2 sm:px-4">
      <div className="flex min-w-0 items-center justify-between gap-1.5 sm:gap-3 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm transition-all">
        {/* Left: Sidebar Toggle + ThinkArq Logo + AI ASSISTANT Badge */}
        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            className="p-1.5 sm:p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
            title="Open chats sidebar"
          >
            <PanelLeft size={18} className="sm:w-[19px] sm:h-[19px]" />
          </button>

          <button
            onClick={handleReloadPage}
            className="flex items-center gap-1.5 group cursor-pointer focus:outline-hidden"
            title="Reload page"
            aria-label="Reload page"
          >
            <ThinkArqLogo height={22} className="sm:hidden" />
            <ThinkArqLogo height={26} className="hidden sm:block" />
          </button>

          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A3E635]/20 dark:bg-[#A3E635]/15 border border-[#A3E635]/60 text-slate-900 dark:text-[#A3E635] text-[10px] font-bold tracking-wide select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] dark:bg-[#A3E635] animate-pulse" />
            AI ASSISTANT
          </div>
        </div>

        {/* Right: Book a Call, Download, + (Reload), Dark Mode Toggle */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* "Book a Call 🟢" Dark Pill Button */}
          <button
            onClick={onBookCall}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold bg-[#111827] hover:bg-[#1F2937] dark:bg-black dark:hover:bg-slate-900 text-white shadow-xs transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95 border border-slate-700/40 shrink-0"
          >
            <span className="whitespace-nowrap">Book Call</span>
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#A3E635]"></span>
            </span>
          </button>

          {/* Export / Download Chat Transcript Button */}
          <button
            onClick={handleExportClick}
            aria-label="Download Chat Transcript"
            title="Download Chat Transcript"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 active:scale-95 shadow-xs flex items-center justify-center transition cursor-pointer shrink-0"
          >
            {downloadSuccess ? <Check size={14} className="text-emerald-500 sm:w-4 sm:h-4" /> : <Download size={14} className="sm:w-4 sm:h-4" />}
          </button>

          {/* + Reload Page Button */}
          <button
            onClick={handleReloadPage}
            aria-label="New Session"
            title="Start New Session"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 active:scale-95 shadow-xs flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <Plus size={15} className="sm:w-4 sm:h-4" />
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 active:scale-95 shadow-xs flex items-center justify-center transition cursor-pointer shrink-0"
          >
            {darkMode ? <Sun size={14} className="text-amber-400 sm:w-4 sm:h-4" /> : <Moon size={14} className="sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
