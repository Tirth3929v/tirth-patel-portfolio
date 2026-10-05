export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  statusBadge: string;
  location: string;
  summary: string;
  academicStatement: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  academicGoals: {
    targetProgram: string;
    researchInterests: string[];
    preparationPillars: {
      title: string;
      description: string;
      icon: string;
    }[];
    academicQuote: string;
  };
}

export const profileData: ProfileData = {
  name: "Tirth Patel",
  role: "Aspiring AI Engineer • Python Developer",
  headline: "Building intelligent software with Python, AI, and modern web architectures.",
  statusBadge: "OPEN TO AI / SOFTWARE ENGINEERING ROLES & MASTER'S RESEARCH",
  location: "India",
  summary:
    "Computer Science graduate with a solid foundation in software engineering, backend systems, and applied machine learning. Creator of real-world AI applications including multi-agent career guidance, predictive skill gap analyzers, and the 100 Days of Python Lab. Currently preparing for advanced Master's studies in Computer Science & Artificial Intelligence.",
  academicStatement:
    "My academic pursuit is driven by a deep fascination with machine learning systems, multi-agent coordination, and bridging the divide between mathematical modeling and high-throughput production software. Through rigorous self-directed development—from mathematical data preprocessing to distributed FastAPI microservices—I have built an empirical foundation ready for graduate-level research and innovation.",
  socials: {
    github: "https://github.com/Tirth3929v",
    linkedin: "https://www.linkedin.com/in/tirth-patel-ai",
    email: "tirthpatel82032@gmail.com",
  },
  metrics: [
    {
      label: "Education",
      value: "BCA Distinction",
      description: "CGPA 7.52 (First Class with Distinction) • Final Sem SGPA: 8.27",
    },
    {
      label: "Python Lab",
      value: "100 Days",
      description: "Comprehensive hands-on projects from OOP to ML pipelines",
    },
    {
      label: "AI & ML Practice",
      value: "Applied AI",
      description: "Predictive classification, multi-agent frameworks, NLP & FastAPI",
    },
    {
      label: "Industry Practice",
      value: "5 Internships",
      description: "Creative Web Infotech, 2x YuvaIntern tracks, Edunet AICTE, and UptoSkills",
    },
  ],
  academicGoals: {
    targetProgram: "Master of Science in Computer Science / Artificial Intelligence",
    researchInterests: [
      "Multi-Agent Coordination & Agentic AI Architectures",
      "Natural Language Processing & Semantic Search",
      "Predictive Analytics & Human-AI Collaboration",
      "Robust Machine Learning Systems in Production",
    ],
    preparationPillars: [
      {
        title: "Theoretical & Mathematical Grounding",
        description: "Deepening knowledge of linear algebra, multivariate calculus, probability distributions, and algorithmic complexity underpinning modern neural networks.",
        icon: "BookOpen",
      },
      {
        title: "Empirical System Building",
        description: "Moving beyond toy examples by implementing full-stack ML workflows, feature pipelines, TF-IDF vectorizers, and Random Forest classifiers on real governmental datasets.",
        icon: "Cpu",
      },
      {
        title: "Distributed Backend Architecture",
        description: "Engineering resilient microservices with FastAPI, Celery background queues, Redis caching, and containerized deployments ready for scale.",
        icon: "Server",
      },
      {
        title: "Commitment to Continuous Mastery",
        description: "Demonstrated through 100 consecutive days of Python projects spanning low-level algorithms, data science notebooks, and capstone full-stack tools.",
        icon: "Flame",
      },
    ],
    academicQuote:
      "Graduate studies represent an opportunity to transform practical engineering skills into rigorous research contributions that advance real-world artificial intelligence.",
  },
};
