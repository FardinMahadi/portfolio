"use client";

import type { TextareaFieldProps } from "@/components/types/contactFormPanelTypes";

import { Textarea } from "@/components/ui/textarea";

export function TextareaField({
  label,
  placeholder,
  value,
  error,
  onChange,
}: TextareaFieldProps) {
  return (
    <div>
      <label
        className="mb-2 flex items-center gap-2 font-mono text-sm text-theme-text/75"
        aria-label={label}
      >
        <span className="text-purple-400">const</span>
        <span className="text-cyan-400">{label}</span>
        <span className="text-pink-400">=</span>
      </label>
      <Textarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[44px] resize-none border-theme-border/70 bg-theme-surface/70 text-theme-text placeholder:text-theme-text/50 focus:border-theme-primary ${
          error ? "border-red-500" : ""
        }`}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p
          id={`${label}-error`}
          className="mt-1 text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
