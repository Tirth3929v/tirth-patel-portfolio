export interface SkillItem {
  name: string;
  level?: "Core" | "Advanced" | "Proficient" | "Exploring";
  description: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Statistical modeling, supervised classification, and applied generative AI systems.",
    icon: "Brain",
    skills: [
      {
        name: "Machine Learning & Scikit-Learn",
        level: "Advanced",
        description: "Classification algorithms (Random Forest, SVM), model evaluation, 5-fold cross-validation.",
        tags: ["Random Forest", "Cross-Validation", "Metrics", "Pipelines"],
      },
      {
        name: "NLP & Vectorization",
        level: "Advanced",
        description: "TF-IDF text vectorization, cosine similarity, tokenization, semantic search matching.",
        tags: ["TF-IDF", "Cosine Similarity", "Text Mining"],
      },
      {
        name: "LLM & Agentic Workflows",
        level: "Proficient",
        description: "Multi-agent systems, Google Gemini API, IBM Granite (watsonx.ai), prompt engineering.",
        tags: ["Multi-Agent", "Gemini API", "watsonx.ai", "Prompt Engineering"],
      },
      {
        name: "Feature Engineering & Data Preprocessing",
        level: "Advanced",
        description: "Handling missing data, standard scaling, categorical encoding, ratio feature derivation.",
        tags: ["StandardScaler", "Imputation", "Feature Extraction"],
      },
    ],
  },
  {
    id: "programming",
    title: "Programming Languages",
    description: "Strong foundation in typed, functional, and object-oriented paradigms.",
    icon: "Code",
    skills: [
      {
        name: "Python 3.11+",
        level: "Core",
        description: "Advanced OOP, decorators, generators, concurrency, async I/O, algorithmic problem solving.",
        tags: ["100 Days of Code", "AsyncIO", "OOP", "Data Structures"],
      },
      {
        name: "TypeScript",
        level: "Core",
        description: "Strong typing, interfaces, generics, Next.js App Router integrations.",
        tags: ["Type Safety", "Generics", "Modern Web"],
      },
      {
        name: "JavaScript (ES6+)",
        level: "Core",
        description: "Event loops, DOM manipulation, asynchronous programming, modern ES syntax.",
        tags: ["Promises", "Async/Await", "Modular JS"],
      },
      {
        name: "SQL",
        level: "Proficient",
        description: "Relational queries, joins, aggregations, indexing, schema design.",
        tags: ["PostgreSQL", "SQLite", "Relational Design"],
      },
    ],
  },
  {
    id: "backend-web",
    title: "Backend & Systems",
    description: "High-performance REST APIs, asynchronous task workers, and database architectures.",
    icon: "Server",
    skills: [
      {
        name: "FastAPI",
        level: "Advanced",
        description: "Pydantic validation, dependency injection, OpenAPI documentation, asynchronous endpoints.",
        tags: ["Pydantic", "Async Endpoints", "Microservices"],
      },
      {
        name: "Next.js & React",
        level: "Advanced",
        description: "App Router, Server Components, client state management, responsive UI systems.",
        tags: ["React 19", "Server Components", "Tailwind CSS"],
      },
      {
        name: "Celery & Redis",
        level: "Proficient",
        description: "Distributed background task execution, asynchronous queues, worker scheduling.",
        tags: ["Task Queues", "Redis Caching", "Workers"],
      },
      {
        name: "Flask & Node.js",
        level: "Proficient",
        description: "Lightweight microservice backends, REST APIs, middleware architectures.",
        tags: ["Express.js", "Jinja2", "RESTful"],
      },
    ],
  },
  {
    id: "data-stack",
    title: "Data Science & Databases",
    description: "Data manipulation, analytical computation, and persistence layers.",
    icon: "Database",
    skills: [
      {
        name: "Pandas & NumPy",
        level: "Advanced",
        description: "Vectorized arrays, multi-index aggregation, dataset slicing, time-series handling.",
        tags: ["Vectorization", "DataFrames", "Aggregations"],
      },
      {
        name: "PostgreSQL & SQLAlchemy / Alembic",
        level: "Proficient",
        description: "Relational modeling, migrations, ORM queries, transactional consistency.",
        tags: ["Migrations", "Alembic", "ORM"],
      },
      {
        name: "MongoDB Atlas",
        level: "Proficient",
        description: "Document store schema modeling, aggregation pipelines, cloud clusters.",
        tags: ["NoSQL", "Mongoose", "Atlas M0"],
      },
      {
        name: "Matplotlib & Chart.js",
        level: "Proficient",
        description: "Scientific charts, confusion matrices, data distribution histograms, dashboard visuals.",
        tags: ["Data Viz", "Confusion Matrix", "Dashboards"],
      },
    ],
  },
  {
    id: "tools-devops",
    title: "Tools, DevOps & Testing",
    description: "Production tooling, containerization, load testing, and version control.",
    icon: "Terminal",
    skills: [
      {
        name: "Docker & Docker Compose",
        level: "Proficient",
        description: "Multi-container environment orchestration, reproducible builds, network isolation.",
        tags: ["Containerization", "Microservices"],
      },
      {
        name: "Locust Load Testing",
        level: "Proficient",
        description: "High-concurrency user simulation, throughput benchmarking, bottleneck identification.",
        tags: ["Performance Testing", "Benchmarking"],
      },
      {
        name: "Git & GitHub",
        level: "Core",
        description: "Branching strategies, pull request workflows, CI/CD actions, version management.",
        tags: ["Git Flow", "Version Control", "Collaboration"],
      },
      {
        name: "Linux & Bash / PowerShell",
        level: "Proficient",
        description: "CLI automation, server administration, shell scripting, environment configuration.",
        tags: ["CLI", "Automation", "Shell Scripting"],
      },
    ],
  },
];
