"use client";

import type { ContactFormPanelProps } from "@/components/types/landing/contact";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/shared/contact/FormField";
import { LoaderIcon } from "@/components/shared/contact/LoaderIcon";
import { Notification } from "@/components/shared/contact/Notification";
import { TextareaField } from "@/components/shared/contact/TextareaField";

import { Button } from "../../ui/button";

export function ContactFormPanel({
  formData,
  errors,
  onChange,
  handleSubmit,
  isSubmitting,
  status,
  message,
}: ContactFormPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        aria-label="Contact form"
      >
        <div
          className="rounded-t-lg border border-theme-border/60 bg-theme-surface/70 px-4 py-2 backdrop-blur"
          role="presentation"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="h-3 w-3 rounded-full bg-theme-primary/70" />
              <div className="h-3 w-3 rounded-full bg-theme-accent/70" />
              <div className="h-3 w-3 rounded-full bg-theme-secondary/70" />
            </div>
            <span className="ml-2 text-xs font-mono text-theme-text/60">
              contact-form.tsx
            </span>
          </div>
        </div>

        <div className="space-y-4 rounded-b-lg border-x border-b border-theme-border/60 bg-theme-surface/80 p-6 backdrop-blur-sm">
          <FormField
            label="name"
            placeholder="Your Name"
            value={formData.name}
            error={errors.name}
            onChange={(value) => onChange({ ...formData, name: value })}
          />
          <FormField
            label="email"
            placeholder="your.email@example.com"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={(value) => onChange({ ...formData, email: value })}
          />
          <TextareaField
            label="message"
            placeholder="Your message..."
            value={formData.message}
            error={errors.message}
            onChange={(value) => onChange({ ...formData, message: value })}
          />

          {status === "success" && message && (
            <Notification
              variant="success"
              message={message}
              Icon={CheckCircle2}
            />
          )}
          {status === "error" && message && (
            <Notification
              variant="error"
              message={message}
              Icon={AlertCircle}
            />
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] w-full text-theme-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.12), 0 0 25px -8px var(--color-primary)",
            }}
            aria-label="Submit contact form"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoaderIcon />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
