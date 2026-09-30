export interface KnowledgeChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  category:
    | 'overview'
    | 'ai'
    | 'data'
    | 'software'
    | 'design'
    | 'marketing'
    | 'process'
    | 'hiring'
    | 'contact'
    | 'values'
    | 'team'
    | 'projects'
    | 'pricing'
    | 'faq';
  content: string;
  keywords: string[];
}

export const THINKARQ_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ============================================================
  // OVERVIEW & COMPANY INFORMATION
  // ============================================================
  {
    id: 'thinkarq-overview-1',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq | AI Development, Data Engineering & Digital Marketing | USA & Europe',
    section: 'Company Overview & Mission',
    category: 'overview',
    content:
      'Think Arq (also known as ThinkArq or ThinkArq Studios) is a technology company delivering AI/ML development, custom software, data engineering, UI/UX design, and growth-focused digital marketing for businesses in the USA & Europe. Their guiding philosophy is "Think. Build. Disrupt." At Think Arq, they blend creativity with intelligence — delivering sleek UI/UX, robust web and software solutions, AI and data-driven insights, and growth-focused digital marketing to help businesses scale smarter. Think Arq serves ambitious startups, growing enterprises, and established global brands across the United States, Europe, and the United Kingdom.',
    keywords: [
      'thinkarq',
      'think arq',
      'about thinkarq',
      'company',
      'mission',
      'what is thinkarq',
      'think build disrupt',
      'services',
      'who are you',
      'what do you do',
      'overview',
      'thinkarq studios',
    ],
  },
  {
    id: 'thinkarq-overview-2',
    url: 'https://www.thinkarq.com/about-us',
    title: 'About Think Arq | AI & Software Development Company in USA & Europe',
    section: 'About Think Arq',
    category: 'overview',
    content:
      "At Think Arq, they architect ideas into reality. Whether it's a sleek web app, a smart AI solution, or a bold marketing campaign — they design, develop, and deliver digital products that leave an impression. They think ahead, code with precision, and market with purpose. Think Arq provides a complete suite of digital solutions designed to help businesses grow, innovate, and succeed online. Their expertise spans UI/UX design, web and software development, AI-powered solutions, and growth-focused digital marketing, enabling businesses in the USA, Europe, and beyond to achieve scalable results and measurable success.",
    keywords: [
      'about',
      'about us',
      'about thinkarq',
      'who are you',
      'what is thinkarq',
      'company info',
      'company information',
      'tell me about',
      'background',
    ],
  },
  {
    id: 'thinkarq-overview-stats',
    url: 'https://www.thinkarq.com/about-us',
    title: 'Think Arq Impact & Numbers',
    section: 'Company Impact & Statistics',
    category: 'overview',
    content:
      "Think Arq's impact in numbers: 5+ Years of Experience in the industry, 20+ Team of Experts (AI engineers, software developers, data scientists, designers, and digital marketers), 10+ Successful Projects delivered, and 300% Average ROI for Clients. They don't just market brands — they build digital excellence.",
    keywords: [
      'stats',
      'statistics',
      'numbers',
      'experience',
      'team size',
      'projects',
      'roi',
      'how many',
      'how long',
      'years',
      'track record',
      'results',
      'team',
    ],
  },
  {
    id: 'thinkarq-services-all',
    url: 'https://www.thinkarq.com/services',
    title: 'Think Arq Services Overview',
    section: 'All Services at a Glance',
    category: 'overview',
    content:
      'Think Arq offers 20+ professional services across three main categories: 1) Digital Marketing Services — Search Engine Optimization (SEO), Pay-per-click Advertising (PPC), Social Media Marketing (SMM), Email Marketing, and UI/UX Design Service. 2) Data Services — Data Analytics, Data Science, Data Mining, Data Engineering, and Data Visualization. 3) AI/ML Services — AI/ML Development, AI Development, AI Consulting, AI Chatbot Development, Gen AI Development, Computer Vision Development, AI Integration, AI Agent Development, LLM Development, and AI Software Development. They also offer specialized hiring services including Hire Vibe Coder and Hire Cursor Developer.',
    keywords: [
      'services',
      'all services',
      'what services',
      'what do you offer',
      'list services',
      'service list',
      'categories',
      'offerings',
    ],
  },

  // ============================================================
  // TEAM & LEADERSHIP
  // ============================================================
  {
    id: 'thinkarq-team-founders',
    url: 'https://www.thinkarq.com/about-us',
    title: 'Think Arq Leadership & Founders',
    section: 'Founders & Leadership Team',
    category: 'team',
    content:
      'Think Arq was founded by Jasmin Rajput (Founder & CEO) and Vaibhav Rajput (Chief Executive Officer). Behind Think Arq is a passionate team of AI engineers, software developers, data scientists, designers, and digital marketers — united by a shared mission to Think, Build, and Disrupt. The team consists of 20+ experts across multiple disciplines.',
    keywords: [
      'founder',
      'founders',
      'ceo',
      'who founded',
      'leadership',
      'team',
      'jasmin',
      'vaibhav',
      'rajput',
      'who runs',
      'owner',
      'management',
      'who started',
    ],
  },

  // ============================================================
  // CORE VALUES
  // ============================================================
  {
    id: 'thinkarq-values',
    url: 'https://www.thinkarq.com/about-us',
    title: 'Think Arq Core Values',
    section: 'Core Values & Culture',
    category: 'values',
    content:
      "Think Arq is guided by four core values: 1) Innovation — They don't simply follow trends; they create them. Every design, development, and digital solution is powered by forward-thinking strategies, cutting-edge technology, and creative problem-solving. 2) Integrity — Trust is the foundation of every successful partnership. Every project is executed with honesty, transparency, and accountability, maintaining clear communication throughout. 3) Collaboration — Great ideas are never born in isolation. They foster a collaborative environment where client insights, team expertise, and industry knowledge come together to create impactful results. 4) Excellence — Excellence is not optional—it's their standard. Every detail, every design, every solution is meticulously crafted to meet the highest standards of quality and performance.",
    keywords: [
      'values',
      'core values',
      'culture',
      'principles',
      'innovation',
      'integrity',
      'collaboration',
      'excellence',
      'what drives',
      'philosophy',
    ],
  },

  // ============================================================
  // PRICING & ESTIMATES
  // ============================================================
  {
    id: 'thinkarq-pricing-website',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq Website Development Pricing',
    section: 'Website Development Pricing & Estimates',
    category: 'pricing',
    content:
      'Think Arq website development pricing is flexible and depends on the project scope, complexity, number of pages, and required features. Estimated starting prices: Basic informational website (up to 5 pages, standard design) starts from approximately ₹30,000. Business / Corporate website (6–15 pages, custom design, contact forms, SEO basics) starts from approximately ₹50,000–₹80,000. E-commerce website (product catalog, cart, Stripe/Razorpay payment integration, admin dashboard) starts from approximately ₹1,00,000–₹2,50,000. Custom web application or SaaS platform (multi-role auth, APIs, database, admin panel) starts from approximately ₹2,50,000–₹8,00,000+. These are starting estimates only. Final pricing depends on design complexity, number of pages, integrations, backend requirements, content, timeline, and client-specific needs. Always request a custom quote by contacting contact.thinkarq@gmail.com or visiting thinkarq.com/contact.',
    keywords: [
      'price',
      'pricing',
      'cost',
      'how much',
      'estimate',
      'quote',
      'budget',
      'website cost',
      'how much does it cost',
      'website price',
      'fees',
      'rate',
      'charges',
      'rupees',
      '₹',
      'inr',
    ],
  },
  {
    id: 'thinkarq-pricing-ai',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq AI & ML Development Pricing',
    section: 'AI/ML Development Pricing & Estimates',
    category: 'pricing',
    content:
      "Think Arq AI and machine learning development pricing varies significantly based on the complexity of the model, data requirements, integration needs, and deployment environment. Starting estimates: AI Chatbot (basic custom chatbot with predefined flows and integrations) starts from approximately ₹80,000–₹1,50,000. RAG-based AI chatbot (with knowledge base, vector search, and LLM integration) starts from approximately ₹1,50,000–₹3,00,000. Custom ML Model (training, evaluation, and deployment) starts from approximately ₹2,00,000–₹5,00,000+. AI Agent or Automation System starts from approximately ₹2,50,000–₹6,00,000+. Computer Vision system (object detection, defect inspection) starts from approximately ₹3,00,000–₹8,00,000+. LLM fine-tuning and RAG Pipeline projects start from approximately ₹3,00,000+. These are indicative estimates only. Final pricing depends on the data complexity, model type, scale, integrations, and timeline. Request a custom AI project quote at contact.thinkarq@gmail.com.",
    keywords: [
      'ai price',
      'ai cost',
      'ml cost',
      'machine learning price',
      'chatbot price',
      'chatbot cost',
      'rag price',
      'ai development cost',
      'ai pricing',
      'how much ai',
      'how much chatbot',
    ],
  },
  {
    id: 'thinkarq-pricing-seo',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq SEO & Digital Marketing Pricing',
    section: 'SEO & Digital Marketing Pricing',
    category: 'pricing',
    content:
      'Think Arq SEO and digital marketing pricing depends on the service scope, number of target keywords, market competitiveness, and campaign duration. Starting estimates: Technical SEO Audit (site health, Core Web Vitals, schema, crawl fixes) starts from approximately ₹25,000–₹50,000 (one-time). Monthly SEO Retainer (ongoing keyword strategy, content optimization, backlink building, reporting) starts from approximately ₹30,000–₹80,000 per month. PPC / Google Ads campaign management (setup + optimization) starts from approximately ₹20,000–₹50,000 per month (excluding ad spend budget). Social Media Marketing (strategy, content creation, scheduling, reporting) starts from approximately ₹20,000–₹60,000 per month. Email Marketing campaigns start from approximately ₹15,000–₹40,000 per campaign. These are starting estimates only. Final pricing depends on campaign scope, competition, target markets (India, USA, Europe), and monthly deliverables. Contact contact.thinkarq@gmail.com for a tailored quote.',
    keywords: [
      'seo price',
      'seo cost',
      'digital marketing price',
      'marketing cost',
      'seo pricing',
      'how much seo',
      'social media cost',
      'ppc cost',
      'google ads cost',
      'email marketing price',
    ],
  },
  {
    id: 'thinkarq-pricing-design',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq UI/UX Design Pricing',
    section: 'UI/UX Design Pricing & Estimates',
    category: 'pricing',
    content:
      'Think Arq UI/UX design service pricing depends on the number of screens, complexity, and deliverables required. Starting estimates: Basic Website UI/UX Design (wireframes, mockups for up to 5 pages in Figma) starts from approximately ₹20,000–₹40,000. Mobile App UI/UX Design (up to 15 screens, interactive Figma prototype) starts from approximately ₹50,000–₹1,20,000. Full Product Design System (component library, typography, color tokens, spacing scale) starts from approximately ₹80,000–₹2,00,000. End-to-end Product Redesign (UX audit, user research, journey mapping, high-fidelity prototyping for 20–40+ screens) starts from approximately ₹1,50,000–₹4,00,000. These are indicative starting prices. Final pricing depends on the number of screens, user research scope, iterations, and handoff requirements. Contact contact.thinkarq@gmail.com for an accurate project quote.',
    keywords: [
      'ui ux price',
      'design price',
      'design cost',
      'figma cost',
      'prototype price',
      'app design cost',
      'website design price',
      'ui cost',
      'ux price',
      'product design cost',
    ],
  },
  {
    id: 'thinkarq-pricing-data',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq Data Engineering Pricing',
    section: 'Data Engineering & Analytics Pricing',
    category: 'pricing',
    content:
      'Think Arq data engineering and analytics pricing depends on the data sources, volume, pipeline complexity, and visualization requirements. Starting estimates: Data Analytics Audit & Dashboard setup (Power BI / Looker Studio) starts from approximately ₹50,000–₹1,00,000. ETL/ELT Data Pipeline (connecting 3–5 sources, transformation, warehouse loading) starts from approximately ₹1,00,000–₹3,00,000. Cloud Data Warehouse setup (BigQuery, Snowflake, or AWS Redshift) starts from approximately ₹1,50,000–₹4,00,000. Real-time Streaming Pipeline (Apache Kafka, Spark) starts from approximately ₹2,50,000–₹6,00,000+. Enterprise Data Platform (full lakehouse architecture with orchestration and governance) starts from approximately ₹5,00,000+. These are approximate starting figures. Final pricing is scoped based on data volume, number of sources, cloud provider, and ongoing maintenance needs.',
    keywords: [
      'data price',
      'data engineering cost',
      'analytics price',
      'pipeline cost',
      'bigquery cost',
      'data warehouse cost',
      'dashboard price',
      'power bi cost',
      'kafka price',
      'data services price',
    ],
  },
  {
    id: 'thinkarq-pricing-ecommerce',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq E-Commerce Development Pricing',
    section: 'E-Commerce Website Pricing',
    category: 'pricing',
    content:
      'Think Arq e-commerce development pricing depends on the platform, number of products, payment gateways, and features required. Starting estimates: Basic e-commerce store (up to 50 products, Stripe/Razorpay integration, standard checkout) starts from approximately ₹1,00,000–₹2,00,000. Mid-size e-commerce platform (100–500 products, custom filters, multi-currency, discount management, inventory sync) starts from approximately ₹2,50,000–₹5,00,000. Custom headless e-commerce (Next.js/React storefront, custom admin panel, analytics dashboard, mobile responsive) starts from approximately ₹4,00,000–₹10,00,000+. Shopify customization or theme development starts from approximately ₹30,000–₹1,50,000 depending on complexity. These are indicative starting prices. Final pricing depends on product count, platform, features, payment integrations, and SEO requirements.',
    keywords: [
      'ecommerce price',
      'ecommerce cost',
      'online store price',
      'shopify cost',
      'shop website price',
      'e-commerce cost',
      'store website cost',
      'shopping site price',
      'product website cost',
    ],
  },
  {
    id: 'thinkarq-pricing-general',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq General Pricing Policy',
    section: 'Pricing Policy & How to Get a Quote',
    category: 'pricing',
    content:
      "Think Arq does not publish fixed price lists because all projects are custom-scoped based on the client's specific requirements, complexity, timeline, and deliverables. All prices shared are indicative starting estimates only — not final quotes. To get an accurate project quote, visit thinkarq.com/contact or email contact.thinkarq@gmail.com with your project brief. Think Arq offers a free 30-minute discovery call to understand the project requirements before providing a detailed proposal. Pricing is transparent, milestone-based, and free of hidden charges. Payment terms are structured around sprint deliverables. Think Arq serves clients in India (pricing in INR), USA, Europe, and UK (pricing in USD/EUR on request).",
    keywords: [
      'quote',
      'get a quote',
      'custom quote',
      'proposal',
      'how to get price',
      'pricing policy',
      'payment terms',
      'milestone',
      'hidden charges',
      'transparent pricing',
      'fixed price',
    ],
  },

  // ============================================================
  // FREQUENTLY ASKED QUESTIONS (FAQ)
  // ============================================================
  {
    id: 'thinkarq-faq-general',
    url: 'https://www.thinkarq.com/contact',
    title: 'Think Arq Frequently Asked Questions',
    section: 'General FAQs',
    category: 'faq',
    content:
      "FAQ: What does Think Arq do? Think Arq is a full-service technology company offering AI/ML development, custom web and software development, data engineering, UI/UX design, and digital marketing. FAQ: Who are Think Arq's founders? Jasmin Rajput (Founder & CEO) and Vaibhav Rajput (CEO). FAQ: Where is Think Arq based? Think Arq serves the USA, Europe, and United Kingdom. FAQ: How do I get a quote? Email contact.thinkarq@gmail.com or visit thinkarq.com/contact for a free 30-minute discovery consultation. FAQ: How long does a project take? Timeline depends on project complexity — a basic website takes 1–3 weeks, a custom web app 4–8 weeks, and complex AI projects 8–20 weeks. FAQ: Does Think Arq work with startups? Yes, Think Arq works with startups, SMEs, and enterprises across industries. FAQ: Do you provide post-launch support? Yes, Think Arq provides ongoing maintenance, bug fixes, and scaling support after project delivery. FAQ: What technology stack does Think Arq use? They use Next.js, React, TypeScript, Node.js, Python, FastAPI, PostgreSQL, Redis, MongoDB, AWS, Google Cloud, Docker, and more.",
    keywords: [
      'faq',
      'frequently asked questions',
      'common questions',
      'support',
      'post launch',
      'maintenance',
      'how long',
      'timeline',
      'startup',
      'technology stack',
      'tech stack',
    ],
  },
  {
    id: 'thinkarq-faq-process',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq Project Process FAQs',
    section: 'Project Process & Delivery FAQs',
    category: 'faq',
    content:
      "FAQ: What is Think Arq's project delivery process? Think Arq follows a 6-stage delivery methodology: (1) Discovery & Strategy — scope, architecture roadmap, (2) UI/UX Design & Prototyping — clickable Figma prototypes, (3) Agile Sprints & Development — 2-week sprints with client demos, (4) QA & Security Testing — automated tests, performance profiling, (5) Cloud Deployment & Launch — zero-downtime release, (6) Ongoing Support & Optimization. FAQ: Can Think Arq work on an existing project? Yes, they can take over, maintain, or improve an existing project. FAQ: Do they sign NDAs? Yes, Think Arq signs NDAs to protect client intellectual property. FAQ: Is the source code owned by the client? Yes, after project completion and payment, clients receive full source code ownership. FAQ: Can Think Arq work in my time zone? Yes, they have flexible working hours to collaborate across IST, EST, CST, GMT, and CET time zones.",
    keywords: [
      'process',
      'delivery',
      'nda',
      'source code',
      'ownership',
      'time zone',
      'existing project',
      'take over project',
      'agile',
      'sprints',
      'client demos',
    ],
  },
  {
    id: 'thinkarq-faq-services',
    url: 'https://www.thinkarq.com/services',
    title: 'Think Arq Service FAQs',
    section: 'Service-Specific FAQs',
    category: 'faq',
    content:
      'FAQ: Does Think Arq build mobile apps? Think Arq primarily builds web and cross-platform applications using React Native and Progressive Web Apps (PWA). FAQ: Does Think Arq do WordPress development? Think Arq focuses on modern full-stack custom development (Next.js, React, Node.js). WordPress is not their primary offering, but they can advise on CMS solutions if appropriate. FAQ: Do you provide SEO for Indian businesses? Yes, Think Arq provides SEO services targeting Indian, USA, European, and global markets. FAQ: Can you build a chatbot for my business? Yes, Think Arq builds custom AI chatbots with knowledge bases, booking integrations, lead capture, and CRM sync. FAQ: Do you provide cloud hosting or server setup? Yes, Think Arq can set up and manage cloud infrastructure on AWS, Google Cloud, and Vercel.',
    keywords: [
      'mobile app',
      'wordpress',
      'react native',
      'pwa',
      'cloud hosting',
      'server setup',
      'aws',
      'chatbot for business',
      'seo india',
      'crm integration',
      'cms',
    ],
  },

  // ============================================================
  // AI/ML SERVICES
  // ============================================================
  {
    id: 'thinkarq-ai-ml-dev',
    url: 'https://www.thinkarq.com/services/ai-ml-development-services',
    title: 'AI & ML Development Services',
    section: 'AI/ML Development Services',
    category: 'ai',
    content:
      'Think Arq provides AI & ML Development Services for intelligent business transformation. They empower businesses with next-generation Artificial Intelligence and Machine Learning development services. As one of the most trusted AI development companies for the USA and Europe markets, they build custom AI models, intelligent automation systems, and machine learning pipelines tailored to your business needs.',
    keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'ai development', 'ml development', 'ai ml'],
  },
  {
    id: 'thinkarq-ai-dev',
    url: 'https://www.thinkarq.com/services/ai-development-services',
    title: 'AI Development Services',
    section: 'Custom AI Development',
    category: 'ai',
    content:
      "Think Arq provides cutting-edge AI Development Services to accelerate innovation, efficiency, and growth. They are a trusted partner for building scalable, intelligent, and future-ready AI solutions. Whether you're a startup optimizing workflows or an enterprise redefining customer experience, their AI experts deliver custom AI solutions that align with your business goals and unlock new opportunities across industries.",
    keywords: ['ai development', 'ai solutions', 'custom ai', 'ai services', 'artificial intelligence development'],
  },
  {
    id: 'thinkarq-ai-consulting',
    url: 'https://www.thinkarq.com/services/ai-consulting-services',
    title: 'AI Consulting Services',
    section: 'AI Consulting & Strategy',
    category: 'ai',
    content:
      'Think Arq provides expert AI Consulting Services designed to help businesses in the USA and Europe harness the full potential of Artificial Intelligence for measurable growth and innovation. Their AI consultants help organizations understand AI readiness, identify high-impact use cases, build AI roadmaps, and implement data-driven intelligence strategies.',
    keywords: ['ai consulting', 'ai strategy', 'ai roadmap', 'ai readiness', 'ai consultant', 'consulting'],
  },
  {
    id: 'thinkarq-ai-chatbot',
    url: 'https://www.thinkarq.com/services/ai-chatbot-development',
    title: 'AI Chatbot Development Services',
    section: 'Intelligent AI Chatbot Development',
    category: 'ai',
    content:
      'Think Arq builds intelligent, human-like AI chatbots that transform customer experience and business efficiency. Their AI chatbot development services include custom conversational AI, customer support automation, multi-channel chatbots, NLP-powered assistants, and enterprise chatbot solutions for web, mobile, and social platforms.',
    keywords: [
      'chatbot',
      'ai chatbot',
      'conversational ai',
      'chat bot',
      'chatbot development',
      'customer support bot',
      'virtual assistant',
    ],
  },
  {
    id: 'thinkarq-gen-ai',
    url: 'https://www.thinkarq.com/services/gen-ai-development-service',
    title: 'Gen AI Development Services',
    section: 'Generative AI Development',
    category: 'ai',
    content:
      'Think Arq provides Gen AI Development Services — building future-ready intelligent systems. They help startups, enterprises, and global organizations build smart, scalable, self-learning systems powered by advanced Generative AI. From intelligent automation to hyper-personalized customer experiences, their solutions include custom LLM fine-tuning, RAG (Retrieval-Augmented Generation) systems, content generation engines, and AI-powered creative tools.',
    keywords: [
      'generative ai',
      'gen ai',
      'genai',
      'llm',
      'gpt',
      'large language model',
      'rag',
      'content generation',
      'ai content',
    ],
  },
  {
    id: 'thinkarq-computer-vision',
    url: 'https://www.thinkarq.com/services/computer-vision-development',
    title: 'Computer Vision Development Services',
    section: 'Computer Vision & Image Intelligence',
    category: 'ai',
    content:
      'Think Arq helps companies across the USA and Europe unlock powerful automation and insight through advanced Computer Vision development. They transform images into intelligence, building vision-powered digital experiences. Services include image recognition, object detection, video analytics, OCR, facial recognition, quality inspection, and visual AI solutions for various industries.',
    keywords: [
      'computer vision',
      'image recognition',
      'object detection',
      'video analytics',
      'ocr',
      'visual ai',
      'image processing',
      'facial recognition',
    ],
  },
  {
    id: 'thinkarq-ai-integration',
    url: 'https://www.thinkarq.com/services/ai-integration-service',
    title: 'AI Integration Service',
    section: 'Enterprise AI Integration',
    category: 'ai',
    content:
      'Think Arq provides AI Integration Services that embed intelligent automation directly into your existing systems, applications, tools, and workflows — without disrupting operations. They help companies in the USA and Europe seamlessly integrate AI into ERPs, CRMs, customer-facing web apps, and business workflows to automate processes, reduce operational costs, and make faster data-driven decisions.',
    keywords: [
      'ai integration',
      'integrate ai',
      'ai into business',
      'workflow automation',
      'enterprise ai',
      'ai erp',
      'ai crm',
      'business automation',
    ],
  },
  {
    id: 'thinkarq-ai-agents',
    url: 'https://www.thinkarq.com/services/ai-agent-development-services',
    title: 'AI Agent Development Services',
    section: 'Autonomous AI Agent Development',
    category: 'ai',
    content:
      'Think Arq builds intelligent, autonomous, and scalable AI agents designed for real-world business impact. These are systems that can understand tasks, make decisions, execute actions, and optimize themselves with minimal human intervention. Services include multi-agent systems, tool-using AI agents, autonomous workflow agents, and agentic AI platforms for enterprise automation.',
    keywords: [
      'ai agents',
      'ai agent',
      'autonomous ai',
      'agentic ai',
      'agent development',
      'multi-agent',
      'autonomous agents',
      'intelligent agents',
    ],
  },
  {
    id: 'thinkarq-llm-dev',
    url: 'https://www.thinkarq.com/services/llm-development-services',
    title: 'LLM Development Services',
    section: 'Large Language Model Development',
    category: 'ai',
    content:
      'Think Arq helps businesses in the USA and Europe build, deploy, and fine-tune custom LLM solutions that deliver accuracy, speed, and measurable business value. Their LLM development services include custom LLM fine-tuning, RAG (Retrieval-Augmented Generation) pipelines, prompt engineering, LLM-powered enterprise applications, and domain-specific language model training.',
    keywords: [
      'llm',
      'large language model',
      'llm development',
      'fine-tuning',
      'prompt engineering',
      'rag',
      'language model',
      'gpt',
      'custom llm',
    ],
  },
  {
    id: 'thinkarq-ai-software',
    url: 'https://www.thinkarq.com/services/ai-software-development',
    title: 'AI Software Development',
    section: 'AI-Powered Software Development',
    category: 'ai',
    content:
      'Think Arq helps businesses across the USA and Europe transform traditional systems into intelligent, data-driven, automated solutions through AI Software Development. Whether you need custom AI models, AI-powered platforms, enterprise automation, predictive systems, or a fully integrated AI ecosystem — they build high-performance, scalable, production-ready AI software tailored to your business goals.',
    keywords: [
      'ai software',
      'ai platform',
      'ai application',
      'intelligent software',
      'ai powered software',
      'ai product development',
    ],
  },

  // ============================================================
  // DATA SERVICES
  // ============================================================
  {
    id: 'thinkarq-data-analytics',
    url: 'https://www.thinkarq.com/services/data-analytics-services',
    title: 'Data Analytics Services',
    section: 'Advanced Data Analytics',
    category: 'data',
    content:
      'Think Arq helps businesses across the USA and Europe harness their data to uncover trends, predict outcomes, and make confident, insight-backed decisions. Their data analytics services include descriptive analytics, diagnostic analytics, predictive analytics, prescriptive analytics, real-time data analysis, custom dashboards, and business intelligence reporting.',
    keywords: [
      'data analytics',
      'analytics',
      'data analysis',
      'business analytics',
      'insights',
      'trends',
      'data-driven decisions',
    ],
  },
  {
    id: 'thinkarq-data-science',
    url: 'https://www.thinkarq.com/services/data-science-services',
    title: 'Data Science Services',
    section: 'Data Science & Predictive Modeling',
    category: 'data',
    content:
      "Think Arq's Data Science Services empower organizations across the USA and Europe to harness the power of data for predictive insights, smarter decision-making, and measurable business growth. Services include statistical modeling, customer segmentation, churn prediction, demand forecasting, sentiment analysis, anomaly detection, and deep pattern extraction using advanced data science techniques.",
    keywords: [
      'data science',
      'predictive analytics',
      'statistical modeling',
      'forecasting',
      'machine learning models',
      'customer segmentation',
      'churn prediction',
    ],
  },
  {
    id: 'thinkarq-data-mining',
    url: 'https://www.thinkarq.com/services/data-mining-services',
    title: 'Data Mining Services',
    section: 'Data Mining & Pattern Discovery',
    category: 'data',
    content:
      "Think Arq's Data Mining Services empower businesses across the USA and Europe to transform massive datasets into meaningful patterns, actionable intelligence, and strategic foresight. Services include association mining, clustering, classification, regression, text mining, web mining, and automated pattern discovery from structured and unstructured data.",
    keywords: [
      'data mining',
      'pattern discovery',
      'text mining',
      'web mining',
      'clustering',
      'classification',
      'data patterns',
    ],
  },
  {
    id: 'thinkarq-data-engineering',
    url: 'https://www.thinkarq.com/services/data-engineering-services',
    title: 'Data Engineering Services',
    section: 'Scalable Data Infrastructure',
    category: 'data',
    content:
      "Think Arq's Data Engineering Services empower organizations across the USA and Europe to build strong, scalable, and future-ready data infrastructures. Their expert data engineers design robust systems that enable seamless data flow, high performance, and actionable insights. Services include real-time and batch ETL/ELT pipelines, cloud data warehousing (Snowflake, Google BigQuery, AWS Redshift, Databricks), data lakehouse architectures, stream processing (Apache Kafka, Spark), data modeling, and automated data governance.",
    keywords: [
      'data engineering',
      'data pipeline',
      'etl',
      'elt',
      'snowflake',
      'bigquery',
      'databricks',
      'kafka',
      'data warehouse',
      'data lake',
      'data infrastructure',
    ],
  },
  {
    id: 'thinkarq-data-visualization',
    url: 'https://www.thinkarq.com/services/data-visualization-services',
    title: 'Data Visualization Services',
    section: 'Data Visualization & Dashboards',
    category: 'data',
    content:
      "Think Arq turns overwhelming data sets into intuitive, interactive visual stories that empower smarter decision-making. Their Data Visualization Services help businesses across the USA and Europe make sense of complex information through compelling dashboards, real-time visual analytics, and custom data storytelling solutions. Tools include Power BI, Tableau, Looker, and bespoke web visualization libraries (D3.js, Chart.js, Recharts).",
    keywords: [
      'data visualization',
      'dashboards',
      'power bi',
      'tableau',
      'looker',
      'charts',
      'bi',
      'business intelligence',
      'reporting',
      'data storytelling',
    ],
  },

  // ============================================================
  // DIGITAL MARKETING SERVICES
  // ============================================================
  {
    id: 'thinkarq-seo',
    url: 'https://www.thinkarq.com/services/search-engine-optimization',
    title: 'Search Engine Optimization (SEO) Services',
    section: 'SEO & Organic Growth',
    category: 'marketing',
    content:
      'Think Arq boosts online visibility with expert SEO services for businesses targeting USA, India, and Europe markets. As a top SEO agency, they help brands increase organic traffic, improve search rankings, and generate quality leads. Services include Technical SEO, On-Page SEO, Off-Page SEO, Local SEO, keyword research, content optimization, link building, Core Web Vitals optimization, and SEO audits. Think Arq tracks and reports on keyword rankings, organic traffic growth, bounce rate, and conversion improvements monthly.',
    keywords: [
      'seo',
      'search engine optimization',
      'organic traffic',
      'search rankings',
      'keyword research',
      'on-page seo',
      'technical seo',
      'link building',
      'google ranking',
      'local seo',
      'core web vitals',
    ],
  },
  {
    id: 'thinkarq-ppc',
    url: 'https://www.thinkarq.com/services/pay-per-click-advertising',
    title: 'Pay-per-click (PPC) Advertising Services',
    section: 'PPC & Paid Advertising',
    category: 'marketing',
    content:
      "Think Arq accelerates business growth with expert PPC advertising services. Their Pay Per Click advertising services help businesses achieve immediate visibility, qualified traffic, and measurable ROI. They specialize in creating high-performing Google Ads, Facebook Ads, LinkedIn Ads, and YouTube Advertising campaigns designed to reach your ideal audience and convert clicks into customers.",
    keywords: [
      'ppc',
      'pay per click',
      'google ads',
      'facebook ads',
      'linkedin ads',
      'youtube ads',
      'paid advertising',
      'paid ads',
      'sem',
      'paid search',
      'ad campaigns',
    ],
  },
  {
    id: 'thinkarq-social-media',
    url: 'https://www.thinkarq.com/services/social-media-marketing',
    title: 'Social Media Marketing (SMM) Services',
    section: 'Social Media Management',
    category: 'marketing',
    content:
      'Think Arq delivers powerful, data-driven social media management services for businesses in USA and Europe, helping brands grow stronger, engage smarter, and perform better. Services include social media strategy, content creation, community management, social media advertising, influencer marketing, brand awareness campaigns, and social media analytics and reporting.',
    keywords: [
      'social media',
      'social media marketing',
      'smm',
      'instagram',
      'facebook',
      'linkedin',
      'social media management',
      'content creation',
      'social strategy',
    ],
  },
  {
    id: 'thinkarq-email-marketing',
    url: 'https://www.thinkarq.com/services/email-marketing',
    title: 'Email Marketing Services',
    section: 'Email Marketing & Automation',
    category: 'marketing',
    content:
      "Think Arq boosts customer engagement and retention with intelligent, data-driven email campaigns that convert. Their email marketing experts design, execute, and optimize campaigns that strengthen brand presence and deliver measurable ROI. Services include email campaign design, marketing automation, drip campaigns, newsletter creation, A/B testing, list segmentation, and email analytics for businesses in the USA and Europe.",
    keywords: [
      'email marketing',
      'email campaigns',
      'newsletter',
      'drip campaigns',
      'email automation',
      'marketing automation',
      'email',
    ],
  },

  // ============================================================
  // UI/UX DESIGN
  // ============================================================
  {
    id: 'thinkarq-uiux',
    url: 'https://www.thinkarq.com/services/ui-ux-design-service',
    title: 'UI/UX Design Services',
    section: 'UI/UX Design & Product Design',
    category: 'design',
    content:
      'Think Arq creates seamless, intuitive, and visually striking digital experiences. As a leading UI/UX design agency in USA and Europe, they craft user-centered interfaces that not only look exceptional but also perform effortlessly. Services include User Research, Customer Journey Mapping, Information Architecture, Wireframing, High-Fidelity Interactive Prototyping (Figma), Design Systems, Micro-interactions, Usability Testing, and responsive web/mobile design.',
    keywords: [
      'ui/ux',
      'ui design',
      'ux design',
      'product design',
      'figma',
      'wireframing',
      'prototyping',
      'design system',
      'user experience',
      'user interface',
      'design',
      'web design',
      'app design',
    ],
  },

  // ============================================================
  // SOFTWARE DEVELOPMENT
  // ============================================================
  {
    id: 'thinkarq-software',
    url: 'https://www.thinkarq.com/',
    title: 'Web & Custom Software Development',
    section: 'Full-Stack Web & SaaS Development',
    category: 'software',
    content:
      "Think Arq engineers high-performance web applications, custom SaaS platforms, and enterprise software. Their tech stack embraces modern architectures including Next.js, React, TypeScript, Node.js, Python (FastAPI/Django), Go, PostgreSQL, MongoDB, Redis, GraphQL, microservices, and more. They deliver robust web and software solutions combined with AI and data-driven insights. Think Arq can build e-commerce platforms, multi-tenant SaaS, business dashboards, marketplace apps, booking systems, CRM tools, and enterprise portals.",
    keywords: [
      'web development',
      'software development',
      'saas',
      'custom software',
      'react',
      'next.js',
      'typescript',
      'python',
      'full stack',
      'backend',
      'frontend',
      'web app',
      'application development',
      'website',
      'build website',
      'create website',
    ],
  },

  // ============================================================
  // HIRING & ENGAGEMENT MODELS
  // ============================================================
  {
    id: 'thinkarq-hiring-models',
    url: 'https://www.thinkarq.com/',
    title: 'Hiring & Engagement Models',
    section: 'How to Hire ThinkArq Talent',
    category: 'hiring',
    content:
      'Think Arq offers flexible engagement models: 1) Dedicated Agile Teams — complete pod of developers, PM, QA, UI/UX. 2) Staff Augmentation — hire vetted senior AI engineers, data engineers, full-stack developers, and UI/UX designers on demand. 3) Fixed-Price Milestone Projects with clear deliverables. They also offer specialized hiring options like Hire Vibe Coder (AI-powered coding experts using modern vibe coding tools) and Hire Cursor Developer (developers proficient with Cursor AI IDE for rapid development).',
    keywords: [
      'hire',
      'hiring',
      'staff augmentation',
      'dedicated team',
      'engagement models',
      'hire developers',
      'hire designers',
      'contract developers',
      'outsource',
    ],
  },
  {
    id: 'thinkarq-hire-vibe-coder',
    url: 'https://www.thinkarq.com/hire/hire-vibe-coder',
    title: 'Hire Vibe Coder',
    section: 'Vibe Coding & AI-Assisted Development',
    category: 'hiring',
    content:
      'Think Arq offers Hire Vibe Coder services — providing skilled developers who leverage AI-powered coding tools and modern vibe coding workflows to build software faster and more efficiently. Vibe coders use AI assistants, pair programming tools, and modern development environments to deliver high-quality code at accelerated timelines.',
    keywords: [
      'vibe coder',
      'vibe coding',
      'hire vibe coder',
      'ai coding',
      'ai developer',
      'ai-assisted development',
      'modern developer',
    ],
  },
  {
    id: 'thinkarq-hire-cursor-dev',
    url: 'https://www.thinkarq.com/hire/hire-cursor-developer',
    title: 'Hire Cursor Developer',
    section: 'Cursor AI Development',
    category: 'hiring',
    content:
      'Think Arq offers Hire Cursor Developer services — providing expert developers who are proficient with the Cursor AI IDE for rapid, AI-assisted software development. Cursor developers leverage AI-powered code generation, intelligent code completion, and automated refactoring to build production-ready applications faster.',
    keywords: [
      'cursor',
      'cursor developer',
      'hire cursor developer',
      'cursor ai',
      'cursor ide',
      'ai ide developer',
    ],
  },

  // ============================================================
  // PROCESS & METHODOLOGY
  // ============================================================
  {
    id: 'thinkarq-process',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq Working Process & Delivery Methodology',
    section: 'Delivery Process & Methodology',
    category: 'process',
    content:
      'Think Arq follows a proven 6-stage delivery methodology that ensures transparent and on-time execution: 1. Discovery & Strategy — scoping requirements, architecture roadmap. 2. UI/UX Design & Prototyping — clickable prototypes, design tokens. 3. Agile Sprints & Development — two-week sprints with regular client demos. 4. Quality Assurance & Security Testing — automated tests, performance profiling. 5. Cloud Deployment & Launch — zero-downtime release, monitoring. 6. Ongoing Support, Maintenance & Optimization — continuous improvement and scaling.',
    keywords: [
      'process',
      'how you work',
      'methodology',
      'agile',
      'sprints',
      'delivery',
      'timeline',
      'stages',
      'steps',
      'workflow',
      'how does it work',
      'development process',
    ],
  },

  // ============================================================
  // CONTACT & SOCIAL
  // ============================================================
  {
    id: 'thinkarq-contact',
    url: 'https://www.thinkarq.com/contact',
    title: 'Contact Think Arq | Get a Free Project Consultation',
    section: 'Contact & Consultation',
    category: 'contact',
    content:
      'You can reach out to Think Arq directly to discuss your project requirements, request a quote, or book a free consultation with their AI and software development experts. Email: contact.thinkarq@gmail.com. Visit the contact page at https://www.thinkarq.com/contact to fill out the contact form or schedule a call. They serve businesses across the USA, India, Europe and the United Kingdom.',
    keywords: [
      'contact',
      'email',
      'phone',
      'book a call',
      'schedule',
      'talk to sales',
      'get a quote',
      'consultation',
      'hire us',
      'reach out',
      'get in touch',
      'free consultation',
    ],
  },
  {
    id: 'thinkarq-social-links',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq Social Media Profiles',
    section: 'Social Media & Online Presence',
    category: 'contact',
    content:
      'Follow Think Arq on social media: Twitter/X: https://x.com/Think_Arq_ | Instagram: https://www.instagram.com/think_arq_/ | LinkedIn: https://www.linkedin.com/company/think-arq/ | Website: https://www.thinkarq.com. Subscribe to their newsletter on the website for the latest updates.',
    keywords: [
      'social media',
      'twitter',
      'instagram',
      'linkedin',
      'follow',
      'social links',
      'social profiles',
      'connect',
      'x',
      'online presence',
    ],
  },

  // ============================================================
  // AREAS SERVED & INDUSTRIES
  // ============================================================
  {
    id: 'thinkarq-areas-served',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq Service Areas & Markets',
    section: 'Geographic Coverage & Markets',
    category: 'overview',
    content:
      'Think Arq primarily serves businesses in the United States (USA), India, Europe, and the United Kingdom. They work with startups, growing enterprises, and established global brands across various industries. Their services are available remotely, enabling them to collaborate with clients worldwide while focusing on the USA, Indian, and European markets.',
    keywords: [
      'usa',
      'europe',
      'united states',
      'united kingdom',
      'uk',
      'india',
      'location',
      'where',
      'based',
      'serve',
      'markets',
      'countries',
      'regions',
      'remote',
      'global',
    ],
  },

  // ============================================================
  // PORTFOLIO PROJECTS / CASE STUDIES
  // ============================================================
  {
    id: 'thinkarq-project-ai-chatbot',
    url: 'https://www.thinkarq.com/services/ai-chatbot-development',
    title: 'ThinkArq AI — Intelligent Business Chatbot Platform',
    section: 'Project: AI Chatbot Development',
    category: 'projects',
    content:
      'Project: ThinkArq AI — Intelligent Business Chatbot Platform. Purpose: Build a fully custom AI-powered chatbot for a B2B technology company to automate customer support, answer service-related queries, capture leads, and book consultations — replacing manual email handling with a 24/7 intelligent assistant. Features: RAG pipeline for accurate knowledge-base-driven answers; real-time chat with typing indicators; multi-turn conversation memory; lead capture with CRM integration; automated meeting booking via Cal.com; rate limiting and security; dark/light mode UI; mobile-responsive design; source citation; suggestion chips; chat session history with export. Tech Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Google Gemini AI, custom TF-IDF vector search engine, Cal.com API. Outcome: Reduced customer query response time from hours to seconds, improved lead conversion by automating consultation bookings, and provided 24/7 support coverage.',
    keywords: [
      'chatbot project',
      'ai chatbot',
      'rag chatbot',
      'knowledge base chatbot',
      'lead capture chatbot',
      'booking chatbot',
      'customer support bot',
      'gemini chatbot',
      'next.js chatbot',
      'thinkarq ai chatbot',
      'ai project',
      'chatbot case study',
    ],
  },
  {
    id: 'thinkarq-project-data-pipeline',
    url: 'https://www.thinkarq.com/services/data-engineering-services',
    title: 'Real-Time E-Commerce Analytics & Data Pipeline',
    section: 'Project: Data Engineering & Analytics',
    category: 'projects',
    content:
      "Project: Real-Time E-Commerce Analytics & Data Pipeline. Purpose: Design and build a scalable, real-time data infrastructure for a mid-size US e-commerce brand to unify data from multiple platforms (Shopify, Google Ads, Meta Ads, CRM), eliminate data silos, and deliver actionable business intelligence dashboards. Features: Automated ETL/ELT pipelines ingesting from 7+ sources; real-time stream processing using Apache Kafka; cloud data warehouse on Google BigQuery; interactive Power BI and Looker dashboards with KPIs including revenue trends, customer LTV, cart abandonment, and ROAS; automated daily/weekly BI reports; anomaly detection alerts; customer segmentation models. Tech Stack: Python, Apache Kafka, Google BigQuery, Apache Airflow, dbt, Power BI, Looker Studio, Fivetran, Docker. Outcome: Reduced reporting time from 3 days to under 30 minutes, identified $220K in wasted ad spend in the first month, and enabled data-driven decisions that increased ROAS by 2.4x within 90 days.",
    keywords: [
      'data pipeline',
      'data engineering project',
      'etl project',
      'bigquery',
      'kafka',
      'ecommerce analytics',
      'real time data',
      'power bi dashboard',
      'data project',
      'analytics project',
      'data case study',
    ],
  },
  {
    id: 'thinkarq-project-saas-platform',
    url: 'https://www.thinkarq.com/services/ai-software-development',
    title: 'AI-Powered SaaS Recruitment Platform',
    section: 'Project: SaaS & AI Software Development',
    category: 'projects',
    content:
      "Project: AI-Powered SaaS Recruitment Platform. Purpose: Build a full-stack SaaS platform for a UK-based HR tech startup to automate candidate sourcing, resume screening, and interview scheduling using AI — reducing manual recruiter effort by 70%. Features: AI-powered resume parsing and ranking; job description → candidate matching with semantic similarity scoring; automated interview scheduling with calendar sync (Google Calendar, Outlook); multi-tenant SaaS architecture with team workspaces and role-based access; real-time notifications via WebSockets; analytics dashboard for hiring funnel metrics; ATS integrations; subscription billing via Stripe. Tech Stack: Next.js, TypeScript, Node.js (Express), PostgreSQL, Redis, OpenAI GPT-4, Python (ML scoring models), Stripe, WebSockets, Docker, AWS. Outcome: Reduced average time-to-hire from 6 weeks to 12 days, cut recruiter screening hours by 72%, and scaled from 0 to 500 active users in the first 4 months post-launch.",
    keywords: [
      'saas project',
      'recruitment platform',
      'hr tech',
      'ai saas',
      'resume screening',
      'applicant tracking',
      'hiring platform',
      'software project',
      'full stack project',
      'ai software',
      'saas case study',
    ],
  },
  {
    id: 'thinkarq-project-computer-vision',
    url: 'https://www.thinkarq.com/services/computer-vision-development',
    title: 'AI Quality Inspection System (Computer Vision)',
    section: 'Project: Computer Vision & Automation',
    category: 'projects',
    content:
      'Project: AI Quality Inspection System for Manufacturing. Purpose: Replace manual visual quality inspection on a manufacturing production line for a European industrial client — reducing defect rates and inspection costs through automated real-time computer vision. Features: Real-time defect detection using high-res industrial cameras; custom-trained YOLOv8 object detection model; multi-class defect classification (scratches, dents, misalignments, color inconsistencies); automated rejection signal to physical actuators; live monitoring dashboard with defect heat maps; model retraining pipeline; edge deployment on NVIDIA Jetson hardware. Tech Stack: Python, YOLOv8, OpenCV, PyTorch, FastAPI, React dashboard, PostgreSQL, NVIDIA Jetson Orin, Docker. Outcome: Achieved 98.6% defect detection accuracy vs. 87% manual inspection rate, reduced defective product shipments by 94%, and cut inspection labor costs by 65%.',
    keywords: [
      'computer vision project',
      'quality inspection',
      'yolo',
      'object detection',
      'manufacturing ai',
      'defect detection',
      'visual inspection',
      'cv project',
      'ai vision',
      'image recognition project',
      'vision case study',
    ],
  },
  {
    id: 'thinkarq-project-gen-ai-content',
    url: 'https://www.thinkarq.com/services/gen-ai-development-service',
    title: 'Generative AI Content Engine for Digital Marketing',
    section: 'Project: Generative AI & LLM Development',
    category: 'projects',
    content:
      "Project: Generative AI Content Engine for a Digital Marketing Agency. Purpose: Build an internal Gen AI platform for a USA-based digital marketing agency to automate content creation workflows — producing on-brand blog posts, social media captions, ad copy, and email sequences at scale while maintaining brand voice consistency. Features: Custom fine-tuned LLM with brand voice training; RAG system for brand guideline adherence; multi-channel content generation (blogs, LinkedIn posts, Twitter threads, Google Ads copy, email drip sequences); SEO keyword integration; one-click Canva and HubSpot publishing integration; built-in plagiarism and AI-detection scoring; A/B variant generation; team collaboration with content approval workflows. Tech Stack: Python, OpenAI GPT-4 fine-tuning, LangChain (RAG pipeline), Pinecone (vector DB), FastAPI, Next.js, HubSpot API, Canva API, PostgreSQL. Outcome: Reduced content production time by 80%, enabled the agency to scale from 10 to 45 active clients without adding headcount, and improved average content engagement by 38%.",
    keywords: [
      'gen ai project',
      'generative ai',
      'content generation',
      'llm project',
      'marketing ai',
      'content engine',
      'gpt fine-tuning',
      'rag project',
      'ai content',
      'langchain project',
      'content automation',
    ],
  },
  {
    id: 'thinkarq-project-uiux-design',
    url: 'https://www.thinkarq.com/services/ui-ux-design-service',
    title: 'End-to-End UI/UX Redesign for FinTech Web App',
    section: 'Project: UI/UX Design & Product Design',
    category: 'projects',
    content:
      'Project: Complete UI/UX Redesign for a FinTech Web Application. Purpose: Redesign the full product experience of a US-based FinTech SaaS platform (personal finance and investment tracking) that had poor user retention and a confusing interface — transforming it into an intuitive, modern, and conversion-optimized product. Features: Full UX audit and heuristic evaluation; user research with 40+ interviews and usability testing sessions; customer journey mapping and persona development; information architecture redesign; new design system with custom tokens, components, and spacing scale; high-fidelity interactive Figma prototypes for all 35+ screens; responsive web and mobile designs; micro-interaction and animation spec; accessibility audit (WCAG 2.1 AA compliance). Tools: Figma, FigJam, Maze, Zeplin, Hotjar. Outcome: After redesign launch, user onboarding completion rate improved from 34% to 79%, session duration increased by 2.1x, NPS score jumped from 22 to 67, and churn rate dropped by 41%.',
    keywords: [
      'ui ux project',
      'design project',
      'figma project',
      'product design',
      'fintech design',
      'ux redesign',
      'design case study',
      'user experience project',
      'ui design case study',
      'product redesign',
    ],
  },
  {
    id: 'thinkarq-project-seo-marketing',
    url: 'https://www.thinkarq.com/services/search-engine-optimization',
    title: 'SEO & Digital Marketing Growth Campaign',
    section: 'Project: Digital Marketing & SEO',
    category: 'projects',
    content:
      'Project: Full-Scale SEO & Digital Marketing Growth Campaign for a B2B SaaS Company. Purpose: Execute a comprehensive 6-month digital marketing strategy for a USA-based B2B SaaS startup to establish organic search presence, generate inbound leads, and reduce reliance on paid ad spend. Features: Technical SEO audit and full site remediation (Core Web Vitals, crawlability, schema markup); keyword research identifying 480+ target keywords; on-page SEO optimization for 60+ pages; content marketing strategy with 24 long-form blog posts; link building campaign securing 85+ high-DA backlinks; Google Ads PPC campaign management with A/B testing; LinkedIn Ads for B2B lead generation; email marketing drip campaign. Tools: Ahrefs, SEMrush, Google Search Console, Google Analytics 4, Google Ads, HubSpot. Outcome: Organic traffic grew from 1,200 to 18,400 monthly sessions in 6 months (+1,433%), first-page Google rankings achieved for 120+ target keywords, monthly inbound leads increased from 8 to 94, and overall CAC reduced by 58%.',
    keywords: [
      'seo project',
      'digital marketing project',
      'seo case study',
      'marketing case study',
      'google ads project',
      'content marketing',
      'link building',
      'organic traffic',
      'b2b marketing',
      'inbound marketing',
      'marketing results',
      'seo results',
      'growth marketing',
    ],
  },
];
