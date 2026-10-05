export interface HackathonItem {
  id: string;
  name: string;
  track: string;
  date: string;
  participationType: "Team" | "Individual";
  projectName: string;
  projectSlug: string;
  problem: string;
  solution: string;
  technologies: string[];
  statusOrResult: string;
  certificateUrl?: string;
}

export const hackathonsData: HackathonItem[] = [
  {
    id: "google-promptwars-2026",
    name: "PromptWars Virtual • Google for Developers & Hack2Skill",
    track: "Build with AI • Generative AI & Foundation Models",
    date: "August 25, 2026",
    participationType: "Individual",
    projectName: "Generative AI Solution Challenge 4",
    projectSlug: "skillsync-ai",
    problem:
      "Rapidly developing and deploying verified generative AI architectures addressing complex reasoning and automated solution pipelines under hackathon time constraints.",
    solution:
      "Designed and submitted a verified Generative AI pipeline utilizing structured prompt engineering, output schema validation, and API integration for automated domain problem solving.",
    technologies: [
      "Generative AI",
      "Google Cloud AI",
      "Prompt Engineering",
      "Python",
      "RESTful APIs",
      "LLM Workflows",
    ],
    statusOrResult: "Certificate of Appreciation • Verified Generative AI Challenge 4 Submission (ID: 2026H2S07PWVCHL4-A00792)",
    certificateUrl: "/certificates/google-promptwars-certificate.pdf",
  },
  {
    id: "hacklabify-top200",
    name: "Hacklabify V1.0 • Sillionona Technologies",
    track: "Artificial Intelligence & Open Innovation Track",
    date: "August 2026",
    participationType: "Individual",
    projectName: "SkillSync AI: Intelligent Talent Match & Predictive Skill Analytics",
    projectSlug: "skillsync-ai",
    problem:
      "Bridging the information gap between job seekers and evolving industry requirements through automated, transparent skill gap analysis.",
    solution:
      "Engineered an NLP-powered skill assessment engine that compares candidate skills against industry datasets using TF-IDF vectorization and cosine similarity, categorizing missing skills into an actionable learning path.",
    technologies: [
      "Python",
      "Scikit-learn",
      "TF-IDF Vectorization",
      "Cosine Similarity",
      "Streamlit",
      "Pandas",
    ],
    statusOrResult: "Certificate of Secure Top 200 (Verified via GoCertiflo)",
    certificateUrl: "/certificates/hacklabify-top200-certificate.pdf",
  },
];
