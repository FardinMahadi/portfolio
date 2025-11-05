"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedStatsCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  label?: string;
}

export function AnimatedStatsCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  label,
}: AnimatedStatsCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = startValue + (end - startValue) * easeOutQuart;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animate();
    }
  }, [isInView, end, duration, hasStarted]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div className="text-center">
        <div
          className="text-4xl md:text-5xl font-bold font-mono mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {prefix}
          {count.toFixed(decimals)}
          {suffix}
        </div>
        {label && (
          <p className="text-slate-400 text-sm font-mono">{label}</p>
        )}
      </div>
    </motion.div>
  );
}

