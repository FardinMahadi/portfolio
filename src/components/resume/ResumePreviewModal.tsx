"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateKey: string;
  templateName: string;
}

export function ResumePreviewModal({
  isOpen,
  onClose,
  templateKey,
  templateName,
}: ResumePreviewModalProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const loadPreview = useCallback(async () => {
    if (loading || !isOpen) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/resume/${templateKey}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to generate preview");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Unable to load preview.");
    } finally {
      setLoading(false);
    }
  }, [templateKey, isOpen, loading]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setError(null);
    setPdfUrl(null);
    loadPreview();
  }, [isOpen, templateKey, loadPreview]);

  // Handle scroll locking + blob cleanup
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (!isOpen && pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen, pdfUrl]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Mahadi-Hasan-Fardin-${templateKey}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-200 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-4 z-210 mx-auto flex max-w-6xl flex-col overflow-hidden rounded-2xl border border-theme-border/40 bg-[color-mix(in_srgb,var(--color-surface)_95%,transparent)] shadow-2xl"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-surface) 95%, transparent), color-mix(in srgb, var(--color-background) 98%, transparent))",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-theme-border/40 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-theme-text">
                  {templateName} Preview
                </h2>
                <p className="text-sm text-theme-text/60">
                  Review your resume before downloading
                </p>
              </div>
              <div className="flex items-center gap-3">
                {pdfUrl && (
                  <Button
                    onClick={handleDownload}
                    className="text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                      boxShadow:
                        "0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.12), 0 0 25px -8px var(--color-primary)",
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-theme-text/70 transition-colors hover:bg-theme-border/30 hover:text-theme-text"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
              {loading && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-theme-primary" />
                    <p className="mt-4 text-sm text-theme-text/70">
                      Generating preview...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-red-400">{error}</p>
                    <Button
                      onClick={loadPreview}
                      className="mt-4"
                      variant="outline"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {pdfUrl && !loading && (
                <iframe
                  src={pdfUrl}
                  className="h-full w-full border-0"
                  title={`${templateName} Resume Preview`}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
