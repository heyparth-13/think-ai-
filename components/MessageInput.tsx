import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2, Pencil, X, Check, Square } from 'lucide-react';
import { Message } from './ChatMessage';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  editingMessage?: Message | null;
  onCancelEdit?: () => void;
  onStopGeneration?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = "Ask Think AI about our services, solutions, or your project...",
  editingMessage = null,
  onCancelEdit,
  onStopGeneration
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync editing message text into input and focus
  useEffect(() => {
    if (editingMessage) {
      setInput(editingMessage.content);
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Adjust height
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
            textareaRef.current.setSelectionRange(
              textareaRef.current.value.length,
              textareaRef.current.value.length
            );
          }
        }, 50);
      }
    }
  }, [editingMessage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInput(prev => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${transcript}` : transcript;
          });
        };

        recognition.onerror = (err: any) => {
          console.error('Speech recognition error:', err);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleToggleVoice = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape' && editingMessage && onCancelEdit) {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleCancel = () => {
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      {/* Active editing message indicator banner */}
      {editingMessage && (
        <div className="mb-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#84CC16] dark:border-[#A3E635] shadow-xs flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 transition-all">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="p-1 rounded-md bg-[#84CC16]/15 dark:bg-[#A3E635]/20 text-slate-900 dark:text-[#A3E635] shrink-0">
              <Pencil size={13} />
            </span>
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <span className="font-bold text-slate-900 dark:text-white shrink-0">
                Editing message:
              </span>
              <span className="truncate text-slate-500 dark:text-slate-400 italic">
                "{editingMessage.content}"
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer flex items-center gap-1 shrink-0 active:scale-95"
            title="Cancel edit"
          >
            <X size={12} />
            <span>Cancel</span>
          </button>
        </div>
      )}

      <div className={`relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border-2 ${
        editingMessage
          ? 'border-[#84CC16] dark:border-[#A3E635] ring-2 ring-[#84CC16]/20'
          : 'border-slate-900 dark:border-slate-700'
      } shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] p-1.5 sm:p-2.5 transition-all`}>
        <div className="flex min-w-0 items-end gap-1.5 sm:gap-2">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={
              isRecording
                ? "Listening... Speak now..."
                : editingMessage
                ? "Modify your message and press Send to resubmit..."
                : placeholder
            }
            disabled={isLoading}
            className="min-w-0 flex-1 max-h-32 sm:max-h-36 min-h-[38px] sm:min-h-[44px] py-2 sm:py-2.5 px-2.5 sm:px-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm md:text-base outline-none resize-none font-medium disabled:opacity-60 leading-normal"
          />

          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 pb-0.5 sm:pb-1">
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              disabled={isLoading}
              title={isRecording ? "Stop listening" : "Voice input"}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-[#A3E635] hover:bg-slate-200 active:scale-95'
              }`}
            >
              {isRecording ? <MicOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Mic size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>

            {/* Send / Stop / Update Button */}
            {isLoading ? (
              <button
                type="button"
                onClick={onStopGeneration}
                title="Stop generation"
                className="p-2 sm:p-2.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white dark:bg-slate-100 dark:hover:bg-rose-500 dark:text-slate-900 dark:hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs active:scale-95 group"
              >
                <Square size={14} className="fill-current sm:w-[16px] sm:h-[16px]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!input.trim()}
                title={editingMessage ? "Update and resend message (Enter)" : "Send message (Enter)"}
                className={`p-2 sm:p-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  input.trim()
                    ? 'bg-[#A3E635] hover:bg-[#bef264] text-black shadow-xs transform hover:scale-105 active:scale-95'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                {editingMessage ? (
                  <Check size={16} className="text-black font-bold sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <Send size={16} className="translate-x-0.5 text-black sm:w-[18px] sm:h-[18px]" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1.5 sm:mt-2 flex items-center justify-between px-2 sm:px-3 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400 truncate">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#84CC16] shrink-0" />
          <span className="truncate">Think AI Intelligence & RAG</span>
        </span>
        <span className="hidden sm:inline shrink-0">
          {editingMessage ? (
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-800 dark:text-slate-200">Enter ↵</kbd> to update, <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-800 dark:text-slate-200">Esc</kbd> to cancel</span>
          ) : (
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-800 dark:text-slate-200">Enter ↵</kbd> to send</span>
          )}
        </span>
      </div>
    </div>
  );
};

