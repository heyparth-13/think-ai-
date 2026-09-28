import { NextRequest, NextResponse } from 'next/server';
import { crawlThinkArqWebsite } from '@/scripts/ingest';
import { getVectorStore } from '@/lib/vector-store';
import { KnowledgeChunk } from '@/lib/knowledge-base';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secretKey = process.env.INGESTION_SECRET || 'thinkarq-ingest-secret';

    if (authHeader !== `Bearer ${secretKey}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await crawlThinkArqWebsite();
    const newChunks: KnowledgeChunk[] = [];

    pages.forEach((page, pageIdx) => {
      page.sections.forEach((sec, secIdx) => {
        newChunks.push({
          id: `crawled-${pageIdx}-${secIdx}`,
          url: page.url,
          title: page.title,
          section: sec.heading,
          category: page.category as any || 'overview',
          content: sec.content,
          keywords: [sec.heading.toLowerCase(), page.category]
        });
      });
    });

    if (newChunks.length > 0) {
      getVectorStore().addChunks(newChunks);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully crawled and indexed ${pages.length} pages (${newChunks.length} chunks).`,
      totalChunks: getVectorStore().getChunks().length
    });
  } catch (error) {
    console.error('Ingestion API Error:', error);
    return NextResponse.json(
      { error: 'Failed to ingest website content.' },
      { status: 500 }
    );
  }
}
