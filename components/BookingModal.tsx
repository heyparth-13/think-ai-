import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const bookingUrl = new URL(
    process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/thinkarq/30min'
  );
  bookingUrl.searchParams.set('embed', 'true');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-2 backdrop-blur-sm sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          className="relative my-auto flex h-[min(88dvh,780px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700 sm:px-5">
            <div className="flex items-center gap-2.5">
              <CalendarDays size={18} className="text-lime-600 dark:text-lime-400" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Book a 30-minute call
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose a date and available time</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking calendar"
              title="Close booking calendar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          <iframe
            src={bookingUrl.toString()}
            title="Cal.com 30-minute booking calendar"
            className="min-h-0 w-full flex-1 border-0 bg-white"
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};