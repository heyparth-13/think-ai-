import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, CheckCircle2, Clock, Mail, User, FileText, Trash2, X, Plus, Calendar } from 'lucide-react';
import { ConfirmedBooking, removeStoredBooking } from '@/lib/bookings';

interface BookingsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConfirmedBooking[];
  onBookNewCall: () => void;
  onUpdateBookings: (updated: ConfirmedBooking[]) => void;
}

export const BookingsHistoryModal: React.FC<BookingsHistoryModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onBookNewCall,
  onUpdateBookings
}) => {
  if (!isOpen) return null;

  const formatDateTime = (start: string, timeZone: string) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone
      }).format(new Date(start));
    } catch {
      return start;
    }
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove this booking from your history?')) {
      const updated = removeStoredBooking(id);
      onUpdateBookings(updated);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 bg-slate-950/60 backdrop-blur-sm sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={event => event.stopPropagation()}
          className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-slate-900 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6 md:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="mb-2 flex min-w-0 flex-wrap items-center gap-2 pr-8">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-[#A3E635] text-black font-extrabold text-[11px] sm:text-xs shrink-0">
              DISCOVERY SESSIONS
            </span>
            <h3 className="min-w-0 flex-1 break-words text-base sm:text-xl font-bold text-slate-900 dark:text-white">
              Your Confirmed Bookings
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            View your scheduled 30-minute discovery calls with the Think AI & ThinkArq solutions team.
          </p>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="py-10 text-center space-y-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                <CalendarDays size={24} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No bookings scheduled yet
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Schedule a 30-minute strategy call with our solutions architects to discuss your AI or software project.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNewCall();
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#A3E635] hover:bg-[#bef264] text-black shadow-xs transition transform hover:scale-105 cursor-pointer"
              >
                <Plus size={14} />
                <span>Book a Discovery Call</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(item => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                        <span>Confirmed Session</span>
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        30 Minutes
                      </span>
                    </div>

                    <button
                      onClick={e => handleRemove(item.id, e)}
                      title="Delete from history"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                    <Clock size={16} className="text-[#84CC16] dark:text-[#A3E635] shrink-0" />
                    <span>{formatDateTime(item.start, item.timeZone)}</span>
                    <span className="text-xs font-normal text-slate-500">({item.timeZone})</span>
                  </div>

                  {/* Attendee Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <User size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Mail size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold">{item.email}</span>
                    </div>
                  </div>

                  {/* Project Discussion Summary */}
                  {item.projectSummary && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                        <FileText size={13} className="text-[#84CC16]" />
                        <span>Project Agenda / Questions:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed break-words">
                        {item.projectSummary}
                      </p>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
                    <span>Confirmation sent to {item.email} via Cal.com</span>
                    <span>Booked on {new Date(item.bookedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    onClose();
                    onBookNewCall();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#A3E635] hover:bg-[#bef264] text-black shadow-xs transition cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Schedule Another Call</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
