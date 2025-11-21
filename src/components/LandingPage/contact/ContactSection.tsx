"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import socialLinksData from "@/data/socialLinks.json";
import { SocialLinksProps } from "@/components/types/SocialLinksProps";
import {
  Mail,
  Send,
  Github,
  Loader2,
  FileText,
  Linkedin,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const iconMap = {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
} as const;

const socialLinks: SocialLinksProps[] = socialLinksData.map((item) => ({
  ...item,
  icon: iconMap[item.icon as keyof typeof iconMap],
}));

type ContactSectionProps = {
  variant?: "landing" | "page";
};

export function ContactSection({ variant = "landing" }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 5000) {
      newErrors.message = "Message is too long (max 5000 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        data.message || "Thank you for your message! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-20 px-4 text-theme-text sm:px-6 lg:px-8 ${variant === "page" ? "bg-transparent" : "bg-(--color-background)"}`}
      style={
        variant === "page"
          ? undefined
          : {
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 92%, transparent), var(--color-background))",
            }
      }
    >
      {/* Background effects */}
      <div
        className="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 26%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl">
        {variant === "page" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-theme-border/40 bg-theme-surface/70 p-4 text-sm text-theme-text/70"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-theme-primary transition-colors hover:text-theme-accent"
              aria-label="Return to home page"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-theme-text/60">avg. response</span>
              <span className="rounded-full bg-theme-primary/10 px-3 py-1 text-theme-primary">
                &lt; 24h
              </span>
            </div>
          </motion.div>
        )}

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-theme-primary">
            <span
              className="font-mono text-xl text-theme-primary"
              aria-hidden="true"
            >
              {">"}_
            </span>
            <h2 className="text-3xl font-bold text-theme-accent">
              Get In Touch
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-theme-text/75">
            Have a project idea or want to collaborate? I&apos;m always open to
            discussing new opportunities, freelance work, and exciting
            challenges in web development.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Contact form"
            >
              {/* Terminal-style form header */}
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

              <div
                className="space-y-4 rounded-b-lg border-x border-b border-theme-border/60 bg-theme-surface/80 p-6 backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 90%, transparent), color-mix(in srgb, var(--color-background) 88%, transparent))",
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 flex items-center gap-2 font-mono text-sm text-theme-text/75"
                  >
                    <span className="text-purple-400">const</span>
                    <span className="text-cyan-400">name</span>
                    <span className="text-pink-400">=</span>
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name)
                        setErrors({ ...errors, name: undefined });
                    }}
                    className={`min-h-[44px] border-theme-border/70 bg-theme-surface/70 text-theme-text placeholder:text-theme-text/50 focus:border-theme-primary ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    aria-required="true"
                    aria-label="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 flex items-center gap-2 font-mono text-sm text-theme-text/75"
                  >
                    <span className="text-purple-400">const</span>
                    <span className="text-cyan-400">email</span>
                    <span className="text-pink-400">=</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    className={`min-h-[44px] border-theme-border/70 bg-theme-surface/70 text-theme-text placeholder:text-theme-text/50 focus:border-theme-primary ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    aria-required="true"
                    aria-label="Your email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 flex items-center gap-2 font-mono text-sm text-theme-text/75"
                  >
                    <span className="text-purple-400">const</span>
                    <span className="text-cyan-400">message</span>
                    <span className="text-pink-400">=</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your message..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message)
                        setErrors({ ...errors, message: undefined });
                    }}
                    className={`min-h-[44px] resize-none border-theme-border/70 bg-theme-surface/70 text-theme-text placeholder:text-theme-text/50 focus:border-theme-primary ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    aria-required="true"
                    aria-label="Your message"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-sm text-red-400"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
                    role="alert"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}

                {submitStatus === "error" && submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
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
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {variant === "page" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="rounded-xl border border-theme-border/40 p-6 backdrop-blur-sm shadow-xl shadow-theme-primary/5"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-background) 65%, transparent))",
                }}
              >
                <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-theme-text/90">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:mahadihasanfardin2015@gmail.com"
                    className="flex min-h-[44px] items-center justify-between rounded-lg border border-theme-border/40 px-4 py-3 text-theme-text transition-colors hover:border-theme-primary/70 hover:text-white shadow-lg shadow-theme-primary/5"
                    style={{
                      background:
                        "linear-gradient(120deg, color-mix(in srgb, var(--color-surface) 65%, transparent), color-mix(in srgb, var(--color-primary) 10%, transparent))",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-theme-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.45)]" />
                      <div>
                        <p className="font-medium text-theme-text">
                          Send me an email
                        </p>
                        <span className="text-sm text-theme-text/80">
                          mahadihasanfardin2015@gmail.com
                        </span>
                      </div>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="/mahadi-hasan-fardin-cv.pdf"
                    download="mahadi-hasan-fardin-cv.pdf"
                    className="flex min-h-[44px] items-center justify-between rounded-lg border border-theme-border/40 px-4 py-3 text-theme-text transition-colors hover:border-theme-primary/70 hover:text-white shadow-lg shadow-theme-primary/5"
                    aria-label="Download CV"
                    style={{
                      background:
                        "linear-gradient(120deg, color-mix(in srgb, var(--color-surface) 65%, transparent), color-mix(in srgb, var(--color-secondary) 10%, transparent))",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-theme-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]" />
                      <div>
                        <p className="font-medium text-theme-text">
                          Download my CV
                        </p>
                        <span className="text-sm text-theme-text/80">
                          Updated November 2025
                        </span>
                      </div>
                    </div>
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Social links */}
            <aside>
              <h3 className="mb-6 font-mono text-xl text-theme-text">
                Connect With Me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group flex min-h-[44px] items-center gap-4 rounded-lg border border-theme-border/40 p-4 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-theme-primary/5 hover:border-theme-primary/60"
                    style={{
                      background:
                        "linear-gradient(145deg, color-mix(in srgb, var(--color-surface) 78%, transparent), color-mix(in srgb, var(--color-background) 60%, transparent))",
                    }}
                    aria-label={`Visit ${social.name} profile for ${social.username}`}
                  >
                    <div
                      className={`rounded-lg border border-theme-border/40 p-3 shadow-lg transition-all duration-300 group-hover:border-theme-primary/50 ${social.glow}`}
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 85%, transparent), color-mix(in srgb, var(--color-background) 55%, transparent))",
                      }}
                    >
                      <social.icon
                        className={`h-5 w-5 text-theme-text ${social.color} transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-theme-text transition-colors duration-300 group-hover:text-theme-primary">
                        {social.name}
                      </div>
                      <div className="text-sm font-mono text-theme-text/85">
                        @{social.username}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </aside>

            {/* Command prompt style info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="overflow-hidden rounded-lg border border-theme-border/40 shadow-xl shadow-theme-primary/10 backdrop-blur"
              style={{
                background:
                  "linear-gradient(150deg, color-mix(in srgb, var(--color-surface) 80%, transparent), color-mix(in srgb, var(--color-background) 60%, transparent))",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in srgb, var(--color-border) 40%, transparent)",
              }}
            >
              <header className="flex items-center gap-2 border-b border-theme-border/40 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-theme-primary/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-theme-accent/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-theme-secondary/70" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-theme-text/80">
                  status.txt
                </span>
              </header>
              <div className="space-y-2 px-4 pb-4 pt-3 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-theme-primary">$</span>
                  <span className="text-theme-text/90">cat status.txt</span>
                </div>
                <div className="space-y-1 pl-4">
                  <address className="not-italic text-theme-text/85">
                    <div>
                      <span className="text-theme-primary/80">Location:</span>{" "}
                      Remote / Dhaka / Cumilla
                    </div>
                    <div>
                      <span className="text-theme-accent/80">
                        Availability:
                      </span>{" "}
                      Open to opportunities
                    </div>
                    <div>
                      <span className="text-theme-secondary/80">
                        Response Time:
                      </span>{" "}
                      {"<"} 24 hours
                    </div>
                  </address>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-theme-primary">$</span>
                  <span className="animate-pulse text-theme-text/60">_</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
