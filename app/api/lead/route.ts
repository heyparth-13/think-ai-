import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/security';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  projectRequirement: string;
  createdAt: string;
}

const leadsStore: LeadData[] = [];

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = sanitizeInput(body.name || '');
    const email = sanitizeInput(body.email || '');
    const company = sanitizeInput(body.company || '');
    const projectRequirement = sanitizeInput(body.projectRequirement || '');

    if (!name || !email || !projectRequirement) {
      return NextResponse.json(
        { error: 'Name, Email, and Project Requirement are required fields.' },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const newLead: LeadData = {
      name,
      email,
      company,
      projectRequirement,
      createdAt: new Date().toISOString()
    };

    leadsStore.push(newLead);
    console.log('New ThinkArq Lead Captured:', newLead);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project details have been received. A ThinkArq solutions specialist will contact you shortly.',
      leadId: `lead_${Date.now()}`
    });
  } catch (error) {
    console.error('Lead Capture API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit your details. Please try again.' },
      { status: 500 }
    );
  }
}
