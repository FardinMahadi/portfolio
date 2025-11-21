"use client";

export type ContactFormStatus = "idle" | "loading" | "success" | "error";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactSectionProps = {
  formData: ContactFormData;
  setFormData: (data: ContactFormData) => void;
  status: ContactFormStatus;
  setStatus: (value: ContactFormStatus) => void;
};
