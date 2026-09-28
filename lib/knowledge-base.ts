export interface KnowledgeChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  category: 'overview' | 'ai' | 'data' | 'software' | 'design' | 'marketing' | 'process' | 'hiring' | 'contact';
  content: string;
  keywords: string[];
}

export const THINKARQ_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'thinkarq-overview-1',
    url: 'https://www.thinkarq.com/',
    title: 'ThinkArq | Digital Innovation & AI Engineering Company',
    section: 'Company Mission & Philosophy',
    category: 'overview',
    content: 'ThinkArq is a premier digital solutions and AI development company operating on the guiding philosophy: "Think. Build. Disrupt." We partner with ambitious startups, growing enterprises, and established global brands to architect, build, and scale cutting-edge digital products, intelligent AI solutions, modern data infrastructures, and high-impact digital growth strategies.',
    keywords: ['thinkarq', 'about thinkarq', 'company', 'mission', 'what is thinkarq', 'think build disrupt', 'services']
  },
  {
    id: 'thinkarq-overview-2',
    url: 'https://www.thinkarq.com/about',
    title: 'ThinkArq | About Us',
    section: 'Core Capabilities Overview',
    category: 'overview',
    content: 'ThinkArq brings together cross-functional teams of elite software engineers, AI/ML researchers, data architects, UI/UX designers, and growth marketing specialists. We transform complex enterprise challenges into intuitive, scalable, and high-performing digital systems.',
    keywords: ['team', 'expertise', 'capabilities', 'who are you', 'agency', 'consultancy']
  },
  {
    id: 'thinkarq-ai-1',
    url: 'https://www.thinkarq.com/services/ai-development',
    title: 'AI Development & Generative AI Solutions',
    section: 'Custom AI & Agentic Systems',
    category: 'ai',
    content: 'ThinkArq designs and deploys custom Artificial Intelligence (AI) and Machine Learning (ML) solutions. Our AI capabilities include: Custom Generative AI & Large Language Model (LLM) fine-tuning, autonomous AI Agents, intelligent RAG (Retrieval-Augmented Generation) assistants, workflow automation, Natural Language Processing (NLP), Computer Vision, Predictive Analytics, and Recommendation Engines.',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'generative ai', 'chatbots', 'agents', 'automation', 'nlp', 'computer vision']
  },
  {
    id: 'thinkarq-ai-2',
    url: 'https://www.thinkarq.com/services/ai-solutions',
    title: 'Business Automation & AI Integration',
    section: 'Enterprise AI & Automation',
    category: 'ai',
    content: 'We integrate AI models seamlessly into existing enterprise workflows, ERPs, CRMs, and customer-facing web apps. From customer support AI agents to intelligent document processing, predictive churn systems, and anomaly detection, ThinkArq empowers companies to cut operational overhead and accelerate decision-making.',
    keywords: ['business automation', 'ai integration', 'workflow automation', 'document processing', 'enterprise ai']
  },
  {
    id: 'thinkarq-data-1',
    url: 'https://www.thinkarq.com/services/data-engineering',
    title: 'Data Engineering & Modern Data Stack',
    section: 'Data Pipelines & Warehousing',
    category: 'data',
    content: 'ThinkArq builds robust, enterprise-grade data infrastructures. Our Data Engineering services include: Real-time and batch ETL/ELT pipelines, modern cloud Data Warehousing (Snowflake, Google BigQuery, AWS Redshift, Databricks), Data Lakehouse architectures, stream processing (Apache Kafka, Spark), data modeling, and automated data governance.',
    keywords: ['data engineering', 'data pipeline', 'etl', 'elt', 'snowflake', 'bigquery', 'databricks', 'kafka', 'data warehouse', 'data lake']
  },
  {
    id: 'thinkarq-data-2',
    url: 'https://www.thinkarq.com/services/data-science',
    title: 'Data Science, Mining & Predictive Analytics',
    section: 'Advanced Analytics & Data Mining',
    category: 'data',
    content: 'Our Data Science team turns raw data into predictive business value. We specialize in statistical modeling, customer segmentation, churn prediction, demand forecasting, sentiment analysis, and deep pattern extraction using advanced data mining techniques.',
    keywords: ['data science', 'data mining', 'predictive analytics', 'forecasting', 'machine learning models', 'customer segmentation']
  },
  {
    id: 'thinkarq-data-3',
    url: 'https://www.thinkarq.com/services/data-visualization',
    title: 'Data Visualization & Business Intelligence (BI)',
    section: 'Interactive Dashboards & Reporting',
    category: 'data',
    content: 'ThinkArq develops engaging, interactive executive dashboards and BI reporting systems using Power BI, Tableau, Looker, and bespoke web visualization libraries (D3.js, Chart.js, Recharts). We make key business metrics legible, real-time, and actionable.',
    keywords: ['data visualization', 'power bi', 'tableau', 'looker', 'dashboards', 'bi', 'business intelligence', 'charts', 'reporting']
  },
  {
    id: 'thinkarq-software-1',
    url: 'https://www.thinkarq.com/services/web-development',
    title: 'Web & Custom Software Development',
    section: 'Full-Stack Web & SaaS Platforms',
    category: 'software',
    content: 'ThinkArq engineers high-performance web applications, custom SaaS platforms, and enterprise software. Our tech stack embraces modern architectures including Next.js, React, TypeScript, Node.js, Python (FastAPI/Django), Go, PostgreSQL, MongoDB, Redis, GraphQL, and microservices.',
    keywords: ['web development', 'software development', 'saas', 'custom software', 'react', 'next.js', 'typescript', 'python', 'full stack', 'backend', 'frontend']
  },
  {
    id: 'thinkarq-software-2',
    url: 'https://www.thinkarq.com/services/cloud-devops',
    title: 'Cloud Architecture & DevOps',
    section: 'Scalable Infrastructure & CI/CD',
    category: 'software',
    content: 'We architect highly scalable, resilient cloud environments across AWS, Google Cloud Platform (GCP), and Microsoft Azure. We implement containerization (Docker, Kubernetes), automated CI/CD pipelines, Infrastructure as Code (Terraform), and robust security & monitoring.',
    keywords: ['cloud', 'devops', 'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'infrastructure']
  },
  {
    id: 'thinkarq-design-1',
    url: 'https://www.thinkarq.com/services/ui-ux-design',
    title: 'UI/UX Design & Product Strategy',
    section: 'User Experience & Interface Design',
    category: 'design',
    content: 'ThinkArq creates intuitive, aesthetically stunning digital interfaces. Our UI/UX design workflow encompasses: User Research, Customer Journey Mapping, Information Architecture, Wireframing, High-Fidelity Interactive Prototyping (Figma), Design Systems, Micro-interactions, and usability testing.',
    keywords: ['ui/ux', 'ui design', 'ux design', 'product design', 'figma', 'wireframing', 'prototyping', 'design system', 'user experience']
  },
  {
    id: 'thinkarq-marketing-1',
    url: 'https://www.thinkarq.com/services/digital-marketing',
    title: 'Digital Marketing & Growth Solutions',
    section: 'SEO, PPC & Growth Strategy',
    category: 'marketing',
    content: 'ThinkArq drives scalable user acquisition and revenue growth. Our digital marketing services include Technical & On-Page SEO (Search Engine Optimization), PPC Campaigns (Google Ads, Meta Ads, LinkedIn Ads), Social Media Marketing (SMM), Conversion Rate Optimization (CRO), and Content Marketing.',
    keywords: ['digital marketing', 'seo', 'ppc', 'google ads', 'paid ads', 'social media marketing', 'cro', 'growth', 'traffic']
  },
  {
    id: 'thinkarq-hiring-1',
    url: 'https://www.thinkarq.com/hire-talent',
    title: 'Hiring Developers & Dedicated Teams',
    section: 'Engagement Models & Staff Augmentation',
    category: 'hiring',
    content: 'ThinkArq offers flexible engagement models to fit your business needs: 1) Dedicated Agile Teams (complete pod of developers, PM, QA, UI/UX), 2) Staff Augmentation (hire vetted senior AI engineers, data engineers, full-stack developers, and UI/UX designers on demand), and 3) Fixed-Price Milestone Projects with clear deliverables.',
    keywords: ['hire developers', 'hire designers', 'staff augmentation', 'dedicated team', 'hire engineers', 'contract developers', 'engagement models']
  },
  {
    id: 'thinkarq-process-1',
    url: 'https://www.thinkarq.com/process',
    title: 'ThinkArq Working Process & Delivery Methodology',
    section: 'Step-by-Step Delivery Lifecycle',
    category: 'process',
    content: 'Our proven 6-stage delivery methodology ensures transparent and on-time execution: 1. Discovery & Strategy (scoping requirements, architecture roadmap), 2. UI/UX Design & Prototyping (clickable prototypes, design tokens), 3. Agile Sprints & Development (two-week sprints with regular client demos), 4. Quality Assurance & Security Testing (automated tests, performance profiling), 5. Cloud Deployment & Launch (zero-downtime release, monitoring), 6. Ongoing Support, Maintenance & Optimization.',
    keywords: ['process', 'how you work', 'methodology', 'agile', 'sprints', 'delivery', 'timeline', 'stages', 'steps']
  },
  {
    id: 'thinkarq-contact-1',
    url: 'https://www.thinkarq.com/contact',
    title: 'Contact ThinkArq & Consultation Booking',
    section: 'Get in Touch & Book a Call',
    category: 'contact',
    content: 'You can reach out to ThinkArq directly to discuss your project requirements, request a quote, or schedule a free 30-minute discovery call with our solutions architect. Email us at contact@thinkarq.com or click "Book a Call" on our website.',
    keywords: ['contact', 'email', 'phone', 'book a call', 'schedule', 'talk to sales', 'get a quote', 'consultation', 'hire us']
  }
];
