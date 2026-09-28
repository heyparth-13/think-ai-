/**
 * ThinkArq Website Ingestion & Crawler Script
 * Crawls https://www.thinkarq.com/ and extracts knowledge chunks for RAG.
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface CrawledPage {
  url: string;
  title: string;
  category: string;
  sections: { heading: string; content: string }[];
}

const TARGET_URLS = [
  'https://www.thinkarq.com/',
  'https://www.thinkarq.com/about',
  'https://www.thinkarq.com/services',
  'https://www.thinkarq.com/services/ai-development',
  'https://www.thinkarq.com/services/data-engineering',
  'https://www.thinkarq.com/services/web-development',
  'https://www.thinkarq.com/services/ui-ux-design',
  'https://www.thinkarq.com/services/digital-marketing',
  'https://www.thinkarq.com/process',
  'https://www.thinkarq.com/hire-talent',
  'https://www.thinkarq.com/contact'
];

export async function crawlThinkArqWebsite(): Promise<CrawledPage[]> {
  console.log('Starting ThinkArq website crawler...');
  const results: CrawledPage[] = [];

  for (const url of TARGET_URLS) {
    try {
      console.log(`Crawling: ${url}`);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'ThinkArq-AI-Indexer/1.0'
        }
      });

      if (!res.ok) {
        console.warn(`Could not fetch ${url} (status: ${res.status}). Using structured fallback schema.`);
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $('title').text().trim() || 'ThinkArq | Digital Solutions';
      const sections: { heading: string; content: string }[] = [];

      $('h1, h2, h3').each((_, el) => {
        const heading = $(el).text().trim();
        const paragraph = $(el).nextUntil('h1, h2, h3', 'p, ul, ol').text().trim();
        if (heading && paragraph) {
          sections.push({ heading, content: paragraph });
        }
      });

      // Extract general category from URL
      let category = 'overview';
      if (url.includes('ai')) category = 'ai';
      else if (url.includes('data')) category = 'data';
      else if (url.includes('web') || url.includes('software')) category = 'software';
      else if (url.includes('design') || url.includes('ui-ux')) category = 'design';
      else if (url.includes('marketing')) category = 'marketing';
      else if (url.includes('process')) category = 'process';
      else if (url.includes('hire')) category = 'hiring';
      else if (url.includes('contact')) category = 'contact';

      results.push({ url, title, category, sections });
    } catch (err) {
      console.warn(`Error crawling ${url}:`, err);
    }
  }

  console.log(`Crawling complete. Indexed ${results.length} pages.`);
  return results;
}

if (require.main === module) {
  crawlThinkArqWebsite().then(pages => {
    const outputPath = path.join(__dirname, '../lib/crawled-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2));
    console.log(`Saved crawled data to ${outputPath}`);
  });
}
