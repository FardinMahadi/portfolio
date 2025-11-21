import type { LucideIcon } from "lucide-react";
import type { ElementType, FormEvent } from "react";

export type ContactSectionProps = {
  variant?: "landing" | "page";
};

export type ContactFormStatus = "idle" | "loading" | "success" | "error";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormPanelProps = {
  formData: ContactFormData;
  errors: Partial<ContactFormData>;
  onChange: (data: ContactFormData) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  status: ContactFormStatus;
  message: string;
};

export type FormFieldProps = {
  label: string;
  placeholder: string;
  type?: "text" | "email";
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export type TextareaFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export type NotificationProps = {
  variant: "success" | "error";
  message: string;
  Icon: LucideIcon;
};

export type ContactPanelProps = {
  isInView: boolean;
};

export interface SocialLinksProps {
  name: string;
  username: string;
  icon: ElementType;
  url: string;
  color: string;
  glow: string;
}
