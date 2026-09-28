import { NextRequest, NextResponse } from 'next/server';
import { processRAGQuery, ChatMessageData } from '@/lib/rag';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before asking another question.' },
        { status: 429 }
      );
    }

    // 2. Validate payload
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be text.' },
        { status: 400 }
      );
    }

    const cleanMessage = sanitizeInput(message);
    if (!cleanMessage) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const validHistory: ChatMessageData[] = Array.isArray(history)
      ? history.map(item => ({
          role: item.role === 'user' ? 'user' : 'assistant',
          content: sanitizeInput(String(item.content || ''))
        }))
      : [];

    // 3. Process RAG pipeline
    const result = await processRAGQuery(validHistory, cleanMessage);

    return NextResponse.json({
      success: true,
      answer: result.answer,
      sources: result.sources,
      showLeadCTA: result.showLeadCTA,
      bookingRequest: result.bookingRequest
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'An internal error occurred while processing your request.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
