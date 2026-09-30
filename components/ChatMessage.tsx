import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AIAvatar } from './AIAvatar';
import { ContactCTA } from './ContactCTA';
import { BookingDetailsCard } from './BookingDetailsCard';
import {
  Copy,
  Check,
  Pencil,
  ExternalLink,
  Sparkles,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight
} from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url: string; section: string }[];
  showLeadCTA?: boolean;
  bookingRequest?: boolean;
  isEdited?: boolean;
  followUps?: string[];
  feedback?: 'like' | 'dislike' | null;
}

interface ChatMessageProps {
  message: Message;
  onBookCall: () => void;
  onContactUs: () => void;
  onEdit?: (message: Message) => void;
  isBeingEdited?: boolean;
  onRegenerate?: (messageId: string) => void;
  onFeedback?: (messageId: string, type: 'like' | 'dislike') => void;
  onSelectFollowUp?: (questionText: string) => void;
  isLastAssistant?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onBookCall,
  onContactUs,
  onEdit,
  isBeingEdited = false,
  onRegenerate,
  onFeedback,
  onSelectFollowUp,
  isLastAssistant = false
}) => {
  const [copied, setCopied] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedbackClick = (type: 'like' | 'dislike') => {
    if (onFeedback) {
      onFeedback(message.id, type);
      setFeedbackToast(type === 'like' ? 'Thanks for the positive feedback!' : 'Feedback recorded. We will improve.');
      setTimeout(() => setFeedbackToast(null), 2500);
    }
  };

  // Markdown-like parser for clean rendering
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Heading lines
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-bold text-sm mt-3 mb-1 text-slate-950 dark:text-slate-100">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-extrabold text-base mt-3 mb-1 text-slate-950 dark:text-slate-100">
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const bulletText = line.trim().replace(/^[-•]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] dark:bg-[#A3E635] mt-2 shrink-0" />
            <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineStyles(bulletText) }} />
          </div>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        const match = line.trim().match(/^(\d+)\.\s*(.*)$/);
        if (match) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="text-xs font-black text-black dark:text-[#A3E635] mt-0.5 shrink-0 min-w-4">
                {match[1]}.
              </span>
              <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineStyles(match[2]) }} />
            </div>
          );
        }
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Standard paragraph
      return (
        <p
          key={idx}
          className="my-1 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInlineStyles(line) }}
        />
      );
    });
  };

  const formatInlineStyles = (text: string) => {
    // Bold **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-950 dark:text-white">$1</strong>');
    // Markdown link [text](url)
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-black dark:text-[#A3E635] font-semibold underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-0.5">$1</a>'
    );
    // Inline code `code`
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-[#A3E635] text-xs font-mono">$1</code>');
    return formatted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`group flex w-full mb-4 sm:mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex w-full min-w-0 items-start gap-2 sm:gap-3 max-w-[96%] sm:max-w-[88%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="shrink-0 mt-0.5">
            <AIAvatar size="md" />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 overflow-hidden">
          {/* Message Bubble */}
          <div
            className={`chat-prose relative min-w-0 max-w-full break-words rounded-2xl sm:rounded-3xl px-3.5 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm shadow-xs leading-relaxed transition-all duration-200 ${
              isUser
                ? `bg-black text-white dark:bg-[#181926] dark:text-white rounded-tr-xs shadow-xs border ${
                    isBeingEdited
                      ? 'border-[#A3E635] ring-2 ring-[#A3E635]/40'
                      : 'border-slate-800'
                  }`
                : `bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-2 ${
                    isBeingEdited
                      ? 'border-[#84CC16] ring-2 ring-[#84CC16]/40'
                      : 'border-slate-900 dark:border-slate-700'
                  } rounded-tl-xs shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]`
            }`}
          >
            {isUser ? (
              <>
                <p className="whitespace-pre-wrap leading-relaxed break-words">{message.content}</p>
                {/* User message action footer with Copy & Edit */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-[11px] text-slate-400">{message.timestamp}</span>
                    {message.isEdited && (
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        Edited
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white active:scale-95 transition cursor-pointer"
                      title="Copy message"
                      aria-label="Copy message"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span className="text-[10px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(message)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#A3E635] active:scale-95 transition cursor-pointer"
                        title="Edit and resend message"
                        aria-label="Edit message"
                      >
                        <Pencil size={12} />
                        <span className="text-[10px] font-medium">Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs sm:text-sm space-y-1 overflow-hidden">
                  {renderFormattedContent(message.content)}
                </div>

                {/* AI message footer (copy, edit, regenerate, thumbs up/down, timestamp) */}
                <div className="mt-2.5 sm:mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      Think AI
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
                      {message.timestamp}
                    </span>
                    {feedbackToast && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium animate-fadeIn">
                        {feedbackToast}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {/* Copy button */}
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 active:scale-95 transition cursor-pointer"
                      title="Copy response"
                      aria-label="Copy response"
                    >
                      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span className="text-[10px] font-medium hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    {/* Edit button */}
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(message)}
                        className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-black dark:hover:text-[#A3E635] active:scale-95 transition cursor-pointer"
                        title="Edit in input box"
                        aria-label="Edit in input box"
                      >
                        <Pencil size={12} />
                        <span className="text-[10px] font-medium hidden sm:inline">Edit</span>
                      </button>
                    )}

                    {/* Regenerate button */}
                    {onRegenerate && (
                      <button
                        type="button"
                        onClick={() => onRegenerate(message.id)}
                        className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer ${
                          isLastAssistant ? 'text-lime-600 dark:text-lime-400 font-semibold' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                        title="Regenerate this answer"
                        aria-label="Regenerate answer"
                      >
                        <RotateCw size={12} />
                        <span className="text-[10px] font-medium hidden sm:inline">Regenerate</span>
                      </button>
                    )}

                    {/* Thumbs Up button */}
                    {onFeedback && (
                      <button
                        type="button"
                        onClick={() => handleFeedbackClick('like')}
                        className={`p-1 sm:px-1.5 sm:py-1 rounded-md transition cursor-pointer active:scale-95 ${
                          message.feedback === 'like'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-600'
                        }`}
                        title="Good answer"
                        aria-label="Thumbs up"
                      >
                        <ThumbsUp size={12} className={message.feedback === 'like' ? 'fill-current' : ''} />
                      </button>
                    )}

                    {/* Thumbs Down button */}
                    {onFeedback && (
                      <button
                        type="button"
                        onClick={() => handleFeedbackClick('dislike')}
                        className={`p-1 sm:px-1.5 sm:py-1 rounded-md transition cursor-pointer active:scale-95 ${
                          message.feedback === 'dislike'
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600'
                        }`}
                        title="Poor answer"
                        aria-label="Thumbs down"
                      >
                        <ThumbsDown size={12} className={message.feedback === 'dislike' ? 'fill-current' : ''} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {!isUser && message.bookingRequest && (
            <BookingDetailsCard />
          )}

          {/* Sources badge pills if available */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-1 pl-1 sm:pl-2">
              <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 shrink-0">
                <Sparkles size={11} className="text-[#84CC16]" /> Sources:
              </span>
              {message.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-[200px] sm:max-w-xs truncate items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-[#A3E635]/20 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-[#A3E635] border border-slate-200 dark:border-slate-700 transition"
                >
                  <span className="truncate">{src.section || 'Think AI Knowledge'}</span>
                  <ExternalLink size={9} className="shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* Smart follow-up question chips */}
          {!isUser && onSelectFollowUp && message.followUps && message.followUps.length > 0 && (
            <div className="mt-2 space-y-1.5 pl-1 sm:pl-2">
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CornerDownRight size={11} className="text-[#84CC16]" /> Suggested follow-ups:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.followUps.map((question, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectFollowUp(question)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-left text-[11px] sm:text-xs bg-white dark:bg-slate-900 hover:bg-lime-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-[#A3E635] border border-slate-200 dark:border-slate-700 hover:border-lime-500 transition shadow-xs cursor-pointer active:scale-98"
                  >
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lead & Booking Call To Action (Hidden in booking section) */}
          {!isUser && !message.bookingRequest && message.showLeadCTA && (
            <ContactCTA onBookCall={onBookCall} onContactUs={onContactUs} />
          )}
        </div>
      </div>
    </motion.div>
  );
};


