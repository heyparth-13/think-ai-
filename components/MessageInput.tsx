import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = "Ask Think AI about our services, solutions, or your project..."
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] p-1.5 sm:p-2.5 transition-all">
        <div className="flex min-w-0 items-end gap-1.5 sm:gap-2">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "Listening... Speak now..." : "Ask Think AI about services, tech stack, or your project..."}
            disabled={isLoading}
            className="min-w-0 flex-1 max-h-28 sm:max-h-32 min-h-[38px] sm:min-h-[44px] py-2 sm:py-2.5 px-2.5 sm:px-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm md:text-base outline-none resize-none font-medium disabled:opacity-60 leading-normal"
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

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              title="Send message (Enter)"
              className={`p-2 sm:p-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
                input.trim() && !isLoading
                  ? 'bg-[#A3E635] hover:bg-[#bef264] text-black shadow-xs transform hover:scale-105 active:scale-95'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin text-black sm:w-[18px] sm:h-[18px]" />
              ) : (
                <Send size={16} className="translate-x-0.5 text-black sm:w-[18px] sm:h-[18px]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-1.5 sm:mt-2 flex items-center justify-between px-2 sm:px-3 text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400 truncate">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#84CC16] shrink-0" />
          <span className="truncate">Think AI Intelligence & RAG</span>
        </span>
        <span className="hidden sm:inline shrink-0">
          Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-800 dark:text-slate-200">Enter ↵</kbd> to send
        </span>
      </div>
    </div>
  );
};
