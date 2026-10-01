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

function getCalConfig() {
  const apiKey = process.env.CAL_API_KEY || process.env.CALCOM_API_KEY;
  if (!apiKey) return null;

  return {
    apiKey,
    username: process.env.CALCOM_USERNAME || 'thinkarq',
    eventTypeSlug: process.env.CALCOM_EVENT_TYPE_SLUG || '30min'
  };
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
        lengthInMinutes: 30,
        attendee: { name, email, timeZone, language: 'en' },
        metadata: { projectSummary: projectSummary.slice(0, 500) }
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 409) {
        return NextResponse.json({ error: 'That time is no longer available. Please choose another available time.' }, { status: 409 });
      }
      console.error('Cal.com booking request failed with status:', response.status);
      return NextResponse.json({ error: 'Cal.com could not confirm the booking. Please check your details and try again.' }, { status: 502 });
    }

    const result = await response.json();
    return NextResponse.json({
      success: true,
      start: result.data?.start || startDate.toISOString(),
      email,
      confirmationProvider: 'cal.com'
    });
  } catch {
    return NextResponse.json({ error: 'The booking request could not be completed. Please try again.' }, { status: 400 });
  }
}