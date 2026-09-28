import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/security';

const CAL_API_BASE = 'https://api.cal.com/v2';
const SLOT_API_VERSION = '2024-09-04';
const BOOKING_API_VERSION = '2026-02-25';

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';
}

function validateTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

function getCalErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null;

  const body = payload as Record<string, unknown>;
  for (const key of ['message', 'error', 'details']) {
    const value = body[key];
    if (typeof value === 'string') return value.slice(0, 300);
    if (value && typeof value === 'object' && 'message' in value) {
      const message = (value as { message?: unknown }).message;
      if (typeof message === 'string') return message.slice(0, 300);
    }
    if (Array.isArray(value)) {
      const messages = value
        .map(item => typeof item === 'string'
          ? item
          : item && typeof item === 'object' && 'message' in item && typeof item.message === 'string'
            ? item.message
            : null)
        .filter((message): message is string => message !== null);
      if (messages.length) return messages.join('; ').slice(0, 300);
    }
  }

  return null;
}

function getCalConfig() {
  const apiKey = process.env.CAL_API_KEY || process.env.CALCOM_API_KEY;
  if (!apiKey) return null;

  return {
    apiKey,
    username: process.env.CAL_USERNAME || process.env.CALCOM_USERNAME || 'thinkarq',
    eventTypeSlug: process.env.CAL_EVENT_TYPE_SLUG || process.env.CALCOM_EVENT_TYPE_SLUG || '30min'
  };
}

async function sendBookingNotification(details: {
  name: string;
  email: string;
  projectSummary: string;
  start: Date;
  timeZone: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    console.warn('Booking notification email is not configured.');
    return false;
  }

  const formattedStart = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: details.timeZone
  }).format(details.start);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: details.email,
        subject: `New ThinkArq call booking: ${details.name}`,
        text: [
          'A new 30-minute ThinkArq call was booked.',
          '',
          `Name: ${details.name}`,
          `Email: ${details.email}`,
          `Time: ${formattedStart} (${details.timeZone})`,
          '',
          'Project details:',
          details.projectSummary
        ].join('\n')
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Booking succeeded, but the Resend notification failed with status:', response.status);
      return false;
    }

    return true;
  } catch {
    console.error('Booking succeeded, but the Resend notification request failed.');
    return false;
  }
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  const config = getCalConfig();
  if (!config) {
    return NextResponse.json({ error: 'Booking is not configured yet. Please contact the team.' }, { status: 503 });
  }

  const timeZone = request.nextUrl.searchParams.get('timeZone') || 'UTC';
  if (!validateTimeZone(timeZone)) {
    return NextResponse.json({ error: 'Please use a valid time zone.' }, { status: 400 });
  }

  const start = new Date();
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 14);

  const slotsUrl = new URL(`${CAL_API_BASE}/slots`);
  slotsUrl.searchParams.set('eventTypeSlug', config.eventTypeSlug);
  slotsUrl.searchParams.set('username', config.username);
  slotsUrl.searchParams.set('start', start.toISOString().slice(0, 10));
  slotsUrl.searchParams.set('end', end.toISOString().slice(0, 10));
  slotsUrl.searchParams.set('timeZone', timeZone);
  slotsUrl.searchParams.set('duration', '30');

  try {
    const response = await fetch(slotsUrl, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'cal-api-version': SLOT_API_VERSION
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Could not load available call times. Please try again later.' }, { status: 502 });
    }

    const result = await response.json();
    const slots = Object.values(result.data || {})
      .flatMap((daySlots: unknown) => Array.isArray(daySlots) ? daySlots : [])
      .map((slot: unknown) => typeof slot === 'string' ? slot : (slot as { start?: unknown })?.start)
      .filter((slot: unknown): slot is string => typeof slot === 'string')
      .filter((slot: string) => new Date(slot).getTime() > Date.now())
      .slice(0, 40);

    return NextResponse.json({ slots, timeZone });
  } catch {
    return NextResponse.json({ error: 'Could not load available call times. Please try again later.' }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many booking attempts. Please try again shortly.' }, { status: 429 });
  }

  const config = getCalConfig();
  if (!config) {
    return NextResponse.json({ error: 'Booking is not configured yet. Please contact the team.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email).toLowerCase();
    const start = typeof body.start === 'string' ? body.start : '';
    const timeZone = typeof body.timeZone === 'string' ? body.timeZone : '';
    const projectSummary = sanitizeInput(body.projectSummary);
    const startDate = new Date(start);

    if (!name || !email || !projectSummary || !Number.isFinite(startDate.getTime()) || startDate <= new Date()) {
      return NextResponse.json({ error: 'Please provide your name, email, project details, and a future available time.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!validateTimeZone(timeZone)) {
      return NextResponse.json({ error: 'Please use a valid time zone.' }, { status: 400 });
    }

    const response = await fetch(`${CAL_API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'cal-api-version': BOOKING_API_VERSION
      },
      body: JSON.stringify({
        start: startDate.toISOString(),
        eventTypeSlug: config.eventTypeSlug,
        username: config.username,
        attendee: { name, email, timeZone, language: 'en' },
        bookingFieldsResponses: { title: projectSummary.slice(0, 500) },
        metadata: { projectSummary: projectSummary.slice(0, 500) }
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      const providerMessage = getCalErrorMessage(errorPayload);
      console.error('Cal.com booking request failed:', response.status, providerMessage || 'No error detail returned');

      if (response.status === 409) {
        return NextResponse.json({ error: 'That time is no longer available. Please choose another available time.' }, { status: 409 });
      }
      const error = response.status === 400 && providerMessage
        ? `Cal.com rejected the booking: ${providerMessage}`
        : 'Cal.com could not confirm the booking. Please try again or choose another time.';
      return NextResponse.json({ error }, { status: 502 });
    }

    const result = await response.json();
    const notificationEmailSent = await sendBookingNotification({
      name,
      email,
      projectSummary,
      start: startDate,
      timeZone
    });

    return NextResponse.json({
      success: true,
      start: result.data?.start || startDate.toISOString(),
      email,
      confirmationProvider: 'cal.com',
      notificationEmailSent
    });
  } catch {
    return NextResponse.json({ error: 'The booking request could not be completed. Please try again.' }, { status: 400 });
  }
}