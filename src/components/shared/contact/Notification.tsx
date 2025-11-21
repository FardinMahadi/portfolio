"use client";

import type { NotificationProps } from "@/components/types/landing/contact";

import { motion } from "framer-motion";

export function Notification({ variant, message, Icon }: NotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 p-3 rounded-lg border ${
        variant === "success"
          ? "bg-green-500/10 border-green-500/50 text-green-400"
          : "bg-red-500/10 border-red-500/50 text-red-400"
      }`}
      role="alert"
    >
      <Icon className="w-5 h-5" />
      <p className="text-sm">{message}</p>
    </motion.div>
  );
}
