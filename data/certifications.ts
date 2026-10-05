export type VerificationStatusType = 
  | "Verified" 
  | "Official Certificate" 
  | "Document" 
  | "Not publicly verifiable";

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  skills: string[];
  credentialId?: string;
  credentialUrl?: string;
  certificateFile?: string; // Path in /public/certificates/
  previewImage?: string; // High-res render in /public/certificates/previews/
  verificationStatus: VerificationStatusType;
  description: string;
  documentType?: "Certificate" | "Offer Letter" | "Badge";
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-ibm-ai",
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    issueDate: "September 01, 2026",
    skills: ["Artificial Intelligence", "Machine Learning Concepts", "Neural Networks", "AI Ethics", "IBM Watson"],
    credentialId: "8549e462-9186-4cf4-ad98-8b8e76e04fd3",
    credentialUrl: "https://www.credly.com/badges/8549e462-9186-4cf4-ad98-8b8e76e04fd3",
    certificateFile: "/certificates/ibm-skillsbuild-ai-badge.pdf",
    previewImage: "/certificates/previews/ibm-skillsbuild-ai-badge.jpg",
    verificationStatus: "Verified",
    documentType: "Badge",
    description: "Official IBM SkillsBuild digital credential verified on Credly, certifying comprehensive understanding of foundational AI technologies, learning algorithms, natural language processing, and ethical AI deployment.",
  },
  {
    id: "cert-ibm-cybersecurity",
    title: "Getting Started with Cybersecurity",
    issuer: "IBM SkillsBuild",
    issueDate: "August 28, 2026",
    skills: ["Cybersecurity Principles", "System Hardening", "Network Security", "Data Privacy", "Threat Intelligence"],
    credentialId: "e105ec88-2a9b-4e8f-aab0-19767053a0ed",
    credentialUrl: "https://www.credly.com/badges/e105ec88-2a9b-4e8f-aab0-19767053a0ed",
    certificateFile: "/certificates/ibm-skillsbuild-cybersecurity-badge.pdf",
    previewImage: "/certificates/previews/ibm-skillsbuild-cybersecurity-badge.jpg",
    verificationStatus: "Verified",
    documentType: "Badge",
    description: "Official IBM SkillsBuild credential verified on Credly, validating core cybersecurity fundamentals, defensive architectures, encryption methods, and system security practices.",
  },
  {
    id: "cert-hacklabify-top200",
    title: "Hacklabify V1.0: Secure Top 200 Award",
    issuer: "Hacklabify Org (Sillionona Technologies)",
    issueDate: "August 2026",
    skills: ["NLP", "TF-IDF Vectorization", "Cosine Similarity", "Streamlit", "Python", "Skill Matching"],
    credentialId: "a833d674-ce81-43a1-8d2f-e31debc82255",
    credentialUrl: "https://gocertiflo.com/verify/a833d674-ce81-43a1-8d2f-e31debc82255",
    certificateFile: "/certificates/hacklabify-top200-certificate.pdf",
    previewImage: "/certificates/previews/hacklabify-top200-certificate.jpg",
    verificationStatus: "Verified",
    documentType: "Certificate",
    description: "Verified via GoCertiflo. Certificate of Secure Top 200 awarded for technical initiative and project delivery of SkillSync AI in the Hacklabify V1.0 innovation program.",
  },
  {
    id: "cert-google-promptwars",
    title: "Build with AI: PromptWars Virtual (Generative AI Solution)",
    issuer: "Google for Developers & Hack2Skill",
    issueDate: "August 25, 2026",
    skills: ["Generative AI", "Prompt Engineering", "Google Cloud AI", "LLM Pipelines", "API Workflows"],
    credentialId: "2026H2S07PWVCHL4-A00792",
    credentialUrl: "/certificates/google-promptwars-certificate.pdf",
    certificateFile: "/certificates/google-promptwars-certificate.pdf",
    previewImage: "/certificates/previews/google-promptwars-certificate.jpg",
    verificationStatus: "Official Certificate",
    documentType: "Certificate",
    description: "Certificate of Appreciation for valuable contribution and successful submission of a verified Generative AI solution for Challenge 4 during PromptWars Virtual, demonstrating practical execution in shaping next-generation AI systems.",
  },
  {
    id: "cert-creative-web-completion",
    title: "Data Analyst & AI/ML Industrial Internship (Grade O - 48.5/50)",
    issuer: "Creative Web Infotech (Sutex College Facilitation)",
    issueDate: "March 31, 2026",
    skills: ["Data Analytics", "Python", "Predictive Modeling", "Feature Engineering", "MySQL", "Classification"],
    credentialId: "CWI20261200",
    credentialUrl: "/certificates/creative-web-infotech-completion.pdf",
    certificateFile: "/certificates/creative-web-infotech-completion.pdf",
    previewImage: "/certificates/previews/creative-web-infotech-completion.jpg",
    verificationStatus: "Official Certificate",
    documentType: "Certificate",
    description: "Industrial training and on-the-job apprenticeship certificate completed with Grade O (Outstanding, 48.5 out of 50 marks) for real-world predictive modeling, data cleaning, and machine learning pipeline integration.",
  },
  {
    id: "cert-yuvaintern-python",
    title: "Virtual Data Science with Python Apprentice Intern",
    issuer: "YuvaIntern (Henry Harvin Education)",
    issueDate: "August 27, 2026",
    skills: ["Python", "Data Science", "EDA", "Statistical Visualization", "Data Cleansing"],
    credentialId: "YI/2026/135101/332365",
    credentialUrl: "/certificates/yuvaintern-python-apprentice-completion.pdf",
    certificateFile: "/certificates/yuvaintern-python-apprentice-completion.pdf",
    previewImage: "/certificates/previews/yuvaintern-python-apprentice-completion.jpg",
    verificationStatus: "Official Certificate",
    documentType: "Certificate",
    description: "Official Certificate of Experience for completion of the 5-week remote data science and Python apprentice program covering exploratory data analysis and predictive workflow foundations.",
  },
  {
    id: "cert-yuvaintern-explorer",
    title: "Virtual Data Science Explorer Intern",
    issuer: "YuvaIntern (Henry Harvin Education)",
    issueDate: "August 20, 2026",
    skills: ["Python", "Data Exploration", "NumPy", "Pandas Basics", "Visual Analytics"],
    credentialId: "YI/2026/135101/332312",
    credentialUrl: "/certificates/yuvaintern-data-science-explorer-completion.pdf",
    certificateFile: "/certificates/yuvaintern-data-science-explorer-completion.pdf",
    previewImage: "/certificates/previews/yuvaintern-data-science-explorer-completion.jpg",
    verificationStatus: "Official Certificate",
    documentType: "Certificate",
    description: "Official Certificate of Experience for completion of the remote data science explorer internship track focused on data preparation and foundational analysis.",
  },
  {
    id: "cert-edunet-aicte-ibm",
    title: "Emerging Technologies Internship (AI & Cloud) — Offer Letter",
    issuer: "Edunet Foundation & AICTE (IBM SkillsBuild)",
    issueDate: "August 19, 2026",
    skills: ["IBM Cloud Platform", "IBM SkillsBuild", "Cloud Architecture", "Applied AI", "Python"],
    credentialId: "AICTE: STU6a4fa5579627b1783604567",
    credentialUrl: "/certificates/aicte-edunet-ibm-offer.pdf",
    certificateFile: "/certificates/aicte-edunet-ibm-offer.pdf",
    previewImage: "/certificates/previews/aicte-edunet-ibm-offer.jpg",
    verificationStatus: "Document",
    documentType: "Offer Letter",
    description: "Official AICTE and Edunet Foundation internship selection & offer letter for emerging technologies in AI & Cloud computing leveraging the IBM SkillsBuild enterprise platform (Completion certificate document not yet added).",
  },
  {
    id: "cert-uptoskills-offer",
    title: "AI Research Intern Appointment & Confirmation",
    issuer: "UptoSkills",
    issueDate: "September 18, 2026",
    skills: ["Python", "FastAPI", "Applied AI Research", "Machine Learning Pipelines", "API Workflows"],
    credentialId: "Ref: US/HR/2026/181T8C",
    credentialUrl: "/certificates/uptoskills-offer-letter.pdf",
    certificateFile: "/certificates/uptoskills-offer-letter.pdf",
    previewImage: "/certificates/previews/uptoskills-offer-letter.jpg",
    verificationStatus: "Document",
    documentType: "Offer Letter",
    description: "Formal appointment as AI Research Intern under manager Shivam Agarwal. Focuses on applied AI research, API integrations, and machine learning pipeline development.",
  },
  {
    id: "cert-ibm-bob-troubleshoot",
    title: "Troubleshoot Your Code Using IBM Bob",
    issuer: "IBM SkillsBuild",
    issueDate: "August 31, 2026",
    skills: ["Code Troubleshooting", "Debugging", "IBM Bob", "Python", "Cloud Labs"],
    credentialId: "ALM-COURSE_4071307",
    credentialUrl: "/certificates/ibm-skillsbuild-bob-troubleshoot.pdf",
    certificateFile: "/certificates/ibm-skillsbuild-bob-troubleshoot.pdf",
    verificationStatus: "Official Certificate",
    documentType: "Certificate",
    description: "Official completion certificate for hands-on technical troubleshooting and code diagnosis on the IBM SkillsBuild enterprise learning platform.",
  },
];
