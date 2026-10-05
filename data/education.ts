export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: "Completed" | "In Progress" | "Prospective";
  coreCourses: string[];
  academicFocus: string;
  gradeOrScore?: string; // Optional - left as configurable field without inventing numbers
  verificationNote?: string;
}

export const educationData: EducationItem[] = [
  {
    id: "bca-degree",
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science & Software Applications",
    institution: "Veer Narmad South Gujarat University (Sutex Bank College of Computer Applications & Science)",
    period: "2023 – 2026",
    status: "Completed",
    coreCourses: [
      "Data Analytics using Python",
      "Database Handling using Python (MySQL & MongoDB)",
      "Fundamentals of Full Stack Web Development",
      "Object-Oriented Programming & Data Structures",
      "Java Programming Language & .NET Technology",
      "Linux Operating System & System Administration",
    ],
    academicFocus:
      "Built a solid foundation in computer science core principles, database architecture, systems administration, and data analytics using Python before specializing in applied artificial intelligence and machine learning pipelines.",
    gradeOrScore: "CGPA: 7.52 (First Class with Distinction) • Final Semester SGPA: 8.27 (462/550)",
    verificationNote: "Official degree and transcripts issued by Veer Narmad South Gujarat University.",
  },
  {
    id: "masters-target",
    degree: "Prospective Master of Science (M.S.)",
    field: "Computer Science / Artificial Intelligence / Machine Learning",
    institution: "Targeting Top Global Graduate Research Universities",
    period: "Incoming / Fall 2025 - 2026 Aspirant",
    status: "Prospective",
    coreCourses: [
      "Advanced Machine Learning & Deep Neural Networks",
      "Natural Language Understanding & Foundation Models",
      "Distributed Systems & Cloud Computing",
      "Probabilistic Graphical Models & Reinforcement Learning",
      "Ethics & Safety in Autonomous AI Systems",
    ],
    academicFocus:
      "Aimed at conducting focused research on multi-agent communication protocols, robust inference engines, and scalable machine learning infrastructure that bridges mathematical theory with high-availability production environments.",
    verificationNote: "Portfolio serving as academic supplement to graduate admissions committees.",
  },
];
