export interface ExperienceProps {
  company: string;
  position: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyUrl?: string;
}
