export interface ResumeLink {
  label: string;
  url: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  type?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary?: string;
  achievements: string[];
  technologies?: string[];
}

export interface ResumeProject {
  name: string;
  role?: string;
  description: string;
  outcomes?: string[];
  tech?: string[];
  links?: {
    live?: string;
    code?: string;
  };
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  details?: string[];
}

export interface ResumeCertification {
  name: string;
  issuer?: string;
  achievement?: string;
  year?: string;
}

export interface ResumeLanguage {
  name: string;
  proficiency: string;
}

export interface ResumeCoreCompetencies {
  frontend: string[];
  backend: string[];
  tools: string[];
  strengths: string[];
}

export interface ResumePersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  portfolio: string;
  image?: string;
}

export interface ResumeData {
  personalInfo: ResumePersonalInfo;
  summary: string;
  links: ResumeLink[];
  coreCompetencies: ResumeCoreCompetencies;
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  certifications?: ResumeCertification[];
  languages?: ResumeLanguage[];
}

export interface ResumeTemplateProps {
  data: ResumeData;
  imageSrc?: string;
}
