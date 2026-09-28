export interface KnowledgeChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  category: 'overview' | 'ai' | 'data' | 'software' | 'design' | 'marketing' | 'process' | 'hiring' | 'contact' | 'values' | 'team' | 'projects';
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
    content: 'Think Arq (also known as ThinkArq or ThinkArq Studios) is a technology company delivering AI/ML development, custom software, data engineering, UI/UX design, and growth-focused digital marketing for businesses in the USA & Europe. Their guiding philosophy is "Think. Build. Disrupt." At Think Arq, they blend creativity with intelligence — delivering sleek UI/UX, robust web and software solutions, AI and data-driven insights, and growth-focused digital marketing to help businesses scale smarter. Think Arq serves ambitious startups, growing enterprises, and established global brands across the United States, Europe, and the United Kingdom.',
    keywords: ['thinkarq', 'think arq', 'about thinkarq', 'company', 'mission', 'what is thinkarq', 'think build disrupt', 'services', 'who are you', 'what do you do', 'overview', 'thinkarq studios']
  },
  {
    id: 'thinkarq-overview-2',
    url: 'https://www.thinkarq.com/about-us',
    title: 'About Think Arq | AI & Software Development Company in USA & Europe',
    section: 'About Think Arq',
    category: 'overview',
    content: 'At Think Arq, they architect ideas into reality. Whether it\'s a sleek web app, a smart AI solution, or a bold marketing campaign — they design, develop, and deliver digital products that leave an impression. They think ahead, code with precision, and market with purpose. Think Arq provides a complete suite of digital solutions designed to help businesses grow, innovate, and succeed online. Their expertise spans UI/UX design, web and software development, AI-powered solutions, and growth-focused digital marketing, enabling businesses in the USA, Europe, and beyond to achieve scalable results and measurable success.',
    keywords: ['about', 'about us', 'about thinkarq', 'who are you', 'what is thinkarq', 'company info', 'company information', 'tell me about', 'background']
  },
  {
    id: 'thinkarq-overview-stats',
    url: 'https://www.thinkarq.com/about-us',
    title: 'Think Arq Impact & Numbers',
    section: 'Company Impact & Statistics',
    category: 'overview',
    content: 'Think Arq\'s impact in numbers: 5+ Years of Experience in the industry, 20+ Team of Experts (AI engineers, software developers, data scientists, designers, and digital marketers), 10+ Successful Projects delivered, and 300% Average ROI for Clients. They don\'t just market brands — they build digital excellence.',
    keywords: ['stats', 'statistics', 'numbers', 'experience', 'team size', 'projects', 'roi', 'how many', 'how long', 'years', 'track record', 'results', 'team']
  },
  {
    id: 'thinkarq-services-all',
    url: 'https://www.thinkarq.com/services',
    title: 'Think Arq Services Overview',
    section: 'All Services at a Glance',
    category: 'overview',
    content: 'Think Arq offers 20+ professional services across three main categories: 1) Digital Marketing Services — Search Engine Optimization (SEO), Pay-per-click Advertising (PPC), Social Media Marketing (SMM), Email Marketing, and UI/UX Design Service. 2) Data Services — Data Analytics, Data Science, Data Mining, Data Engineering, and Data Visualization. 3) AI/ML Services — AI/ML Development, AI Development, AI Consulting, AI Chatbot Development, Gen AI Development, Computer Vision Development, AI Integration, AI Agent Development, LLM Development, and AI Software Development. They also offer specialized hiring services including Hire Vibe Coder and Hire Cursor Developer.',
    keywords: ['services', 'all services', 'what services', 'what do you offer', 'list services', 'service list', 'categories', 'offerings']
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
    content: 'Think Arq was founded by Jasmin Rajput (Founder & CEO) and Vaibhav Rajput (Chief Executive Officer). Behind Think Arq is a passionate team of AI engineers, software developers, data scientists, designers, and digital marketers — united by a shared mission to Think, Build, and Disrupt. The team consists of 20+ experts across multiple disciplines.',
    keywords: ['founder', 'founders', 'ceo', 'who founded', 'leadership', 'team', 'jasmin', 'vaibhav', 'rajput', 'who runs', 'owner', 'management', 'who started']
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
    content: 'Think Arq is guided by four core values: 1) Innovation — They don\'t simply follow trends; they create them. Every design, development, and digital solution is powered by forward-thinking strategies, cutting-edge technology, and creative problem-solving. 2) Integrity — Trust is the foundation of every successful partnership. Every project is executed with honesty, transparency, and accountability, maintaining clear communication throughout. 3) Collaboration — Great ideas are never born in isolation. They foster a collaborative environment where client insights, team expertise, and industry knowledge come together to create impactful results. 4) Excellence — Excellence is not optional—it\'s their standard. Every detail, every design, every solution is meticulously crafted to meet the highest standards of quality and performance.',
    keywords: ['values', 'core values', 'culture', 'principles', 'innovation', 'integrity', 'collaboration', 'excellence', 'what drives', 'philosophy']
  },

  // ============================================================
  // AI/ML SERVICES (10 sub-services from website)
  // ============================================================
  {
    id: 'thinkarq-ai-ml-dev',
    url: 'https://www.thinkarq.com/services/ai-ml-development-services',
    title: 'AI & ML Development Services',
    section: 'AI/ML Development Services',
    category: 'ai',
    content: 'Think Arq provides AI & ML Development Services for intelligent business transformation. They empower businesses with next-generation Artificial Intelligence and Machine Learning development services. As one of the most trusted AI development companies for the USA and Europe markets, they build custom AI models, intelligent automation systems, and machine learning pipelines tailored to your business needs.',
    keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'ai development', 'ml development', 'ai ml']
  },
  {
    id: 'thinkarq-ai-dev',
    url: 'https://www.thinkarq.com/services/ai-development-services',
    title: 'AI Development Services',
    section: 'Custom AI Development',
    category: 'ai',
    content: 'Think Arq provides cutting-edge AI Development Services to accelerate innovation, efficiency, and growth. They are a trusted partner for building scalable, intelligent, and future-ready AI solutions. Whether you\'re a startup optimizing workflows or an enterprise redefining customer experience, their AI experts deliver custom AI solutions that align with your business goals and unlock new opportunities across industries.',
    keywords: ['ai development', 'ai solutions', 'custom ai', 'ai services', 'artificial intelligence development']
  },
  {
    id: 'thinkarq-ai-consulting',
    url: 'https://www.thinkarq.com/services/ai-consulting-services',
    title: 'AI Consulting Services',
    section: 'AI Consulting & Strategy',
    category: 'ai',
    content: 'Think Arq provides expert AI Consulting Services designed to help businesses in the USA and Europe harness the full potential of Artificial Intelligence for measurable growth and innovation. Their AI consultants help organizations understand AI readiness, identify high-impact use cases, build AI roadmaps, and implement data-driven intelligence strategies.',
    keywords: ['ai consulting', 'ai strategy', 'ai roadmap', 'ai readiness', 'ai consultant', 'consulting']
  },
  {
    id: 'thinkarq-ai-chatbot',
    url: 'https://www.thinkarq.com/services/ai-chatbot-development',
    title: 'AI Chatbot Development Services',
    section: 'Intelligent AI Chatbot Development',
    category: 'ai',
    content: 'Think Arq builds intelligent, human-like AI chatbots that transform customer experience and business efficiency. Their AI chatbot development services include custom conversational AI, customer support automation, multi-channel chatbots, NLP-powered assistants, and enterprise chatbot solutions for web, mobile, and social platforms.',
    keywords: ['chatbot', 'ai chatbot', 'conversational ai', 'chat bot', 'chatbot development', 'customer support bot', 'virtual assistant']
  },
  {
    id: 'thinkarq-gen-ai',
    url: 'https://www.thinkarq.com/services/gen-ai-development-service',
    title: 'Gen AI Development Services',
    section: 'Generative AI Development',
    category: 'ai',
    content: 'Think Arq provides Gen AI Development Services — building future-ready intelligent systems. They help startups, enterprises, and global organizations build smart, scalable, self-learning systems powered by advanced Generative AI. From intelligent automation to hyper-personalized customer experiences, their solutions include custom LLM fine-tuning, RAG (Retrieval-Augmented Generation) systems, content generation engines, and AI-powered creative tools.',
    keywords: ['generative ai', 'gen ai', 'genai', 'llm', 'gpt', 'large language model', 'rag', 'content generation', 'ai content']
  },
  {
    id: 'thinkarq-computer-vision',
    url: 'https://www.thinkarq.com/services/computer-vision-development',
    title: 'Computer Vision Development Services',
    section: 'Computer Vision & Image Intelligence',
    category: 'ai',
    content: 'Think Arq helps companies across the USA and Europe unlock powerful automation and insight through advanced Computer Vision development. They transform images into intelligence, building vision-powered digital experiences. Services include image recognition, object detection, video analytics, OCR, facial recognition, quality inspection, and visual AI solutions for various industries.',
    keywords: ['computer vision', 'image recognition', 'object detection', 'video analytics', 'ocr', 'visual ai', 'image processing', 'facial recognition']
  },
  {
    id: 'thinkarq-ai-integration',
    url: 'https://www.thinkarq.com/services/ai-integration-service',
    title: 'AI Integration Service',
    section: 'Enterprise AI Integration',
    category: 'ai',
    content: 'Think Arq provides AI Integration Services that embed intelligent automation directly into your existing systems, applications, tools, and workflows — without disrupting operations. They help companies in the USA and Europe seamlessly integrate AI into ERPs, CRMs, customer-facing web apps, and business workflows to automate processes, reduce operational costs, and make faster data-driven decisions.',
    keywords: ['ai integration', 'integrate ai', 'ai into business', 'workflow automation', 'enterprise ai', 'ai erp', 'ai crm', 'business automation']
  },
  {
    id: 'thinkarq-ai-agents',
    url: 'https://www.thinkarq.com/services/ai-agent-development-services',
    title: 'AI Agent Development Services',
    section: 'Autonomous AI Agent Development',
    category: 'ai',
    content: 'Think Arq builds intelligent, autonomous, and scalable AI agents designed for real-world business impact. These are systems that can understand tasks, make decisions, execute actions, and optimize themselves with minimal human intervention. Services include multi-agent systems, tool-using AI agents, autonomous workflow agents, and agentic AI platforms for enterprise automation.',
    keywords: ['ai agents', 'ai agent', 'autonomous ai', 'agentic ai', 'agent development', 'multi-agent', 'autonomous agents', 'intelligent agents']
  },
  {
    id: 'thinkarq-llm-dev',
    url: 'https://www.thinkarq.com/services/llm-development-services',
    title: 'LLM Development Services',
    section: 'Large Language Model Development',
    category: 'ai',
    content: 'Think Arq helps businesses in the USA and Europe build, deploy, and fine-tune custom LLM solutions that deliver accuracy, speed, and measurable business value. Their LLM development services include custom LLM fine-tuning, RAG (Retrieval-Augmented Generation) pipelines, prompt engineering, LLM-powered enterprise applications, and domain-specific language model training.',
    keywords: ['llm', 'large language model', 'llm development', 'fine-tuning', 'prompt engineering', 'rag', 'language model', 'gpt', 'custom llm']
  },
  {
    id: 'thinkarq-ai-software',
    url: 'https://www.thinkarq.com/services/ai-software-development',
    title: 'AI Software Development',
    section: 'AI-Powered Software Development',
    category: 'ai',
    content: 'Think Arq helps businesses across the USA and Europe transform traditional systems into intelligent, data-driven, automated solutions through AI Software Development. Whether you need custom AI models, AI-powered platforms, enterprise automation, predictive systems, or a fully integrated AI ecosystem — they build high-performance, scalable, production-ready AI software tailored to your business goals.',
    keywords: ['ai software', 'ai platform', 'ai application', 'intelligent software', 'ai powered software', 'ai product development']
  },

  // ============================================================
  // DATA SERVICES (5 sub-services from website)
  // ============================================================
  {
    id: 'thinkarq-data-analytics',
    url: 'https://www.thinkarq.com/services/data-analytics-services',
    title: 'Data Analytics Services',
    section: 'Advanced Data Analytics',
    category: 'data',
    content: 'Think Arq helps businesses across the USA and Europe harness their data to uncover trends, predict outcomes, and make confident, insight-backed decisions. Their data analytics services include descriptive analytics, diagnostic analytics, predictive analytics, prescriptive analytics, real-time data analysis, custom dashboards, and business intelligence reporting.',
    keywords: ['data analytics', 'analytics', 'data analysis', 'business analytics', 'insights', 'trends', 'data-driven decisions']
  },
  {
    id: 'thinkarq-data-science',
    url: 'https://www.thinkarq.com/services/data-science-services',
    title: 'Data Science Services',
    section: 'Data Science & Predictive Modeling',
    category: 'data',
    content: 'Think Arq\'s Data Science Services empower organizations across the USA and Europe to harness the power of data for predictive insights, smarter decision-making, and measurable business growth. Services include statistical modeling, customer segmentation, churn prediction, demand forecasting, sentiment analysis, anomaly detection, and deep pattern extraction using advanced data science techniques.',
    keywords: ['data science', 'predictive analytics', 'statistical modeling', 'forecasting', 'machine learning models', 'customer segmentation', 'churn prediction']
  },
  {
    id: 'thinkarq-data-mining',
    url: 'https://www.thinkarq.com/services/data-mining-services',
    title: 'Data Mining Services',
    section: 'Data Mining & Pattern Discovery',
    category: 'data',
    content: 'Think Arq\'s Data Mining Services empower businesses across the USA and Europe to transform massive datasets into meaningful patterns, actionable intelligence, and strategic foresight. Services include association mining, clustering, classification, regression, text mining, web mining, and automated pattern discovery from structured and unstructured data.',
    keywords: ['data mining', 'pattern discovery', 'text mining', 'web mining', 'clustering', 'classification', 'data patterns']
  },
  {
    id: 'thinkarq-data-engineering',
    url: 'https://www.thinkarq.com/services/data-engineering-services',
    title: 'Data Engineering Services',
    section: 'Scalable Data Infrastructure',
    category: 'data',
    content: 'Think Arq\'s Data Engineering Services empower organizations across the USA and Europe to build strong, scalable, and future-ready data infrastructures. Their expert data engineers design robust systems that enable seamless data flow, high performance, and actionable insights. Services include real-time and batch ETL/ELT pipelines, cloud data warehousing (Snowflake, Google BigQuery, AWS Redshift, Databricks), data lakehouse architectures, stream processing (Apache Kafka, Spark), data modeling, and automated data governance.',
    keywords: ['data engineering', 'data pipeline', 'etl', 'elt', 'snowflake', 'bigquery', 'databricks', 'kafka', 'data warehouse', 'data lake', 'data infrastructure']
  },
  {
    id: 'thinkarq-data-visualization',
    url: 'https://www.thinkarq.com/services/data-visualization-services',
    title: 'Data Visualization Services',
    section: 'Data Visualization & Dashboards',
    category: 'data',
    content: 'Think Arq turns overwhelming data sets into intuitive, interactive visual stories that empower smarter decision-making. Their Data Visualization Services help businesses across the USA and Europe make sense of complex information through compelling dashboards, real-time visual analytics, and custom data storytelling solutions. Tools include Power BI, Tableau, Looker, and bespoke web visualization libraries (D3.js, Chart.js, Recharts).',
    keywords: ['data visualization', 'dashboards', 'power bi', 'tableau', 'looker', 'charts', 'bi', 'business intelligence', 'reporting', 'data storytelling']
  },

  // ============================================================
  // DIGITAL MARKETING SERVICES (5 sub-services from website)
  // ============================================================
  {
    id: 'thinkarq-seo',
    url: 'https://www.thinkarq.com/services/search-engine-optimization',
    title: 'Search Engine Optimization (SEO) Services',
    section: 'SEO & Organic Growth',
    category: 'marketing',
    content: 'Think Arq boosts online visibility with expert SEO services for businesses targeting USA and Europe markets. As a top SEO agency, they help brands increase organic traffic, improve search rankings, and generate quality leads. Services include Technical SEO, On-Page SEO, Off-Page SEO, Local SEO, keyword research, content optimization, link building, and SEO audits.',
    keywords: ['seo', 'search engine optimization', 'organic traffic', 'search rankings', 'keyword research', 'on-page seo', 'technical seo', 'link building', 'google ranking']
  },
  {
    id: 'thinkarq-ppc',
    url: 'https://www.thinkarq.com/services/pay-per-click-advertising',
    title: 'Pay-per-click (PPC) Advertising Services',
    section: 'PPC & Paid Advertising',
    category: 'marketing',
    content: 'Think Arq accelerates business growth with expert PPC advertising services. Their Pay Per Click advertising services help businesses achieve immediate visibility, qualified traffic, and measurable ROI. They specialize in creating high-performing Google Ads, Facebook Ads, LinkedIn Ads, and YouTube Advertising campaigns designed to reach your ideal audience and convert clicks into customers.',
    keywords: ['ppc', 'pay per click', 'google ads', 'facebook ads', 'linkedin ads', 'youtube ads', 'paid advertising', 'paid ads', 'sem', 'paid search', 'ad campaigns']
  },
  {
    id: 'thinkarq-social-media',
    url: 'https://www.thinkarq.com/services/social-media-marketing',
    title: 'Social Media Marketing (SMM) Services',
    section: 'Social Media Management',
    category: 'marketing',
    content: 'Think Arq delivers powerful, data-driven social media management services for businesses in USA and Europe, helping brands grow stronger, engage smarter, and perform better. Services include social media strategy, content creation, community management, social media advertising, influencer marketing, brand awareness campaigns, and social media analytics and reporting.',
    keywords: ['social media', 'social media marketing', 'smm', 'instagram', 'facebook', 'linkedin', 'social media management', 'content creation', 'social strategy']
  },
  {
    id: 'thinkarq-email-marketing',
    url: 'https://www.thinkarq.com/services/email-marketing',
    title: 'Email Marketing Services',
    section: 'Email Marketing & Automation',
    category: 'marketing',
    content: 'Think Arq boosts customer engagement and retention with intelligent, data-driven email campaigns that convert. Their email marketing experts design, execute, and optimize campaigns that strengthen brand presence and deliver measurable ROI. Services include email campaign design, marketing automation, drip campaigns, newsletter creation, A/B testing, list segmentation, and email analytics for businesses in the USA and Europe.',
    keywords: ['email marketing', 'email campaigns', 'newsletter', 'drip campaigns', 'email automation', 'marketing automation', 'email']
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
    content: 'Think Arq creates seamless, intuitive, and visually striking digital experiences. As a leading UI/UX design agency in USA and Europe, they craft user-centered interfaces that not only look exceptional but also perform effortlessly. Services include User Research, Customer Journey Mapping, Information Architecture, Wireframing, High-Fidelity Interactive Prototyping (Figma), Design Systems, Micro-interactions, Usability Testing, and responsive web/mobile design.',
    keywords: ['ui/ux', 'ui design', 'ux design', 'product design', 'figma', 'wireframing', 'prototyping', 'design system', 'user experience', 'user interface', 'design', 'web design', 'app design']
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
    content: 'Think Arq engineers high-performance web applications, custom SaaS platforms, and enterprise software. Their tech stack embraces modern architectures including Next.js, React, TypeScript, Node.js, Python (FastAPI/Django), Go, PostgreSQL, MongoDB, Redis, GraphQL, microservices, and more. They deliver robust web and software solutions combined with AI and data-driven insights.',
    keywords: ['web development', 'software development', 'saas', 'custom software', 'react', 'next.js', 'typescript', 'python', 'full stack', 'backend', 'frontend', 'web app', 'application development']
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
    content: 'Think Arq offers flexible engagement models: 1) Dedicated Agile Teams — complete pod of developers, PM, QA, UI/UX. 2) Staff Augmentation — hire vetted senior AI engineers, data engineers, full-stack developers, and UI/UX designers on demand. 3) Fixed-Price Milestone Projects with clear deliverables. They also offer specialized hiring options like Hire Vibe Coder (AI-powered coding experts using modern vibe coding tools) and Hire Cursor Developer (developers proficient with Cursor AI IDE for rapid development).',
    keywords: ['hire', 'hiring', 'staff augmentation', 'dedicated team', 'engagement models', 'hire developers', 'hire designers', 'contract developers', 'outsource']
  },
  {
    id: 'thinkarq-hire-vibe-coder',
    url: 'https://www.thinkarq.com/hire/hire-vibe-coder',
    title: 'Hire Vibe Coder',
    section: 'Vibe Coding & AI-Assisted Development',
    category: 'hiring',
    content: 'Think Arq offers Hire Vibe Coder services — providing skilled developers who leverage AI-powered coding tools and modern vibe coding workflows to build software faster and more efficiently. Vibe coders use AI assistants, pair programming tools, and modern development environments to deliver high-quality code at accelerated timelines.',
    keywords: ['vibe coder', 'vibe coding', 'hire vibe coder', 'ai coding', 'ai developer', 'ai-assisted development', 'modern developer']
  },
  {
    id: 'thinkarq-hire-cursor-dev',
    url: 'https://www.thinkarq.com/hire/hire-cursor-developer',
    title: 'Hire Cursor Developer',
    section: 'Cursor AI Development',
    category: 'hiring',
    content: 'Think Arq offers Hire Cursor Developer services — providing expert developers who are proficient with the Cursor AI IDE for rapid, AI-assisted software development. Cursor developers leverage AI-powered code generation, intelligent code completion, and automated refactoring to build production-ready applications faster.',
    keywords: ['cursor', 'cursor developer', 'hire cursor developer', 'cursor ai', 'cursor ide', 'ai ide developer']
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
    content: 'Think Arq follows a proven 6-stage delivery methodology that ensures transparent and on-time execution: 1. Discovery & Strategy — scoping requirements, architecture roadmap. 2. UI/UX Design & Prototyping — clickable prototypes, design tokens. 3. Agile Sprints & Development — two-week sprints with regular client demos. 4. Quality Assurance & Security Testing — automated tests, performance profiling. 5. Cloud Deployment & Launch — zero-downtime release, monitoring. 6. Ongoing Support, Maintenance & Optimization — continuous improvement and scaling.',
    keywords: ['process', 'how you work', 'methodology', 'agile', 'sprints', 'delivery', 'timeline', 'stages', 'steps', 'workflow', 'how does it work', 'development process']
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
    content: 'You can reach out to Think Arq directly to discuss your project requirements, request a quote, or book a free consultation with their AI and software development experts. Email: contact.thinkarq@gmail.com. Visit the contact page at https://www.thinkarq.com/contact to fill out the contact form or schedule a call. They serve businesses across the USA and Europe.',
    keywords: ['contact', 'email', 'phone', 'book a call', 'schedule', 'talk to sales', 'get a quote', 'consultation', 'hire us', 'reach out', 'get in touch', 'free consultation']
  },
  {
    id: 'thinkarq-social-links',
    url: 'https://www.thinkarq.com/',
    title: 'Think Arq Social Media Profiles',
    section: 'Social Media & Online Presence',
    category: 'contact',
    content: 'Follow Think Arq on social media: Twitter/X: https://x.com/Think_Arq_ | Instagram: https://www.instagram.com/think_arq_/ | LinkedIn: https://www.linkedin.com/company/think-arq/ | Website: https://www.thinkarq.com. Subscribe to their newsletter on the website for the latest updates.',
    keywords: ['social media', 'twitter', 'instagram', 'linkedin', 'follow', 'social links', 'social profiles', 'connect', 'x', 'online presence']
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
    content: 'Think Arq primarily serves businesses in the United States (USA), Europe, and the United Kingdom. They work with startups, growing enterprises, and established global brands across various industries. Their services are available remotely, enabling them to collaborate with clients worldwide while focusing on the USA and European markets.',
    keywords: ['usa', 'europe', 'united states', 'united kingdom', 'uk', 'location', 'where', 'based', 'serve', 'markets', 'countries', 'regions', 'remote', 'global']
  },

  // ============================================================
  // PORTFOLIO PROJECTS
  // ============================================================
  {
    id: 'thinkarq-project-ai-chatbot',
    url: 'https://www.thinkarq.com/services/ai-chatbot-development',
    title: 'ThinkArq AI — Intelligent Business Chatbot Platform',
    section: 'Project: AI Chatbot Development',
    category: 'projects',
    content: 'Project: ThinkArq AI — Intelligent Business Chatbot Platform. Purpose: Build a fully custom AI-powered chatbot for a B2B technology company to automate customer support, answer service-related queries, capture leads, and book consultations — replacing manual email handling with a 24/7 intelligent assistant. Features: RAG (Retrieval-Augmented Generation) pipeline for accurate, knowledge-base-driven answers; real-time chat with typing indicators; multi-turn conversation memory; lead capture with CRM integration; automated meeting/call booking via Cal.com; rate limiting and security (input sanitization, injection protection); dark/light mode UI; mobile-responsive design; source citation for every answer; suggestion chips for common queries; chat session history with export. Tech Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Google Gemini AI (gemini-flash), custom TF-IDF vector search engine, Cal.com API for booking, Slack webhook for lead alerts. Outcome: Reduced customer query response time from hours to seconds, improved lead conversion by automating consultation bookings, and provided 24/7 support coverage without additional staffing costs.',
    keywords: ['chatbot project', 'ai chatbot', 'rag chatbot', 'knowledge base chatbot', 'lead capture chatbot', 'booking chatbot', 'customer support bot', 'gemini chatbot', 'next.js chatbot', 'thinkarq ai chatbot', 'ai project', 'chatbot case study', 'chatbot portfolio']
  },
  {
    id: 'thinkarq-project-data-pipeline',
    url: 'https://www.thinkarq.com/services/data-engineering-services',
    title: 'Real-Time E-Commerce Analytics & Data Pipeline',
    section: 'Project: Data Engineering & Analytics',
    category: 'projects',
    content: 'Project: Real-Time E-Commerce Analytics & Data Pipeline. Purpose: Design and build a scalable, real-time data infrastructure for a mid-size US e-commerce brand to unify data from multiple platforms (Shopify, Google Ads, Meta Ads, CRM), eliminate data silos, and deliver actionable business intelligence dashboards. Features: Automated ETL/ELT pipelines ingesting from 7+ sources; real-time stream processing using Apache Kafka; cloud data warehouse on Google BigQuery; interactive Power BI and Looker dashboards with KPIs including revenue trends, customer LTV, cart abandonment, and ROAS; automated daily/weekly BI reports delivered via email; anomaly detection alerts for sales drops; customer segmentation models. Tech Stack: Python, Apache Kafka, Google BigQuery, Apache Airflow (pipeline orchestration), dbt (data transformation), Power BI, Looker Studio, Fivetran for source connectors, Docker. Outcome: Reduced reporting time from 3 days to under 30 minutes, identified $220K in wasted ad spend in the first month, and enabled data-driven decisions that increased ROAS by 2.4x within 90 days.',
    keywords: ['data pipeline', 'data engineering project', 'etl project', 'bigquery', 'kafka', 'ecommerce analytics', 'real time data', 'power bi dashboard', 'looker dashboard', 'data warehouse project', 'data project', 'analytics project', 'data case study']
  },
  {
    id: 'thinkarq-project-saas-platform',
    url: 'https://www.thinkarq.com/services/ai-software-development',
    title: 'AI-Powered SaaS Recruitment Platform',
    section: 'Project: SaaS & AI Software Development',
    category: 'projects',
    content: 'Project: AI-Powered SaaS Recruitment Platform. Purpose: Build a full-stack SaaS platform for a UK-based HR tech startup to automate candidate sourcing, resume screening, and interview scheduling using AI — reducing manual recruiter effort by 70%. Features: AI-powered resume parsing and ranking using custom ML models; job description → candidate matching with semantic similarity scoring; automated interview scheduling with calendar sync (Google Calendar, Outlook); multi-tenant SaaS architecture with team workspaces and role-based access; real-time notifications via WebSockets; analytics dashboard for hiring funnel metrics; ATS (Applicant Tracking System) integrations; bulk export and reporting tools; subscription billing via Stripe. Tech Stack: Next.js, TypeScript, Node.js (Express), PostgreSQL, Redis, OpenAI GPT-4 (for resume analysis and JD matching), Python (ML scoring models), Stripe, WebSockets, Docker, AWS (ECS, RDS, S3), Figma (UI/UX design). Outcome: Reduced average time-to-hire from 6 weeks to 12 days, cut recruiter screening hours by 72%, and scaled from 0 to 500 active users in the first 4 months post-launch.',
    keywords: ['saas project', 'recruitment platform', 'hr tech', 'ai saas', 'resume screening', 'applicant tracking', 'hiring platform', 'software project', 'full stack project', 'ai software', 'saas case study', 'software case study', 'web app project']
  },
  {
    id: 'thinkarq-project-computer-vision',
    url: 'https://www.thinkarq.com/services/computer-vision-development',
    title: 'AI Quality Inspection System (Computer Vision)',
    section: 'Project: Computer Vision & Automation',
    category: 'projects',
    content: 'Project: AI Quality Inspection System for Manufacturing. Purpose: Replace manual visual quality inspection on a manufacturing production line for a European industrial client — reducing defect rates and inspection costs through automated real-time computer vision. Features: Real-time defect detection on conveyor belt using high-res industrial cameras; custom-trained YOLOv8 object detection model fine-tuned on client-specific defect images; multi-class defect classification (scratches, dents, misalignments, color inconsistencies); automated rejection signal to physical actuators; live monitoring dashboard with defect heat maps and trend analytics; alert system for production supervisors; model retraining pipeline for continuous improvement; edge deployment on NVIDIA Jetson hardware. Tech Stack: Python, YOLOv8 (Ultralytics), OpenCV, PyTorch, FastAPI (REST API), React dashboard, PostgreSQL, NVIDIA Jetson Orin (edge inference), Docker. Outcome: Achieved 98.6% defect detection accuracy vs. 87% manual inspection rate, reduced defective product shipments by 94%, and cut inspection labor costs by 65% within the first 6 months of deployment.',
    keywords: ['computer vision project', 'quality inspection', 'yolo', 'object detection', 'manufacturing ai', 'defect detection', 'visual inspection', 'cv project', 'ai vision', 'image recognition project', 'vision case study', 'computer vision case study']
  },
  {
    id: 'thinkarq-project-gen-ai-content',
    url: 'https://www.thinkarq.com/services/gen-ai-development-service',
    title: 'Generative AI Content Engine for Digital Marketing',
    section: 'Project: Generative AI & LLM Development',
    category: 'projects',
    content: 'Project: Generative AI Content Engine for a Digital Marketing Agency. Purpose: Build an internal Gen AI platform for a USA-based digital marketing agency to automate content creation workflows — producing on-brand blog posts, social media captions, ad copy, and email sequences at scale while maintaining brand voice consistency. Features: Custom fine-tuned LLM (GPT-4 base) with brand voice training on client content libraries; RAG system for brand guideline adherence; multi-channel content generation (blogs, LinkedIn posts, Twitter threads, Google Ads copy, email drip sequences); SEO keyword integration into generated content; one-click Canva and HubSpot publishing integration; built-in plagiarism and AI-detection scoring; A/B variant generation for ads; team collaboration with content approval workflows. Tech Stack: Python, OpenAI GPT-4 fine-tuning, LangChain (RAG pipeline), Pinecone (vector DB), FastAPI, Next.js, HubSpot API, Canva API, PostgreSQL, Redis. Outcome: Reduced content production time by 80%, enabled the agency to scale from 10 to 45 active clients without adding headcount, and improved average content engagement by 38% through AI-optimized copy.',
    keywords: ['gen ai project', 'generative ai', 'content generation', 'llm project', 'marketing ai', 'content engine', 'gpt fine-tuning', 'rag project', 'ai content', 'langchain project', 'content automation', 'gen ai case study']
  },
  {
    id: 'thinkarq-project-uiux-design',
    url: 'https://www.thinkarq.com/services/ui-ux-design-service',
    title: 'End-to-End UI/UX Redesign for FinTech Web App',
    section: 'Project: UI/UX Design & Product Design',
    category: 'projects',
    content: 'Project: Complete UI/UX Redesign for a FinTech Web Application. Purpose: Redesign the full product experience of a US-based FinTech SaaS platform (personal finance and investment tracking) that had poor user retention and a confusing interface — transforming it into an intuitive, modern, and conversion-optimized product. Features: Full UX audit and heuristic evaluation of existing product; user research with 40+ interviews and usability testing sessions; customer journey mapping and persona development; information architecture redesign; new design system with custom tokens, components, and spacing scale; high-fidelity interactive Figma prototypes for all 35+ screens; responsive web and mobile designs; micro-interaction and animation spec; accessibility audit (WCAG 2.1 AA compliance); developer handoff with Zeplin specs. Tech Stack / Tools: Figma (design & prototyping), FigJam (workshops & journey mapping), Maze (usability testing), Zeplin (developer handoff), Hotjar (behavioral analysis), Notion (documentation). Outcome: After redesign launch, user onboarding completion rate improved from 34% to 79%, session duration increased by 2.1x, NPS score jumped from 22 to 67, and churn rate dropped by 41% within 3 months.',
    keywords: ['ui ux project', 'design project', 'figma project', 'product design', 'fintech design', 'ux redesign', 'design case study', 'user experience project', 'ui design case study', 'product redesign', 'design system project', 'uiux case study']
  },
  {
    id: 'thinkarq-project-seo-marketing',
    url: 'https://www.thinkarq.com/services/search-engine-optimization',
    title: 'SEO & Digital Marketing Growth Campaign',
    section: 'Project: Digital Marketing & SEO',
    category: 'projects',
    content: 'Project: Full-Scale SEO & Digital Marketing Growth Campaign for a B2B SaaS Company. Purpose: Execute a comprehensive 6-month digital marketing strategy for a USA-based B2B SaaS startup to establish organic search presence, generate inbound leads, and reduce reliance on paid ad spend. Features: Technical SEO audit and full site remediation (Core Web Vitals, crawlability, schema markup); keyword research identifying 480+ target keywords across buying funnel stages; on-page SEO optimization for 60+ pages; content marketing strategy with 24 long-form blog posts; link building campaign securing 85+ high-DA backlinks; Google Ads PPC campaign management with A/B testing; LinkedIn Ads for B2B lead generation; email marketing drip campaign (8-step sequence); monthly analytics reporting with ROI attribution. Tech Stack / Tools: Ahrefs, SEMrush, Google Search Console, Google Analytics 4, Google Ads, LinkedIn Campaign Manager, HubSpot (email automation), Screaming Frog, Clearscope (content optimization). Outcome: Organic traffic grew from 1,200 to 18,400 monthly sessions in 6 months (+1,433%), first-page Google rankings achieved for 120+ target keywords, monthly inbound leads increased from 8 to 94, and overall CAC (Customer Acquisition Cost) reduced by 58%.',
    keywords: ['seo project', 'digital marketing project', 'seo case study', 'marketing case study', 'google ads project', 'content marketing', 'link building', 'organic traffic', 'b2b marketing', 'inbound marketing', 'marketing results', 'seo results', 'growth marketing']
  }
];
