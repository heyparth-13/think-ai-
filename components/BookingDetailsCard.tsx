'use client';

import React, { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, LoaderCircle } from 'lucide-react';

interface BookingDetailsCardProps {
  projectSummary?: string;
}

function getSlotDateKey(slot: string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date(slot));
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  return `${year}-${month}-${day}`;
}

export const BookingDetailsCard: React.FC<BookingDetailsCardProps> = ({ projectSummary = '' }) => {
  const [timeZone, setTimeZone] = useState('UTC');
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectDetails, setProjectDetails] = useState(projectSummary);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookedStart, setBookedStart] = useState('');

  useEffect(() => {
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    setTimeZone(currentTimeZone);

    fetch(`/api/booking?timeZone=${encodeURIComponent(currentTimeZone)}`)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load available times.');
        setSlots(data.slots);
        if (data.slots[0]) setSelectedDate(getSlotDateKey(data.slots[0], currentTimeZone));
      })
      .catch(error => setErrorMessage(error.message || 'Could not load available times.'))
      .finally(() => setIsLoadingSlots(false));
  }, []);

  const formatSlot = (slot: string) => new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone
  }).format(new Date(slot));
  const formatDate = (slot: string) => new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone
  }).format(new Date(slot));
  const formatTime = (slot: string) => new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone
  }).format(new Date(slot));
  const availableDates = slots.reduce<{ key: string; slot: string }[]>((dates, slot) => {
    const key = getSlotDateKey(slot, timeZone);
    if (!dates.some(date => date.key === key)) dates.push({ key, slot });
    return dates;
  }, []);
  const selectedDateSlots = slots.filter(slot => getSlotDateKey(slot, timeZone) === selectedDate);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, timeZone, start: selectedSlot, projectSummary: projectDetails })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not book the call.');
      setBookedStart(data.start);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not book the call.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookedStart) {
    return (
      <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 size={17} />
          <span>Your 30-minute call is booked</span>
        </div>
        <p className="mt-1 text-xs">{formatSlot(bookedStart)} ({timeZone}). Check {email} for your Cal.com confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 rounded-2xl border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <CalendarDays size={16} className="text-lime-600 dark:text-lime-400" />
        <span>Call details</span>
      </div>

      {errorMessage && (
        <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">{errorMessage}</p>
      )}

      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
        What would you like to discuss?
        <textarea
          required
          minLength={8}
          rows={3}
          value={projectDetails}
          onChange={event => setProjectDetails(event.target.value)}
          placeholder="A short summary of your project or questions"
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>

      <div>
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Available dates ({timeZone})</p>
        {isLoadingSlots ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Loading available dates...</p>
        ) : availableDates.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">No dates currently available.</p>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableDates.map(({ key, slot }) => (
              <button
                key={key}
                type="button"
                aria-pressed={selectedDate === key}
                onClick={() => {
                  setSelectedDate(key);
                  setSelectedSlot('');
                }}
                className={`min-w-0 rounded-lg border px-2 py-2 text-xs font-semibold transition ${selectedDate === key
                  ? 'border-[#84CC16] bg-[#A3E635] text-black'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-lime-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                  }`}
              >
                {formatDate(slot)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Available times</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {selectedDateSlots.map(slot => (
            <button
              key={slot}
              type="button"
              aria-pressed={selectedSlot === slot}
              onClick={() => setSelectedSlot(slot)}
              className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold transition ${selectedSlot === slot
                ? 'border-[#84CC16] bg-[#A3E635] text-black'
                : 'border-slate-300 bg-white text-slate-700 hover:border-lime-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                }`}
            >
              {formatTime(slot)}
            </button>
          ))}
          {!isLoadingSlots && selectedDate && selectedDateSlots.length === 0 && (
            <p className="col-span-full text-xs text-slate-500 dark:text-slate-400">No times available on this date.</p>
          )}
          {!isLoadingSlots && !selectedDate && slots.length > 0 && (
            <p className="col-span-full text-xs text-slate-500 dark:text-slate-400">Select a date to view its available times.</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
          Name
          <input
            required
            autoComplete="name"
            value={name}
            onChange={event => setName(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
          Email for confirmation
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoadingSlots || !selectedDate || !selectedSlot || !projectDetails.trim() || slots.length === 0}
        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <LoaderCircle size={16} className="animate-spin" />}
        <span>{isSubmitting ? 'Booking...' : 'Confirm 30-minute call'}</span>
      </button>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">Your project details are shared with the ThinkArq team for this call.</p>
    </form>
  );
};