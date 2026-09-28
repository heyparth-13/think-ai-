# ThinkArq AI Website Chatbot

A production-ready, intelligent AI chatbot assistant engineered specifically for **ThinkArq** ([https://www.thinkarq.com/](https://www.thinkarq.com/)), embodying the company philosophy: **"Think. Build. Disrupt."**

---

## 🌟 Key Features

- **ThinkArq Visual Brand Identity:** Clean background with signature ThinkArq electric lime-green (`#A3E635`), bold typography, card outlines, and dark accents.
- **Collapsible History & Navigation Panel:** Left sidebar featuring **New Chat**, **Library**, **Projects**, and searchable **Recent Conversations** stored in session storage.
- **Action Header Suite:**
  - **ThinkArq Wordmark Logo & AI Assistant Tag**
  - **Navigation Pills:** Home (active lime pill), About, Services dropdown, Hire dropdown, Contact
  - **Book a Call 🟢:** Dark pill button with glowing active indicator
  - **Download Chat Transcript (`↓`):** Export session markdown logs with single click
  - **+ New Chat** quick reset
  - **🌙 Dark/Light Mode** toggle
- **High-Fidelity RAG Pipeline:** Vector retrieval with cosine similarity over 20+ ThinkArq service chunks (AI/ML, Data Engineering, SaaS Development, UI/UX Systems, Digital Growth, Hiring Pods, Delivery Lifecycle, and Contact info).
- **Multi-Provider LLM Integration:** Plug-and-play support for Google Gemini (`GEMINI_API_KEY`) and OpenAI (`OPENAI_API_KEY`) with an intelligent local RAG engine fallback.
- **Voice Dictation:** Speech-to-text input powered by the Web Speech API with live audio recording state.
- **Interactive Modals:**
  - **Lead Capture Modal:** Name, Email, Company, Project requirement with confetti animation
  - **Book a Strategy Call Modal:** 30-min Google Meet slots + configurable `NEXT_PUBLIC_BOOKING_URL`
  - **Services & Hiring Explorer Modals**
  - **Knowledge Library Modal**
- **Security & Protection:** Rate limiting (sliding window per IP), input sanitization, prompt injection guardrails, and server-side secret isolation.

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (tested on Node v24)
- npm / pnpm / yarn

### 2. Installation

Clone the repository and install dependencies:

```bash
cd think
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
# Optional: Connect your preferred LLM provider (built-in RAG engine fallback works out-of-the-box)
GEMINI_API_KEY=your_google_gemini_api_key
# or
OPENAI_API_KEY=your_openai_api_key

# Booking URL for consultation / discovery calls (optional)
NEXT_PUBLIC_BOOKING_URL=https://www.thinkarq.com/contact

# Optional: send the team an email after a successful Cal.com booking (requires a Resend-verified sender domain)
RESEND_API_KEY=your_resend_api_key
BOOKING_FROM_EMAIL=Bookings <bookings@your-verified-domain.com>
BOOKING_NOTIFICATION_EMAIL=your-team-inbox@example.com

# Secret key for the live crawler endpoint /api/ingest
INGESTION_SECRET=thinkarq-secure-ingest-key
```

Cal.com sends the attendee's booking confirmation. The optional Resend settings send a separate notification to the team; without them, the booking still succeeds but the team email is not sent.

---

## 💻 Local Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 RAG & Knowledge Base Ingestion

The repository contains pre-indexed verified ThinkArq knowledge chunks located in `lib/knowledge-base.ts`.

To crawl live pages from `https://www.thinkarq.com/` and re-index:

```bash
npx tsx scripts/ingest.ts
```

Or trigger the server endpoint via POST request:

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Authorization: Bearer thinkarq-secure-ingest-key"
```

---

## 🏗️ Project Architecture

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # Secure AI endpoint with RAG & Rate Limiting
│   │   ├── lead/route.ts       # Lead capture & verification API
│   │   └── ingest/route.ts     # Live website crawler API
│   ├── globals.css             # ThinkArq styling, scrollbars & Tailwind setup
│   ├── layout.tsx              # SEO metadata & font definitions
│   └── page.tsx                # Main Chatbot interface
├── components/
│   ├── AIAvatar.tsx            # ThinkArq AI glowing avatar
│   ├── AboutModal.tsx          # Company overview modal
│   ├── BookingModal.tsx        # Consultation booking modal
│   ├── ChatHeader.tsx          # Top navigation with Book a Call 🟢 & export
│   ├── ChatMessage.tsx         # User & AI messages with markdown & citations
│   ├── ChatSidebar.tsx         # Left panel with Recents, Library, Projects
│   ├── ChatWindow.tsx          # Master state & conversation container
│   ├── ContactCTA.tsx          # Buying intent & consultation CTA card
│   ├── HeroSection.tsx         # Trust badge, headline & services tag
│   ├── HireModal.tsx           # Dedicated developer hiring modal
│   ├── LeadCaptureModal.tsx    # Project requirement submission modal
│   ├── LibraryModal.tsx        # Knowledge base browser modal
│   ├── MessageInput.tsx        # Auto-resizing textarea with voice dictation
│   ├── ServicesModal.tsx       # Capabilities modal
│   ├── SuggestionChips.tsx     # ThinkArq-styled category pills & question cards
│   ├── ThinkArqLogo.tsx        # Official ThinkArq wordmark logo component
│   └── TypingIndicator.tsx     # Animated pulse indicator
├── lib/
│   ├── knowledge-base.ts       # ThinkArq domain knowledge chunks
│   ├── rag.ts                  # Retrieval pipeline & LLM connectors
│   ├── rate-limiter.ts         # In-memory IP rate limiter
│   ├── security.ts             # Input sanitization & prompt defense
│   └── vector-store.ts         # In-memory vector store & cosine search
└── scripts/
    └── ingest.ts               # Cheerio-based website crawler
```

---

## 🚢 Production Deployment

Build the optimized production bundle:

```bash
npm run build
npm start
```

### Vercel Deployment

1. Push the code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com/).
3. Set your environment variables (`GEMINI_API_KEY` or `OPENAI_API_KEY`, `NEXT_PUBLIC_BOOKING_URL`) in the Vercel dashboard under **Settings > Environment Variables**.
4. Deploy!

---

## 🔒 Security & Privacy

- **No Frontend Keys:** LLM keys and secret tokens are strictly maintained server-side.
- **Prompt Injection Defense:** Filters malicious system prompt overrides and unauthorized extraction attempts.
- **Anti-Hallucination Constraints:** Strict system prompt restricts the AI to verified ThinkArq capabilities and directs unverified queries to the team.
- **Rate Limiting:** Protects the chat and lead endpoints against bot abuse.
