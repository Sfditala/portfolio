export type ProjectCategory = "automation" | "ai-product" | "client-work";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  label: string;
  summary: string;
  stack: string[];
  /** English and Arabic terms the agent matches against a visitor's problem. */
  keywords: string[];
  liveUrl?: string;
  /** Logo cover on a white background; shown inverted until screenshots exist. */
  image?: string;
  /** Real screenshots, in /public/projects/<slug>/. The first also becomes the cover. */
  screenshots?: { src: string; alt: string }[];
  /** Demo video, in /public/projects/<slug>/. */
  demoVideo?: string;
  /** Shown near the top of the case page, e.g. that a project is a demo. */
  note?: string;
  // Case study page.
  problem: string;
  solution: string;
  capabilities: string[];
  /** Only real outcomes. Empty shows a [[TALA]] placeholder. */
  results: string[];
  /** Context for the results, e.g. how they were measured. */
  resultsNote?: string;
  challenges?: { challenge: string; solution: string }[];
  nextSteps?: string[];
  /** Null shows a [[TALA]] placeholder. */
  role: string | null;
};

export const categories: { id: ProjectCategory; title: string; description: string }[] = [
  {
    id: "automation",
    title: "Automation case studies",
    description: "Agents and workflows you can watch run, node by node.",
  },
  {
    id: "ai-product",
    title: "AI products",
    description: "Full products with AI at the core.",
  },
  {
    id: "client-work",
    title: "Client work",
    description: "Full-stack builds for clients.",
  },
];

