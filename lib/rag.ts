import { getVectorStore, SearchResult } from './vector-store';
import { sanitizeInput, containsInjectionAttempt } from './security';

export interface ChatMessageData {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface RAGSource {
  title: string;
  url: string;
  section: string;
}

export interface RAGResponse {
  answer: string;
  sources: RAGSource[];
  showLeadCTA?: boolean;
  bookingRequest?: boolean;
  followUps?: string[];
}

export function generateSmartFollowUps(query: string, results: SearchResult[]): string[] {
  const lower = query.toLowerCase();

  if (/\b(book|call|consult|meeting|schedule)\b/i.test(lower)) {
    return [
      "What should I prepare before the discovery call?",
      "What are Think Arq's pricing estimates?",
      "Can I see recent client case studies?"
    ];
  }

  if (/\b(price|pricing|cost|estimate|fee|rate|budget|quote|how much)\b/i.test(lower)) {
    return [
      "How is final pricing calculated for custom projects?",
      "Can I book a 30-min discovery call for a custom quote?",
      "What payment milestones does Think Arq support?"
    ];
  }

  if (/\b(ai|chatbot|llm|ml|machine learning|agent|vision|rag)\b/i.test(lower)) {
    return [
      "What is the starting price and timeline for a custom AI chatbot?",
      "How does Think Arq implement RAG with private data?",
      "Can Think Arq build autonomous multi-agent workflows?"
    ];
  }

  if (/\b(website|web|saas|app|software|ecommerce|shopify|store)\b/i.test(lower)) {
    return [
      "What is the recommended tech stack for a custom SaaS web app?",
      "What are the typical development timelines and phases?",
      "Do you provide ongoing support and SEO optimization?"
    ];
  }

  if (/\b(seo|marketing|ppc|google|traffic|rank)\b/i.test(lower)) {
    return [
      "What is included in a Technical SEO Audit?",
      "How soon can a client expect Page 1 Google rankings?",
      "How does Think Arq combine SEO with content strategy?"
    ];
  }

  if (/\b(design|ui|ux|figma|prototype)\b/i.test(lower)) {
    return [
      "What is Think Arq's UI/UX design and prototyping process?",
      "Can you create a complete product design system in Figma?",
      "How do developers hand off and implement the UI designs?"
    ];
  }

  if (/\b(data|pipeline|warehouse|etl|analytics)\b/i.test(lower)) {
    return [
      "Which data warehouses (BigQuery/Snowflake) do you support?",
      "Can you build real-time analytics dashboards in Power BI?",
      "How do you ensure data security and compliance?"
    ];
  }

  if (/\b(team|founder|ceo|jasmin|vaibhav|company|about|who)\b/i.test(lower)) {
    return [
      "What projects and industries has Think Arq worked on?",
      "How can I hire dedicated developers from Think Arq?",
      "What is Think Arq's 'Think. Build. Disrupt.' philosophy?"
    ];
  }

  return [
    "What core services does Think Arq offer?",
    "Can you share estimated pricing for web or AI development?",
    "How can I book a free 30-minute discovery call?"
  ];
}

// ─── System Prompt ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are "Think AI", the official AI Assistant and Senior Solutions Consultant for Think Arq (https://www.thinkarq.com/).

═══════════════════════════════════
VERIFIED COMPANY FACTS (Use only these — never fabricate)
═══════════════════════════════════
- Company Name: Think Arq (also ThinkArq / ThinkArq Studios)
- Philosophy: "Think. Build. Disrupt."
- Founders: Jasmin Rajput (Founder & CEO), Vaibhav Rajput (Chief Executive Officer)
- Team: 20+ experts (AI engineers, software developers, data scientists, designers, digital marketers)
- Experience: 5+ years
- Projects: 10+ successful enterprise & SaaS projects
- Average Client ROI: 300%
- Contact Email: contact.thinkarq@gmail.com
- Website: https://www.thinkarq.com
- Contact Page: https://www.thinkarq.com/contact
- Areas Served: USA, Europe, United Kingdom (and India)

═══════════════════════════════════
VERIFIED SERVICES
═══════════════════════════════════
Digital Marketing: SEO, PPC (Google/FB/LinkedIn Ads), Social Media Marketing, Email Marketing, UI/UX Design
Data Services: Data Analytics, Data Science, Data Mining, Data Engineering, Data Visualization
AI/ML Services: AI/ML Development, AI Development, AI Consulting, AI Chatbot Development, Gen AI Development, Computer Vision, AI Integration, AI Agent Development, LLM Development, AI Software Development
Web & Software: Custom web apps, SaaS platforms, Next.js/React, Node.js, Python (FastAPI/Django), e-commerce
Hiring: Hire Vibe Coder, Hire Cursor Developer, Dedicated Agile Teams, Staff Augmentation

═══════════════════════════════════
VERIFIED PRICING ESTIMATES (INR — Starting Prices Only)
═══════════════════════════════════
Website Development:
- Basic website (up to 5 pages): ₹30,000+
- Business/corporate website (6–15 pages): ₹50,000–₹80,000+
- E-commerce store (standard): ₹1,00,000–₹2,50,000+
- Custom web app / SaaS: ₹2,50,000–₹8,00,000+

AI/ML Development:
- Basic AI chatbot: ₹80,000–₹1,50,000+
- RAG-based AI chatbot: ₹1,50,000–₹3,00,000+
- Custom ML model: ₹2,00,000–₹5,00,000+
- AI Agent / Automation: ₹2,50,000–₹6,00,000+
- Computer Vision system: ₹3,00,000–₹8,00,000+

SEO & Marketing:
- Technical SEO Audit (one-time): ₹25,000–₹50,000
- Monthly SEO retainer: ₹30,000–₹80,000/month
- PPC/Google Ads management: ₹20,000–₹50,000/month
- Social Media Marketing: ₹20,000–₹60,000/month
- Email Marketing (per campaign): ₹15,000–₹40,000

UI/UX Design:
- Basic website UI/UX: ₹20,000–₹40,000
- Mobile app UI/UX (up to 15 screens): ₹50,000–₹1,20,000
- Full product design system: ₹80,000–₹2,00,000
- End-to-end product redesign: ₹1,50,000–₹4,00,000

Data Engineering:
- Data analytics dashboard: ₹50,000–₹1,00,000
- ETL/ELT pipeline: ₹1,00,000–₹3,00,000
- Cloud data warehouse: ₹1,50,000–₹4,00,000
- Enterprise data platform: ₹5,00,000+

PRICING RULES — ALWAYS FOLLOW THESE:
1. All prices are STARTING ESTIMATES only, NOT fixed quotes.
2. Always say: "Final pricing depends on project complexity, number of pages/screens, integrations, and timeline."
3. Always invite them to get a custom quote: contact.thinkarq@gmail.com or thinkarq.com/contact
4. If a service is NOT in Think Arq's portfolio, say clearly: "Think Arq does not currently offer [service]. However, we can help with [related service]."
5. NEVER invent prices. Only use ranges from the verified table above.

═══════════════════════════════════
STRICT ANSWER & OUT-OF-SCOPE RULES
═══════════════════════════════════
1. You are Think AI, the official AI assistant for ThinkArq.
2. Answer questions related to ThinkArq, including architecture, interiors, services, projects, pricing, software, website, SEO, and digital solutions when relevant to ThinkArq.
3. Use verified RAG/company data whenever available. NEVER guess or invent information.
4. For completely unrelated questions (topics not related to ThinkArq or its domains of architecture, interiors, services, projects, pricing, software, website, SEO, and digital solutions), politely say:
"I’m Think AI, the AI assistant for ThinkArq. I can help with ThinkArq-related questions, including our services, projects, software, website, and SEO. Please ask me something related to ThinkArq."
5. If information about ThinkArq is genuinely unavailable in the verified context, say: "I don't have that specific information right now. Please contact contact.thinkarq@gmail.com for an accurate answer."
6. NEVER hallucinate project names, client names, testimonials, or team members not mentioned.
7. Keep answers professional, clear, structured with markdown headers and bullets. Avoid fluff.
8. For project questions: give a structured breakdown (Overview, Tech Stack, Features, Roadmap, How Think Arq delivers it).
9. For pricing questions: give the verified price range, add the disclaimer, and invite them to get a custom quote.
10. Maintain conversation context across turns.

═══════════════════════════════════
PERSONALITY & TONE
═══════════════════════════════════
- Confident, precise, structured, and genuinely helpful.
- Never say "I'm just an AI" or give generic chatbot disclaimers.
- Always give actionable, expert-quality responses grounded in the company's verified data.
- Sign off relevant project/pricing/service answers with the Think Arq contact details.`;

// ─── Contextual Query Expansion ──────────────────────────────────────────────

function buildContextualQuery(messages: ChatMessageData[], currentQuery: string): string {
  const clean = currentQuery.trim();
  if (messages.length === 0) return clean;

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
  const pronounRegex = /\b(it|this|that|these|those|they|them|the project|the service|for that|with that|tech stack|how much|cost|price|process|team|stack|same|above|earlier)\b/i;

  if (pronounRegex.test(clean) && clean.split(/\s+/).length < 10) {
    const contextHint = lastUserMsg?.content.slice(0, 100) ?? '';
    return `${clean} ${contextHint}`.trim();
  }

  return clean;
}

// ─── Intent Detection ────────────────────────────────────────────────────────

function detectIntent(query: string): {
  isBookingIntent: boolean;
  isPricingIntent: boolean;
  isProjectBuildIntent: boolean;
  showLeadCTA: boolean;
} {
  const lq = query.toLowerCase();

  const isBookingIntent = /\b(?:book|schedule|arrange|set up|reserve|want|need)\b.{0,60}\b(?:call|demo|meeting|consultation)\b|\b(?:call|demo|meeting|consultation)\b.{0,60}\b(?:book|schedule|arrange|set up)\b/i.test(query);

  const isPricingIntent = /\b(price|pricing|cost|how much|estimate|quote|budget|fee|charge|rate|rupee|₹|inr)\b/i.test(lq);

  const isProjectBuildIntent = /\b(build|create|make|develop|design|need a|want a|looking for|start|launch)\b.{0,60}\b(website|app|platform|saas|chatbot|store|system|tool|dashboard|software)\b/i.test(lq);

  const showLeadCTA = isBookingIntent || isPricingIntent || isProjectBuildIntent ||
    ['hire', 'contact', 'consultation', 'work together', 'need developers', 'team'].some(kw => lq.includes(kw));

  return { isBookingIntent, isPricingIntent, isProjectBuildIntent, showLeadCTA };
}

// ─── Main RAG Entry Point ────────────────────────────────────────────────────

export async function processRAGQuery(
  messages: ChatMessageData[],
  userQuery: string
): Promise<RAGResponse> {
  const cleanQuery = sanitizeInput(userQuery);

  if (!cleanQuery) {
    return {
      answer: "Please ask a question about your project, software architecture, SEO, AI development, or Think Arq's services.",
      sources: [],
    };
  }

  if (containsInjectionAttempt(cleanQuery)) {
    return {
      answer: 'I am Think AI, the official assistant for Think Arq. I can help you with software, AI, SEO, design, and project planning. How can I assist you?',
      sources: [],
    };
  }

  // 1. Retrieve relevant knowledge chunks
  const contextualQuery = buildContextualQuery(messages, cleanQuery);
  const vectorStore = getVectorStore();
  const searchResults: SearchResult[] = vectorStore.search(contextualQuery, 8, 0.015);

  // 2. Build deduplicated source citations
  const seenUrls = new Set<string>();
  const sources: RAGSource[] = [];
  for (const res of searchResults) {
    const key = `${res.chunk.url}-${res.chunk.section}`;
    if (!seenUrls.has(key)) {
      seenUrls.add(key);
      sources.push({
        title: res.chunk.title,
        url: res.chunk.url,
        section: res.chunk.section,
      });
    }
  }

  // 3. Intent detection
  const { isBookingIntent, isPricingIntent, isProjectBuildIntent, showLeadCTA } = detectIntent(cleanQuery);

  const followUps = generateSmartFollowUps(cleanQuery, searchResults);

  // 4. Quick return for explicit booking requests
  if (isBookingIntent) {
    return {
      answer:
        "I'd be happy to arrange a **free 30-minute discovery call** with the Think Arq solutions team! Please choose an available time slot below and share a brief description of your project or goals.\n\nAlternatively, you can reach us directly at **contact.thinkarq@gmail.com** to discuss your requirements.",
      sources: [],
      showLeadCTA: false,
      bookingRequest: true,
      followUps: [
        "What should I prepare for our discovery call?",
        "What are your typical project timelines?",
        "Can you share examples of past client projects?"
      ]
    };
  }

  // 5. Build structured RAG context string for the LLM
  const contextSnippet = searchResults.length > 0
    ? searchResults
        .map((r, i) =>
          `[Source ${i + 1}] Section: "${r.chunk.section}" | Category: ${r.chunk.category}\n${r.chunk.content}`
        )
        .join('\n\n---\n\n')
    : 'No specific knowledge base entry found. Use verified company facts from the system prompt.';

  // 6. Try Gemini (primary LLM)
  const geminiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  const preferredModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

  if (geminiKey) {
    try {
      const response = await callGemini(geminiKey, preferredModel, SYSTEM_PROMPT, contextSnippet, messages, cleanQuery);
      if (response && response.length > 40) {
        return { answer: response, sources, showLeadCTA, followUps };
      }
    } catch (err) {
      console.warn('[ThinkAI RAG] Gemini failed, trying OpenAI:', err);
    }
  }

  // 7. Try OpenAI (backup LLM)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const response = await callOpenAI(openaiKey, SYSTEM_PROMPT, contextSnippet, messages, cleanQuery);
      if (response && response.length > 40) {
        return { answer: response, sources, showLeadCTA, followUps };
      }
    } catch (err) {
      console.warn('[ThinkAI RAG] OpenAI failed, using local engine:', err);
    }
  }

  // 8. Intelligent local fallback engine (no API keys needed)
  const localAnswer = generateLocalResponse(cleanQuery, searchResults, { isPricingIntent, isProjectBuildIntent, showLeadCTA });
  return { answer: localAnswer, sources, showLeadCTA, followUps };
}

// ─── Gemini Provider ─────────────────────────────────────────────────────────

async function callGemini(
  apiKey: string,
  preferredModel: string,
  systemPrompt: string,
  context: string,
  history: ChatMessageData[],
  userQuery: string
): Promise<string> {
  const models = [preferredModel, 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-latest'];
  const distinctModels = Array.from(new Set(models));

  const recentHistory = history
    .slice(-6)
    .map(m => `${m.role === 'user' ? 'User' : 'Think AI'}: ${m.content}`)
    .join('\n\n');

  const fullPrompt = [
    systemPrompt,
    '',
    '═══════════════════════════════════',
    'RETRIEVED KNOWLEDGE BASE CONTEXT (use this to answer — treat it as verified information):',
    '═══════════════════════════════════',
    context,
    '',
    '═══════════════════════════════════',
    'CONVERSATION HISTORY:',
    '═══════════════════════════════════',
    recentHistory || '(No previous conversation)',
    '',
    '═══════════════════════════════════',
    'CURRENT USER QUESTION:',
    '═══════════════════════════════════',
    userQuery,
    '',
    'Instructions: Answer based on the retrieved context and verified company facts above. If the context does not cover the question, use verified facts from the system prompt. If you genuinely cannot answer from verified data, say you don\'t have that information and direct them to contact.thinkarq@gmail.com. Never fabricate facts.',
  ].join('\n');

  for (const model of distinctModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 1400,
            topP: 0.9,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 40) return text.trim();
      }
    } catch {
      continue;
    }
  }

  throw new Error('All Gemini models failed');
}

// ─── OpenAI Provider ─────────────────────────────────────────────────────────

async function callOpenAI(
  apiKey: string,
  systemPrompt: string,
  context: string,
  history: ChatMessageData[],
  userQuery: string
): Promise<string> {
  const systemMessage = [
    systemPrompt,
    '',
    '═══════════════════════════════════',
    'RETRIEVED KNOWLEDGE BASE CONTEXT:',
    '═══════════════════════════════════',
    context,
  ].join('\n');

  const formattedMessages = [
    { role: 'system', content: systemMessage },
    ...history.slice(-6).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userQuery },
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
      temperature: 0.25,
      max_tokens: 1400,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI Error: ${res.status}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty OpenAI response');
  return text.trim();
}

// ─── Local Fallback Engine ────────────────────────────────────────────────────

interface LocalContext {
  isPricingIntent: boolean;
  isProjectBuildIntent: boolean;
  showLeadCTA: boolean;
}

const CONTACT_CTA = `\n\n---\n📧 **Get a custom quote:** [contact.thinkarq@gmail.com](mailto:contact.thinkarq@gmail.com)\n🌐 **Contact us:** [thinkarq.com/contact](https://www.thinkarq.com/contact)\n📅 **Book a free 30-minute call** using the **Book a Call** button above.`;

function generateLocalResponse(query: string, results: SearchResult[], ctx: LocalContext): string {
  const lower = query.toLowerCase().trim();

  // ── Greeting ──
  if (/^(hi|hello|hey|howdy|hola|good\s+(morning|afternoon|evening)|namaste)\b/.test(lower)) {
    return `Hello! 👋 I'm **Think AI**, the official AI assistant for **Think Arq**.

I can help you with:
- 🌐 **Web & Software Development** (websites, SaaS, custom apps, e-commerce)
- 🤖 **AI/ML Solutions** (chatbots, agents, LLMs, computer vision, RAG)
- 📈 **SEO & Digital Marketing** (Google rankings, PPC, social media, content)
- 🎨 **UI/UX Design** (Figma, product design, design systems, prototyping)
- 📊 **Data Engineering** (pipelines, warehouses, dashboards, analytics)
- 💰 **Pricing & Estimates** for any of the above services
- 👥 **Think Arq info** (team, founders, process, case studies)

**What would you like to know or build today?**`;
  }

  // ── Founders / Leadership ──
  if (/\b(founder|founded|ceo|who\s+(started|created|runs|owns|built|is behind)|leadership|management|owner|jasmin|vaibhav)\b/i.test(lower)) {
    return `**Think Arq Leadership & Founders:**

Think Arq was founded by:
- **Jasmin Rajput** — Founder & CEO
- **Vaibhav Rajput** — Chief Executive Officer

**Philosophy:** *"Think. Build. Disrupt."*

The company is backed by a team of **20+ AI engineers, software developers, data scientists, UI/UX designers, and digital marketers** delivering solutions across the **USA, Europe, and the UK**.

🌐 Learn more: [thinkarq.com/about-us](https://www.thinkarq.com/about-us)`;
  }

  // ── Company Stats ──
  if (/\b(stats|statistics|numbers|how\s+many|team\s+size|experience|years|track\s+record|roi|projects?\s+count)\b/i.test(lower)) {
    return `**Think Arq — By the Numbers:**

| Metric | Value |
|--------|-------|
| 🕐 Industry Experience | 5+ Years |
| 👥 Expert Team | 20+ Engineers, Designers, Marketers |
| 🚀 Successful Projects | 10+ Enterprise & SaaS Projects |
| 📈 Average Client ROI | 300% |

Think Arq specializes in AI engineering, full-stack development, data pipelines, UI/UX design, and growth-focused digital marketing.

🌐 [About Think Arq](https://www.thinkarq.com/about-us)`;
  }

  // ── Pricing Intent ──
  if (ctx.isPricingIntent) {
    // Detect which service they're asking about
    if (/\b(website|web\s*site|web\s*app|landing\s*page)\b/i.test(lower) && !/\b(ai|ecommerce|saas)\b/i.test(lower)) {
      return `**Website Development Pricing (Starting Estimates):**

| Project Type | Starting Price |
|---|---|
| Basic website (up to 5 pages) | ₹30,000+ |
| Business/corporate website (6–15 pages) | ₹50,000–₹80,000+ |
| E-commerce store | ₹1,00,000–₹2,50,000+ |
| Custom web app / SaaS | ₹2,50,000–₹8,00,000+ |

> **Note:** These are starting estimates only. Final pricing depends on design complexity, number of pages, integrations, backend requirements, and timeline.${CONTACT_CTA}`;
    }

    if (/\b(ecommerce|e-commerce|online store|shopify|shop)\b/i.test(lower)) {
      return `**E-Commerce Development Pricing (Starting Estimates):**

| Project Type | Starting Price |
|---|---|
| Basic e-commerce (up to 50 products, Stripe/Razorpay) | ₹1,00,000–₹2,00,000+ |
| Mid-size store (100–500 products, multi-currency, filters) | ₹2,50,000–₹5,00,000+ |
| Headless/custom e-commerce (Next.js, custom admin) | ₹4,00,000–₹10,00,000+ |
| Shopify customization / theme | ₹30,000–₹1,50,000+ |

> **Note:** Final pricing depends on product count, features, payment integrations, and SEO requirements.${CONTACT_CTA}`;
    }

    if (/\b(ai|chatbot|llm|machine learning|computer vision|agent|rag)\b/i.test(lower)) {
      return `**AI & ML Development Pricing (Starting Estimates):**

| Project Type | Starting Price |
|---|---|
| Basic AI chatbot | ₹80,000–₹1,50,000+ |
| RAG-based knowledge chatbot | ₹1,50,000–₹3,00,000+ |
| Custom ML model (training + deployment) | ₹2,00,000–₹5,00,000+ |
| AI Agent / automation system | ₹2,50,000–₹6,00,000+ |
| Computer Vision system | ₹3,00,000–₹8,00,000+ |
| LLM fine-tuning / RAG pipeline | ₹3,00,000+ |

> **Note:** Final pricing depends on data complexity, model type, scale, integrations, and timeline.${CONTACT_CTA}`;
    }

    if (/\b(seo|digital marketing|ppc|ads|social media|email marketing)\b/i.test(lower)) {
      return `**SEO & Digital Marketing Pricing (Starting Estimates):**

| Service | Starting Price |
|---|---|
| Technical SEO Audit (one-time) | ₹25,000–₹50,000 |
| Monthly SEO Retainer | ₹30,000–₹80,000/month |
| PPC / Google Ads Management | ₹20,000–₹50,000/month |
| Social Media Marketing | ₹20,000–₹60,000/month |
| Email Marketing (per campaign) | ₹15,000–₹40,000 |

> **Note:** Final pricing depends on campaign scope, market competition (India/USA/Europe), and monthly deliverables.${CONTACT_CTA}`;
    }

    if (/\b(design|ui|ux|figma|prototype|app design)\b/i.test(lower)) {
      return `**UI/UX Design Pricing (Starting Estimates):**

| Project Type | Starting Price |
|---|---|
| Basic website UI/UX (up to 5 pages, Figma) | ₹20,000–₹40,000+ |
| Mobile app UI/UX (up to 15 screens, prototype) | ₹50,000–₹1,20,000+ |
| Full product design system | ₹80,000–₹2,00,000+ |
| End-to-end product redesign (20–40+ screens) | ₹1,50,000–₹4,00,000+ |

> **Note:** Final pricing depends on number of screens, research scope, iterations, and handoff requirements.${CONTACT_CTA}`;
    }

    if (/\b(data|pipeline|etl|bigquery|analytics|dashboard|warehouse)\b/i.test(lower)) {
      return `**Data Engineering & Analytics Pricing (Starting Estimates):**

| Project Type | Starting Price |
|---|---|
| Analytics Dashboard (Power BI / Looker) | ₹50,000–₹1,00,000+ |
| ETL/ELT Data Pipeline | ₹1,00,000–₹3,00,000+ |
| Cloud Data Warehouse setup | ₹1,50,000–₹4,00,000+ |
| Real-time Streaming Pipeline (Kafka, Spark) | ₹2,50,000–₹6,00,000+ |
| Enterprise Data Platform | ₹5,00,000+ |

> **Note:** Final pricing depends on data volume, sources, cloud provider, and maintenance needs.${CONTACT_CTA}`;
    }

    // General pricing overview
    return `**Think Arq Service Pricing — Starting Estimates:**

| Service Category | Starting Price |
|---|---|
| Basic Website | ₹30,000+ |
| Business/Corporate Website | ₹50,000–₹80,000+ |
| E-Commerce Store | ₹1,00,000–₹2,50,000+ |
| Custom SaaS / Web App | ₹2,50,000–₹8,00,000+ |
| AI Chatbot | ₹80,000–₹1,50,000+ |
| RAG AI Chatbot | ₹1,50,000–₹3,00,000+ |
| Custom ML Model | ₹2,00,000–₹5,00,000+ |
| SEO Audit (one-time) | ₹25,000–₹50,000 |
| Monthly SEO Retainer | ₹30,000–₹80,000/month |
| UI/UX Design (basic) | ₹20,000–₹40,000+ |
| Data Pipeline (ETL) | ₹1,00,000–₹3,00,000+ |

> ⚠️ **All prices are starting estimates only.** Final pricing depends on project complexity, features, integrations, and timeline. Think Arq does not charge hidden fees — all pricing is milestone-based and transparent.${CONTACT_CTA}`;
  }

  // ── Project Build Intent ──
  if (ctx.isProjectBuildIntent) {
    if (/\b(ecommerce|e-commerce|online store|shop|sell products|shopify)\b/i.test(lower)) {
      return `Great choice! Building a modern e-commerce platform positions your business for 24/7 online sales.

---

### 🎯 Project Overview
A fast, conversion-optimized online store with intuitive shopping experience, secure checkout, inventory management, and a merchant dashboard.

---

### 🛠️ Recommended Tech Stack
- **Storefront:** Next.js 16 (React 19) — for sub-second page loads and SEO
- **Backend:** Node.js + TypeScript, PostgreSQL (products & orders), Redis (sessions)
- **Payments:** Stripe / Razorpay with PCI-compliant security
- **Admin Panel:** Real-time order fulfillment, inventory, customer CRM
- **Hosting:** Vercel + Cloudflare CDN

---

### ✨ Core Features
- Multi-variant product catalog with live search & filters
- Guest checkout + customer accounts with order history
- Abandoned cart recovery, discount codes, SMS/email notifications
- Mobile-first responsive design

---

### 🚀 SEO & Performance
- Product schema markup (\`Product\`, \`Offer\`, \`AggregateRating\`) for Google Rich Snippets
- 95+ PageSpeed score, Core Web Vitals compliance
- Google Analytics 4 & Meta Pixel integration

---

### 📅 Estimated Timeline: 4–6 Weeks
1. **Week 1:** Discovery, wireframes, UX design
2. **Weeks 2–3:** Frontend development & product catalog
3. **Week 4:** Payment gateway, cart, admin panel
4. **Weeks 5–6:** QA, SEO verification, launch

---

### 💰 Starting Price: ₹1,00,000–₹2,50,000+
*(Depends on product count, features, and integrations — custom quote available)*${CONTACT_CTA}`;
    }

    if (/\b(saas|web\s*app|platform|software|system|dashboard)\b/i.test(lower)) {
      return `Building a custom SaaS platform is a strategic investment. Here's how Think Arq would architect it:

---

### 🏗️ Recommended Architecture
- **Frontend:** Next.js 16, React 19, TypeScript — performant & SEO-friendly
- **Backend:** Node.js / FastAPI (Python), REST or GraphQL APIs
- **Database:** PostgreSQL (primary) + Redis (caching & queues)
- **Auth:** Role-based access control (RBAC), OAuth2 (Google/GitHub/SSO), multi-tenancy
- **Billing:** Stripe (recurring subscriptions, usage tiers, customer portal)
- **Infrastructure:** AWS / GCP + Docker + CI/CD pipelines (GitHub Actions)

---

### ✨ Core Features
- Secure multi-tenant architecture (team workspaces, permissions)
- Real-time notifications (WebSockets / SSE)
- Admin analytics dashboard with key business metrics
- Full API documentation + webhook support

---

### 📅 Estimated Timeline: 8–14 Weeks
1. **Weeks 1–2:** Discovery, architecture design, UX prototyping
2. **Weeks 3–6:** Core platform (auth, dashboard, APIs)
3. **Weeks 7–10:** Feature sprints + billing + integrations
4. **Weeks 11–12:** QA, security audit, staging
5. **Weeks 13–14:** Launch + monitoring

---

### 💰 Starting Price: ₹2,50,000–₹8,00,000+
*(Depends on features, integrations, and team size — custom quote available)*${CONTACT_CTA}`;
    }

    if (/\b(ai|chatbot|llm|machine learning|gen ai|agent)\b/i.test(lower)) {
      return `Think Arq is a premier AI development company. Here's how we'd approach your AI project:

---

### 🤖 AI Solution Architecture
Depending on your use case, we recommend:

**For AI Chatbots:**
- RAG pipeline (Retrieval-Augmented Generation) with your knowledge base
- Multi-turn conversation with memory, lead capture, and booking integration
- Tech: Next.js, Gemini/OpenAI, custom vector search, Cal.com integration
- Starting from: ₹1,50,000–₹3,00,000+

**For Custom ML Models:**
- Data preprocessing, model training (classification/prediction/generation), evaluation & deployment
- Tech: Python (PyTorch/TensorFlow), FastAPI, cloud deployment (AWS/GCP)
- Starting from: ₹2,00,000–₹5,00,000+

**For AI Agents & Automation:**
- Multi-step reasoning agents that use tools, APIs, and databases autonomously
- Tech: LangChain, OpenAI Function Calling, custom orchestration
- Starting from: ₹2,50,000–₹6,00,000+

---

### 📅 Typical Timeline: 6–16 Weeks
*(Depends on complexity, data availability, and integration requirements)*

> All prices are starting estimates. Final scope and quote depend on your data, model complexity, and integrations.${CONTACT_CTA}`;
    }

    if (/\b(seo|google|rank|traffic|marketing)\b/i.test(lower)) {
      return `Here's Think Arq's proven SEO & digital marketing blueprint:

---

### 🔍 Phase 1: Technical SEO Foundation
- Full site audit: crawl errors, redirect chains, XML sitemap, robots.txt
- Core Web Vitals optimization (LCP, INP, CLS)
- Schema markup: Organization, Services, FAQs, Articles (JSON-LD)

---

### 🎯 Phase 2: Keyword Strategy
- Competitive keyword gap analysis using Ahrefs/SEMrush
- Target 50–200+ high-intent keywords across commercial & informational pages
- Internal linking architecture for topical authority

---

### ✍️ Phase 3: Content & Authority
- E-E-A-T compliant pillar articles and service pages
- High-DA backlink acquisition (guest posts, digital PR, editorial links)

---

### 📊 Think Arq Track Record
- Scaled one client from **1,200 → 18,400 organic sessions/month** in 6 months (+1,433%)
- Ranked **120+ keywords on Page 1** of Google
- Reduced CAC by **58%** through organic lead generation

---

### 💰 Monthly SEO Retainer: ₹30,000–₹80,000/month
*(One-time Technical SEO Audit from ₹25,000)*${CONTACT_CTA}`;
    }
  }

  // ── Services overview / "what do you offer" ──
  if (/\b(service|offer|provide|do you|what can|capabilities|help with)\b/i.test(lower)) {
    return `**Think Arq Services:**

**🤖 AI & Machine Learning**
AI Development, AI Consulting, AI Chatbots, Gen AI, LLM Development, Computer Vision, AI Agents, AI Integration, AI Software

**📊 Data Services**
Data Analytics, Data Science, Data Mining, Data Engineering, Data Visualization

**📈 Digital Marketing**
SEO, PPC (Google/Meta/LinkedIn Ads), Social Media Marketing, Email Marketing

**🎨 Design**
UI/UX Design, Product Design Systems, Figma Prototyping, User Research

**💻 Web & Software**
Custom Websites, SaaS Platforms, E-Commerce, Full-Stack Web Apps, React/Next.js

**👥 Hiring**
Dedicated Agile Teams, Staff Augmentation, Hire Vibe Coder, Hire Cursor Developer

---

Which service area would you like to explore? I can give you detailed information, case studies, timelines, or pricing for any of these.`;
  }

  // ── Contact ──
  if (/\b(contact|email|reach|get in touch|phone|address|how to contact)\b/i.test(lower)) {
    return `**Contact Think Arq:**

📧 **Email:** [contact.thinkarq@gmail.com](mailto:contact.thinkarq@gmail.com)
🌐 **Website:** [thinkarq.com/contact](https://www.thinkarq.com/contact)
📅 **Book a Free Call:** Click **Book a Call** in the header for a 30-minute discovery session

**Social Channels:**
- 💼 LinkedIn: [linkedin.com/company/think-arq](https://www.linkedin.com/company/think-arq/)
- 🐦 Twitter/X: [x.com/Think_Arq_](https://x.com/Think_Arq_)
- 📸 Instagram: [instagram.com/think_arq_/](https://www.instagram.com/think_arq_/)

Think Arq serves clients in the **USA, India, Europe, and the UK**. All consultations are free for the first 30 minutes.`;
  }

  // ── Knowledge base synthesis (general questions with results) ──
  if (results.length > 0) {
    const topChunks = results.slice(0, 3);
    let output = topChunks
      .map(({ chunk }) => `### 🔹 ${chunk.section}\n${chunk.content}\n🌐 *[${chunk.title}](${chunk.url})*`)
      .join('\n\n---\n\n');

    if (ctx.showLeadCTA) {
      output += CONTACT_CTA;
    }
    return output;
  }

  // ── Final fallback / Unrelated questions ──
  return `I’m Think AI, the AI assistant for ThinkArq. I can help with ThinkArq-related questions, including our services, projects, software, website, and SEO. Please ask me something related to ThinkArq.`;
}
