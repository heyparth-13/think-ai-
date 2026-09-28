import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AIAvatar } from './AIAvatar';
import { ContactCTA } from './ContactCTA';
import { BookingDetailsCard } from './BookingDetailsCard';
import { Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; url: string; section: string }[];
  showLeadCTA?: boolean;
  bookingRequest?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onBookCall: () => void;
  onContactUs: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onBookCall,
  onContactUs
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      className={`flex w-full mb-4 sm:mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}
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
            className={`chat-prose relative min-w-0 max-w-full break-words rounded-2xl sm:rounded-3xl px-3.5 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm shadow-xs leading-relaxed ${
              isUser
                ? 'bg-black text-white dark:bg-[#181926] dark:text-white rounded-tr-xs shadow-xs border border-slate-800'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-2 border-slate-900 dark:border-slate-700 rounded-tl-xs shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]'
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap leading-relaxed break-words">{message.content}</p>
            ) : (
              <div className="text-xs sm:text-sm space-y-1 overflow-hidden">
                {renderFormattedContent(message.content)}
              </div>
            )}

            {/* AI message footer (copy button, timestamp) */}
            {!isUser && (
              <div className="mt-2.5 sm:mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  Think AI
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-[11px]">{message.timestamp}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                    title="Copy response"
                  >
                    {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
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

          {/* Lead & Booking Call To Action */}
          {!isUser && (message.showLeadCTA || message.content.toLowerCase().includes('book a call') || message.content.toLowerCase().includes('contact')) && (
            <ContactCTA onBookCall={onBookCall} onContactUs={onContactUs} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