// TODO(tala): add screenshots and demo videos per project. Results must stay real.
export const projects: Project[] = [
  {
    slug: "ai-marketing-team",
    title: "AI Marketing Team",
    category: "automation",
    label: "Automation · Multi-agent · Demo",
    screenshots: [
      { src: "/projects/ai-marketing-team/agents.png", alt: "The Orchestrator with its Content, Calendar and Analyst agents in n8n" },
      { src: "/projects/ai-marketing-team/intake.png", alt: "Message intake in n8n: allowlist, input type and voice transcription" },
      { src: "/projects/ai-marketing-team/reply.png", alt: "Reply step in n8n: voice messages get audio, text messages get text" },
      { src: "/projects/ai-marketing-team/ingestion.png", alt: "Knowledge ingestion in n8n: upload form, Gemini embeddings and Pinecone" },
    ],
    summary:
      "A multi-agent Telegram assistant for a coffee shop that writes posts, manages the content calendar and analyses performance, by text or voice. Built in n8n as a demo with sample data.",
    stack: ["n8n", "OpenAI (gpt-5-mini)", "Pinecone", "Gemini Embeddings", "Google Sheets", "ElevenLabs", "Telegram Bot API"],
    keywords: ["marketing","content","social media","instagram","facebook","posts","campaign","brand","cafe","café","coffee","analytics","تسويق","محتوى","سوشال","انستغرام","انستجرام","فيسبوك","منشورات","بوستات","حملات","مقهى","كافيه","قهوة"],
    note: 'Demo project with sample data, built around a fictional café, "Ben Al-Sabah".',
    problem:
      "Small café owners know they should post every week, but they don't have time to write captions, keep a posting calendar, or check which posts actually brought customers in. Generic AI tools don't help much: they don't know the café's menu, prices, offers or tone of voice, and they make things up.",
    solution:
      "A marketing team in the owner's pocket. They send one Telegram message, typed or spoken. An Orchestrator agent understands the request, delegates to Content, Calendar and Analyst agents, reviews their results and replies with one final answer.",
    capabilities: [
      "Writes and edits posts for Instagram, Facebook, X and WhatsApp in the brand's voice",
      "Prices and offers come only from a RAG knowledge base. Missing information is reported, not invented",
      "Shows the calendar, suggests times, and rejects past dates and taken slots in code",
      "Human approval gate: nothing is added to the calendar until the owner approves, enforced by the workflow itself",
      "Answers performance questions from the sheet, using a calculator for every figure and citing the posts used",
      "Voice in, voice out, in Arabic (Levantine) or English, detected automatically",
      "Owner-only allowlist, friendly error messages and failure alerts",
    ],
    resultsNote: "From testing with sample data.",
    results: [
      "Content, calendar and analyst requests routed to the right agent in every test run.",
      "Prices and offer dates in generated posts matched the knowledge base, and an offer that had not started yet was correctly left out.",
      "Calendar conflicts were detected, and posts were saved only after approval.",
      "Performance answers matched hand calculations, such as an engagement rate of 19.76% for one post.",
      "Unknown information, such as a delivery service, was reported as missing instead of invented.",
      "Asked to announce a discount code that wasn't in the offers file, it stopped and asked the owner to confirm the details instead of publishing it.",
    ],
    challenges: [
      {
        challenge: "The model sometimes answered English questions in Arabic, because the knowledge base is in Arabic.",
        solution: "The reply language is computed in code and passed to every agent as a required instruction.",
      },
      {
        challenge: "One long RAG query returned platform rules instead of the product price.",
        solution: "The Content Agent makes short, separate searches per topic, and searches twice before saying information is missing.",
      },
      {
        challenge: "The free Gemini tier allows 5 requests per minute, and one multi-agent request needs about 5.",
        solution: "Chat models moved to OpenAI, with Gemini kept for embeddings so the vector index didn't need rebuilding.",
      },
      {
        challenge: "The first approval flow depended on the model remembering that the owner said yes.",
        solution: "Replaced with a Telegram approval node that pauses the workflow until the owner approves.",
      },
      {
        challenge: "Telegram rejected some replies because of underscores in hashtags.",
        solution: "Replies are sent as escaped HTML, with Markdown characters escaped where HTML isn't available.",
      },
    ],
    nextSteps: [
      "Approve buttons directly inside the chat",
      "Edit and cancel existing calendar entries",
      "Automatic publishing to Instagram and Facebook",
      "A small performance dashboard",
    ],
    role: "AI automation design and build, solo.",
  },
  {
    slug: "clinic-ai-receptionist",
    title: "AI Receptionist for a Dental Clinic",
    category: "automation",
    label: "Automation · RAG · Demo",
    screenshots: [
      { src: "/projects/clinic-ai-receptionist/agent.png", alt: "The AI Agent in n8n with its chat model, memory and clinic knowledge search" },
      { src: "/projects/clinic-ai-receptionist/intake.png", alt: "Message intake in n8n: text and voice paths, audio fix and transcription" },
      { src: "/projects/clinic-ai-receptionist/reply.png", alt: "Reply step in n8n: voice notes get speech, typed messages get text" },
      { src: "/projects/clinic-ai-receptionist/ingestion.png", alt: "Knowledge ingestion in n8n: clear old knowledge, download from Drive, store in Supabase" },
    ],
    summary:
      "A Telegram assistant that answers patient questions accurately from the clinic's own information, by text or voice. It never invents an answer and never gives medical advice. Built in n8n as a demo with sample data.",
    stack: ["n8n", "OpenAI (gpt-5-mini, Whisper, embeddings)", "Supabase pgvector", "Google Drive", "ElevenLabs", "Telegram Bot API"],
    keywords: ["voice","phone","calls","booking","bookings","clinic","dental","dentist","doctor","medical","healthcare","patient","patients","receptionist","reception","faq","questions","customer support","support","knowledge","documents","rag","صوت","صوتي","مكالمات","حجز","حجوزات","عيادة","عيادات","أسنان","اسنان","طبيب","دكتور","طبي","مرضى","مريض","استقبال","أسئلة","اسئلة","خدمة العملاء","دعم العملاء","الرد على الزبائن","الزبائن","مستندات"],
    note: 'Demo project with sample data, built around a fictional clinic, "Al Noor Dental Clinic".',
    problem:
      "Clinic receptionists spend a large part of the day answering the same questions about hours, prices, doctors and insurance. Patients often ask outside working hours and get no answer. A general chatbot is risky in a medical setting: it can invent prices or give medical advice.",
    solution:
      "A Telegram bot with one focused AI agent that searches the clinic's knowledge base before every factual answer. It answers common enquiries 24/7, formally and accurately, only from information the clinic has approved.",
    capabilities: [
      "Answers questions about hours, location, services and prices, doctors, insurance, payment and emergencies",
      "Replies in formal Arabic or English, matching the patient's language",
      "Understands voice notes and answers with a short spoken reply",
      "Refuses medical advice politely, points to an examination and gives emergency guidance for serious cases",
      "Never invents information: if it isn't in the knowledge base, it says so and gives the reception number",
      "One-click knowledge updates: edit the file on Google Drive and run ingestion, and the old version is removed automatically",
      "Patients always get a reply, even when a service fails, and the owner is alerted",
      "Handles enquiries only, and gives the reception phone and WhatsApp for appointments",
    ],
    resultsNote: "From testing with sample data, on the same questions before and after the fixes. The live replay above is one of these runs.",
    results: [
      '"Are you open on Friday?" went from "information not available" to "closed on Fridays".',
      '"Do you offer implants?" went from "information not available" to "not offered", with the reception number.',
      "A question about aligner prices and installments stopped mentioning internal document sections.",
      "A medication question is refused, with a recommended examination and emergency guidance instead of an offer to book.",
    ],
    challenges: [
      {
        challenge: "Re-running ingestion duplicated the knowledge base, so search returned the same chunk five times and missed answers.",
        solution: "The document's old chunks are deleted before inserting, with Execute Once set after the delete step.",
      },
      {
        challenge: "Instructions inside the knowledge file contradicted the system prompt, and references like \"see section 7\" leaked into answers.",
        solution: "The knowledge file now holds facts only, and all behaviour rules live in the system prompt.",
      },
      {
        challenge: "Spoken replies read out bullet points, slashes and currency codes.",
        solution: "Voice questions are tagged for the agent, and the text is cleaned before speech.",
      },
      {
        challenge: "Telegram voice notes (.oga) were rejected by the transcription service.",
        solution: "A small code step renames the file to .ogg before transcription.",
      },
      {
        challenge: "Stray & or < characters could break formatted Telegram messages.",
        solution: "Replies are escaped for HTML while keeping the allowed bold tags.",
      },
    ],
    nextSteps: [
      "Booking integration with the clinic's calendar, left out of scope on purpose",
      "Automatic knowledge refresh when the Drive file changes",
      "A weekly report of the most common patient questions",
      "Rate limiting for a public bot",
    ],
    role: "AI automation design and build, solo.",
  },
  {
    slug: "telegram-ai-assistant",
    title: "AI Personal Assistant (Telegram)",
    category: "automation",
    label: "Automation · Personal assistant",
    summary:
      "My own assistant on Telegram. I message it like a friend, and a main agent hands the work to Tasks and Calendar agents, keeps Supabase and Google Tasks in sync, and sends me a morning brief, an evening plan and a weekly report.",
    stack: ["n8n", "OpenAI (gpt-5, gpt-5-mini)", "Supabase", "Google Tasks", "Google Calendar", "Telegram Bot API"],
    keywords: ["assistant","personal assistant","tasks","task","to-do","todo","reminder","remind","schedule","calendar","meeting","telegram","productivity","مساعد","مساعد شخصي","مهام","مهمة","تذكير","جدول","مواعيد","موعد","اجتماع","تلغرام","تيليجرام","تلجرام"],
    note: "Built for my own daily use, so it has one user: me.",
    problem:
      "Tasks and meetings live in separate apps, and adding one means stopping what you're doing to open them. Most bots don't help much, because they make you learn commands and reply like a menu.",
    solution:
      "An assistant I simply message in Palestinian Arabic. A main agent understands the request and delegates it, so one message can add a task and book a meeting. It also comes to me: a morning brief, an evening plan and a Friday report arrive on their own.",
    capabilities: [
      "Conversational, with slash commands kept as optional shortcuts",
      "Lists, adds, completes and renames tasks, and tracks a weekly goal",
      "Every task change is written to Supabase and synced to Google Tasks",
      "Checks Google Calendar for overlaps before booking, and shows the conflict instead of double-booking",
      "Morning brief at 7:30, evening plan at 21:00 and a weekly report on Fridays at 18:00",
      "Replies like a close friend in Palestinian Arabic, and matches my mood",
      "Works only for my Telegram account, and always replies when something fails",
    ],
    results: [],
    challenges: [
      {
        challenge: "The first plan used slash commands and a Switch node, so I'd have had to remember the commands.",
        solution: "A main AI agent now understands plain messages and delegates. The commands stayed as optional shortcuts.",
      },
      {
        challenge: "The first agent version had a separate sub-agent for each action: list, add, complete, rename and delete.",
        solution: "Merged into one Tasks agent that follows clear step-by-step recipes for each action.",
      },
      {
        challenge: "A misunderstood message shouldn't be able to delete a task.",
        solution: "Deleting needs an explicit /del with the task name, and rows are soft-deleted rather than removed.",
      },
      {
        challenge: "Tasks with a date but no time were stored at 23:59, which looked wrong in messages.",
        solution: "The agent records that no specific time was set, and shows a time only when I gave one.",
      },
      {
        challenge: "Google Tasks can fail after the database write has already succeeded.",
        solution: "The database step still finishes, and the reply says what didn't sync.",
      },
    ],
    role: "Designed, built and use it myself: agents, prompts, database and integrations.",
  },
  {
    slug: "ai-rank",
    title: "AI Rank",
    category: "ai-product",
    label: "AI Product · Co-founder & CEO",
    summary:
      "An Arabic-first platform for discovering, comparing and rating AI tools, so choosing the right one takes minutes, not weeks. I built it from scratch and co-founded it.",
    stack: ["Next.js"],
    keywords: ["ai tools","compare tools","comparison","directory","which tool","tool recommendation","platform","arabic","saas","product","أدوات الذكاء الاصطناعي","مقارنة","مقارنات","دليل","منصة","ترشيح","تقييم"],
    liveUrl: "https://airanktools.com/",
    screenshots: [
      { src: "/projects/ai-rank/home.png", alt: "AI Rank home page" },
      { src: "/projects/ai-rank/compare.png", alt: "A head-to-head comparison of two tools across six criteria" },
      { src: "/projects/ai-rank/tools.png", alt: "The tools directory, with categories, pricing filters and ratings" },
    ],
    problem:
      "New AI tools appear every week, and Arabic speakers are left with a simple, confusing question: which one is actually worth my time and money? The answers are scattered between hyped marketing pages and foreign reviews that ignore Arabic.",
    solution:
      "A trusted Arabic reference that puts tools head to head with clear criteria. Visitors browse a directory, compare two tools side by side, or describe what they need and let the AI Matchmaker recommend the best fit.",
    capabilities: [
      "A searchable directory with filters by category and price",
      "Side-by-side comparisons, scored out of 10 on six criteria: quality, speed, intelligence and accuracy, Arabic support, ease of use and value",
      "AI Matchmaker: describe a need and get the 3 best-matched tools",
      "Curated best-of lists for specific jobs",
      "Bilingual interface in Arabic and English, with a guided tour for new visitors",
      "Accounts with saved comparisons and tools",
      "Published ratings cite their source and sample size, and estimates are clearly labeled",
      "Rankings stay independent: affiliate links never change a tool's place",
    ],
    resultsNote: "As shown on the live site.",
    results: ["Live with 600 rated tools and 45 comparisons across 14 categories."],
    role: "Co-founder & CEO. I built the platform from scratch, and I lead its vision and growth. Co-founded with Mohammad Abu Saada, COO.",
  },
  {
    slug: "shadow-ai-detector",
    title: "Shadow AI Detector",
    category: "ai-product",
    label: "AI Product · National competition finalist",
    summary:
      "A web platform and Chrome extension that warn people before sensitive data reaches an AI tool, using regex and a custom-trained ML model, in Arabic and English. I led the project and built it from scratch with Olfat Al-Sakany for a Palestine-wide competition, where it reached the finals.",
    stack: ["Python", "scikit-learn", "Flask", "Next.js", "React", "Tailwind CSS", "Chrome Extension (Manifest V3)"],
    keywords: ["security","sensitive","data leak","leak","privacy","compliance","machine learning","browser extension","chatgpt","أمن","أمان","حساسة","تسريب","خصوصية","تعلم آلي","سيبراني"],
    liveUrl: "https://shadowai-frontend-beta.vercel.app/",
    image: "/shadow.png",
    screenshots: [{ src: "/projects/shadow-ai-detector/home.png", alt: "The Shadow AI Detector scanner, with example texts to try" }],
    note: 'Built for the "Secure Digital Innovation 2026" competition, run by the Palestine Institute for National Security Research with the Ministry of Education and Higher Education. It qualified for the finals, but did not win.',
    problem:
      "People paste passwords, API keys, card numbers and personal details into AI tools, often without noticing the risk. In 2023, Samsung engineers entered confidential source code into ChatGPT, and the company went on to ban external AI tools on work devices.",
    solution:
      "A guardian between the user and AI tools. It scans text before it is sent, classifies the risk, and shows exactly which part is sensitive. A rules layer catches fixed patterns, and a machine learning layer understands context in both Arabic and English.",
    capabilities: [
      "Chrome extension that runs on 9 AI sites, including ChatGPT, Gemini and Claude, and warns before text is sent",
      "Web platform for pasting any text and scanning it instantly",
      "Regex layer with 20+ patterns for cards, keys, emails and IPs",
      "ML layer: a Random Forest with 500 trees on TF-IDF character n-grams, trained on 675 Arabic and English sentences",
      "Four risk levels: Critical, High, Medium and Safe",
      "Doesn't store user data",
    ],
    resultsNote: "Model figures are from the project's own test set.",
    results: [
      "Qualified for the finals of the Palestine-wide Secure Digital Innovation 2026 competition. It did not win.",
      "About 93% overall accuracy, with F1 scores of 96% for Critical, 89% for High, 87% for Medium and 97% for Safe.",
    ],
    nextSteps: [
      "An enterprise edition with a central dashboard and SIEM/DLP integration",
      "A mobile app",
      "A BERT model for longer, more complex text",
      "French, Spanish and Turkish support",
    ],
    role: "Team lead. I built it from scratch, in a team of two with Eng. Olfat Al-Sakany.",
  },
  {
    slug: "modavi",
    title: "Modavi",
    category: "ai-product",
    label: "AI Product · Client project",
    summary:
      "An AI stylist platform with personalized outfit coordination and style profiling.",
    stack: ["Next.js", "Supabase", "Clerk", "Cloudinary"],
    keywords: ["fashion","style","stylist","outfit","clothes","recommendation","موضة","أزياء","ستايل","ملابس","توصيات"],
    liveUrl: "https://modavi.vercel.app/",
    image: "/modavi.png",
    problem: "Deciding what to wear and what goes together is personal, and generic advice rarely fits.",
    solution: "An AI stylist platform that learns a person's style and coordinates outfits around it.",
    capabilities: ["Personalized outfit coordination", "Style profiling"],
    results: [],
    role: null,
  },
  {
    slug: "maha-store",
    title: "Maha Store",
    category: "client-work",
    label: "Client Work",
    summary: "A women's fashion e-commerce store with admin dashboards, built from scratch.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    keywords: ["store","shop","e-commerce","ecommerce","admin","dashboard","متجر","تجارة","لوحة تحكم"],
    liveUrl: "https://mahastore-ecommerce.vercel.app/",
    image: "/Maha.png",
    screenshots: [{ src: "/projects/maha-store/home.png", alt: "Maha Store home page" }],
    problem: "An online store needs both a shop for customers and a way to run it behind the scenes.",
    solution: "A full e-commerce store with admin dashboards for managing it.",
    capabilities: ["Women's fashion storefront, with size and color selection, cart and wishlist", "Admin dashboards for managing the store"],
    results: [],
    role: "Built from scratch, end to end.",
  },
];

export const projectUrl = (slug: string) => `/work/${slug}`;

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
