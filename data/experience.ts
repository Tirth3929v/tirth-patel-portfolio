export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Internship" | "Apprenticeship" | "Project Contributor";
  description: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  certificateUrl?: string;
  isPlaceholder?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "creative-web-infotech",
    role: "AI/ML Intern",
    company: "Creative Web Infotech",
    location: "Surat, Gujarat, India",
    period: "December 10, 2025 – January 09, 2026",
    type: "Internship",
    description:
      "Completed industrial internship and on-the-job training facilitated through Sutex Bank College. Awarded **Grade O (Outstanding, 48.5/50 marks)** (Certificate ID: CWI20261200) under supervisor Haresh Shiyani for engineering **predictive classification pipelines** in Python and optimizing relational schemas in **MySQL**.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Classification Models",
      "Feature Engineering",
      "MySQL",
    ],
    responsibilities: [
      "**Machine Learning Development**: Developed and implemented predictive **classification and regression models** in Python to address empirical data analysis tasks.",
      "**Data Engineering**: Performed rigorous **data preprocessing**, null imputation, and **feature engineering** to optimize model accuracy and reduce training variance.",
      "**AI Integration**: Collaborated on integrating **ML model inference** into web-based platforms, bridging core algorithm logic with user interfaces.",
      "**Research & Evaluation**: Evaluated various supervised algorithms and Python libraries to determine optimal trade-offs between latency and recall.",
      "**Technical Documentation**: Formulated comprehensive documentation covering **model architectures and evaluation metrics** for reproducibility.",
    ],
    achievements: [
      "Awarded **Grade O (Outstanding, 48.5/50 marks)** evaluated by industry reviewers.",
      "Official Completion Certificate on file (ID: CWI20261200).",
    ],
    certificateUrl: "/certificates/creative-web-infotech-completion.pdf",
    isPlaceholder: false,
  },
  {
    id: "yuvaintern-python-apprentice",
    role: "Virtual Data Science with Python Apprentice Intern",
    company: "YuvaIntern (Henry Harvin Education)",
    location: "Remote",
    period: "July 23, 2026 – August 27, 2026",
    type: "Internship",
    description:
      "Completed virtual internship program in **Data Science & Python programming**. Awarded official Certificate of Experience (Certificate No: YI/2026/135101/332365) signed by Kounal Gupta for structured **exploratory data analysis (EDA)**, statistical distribution plotting, and automated data processing pipelines.",
    technologies: [
      "Python",
      "Data Cleaning",
      "Statistical Analysis",
      "Matplotlib",
      "Seaborn",
      "EDA",
    ],
    responsibilities: [
      "Conducted **exploratory data analysis (EDA)**, outlier detection, and data cleansing across complex tabular datasets.",
      "Implemented statistical summaries, **correlation heatmaps**, and distribution plots using **Matplotlib & Seaborn**.",
      "Assisted in developing automated data transformation scripts and validating dataset integrity against schema standards.",
    ],
    achievements: [
      "Awarded official Certificate of Experience (ID: YI/2026/135101/332365).",
      "Official Offer Letter on file (Ref: YI/2026/135101).",
    ],
    certificateUrl: "/certificates/yuvaintern-python-apprentice-completion.pdf",
    isPlaceholder: false,
  },
  {
    id: "yuvaintern-datascience-explorer",
    role: "Virtual Data Science Explorer Intern",
    company: "YuvaIntern (Henry Harvin Education)",
    location: "Remote",
    period: "July 23, 2026 – August 20, 2026",
    type: "Internship",
    description:
      "Completed foundational internship track as a **Data Science Explorer**. Awarded official Certificate of Experience (Certificate No: YI/2026/135101/332312) signed by Kounal Gupta for hands-on **data exploration**, mathematical array operations with **NumPy & Pandas**, and visual analytics.",
    technologies: [
      "Python",
      "NumPy",
      "Pandas Basics",
      "Data Exploration",
      "Visual Analytics",
    ],
    responsibilities: [
      "Performed hands-on data manipulation, filtering, and aggregation using **Pandas & NumPy**.",
      "Analyzed multidimensional data structures and generated visual reports for empirical observations.",
      "Verified data pipelines and contributed to dataset hygiene protocols.",
    ],
    achievements: [
      "Awarded official Certificate of Experience (ID: YI/2026/135101/332312).",
      "Official Selection & Offer Letter on file (Ref: YI/2026/135101).",
    ],
    certificateUrl: "/certificates/yuvaintern-data-science-explorer-completion.pdf",
    isPlaceholder: false,
  },
  {
    id: "edunet-aicte-ibm",
    role: "Emerging Technologies Intern (AI & Cloud)",
    company: "Edunet Foundation & AICTE (IBM SkillsBuild)",
    location: "Remote / India",
    period: "August 17, 2026 – September 11, 2026",
    type: "Internship",
    description:
      "Selected through the **AICTE Internship Portal** (Student ID: STU6a4fa5579627b1783604567) for a specialized program in **Emerging Technologies (AI & Cloud)** leveraging **IBM SkillsBuild & IBM Cloud** enterprise architectures.",
    technologies: [
      "IBM Cloud Platform",
      "IBM SkillsBuild",
      "Artificial Intelligence",
      "Cloud Architecture",
      "Python",
    ],
    responsibilities: [
      "Completed foundational learning tracks in **artificial intelligence architectures**, machine learning concepts, and cloud service models.",
      "Earned verified **IBM SkillsBuild credentials** in AI fundamentals and cybersecurity defense principles.",
      "Participated in virtual technical labs and explored hands-on code troubleshooting in cloud sandboxes.",
    ],
    achievements: [
      "Official AICTE & Edunet Foundation Internship Offer Letter on file (Signed by Nagesh Singh, Chairman).",
      "Earned verified Credly badges in Artificial Intelligence and Cybersecurity.",
    ],
    certificateUrl: "/certificates/aicte-edunet-ibm-offer.pdf",
    isPlaceholder: false,
  },
  {
    id: "uptoskills-intern",
    role: "AI Research Intern",
    company: "UptoSkills",
    location: "Remote / India",
    period: "September 18, 2026 – December 18, 2026",
    type: "Internship",
    description:
      "Appointed as **AI Research Intern** (Ref No: US/HR/2026/181T8C) reporting to Shivam Agarwal. Focuses on applied AI research, **REST API integrations**, and machine learning pipeline development with **FastAPI and Python 3.11**.",
    technologies: [
      "Python 3.11",
      "FastAPI",
      "Machine Learning",
      "REST APIs",
      "Data Pipelines",
    ],
    responsibilities: [
      "Researching state-of-the-art applied machine learning architectures and vector search paradigms.",
      "Prototyping **FastAPI backend microservices** with strict Pydantic schema validation.",
      "Collaborating on data engineering workflows and AI benchmark evaluations.",
    ],
    achievements: [
      "Official Appointment Letter on file (Ref: US/HR/2026/181T8C).",
    ],
    certificateUrl: "/certificates/uptoskills-offer-letter.pdf",
    isPlaceholder: false,
  },
];
