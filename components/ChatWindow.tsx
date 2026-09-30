import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatSidebar, ChatSession, ProjectChatOption } from './ChatSidebar';
import { HeroSection } from './HeroSection';
import { ChatMessage, Message } from './ChatMessage';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { LeadCaptureModal } from './LeadCaptureModal';
import { AboutModal } from './AboutModal';
import { ServicesModal } from './ServicesModal';
import { HireModal } from './HireModal';
import { LibraryModal } from './LibraryModal';
import { BookingsHistoryModal } from './BookingsHistoryModal';
import { ConfirmedBooking, getStoredBookings } from '@/lib/bookings';
import { RotateCcw, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'thinkarq_ai_sessions_v1';

export const ChatWindow: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

  // Modals state
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);
  const [leadRequirement, setLeadRequirement] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load sessions and bookings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSessions(parsed);
          }
        }
      } catch (e) {
        console.error('Error loading saved sessions:', e);
      }

      // Load initial bookings
      setBookings(getStoredBookings());

      // Listen for bookings updates
      const handleBookingsUpdate = (e: any) => {
        if (e.detail && Array.isArray(e.detail)) {
          setBookings(e.detail);
        }
      };
      window.addEventListener('thinkarq_bookings_updated', handleBookingsUpdate);
      return () => window.removeEventListener('thinkarq_bookings_updated', handleBookingsUpdate);
    }
  }, []);

  // Save sessions to localStorage when updated
  const saveSessionsToStorage = (updatedSessions: ChatSession[]) => {
    setSessions(updatedSessions);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
    } catch (e) {
      console.error('Error saving sessions:', e);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading]);

  const handleStartEdit = (msg: Message) => {
    setEditingMessage(msg);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    const updatedMessages = messages.map(m =>
      m.id === messageId ? { ...m, feedback: m.feedback === type ? null : type } : m
    );
    setMessages(updatedMessages);

    if (currentSessionId) {
      const nextSessions = sessions.map(s =>
        s.id === currentSessionId ? { ...s, messages: updatedMessages } : s
      );
      saveSessionsToStorage(nextSessions);
    }
  };

  const handleRegenerate = async (messageId: string) => {
    if (isLoading) return;

    // Find the assistant message and its previous user prompt
    const aiIndex = messages.findIndex(m => m.id === messageId);
    if (aiIndex === -1) return;

    // Locate the user prompt that triggered this assistant message
    const userPromptIndex = messages.slice(0, aiIndex).reverse().findIndex(m => m.role === 'user');
    if (userPromptIndex === -1) return;

    const actualUserIndex = aiIndex - 1 - userPromptIndex;
    const userMessage = messages[actualUserIndex];
    if (!userMessage) return;

    // Slice message list up to the user message
    const historyBeforePrompt = messages.slice(0, actualUserIndex);
    const newMessages = [...historyBeforePrompt, userMessage];
    setMessages(newMessages);

    // Cancel any previous controller and set up a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setErrorMessage(null);

    const sessionId = currentSessionId;
    let nextSessions = sessions;

    try {
      const historyPayload = historyBeforePrompt.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: userMessage.content,
          history: historyPayload
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        showLeadCTA: data.showLeadCTA,
        bookingRequest: data.bookingRequest,
        followUps: data.followUps
      };

      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      if (sessionId) {
        nextSessions = nextSessions.map(s =>
          s.id === sessionId ? { ...s, timestamp: Date.now(), messages: finalMessages } : s
        );
        saveSessionsToStorage(nextSessions);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Regeneration stopped by user.');
        return;
      }
      console.error('Chat error during regeneration:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = async (text: string, newSessionTitle?: string) => {
    if (!text.trim() || isLoading) return;

    setErrorMessage(null);

    // Setup abort controller
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let previousMessages: Message[] = [];
    let userMsg: Message;
    let isEditingSessionStart = false;

    if (editingMessage && editingMessage.role === 'user') {
      // Find the index of the message being edited
      const targetIndex = messages.findIndex(m => m.id === editingMessage.id);
      if (targetIndex !== -1) {
        // Keep clean history prior to this message
        previousMessages = messages.slice(0, targetIndex);
        if (targetIndex === 0) {
          isEditingSessionStart = true;
        }
      } else {
        previousMessages = messages;
      }

      userMsg = {
        id: editingMessage.id,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEdited: true
      };
      setEditingMessage(null);
    } else {
      previousMessages = newSessionTitle ? [] : messages;
      userMsg = {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setEditingMessage(null);
    }

    const newMessages = [...previousMessages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    // Update or create session
    let sessionId = newSessionTitle ? null : currentSessionId;
    let nextSessions = sessions;
    const generatedTitle = text.trim().slice(0, 38) + (text.length > 38 ? '...' : '');

    if (!sessionId) {
      sessionId = `session_${Date.now()}`;
      setCurrentSessionId(sessionId);
      const newSession: ChatSession = {
        id: sessionId,
        title: newSessionTitle || generatedTitle,
        timestamp: Date.now(),
        messages: newMessages
      };
      nextSessions = [newSession, ...sessions];
      saveSessionsToStorage(nextSessions);
    } else if (isEditingSessionStart) {
      // Update session title if first prompt was edited
      nextSessions = nextSessions.map(s =>
        s.id === sessionId ? { ...s, title: generatedTitle, messages: newMessages } : s
      );
      saveSessionsToStorage(nextSessions);
    }

    try {
      const historyPayload = previousMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        showLeadCTA: data.showLeadCTA,
        bookingRequest: data.bookingRequest,
        followUps: data.followUps
      };

      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      // Update session in storage
      nextSessions = nextSessions.map(s =>
        s.id === sessionId ? { ...s, timestamp: Date.now(), messages: finalMessages } : s
      );
      saveSessionsToStorage(nextSessions);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Chat generation stopped by user.');
        return;
      }
      console.error('Chat error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      const fallbackAiMsg: Message = {
        id: `ai_err_${Date.now()}`,
        role: 'assistant',
        content: "I ran into an issue connecting to the ThinkArq knowledge base. You can reach out directly to **contact@thinkarq.com**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showLeadCTA: true
      };
      const finalMessages = [...newMessages, fallbackAiMsg];
      setMessages(finalMessages);
      nextSessions = nextSessions.map(s =>
        s.id === sessionId ? { ...s, timestamp: Date.now(), messages: finalMessages } : s
      );
      saveSessionsToStorage(nextSessions);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStartProjectChat = (project: ProjectChatOption) => {
    void handleSendMessage(project.prompt, project.title);
  };

  const handleNewChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setCurrentSessionId(null);
    setErrorMessage(null);
    setSelectedCategory('all');
    setEditingMessage(null);
    setIsLoading(false);
  };

  const handleSelectSession = (id: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    const found = sessions.find(s => s.id === id);
    if (found) {
      setCurrentSessionId(found.id);
      setMessages(found.messages || []);
      setErrorMessage(null);
      setEditingMessage(null);
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your chat history?')) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setSessions([]);
      setMessages([]);
      setCurrentSessionId(null);
      setEditingMessage(null);
      setIsLoading(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) {
      alert('No messages to export in the current session.');
      return;
    }

    const transcript = messages
      .map(
        m =>
          `[${m.timestamp}] ${m.role === 'user' ? 'USER' : 'THINKARQ AI'}:\n${m.content}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([`# ThinkArq AI Chat Transcript\nExported: ${new Date().toLocaleString()}\n\n${transcript}`], {
      type: 'text/markdown;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thinkarq-chat-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openContactWithRequirement = (reqText?: string) => {
    setLeadRequirement(reqText || (messages.length > 0 ? messages[messages.length - 1]?.content : ''));
    setIsLeadCaptureOpen(true);
  };

  // Find index of the last assistant message
  const lastAssistantIndex = messages.map(m => m.role).lastIndexOf('assistant');

  return (
    <div className="relative flex min-h-dvh min-w-0 overflow-x-hidden bg-[#FAF9FC] text-slate-900 transition-colors duration-300 selection:bg-[#A3E635] selection:text-black dark:bg-[#0B0C16] dark:text-slate-100">
      {/* Left Sidebar Panel */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(prev => !prev)}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onSelectProject={handleStartProjectChat}
        onOpenBookings={() => setIsBookingsOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Main Content Area (pushes when sidebar opens on desktop) */}
      <div
        className={`min-w-0 flex-1 flex flex-col min-h-dvh transition-all duration-300 ${
          isSidebarOpen ? 'lg:pl-[260px]' : 'pl-0'
        }`}
      >
        {/* Header */}
        <ChatHeader
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          onBookCall={() => {
            if (bookings.length > 0) {
              setIsBookingsOpen(true);
            } else {
              handleSendMessage('I want to book a 30-minute discovery call for my project.');
            }
          }}
          onExportChat={handleExportChat}
        />

        {/* Main Conversation or Hero */}
        <main className="flex-1 flex flex-col justify-between max-w-5xl w-full mx-auto px-2.5 sm:px-6 pt-1 sm:pt-2 pb-24 sm:pb-32">
          {messages.length === 0 ? (
            <HeroSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectQuestion={handleSendMessage}
            />
          ) : (
            <div className="w-full max-w-4xl mx-auto pt-4 pb-6 flex flex-col">
              {/* Active Conversation header */}
              <div className="flex items-center justify-between px-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-[#84CC16]" /> Think AI Active Session
                </span>
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-1 hover:text-black dark:hover:text-[#A3E635] font-semibold transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>New Conversation</span>
                </button>
              </div>

              {/* Messages Stream */}
              <div className="space-y-1">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onBookCall={() => handleSendMessage('I want to book a 30-minute discovery call for my project.')}
                    onContactUs={() => openContactWithRequirement(msg.content)}
                    onEdit={handleStartEdit}
                    isBeingEdited={editingMessage?.id === msg.id}
                    onRegenerate={handleRegenerate}
                    onFeedback={handleFeedback}
                    onSelectFollowUp={q => handleSendMessage(q)}
                    isLastAssistant={index === lastAssistantIndex}
                  />
                ))}

                {isLoading && <TypingIndicator />}

                {errorMessage && (
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </main>

        {/* Bottom Message Input */}
        <div className="fixed bottom-0 left-0 right-0 z-20 min-w-0 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xs bg-gradient-to-t from-[#FAF9FC] via-[#FAF9FC]/95 to-transparent dark:from-[#0B0C16] dark:via-[#0B0C16]/95 sm:px-6">
          <div className={isSidebarOpen ? 'lg:pl-[260px] transition-all' : ''}>
            <MessageInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              editingMessage={editingMessage}
              onCancelEdit={handleCancelEdit}
              onStopGeneration={handleStopGeneration}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingsHistoryModal
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        bookings={bookings}
        onBookNewCall={() => handleSendMessage('I want to book a 30-minute discovery call for my project.')}
        onUpdateBookings={setBookings}
      />

      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={() => setIsLeadCaptureOpen(false)}
        initialRequirement={leadRequirement}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onAskAbout={handleSendMessage}
      />

      <ServicesModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onSelectService={handleSendMessage}
      />

      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
        onHireRole={handleSendMessage}
      />

      <LibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onAskTopic={handleSendMessage}
      />
    </div>
  );
};
