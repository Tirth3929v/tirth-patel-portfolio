export type ProjectStatus = "LIVE" | "FRONTEND DEMO" | "IN DEVELOPMENT" | "ARCHIVED";

export interface ProjectArchitectureStep {
  name: string;
  role: string;
  tech: string;
  details: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  category: "AI/ML" | "Full Stack" | "Systems & Cloud";
  status: ProjectStatus;
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  frontendDemoAvailable: boolean;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  architecture: {
    diagramSummary: string;
    flow: ProjectArchitectureStep[];
  };
  technicalImplementation: {
    language: string;
    framework: string;
    libraries: string[];
    modelsOrAPIs?: string[];
    database?: string;
    deployment?: string;
  };
  engineeringDecisions: {
    title: string;
    decision: string;
    rationale: string;
  }[];
  frontendNotice?: string;
}

export const projectsData: ProjectDetail[] = [
  {
    slug: "skillsync-ai",
    title: "SkillSync AI: Intelligent Talent Match & Skill Gap Analytics",
    tagline: "Predictive career intelligence platform utilizing NLP and vector cosine similarity to diagnose individual skill deficits.",
    category: "AI/ML",
    status: "FRONTEND DEMO",
    featured: true,
    githubUrl: "https://github.com/Tirth3929v",
    liveUrl: "#demo",
    frontendDemoAvailable: true,
    overview:
      "SkillSync AI was engineered for the **Hacklabify Hackathon** (AI/ML Track). It mathematically bridges the information asymmetry between job seekers and industry job descriptions using **TF-IDF vectorization** and **cosine similarity calculations**.",
    problem:
      "Traditional job boards present static, opaque requirements without informing candidates precisely which skills they lack or how close they are to role qualification. Job seekers waste months applying for mismatched positions without **actionable gap feedback**.",
    solution:
      "SkillSync AI takes a candidate's verified skill inventory, maps it against a vectorized industry corpus of job roles, calculates **mathematical match percentages**, and breaks down the delta into **verified strengths**, **critical action plans**, and **domain skills**.",
    technologies: [
      "Python 3.11",
      "Scikit-learn",
      "TF-IDF Vectorization",
      "Cosine Similarity",
      "Streamlit / Web UI",
      "Pandas",
      "NumPy",
    ],
    keyFeatures: [
      "Target Role Analyzer: Instant match score calculation against user-selected job profiles.",
      "Three-Tier Skill Breakdown: Automated categorization into Verified, Action Plan (missing), and Irrelevant skills.",
      "AI Role Discovery: Reverse-engineers highest-probability target roles based on the candidate's existing strengths.",
      "Enterprise CSV Export: Action plans and roadmap checkpoints exportable for offline tracking and portfolio building.",
    ],
    architecture: {
      diagramSummary: "User Skills Input -> TF-IDF Vectorizer -> Industry Job Corpus Matrix -> Cosine Similarity Calculation -> Skill Delta Classifier -> Visual Dashboard & Export",
      flow: [
        {
          name: "Skill Normalization",
          role: "Input Processing",
          tech: "Python String Preprocessing & Tokenizer",
          details: "Standardizes raw text skills, removes noise, and aligns synonyms against standard tech taxonomy.",
        },
        {
          name: "Vector Representation",
          role: "Embedding & Matrix Engine",
          tech: "Scikit-Learn TfidfVectorizer",
          details: "Converts candidate skill profiles and industry role specifications into sparse numerical vectors.",
        },
        {
          name: "Similarity Engine",
          role: "Mathematical Scoring",
          tech: "Cosine Distance Metric",
          details: "Computes dot product normalized distance to score semantic proximity between candidate and target profile.",
        },
        {
          name: "Delta Classifier & UI",
          role: "Presentation & Export Layer",
          tech: "Streamlit & Pandas",
          details: "Partitions missing skills into actionable learning priorities and renders comparative charts.",
        },
      ],
    },
    technicalImplementation: {
      language: "Python 3.11",
      framework: "Streamlit / Next.js Demo UI",
      libraries: ["scikit-learn", "pandas", "numpy", "matplotlib"],
      modelsOrAPIs: ["TF-IDF Matrix Vectorizer", "Cosine Similarity Engine"],
      database: "Vectorized Job Dataset (JSON/CSV)",
      deployment: "Local Streamlit Server / Static Interactive Web Sandbox",
    },
    engineeringDecisions: [
      {
        title: "Deterministic TF-IDF vs. Heavy LLM for Core Scoring",
        decision: "Used Scikit-Learn TF-IDF vectorization with Cosine Similarity rather than calling an external LLM API for basic matching.",
        rationale: "Ensures sub-second latency, deterministic score reproducibility, zero API costs, and transparent auditability without hallucinated scores.",
      },
      {
        title: "Client-Side CSV Export Architecture",
        decision: "Generated data transformations in memory via Pandas and streamed directly to browser blobs.",
        rationale: "Preserves user privacy by avoiding unnecessary server-side storage of sensitive resume and skill data.",
      },
    ],
    frontendNotice: "Interactive Client-Side Demonstration • Explores TF-IDF similarity vectors & delta classification directly in-browser.",
  },
  {
    slug: "careercompass-ai",
    title: "CareerCompass AI: Multi-Agent Guidance & Skill Verification",
    tagline: "Autonomous multi-agent platform orchestrating AI counseling, live technical challenge verification, and tailored career roadmaps.",
    category: "AI/ML",
    status: "FRONTEND DEMO",
    featured: true,
    githubUrl: "https://github.com/Tirth3929v",
    liveUrl: "#demo",
    frontendDemoAvailable: true,
    overview:
      "CareerCompass AI replaces one-size-fits-all career guidance with an interconnected squad of specialized **autonomous AI agents**: a **Counselor Agent** for dialogue, a **Verifier Agent** for interactive coding challenges, an **Analyzer Agent** for capability assessment, and a **Roadmap Agent** for milestone scheduling.",
    problem:
      "Self-reported candidate resumes frequently diverge from actual technical competence. Traditional guidance tools lack the ability to **verify practical problem-solving ability** in real-time before suggesting advanced career specializations.",
    solution:
      "Employs a **multi-agent state graph** where each agent is constrained to a specific responsibility. The system challenges candidates with **domain-specific problems**, validates their code submissions, and synthesizes empirical roadmaps via the **Google Gemini API**.",
    technologies: [
      "FastAPI (Python 3.11)",
      "Next.js / Angular 17",
      "Google Gemini API",
      "MongoDB Atlas",
      "Pydantic V2",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Multi-Agent Separation of Concerns: Counselor, Verifier, Analyzer, and Roadmap agents collaborate with distinct system prompts and schemas.",
      "Interactive Skill Verification: Real-time code execution challenges and scenario questions that score candidate competency.",
      "Dynamic Milestone Generation: Roadmap synthesizer creating structured week-by-week technical goals.",
      "Persistent History: MongoDB Atlas storage maintaining multi-turn dialogue context and challenge progress.",
    ],
    architecture: {
      diagramSummary: "User Client <-> FastAPI Router <-> Multi-Agent Dispatcher (Counselor, Verifier, Analyzer, Roadmap) <-> Gemini API & MongoDB Atlas",
      flow: [
        {
          name: "Client Interaction",
          role: "Frontend Interface",
          tech: "Next.js / Angular 17 UI",
          details: "Streams user messages and renders dynamic challenge widgets and roadmap timelines.",
        },
        {
          name: "FastAPI Gateway",
          role: "API & Validation Layer",
          tech: "FastAPI + Pydantic V2",
          details: "Validates payload contracts, manages session tokens, and dispatches requests to appropriate agent instances.",
        },
        {
          name: "Agent Orchestration",
          role: "Autonomous Agent Core",
          tech: "Python Agentic State Machine",
          details: "Passes structured context between Counselor (dialogue) and Verifier (coding challenges) based on user intent.",
        },
        {
          name: "LLM & Persistence",
          role: "Inference & Memory",
          tech: "Google Gemini 1.5 + MongoDB Atlas",
          details: "Executes structured prompt generation with Pydantic JSON schemas and persists interaction logs.",
        },
      ],
    },
    technicalImplementation: {
      language: "Python 3.11 & TypeScript",
      framework: "FastAPI Backend & Next.js / Angular Frontend",
      libraries: ["google-generativeai", "motor (async mongo)", "pydantic", "uvicorn"],
      modelsOrAPIs: ["Google Gemini Flash / Pro via API"],
      database: "MongoDB Atlas (M0 Cloud Cluster)",
      deployment: "Vercel Frontend & Dockerized Backend Container",
    },
    engineeringDecisions: [
      {
        title: "Multi-Agent Decomposition over Monolithic Prompting",
        decision: "Divided the system into four discrete agents instead of a single prompt trying to counsel, test, evaluate, and roadmap simultaneously.",
        rationale: "Single massive prompts suffered from instruction drift and loose schema compliance. Specialized agents allow independent prompt tuning, strict validation schemas, and modular unit testing.",
      },
      {
        title: "Strict JSON Schema Enforcement via Pydantic",
        decision: "Configured LLM response generation with strict Pydantic JSON schema constraints.",
        rationale: "Prevents conversational hallucinations from breaking frontend parsing in the challenge and roadmap UI components.",
      },
    ],
    frontendNotice: "Interactive Client-Side Demonstration • Features multi-agent dialogue states and interactive verification challenges.",
  },
  {
    slug: "pmgsy-classifier",
    title: "PMGSY Infrastructure Classification & GenAI Explanation Agent",
    tagline: "End-to-end Machine Learning pipeline classifying rural road projects using Random Forest and natural language explanations with IBM Granite 4 on watsonx.ai.",
    category: "AI/ML",
    status: "FRONTEND DEMO",
    featured: true,
    githubUrl: "https://github.com/Tirth3929v",
    liveUrl: "#demo",
    frontendDemoAvailable: true,
    overview:
      "A machine learning application trained on **2,189 real governmental infrastructure records** across **32 Indian states**. It classifies road and bridge development works into **5 PMGSY scheme tiers** and generates plain-language policy explanations using **IBM Granite 4 via watsonx.ai**.",
    problem:
      "Government infrastructure datasets are dense, heterogeneous, and difficult for non-technical stakeholders to audit. Misallocating rural development schemes leads to **funding delays** and **regulatory compliance failures**.",
    solution:
      "Combines an ensemble **Random Forest classifier** (300 estimators, 5-fold cross-validation, class balancing) with automated **feature engineering** and **LLM natural-language summaries** to provide transparent reasoning for each classification.",
    technologies: [
      "Python 3.11",
      "Scikit-Learn (Random Forest)",
      "IBM Granite 4 Small",
      "IBM watsonx.ai",
      "Flask",
      "Pandas & NumPy",
      "Chart.js",
    ],
    keyFeatures: [
      "300-Tree Balanced Random Forest: Robust against heavy class imbalance across rural scheme records.",
      "Comprehensive Feature Engineering: Automated handling of missing geographic values, numeric coercion, and cost-per-km ratio features.",
      "GenAI Policy Explanations: Invokes IBM Granite 4 Small on watsonx.ai to output concise textual rationale for why a project aligns with PMGSY-I, II, III, or special packages.",
      "Interactive Confusion Matrix & Metrics Dashboard: Visualizes precision, recall, and state-by-state classification distributions.",
    ],
    architecture: {
      diagramSummary: "Raw CSV (2,189 rows) -> Preprocessing & Feature Engineering -> 300-Tree Random Forest Classifier -> watsonx.ai Granite 4 LLM -> Flask Web Dashboard",
      flow: [
        {
          name: "Data Ingestion & Cleaning",
          role: "ETL & Preprocessing",
          tech: "Pandas & Custom Preprocessor",
          details: "Cleans state identifiers, handles NaNs, computes road length/cost ratios, and applies StandardScaler.",
        },
        {
          name: "Model Inference",
          role: "Ensemble Classifier",
          tech: "Scikit-Learn RandomForestClassifier",
          details: "Predicts the scheme category across 5 target classes (PMGSY-I, II, III, RCPLWEA, PM-JANMAN).",
        },
        {
          name: "Explanation Synthesis",
          role: "Natural Language Reasoning",
          tech: "IBM watsonx.ai (Granite 4 Small)",
          details: "Synthesizes contextual rationale connecting feature attributes to federal scheme eligibility criteria.",
        },
        {
          name: "Visual Reporting",
          role: "Dashboard Presentation",
          tech: "Flask + Chart.js + HTML5",
          details: "Renders class confidence distributions, confusion matrix heatmaps, and audit reports.",
        },
      ],
    },
    technicalImplementation: {
      language: "Python 3.11",
      framework: "Flask Backend with Scikit-learn Pipeline",
      libraries: ["scikit-learn", "pandas", "numpy", "joblib", "requests"],
      modelsOrAPIs: ["Random Forest (300 trees)", "IBM Granite 4 Small via watsonx.ai API"],
      database: "PMGSY_DATASET.csv (2,189 verified infrastructure records)",
      deployment: "Flask WSGI / Web Showcase",
    },
    engineeringDecisions: [
      {
        title: "Random Forest with Class Balancing vs. Deep Neural Net",
        decision: "Selected a 300-tree Random Forest with balanced class weights rather than an artificial neural network.",
        rationale: "Tabular data with categorical state variables and skewed class distributions performs better and avoids overfitting on tabular datasets under 5,000 samples, while offering intrinsic feature importance rankings.",
      },
      {
        title: "Dual-Layer Classification + Explanation Architecture",
        decision: "Used classical ML for deterministic label prediction and an LLM strictly for explanation synthesis.",
        rationale: "Ensures the core classification remains verifiable and statistically grounded while harnessing LLM fluency without risking hallucinations on numerical thresholds.",
      },
    ],
    frontendNotice: "Interactive Client-Side Demonstration • Features sample road infrastructure records and pre-trained classification demonstration.",
  },
  {
    slug: "intelliview-orchestrator",
    title: "IntelliView Orchestrator: Enterprise Interview & Risk Scoring Platform",
    tagline: "Scalable backend microservice engine orchestrating automated interview workflows, configurable risk weight scoring, and asynchronous notifications.",
    category: "Systems & Cloud",
    status: "FRONTEND DEMO",
    featured: true,
    githubUrl: "https://github.com/Tirth3929v",
    liveUrl: "#demo",
    frontendDemoAvailable: true,
    overview:
      "Backend microservice architecture prototype built with **FastAPI**, **PostgreSQL schemas**, and **Celery asynchronous tasks** for candidate risk evaluation formulas and automated workflows.",
    problem:
      "Recruitment systems require distinct risk criteria depending on position seniority and technical domain, yet hardcoded evaluation formulas prevent recruiters from tailoring **dynamic risk weights**, causing evaluation bottlenecks.",
    solution:
      "Architected a **Risk Weight Configuration API** allowing evaluation formulas across multiple criteria with **Celery task queues**, **Redis brokers**, and automated fallback weights.",
    technologies: [
      "FastAPI",
      "Python 3.11",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Alembic",
      "Docker Compose",
      "Locust",
      "Pydantic V2",
    ],
    keyFeatures: [
      "Dynamic Risk Weight Configurator: Full CRUD API with validation rules ensuring weight matrices sum to mathematical unity.",
      "Notification Deduplication & Template Engine: Asynchronous event pipeline preventing duplicate alerts across candidate interview lifecycles.",
      "Asynchronous Worker Architecture: Offloads long-running candidate evaluation tasks to Celery workers backed by Redis.",
      "Automated Test Validation: Verified through automated Pytest suites and validation schemas.",
    ],
    architecture: {
      diagramSummary: "Client/Recruiter UI -> FastAPI Microservices -> Pydantic Validation -> Celery Background Workers (Redis) -> PostgreSQL (Alembic Migrations)",
      flow: [
        {
          name: "API Gateway & Router",
          role: "Request Ingestion",
          tech: "FastAPI REST API",
          details: "Exposes endpoints for risk weight management, candidate evaluation, and interview status querying.",
        },
        {
          name: "Validation & Business Rules",
          role: "Data Integrity",
          tech: "Pydantic V2 Schemas",
          details: "Enforces non-negative weight bounds and dynamic fallback weights when position-specific configs are omitted.",
        },
        {
          name: "Asynchronous Queue",
          role: "Task Processing",
          tech: "Celery + Redis Broker",
          details: "Dispatches email digestion, report generation, and interview notification deduplication asynchronously.",
        },
        {
          name: "Persistence & Migration",
          role: "Relational Store",
          tech: "PostgreSQL & Alembic",
          details: "Stores position configs and candidate interview logs with versioned database migration scripts.",
        },
      ],
    },
    technicalImplementation: {
      language: "Python 3.11",
      framework: "FastAPI & Celery",
      libraries: ["pydantic", "alembic", "pytest", "locust", "httpx", "sqlalchemy"],
      modelsOrAPIs: ["Dynamic Scoring Engine", "Notification Template Engine"],
      database: "PostgreSQL (with in-memory store fallbacks for isolated testing)",
      deployment: "Docker Compose multi-container stack",
    },
    engineeringDecisions: [
      {
        title: "Celery Background Workers for Notifications & Scored Reports",
        decision: "Decoupled interview evaluation and notification dispatch into Celery asynchronous tasks.",
        rationale: "Kept API response times sub-50ms by never blocking the HTTP request thread with template rendering or external SMTP handshakes.",
      },
      {
        title: "Automated Fallback Architecture for Position Risk Weights",
        decision: "Implemented hierarchical weight resolution (`custom position -> departmental default -> global system default`).",
        rationale: "Prevents scoring pipeline crashes when a newly created job requisition does not yet have custom recruiter risk thresholds assigned.",
      },
    ],
    frontendNotice: "Interactive Client-Side Demonstration • Showcases API schemas, dynamic weight calculation, and evaluation algorithms.",
  },
  {
    slug: "grocery-management-system",
    title: "Full-Stack Grocery Commerce & Inventory Platform",
    tagline: "End-to-end MERN stack e-commerce web application featuring user authentication, shopping cart workflows, product catalog, and administrator inventory controls.",
    category: "Full Stack",
    status: "FRONTEND DEMO",
    featured: false,
    githubUrl: "https://github.com/Tirth3929v",
    liveUrl: "#demo",
    frontendDemoAvailable: true,
    overview:
      "A complete full-stack web application built to master asynchronous state management, relational-like document modeling in **MongoDB**, **JWT authentication**, and responsive consumer e-commerce interactions.",
    problem:
      "Local grocers and retail operations lack lightweight, zero-bloat digital storefronts that sync user cart sessions with **real-time inventory counts**.",
    solution:
      "Built a modular **MERN architecture** with clear separation between public catalog browsing, protected checkout carts, and administrative **CRUD inventory management**.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "Bootstrap / CSS3",
    ],
    keyFeatures: [
      "JWT Role-Based Auth: Secure authentication distinguishing customer accounts from administrative inventory managers.",
      "Persistent Shopping Cart: Real-time quantity adjustments and subtotal calculation.",
      "Admin Inventory Dashboard: CRUD operations for adding, updating stock quantities, and archiving items.",
      "Responsive Catalog Browsing: Filterable product grid optimized for mobile and desktop screens.",
    ],
    architecture: {
      diagramSummary: "React Frontend SPA -> Express RESTful API -> JWT Middleware -> MongoDB Mongoose Data Layer",
      flow: [
        {
          name: "React SPA",
          role: "Frontend Client",
          tech: "React & Context API",
          details: "Manages cart state, user session tokens, and responsive UI components.",
        },
        {
          name: "Express Middleware",
          role: "Routing & Auth",
          tech: "Node.js + Express + JWT",
          details: "Verifies bearer tokens and validates incoming request parameters.",
        },
        {
          name: "Mongoose Models",
          role: "Data Persistence",
          tech: "MongoDB",
          details: "Enforces schema constraints for products, orders, and user credentials.",
        },
      ],
    },
    technicalImplementation: {
      language: "JavaScript / TypeScript",
      framework: "React + Express.js",
      libraries: ["bcryptjs", "jsonwebtoken", "cors", "mongoose"],
      database: "MongoDB",
      deployment: "Frontend Vercel / Render API",
    },
    engineeringDecisions: [
      {
        title: "Stateless JWT Authentication",
        decision: "Used signed JSON Web Tokens stored securely in client memory with refresh capabilities.",
        rationale: "Enables horizontal scalability of the Express backend without needing synchronized session stores.",
      },
    ],
    frontendNotice: "Interactive Client-Side Demonstration • Demonstrates client-side catalog navigation, shopping cart state, and order workflows.",
  },
];
