import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ParticleProps } from "../types/ParticleProps";

export function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const particleIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Detect touch device and reduced motion preference
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error - for older browsers (IE/Edge legacy)
          navigator.msMaxTouchPoints > 0
      );
    };
    checkTouchDevice();
  }, []);

  useEffect(() => {
    // Don't initialize cursor on touch devices
    if (isTouchDevice) return;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);

      // Create particle trail occasionally
      if (Math.random() > 0.85) {
        const newParticle: ParticleProps = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        };
        setParticles((prev) => [...prev.slice(-8), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-45"
          initial={{
            left: particle.x,
            top: particle.y,
            x: "-50%",
            y: "-50%",
            scale: particle.scale,
            opacity: particle.opacity,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-br from-cyan-100 to-violet-100 rounded-full blur-sm" />
        </motion.div>
      ))}

      {/* Outer ring cursor */}
      <motion.div
        className="pointer-events-none fixed z-50"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        <div className="relative w-10 h-10">
          {/* Rotating gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #06b6d4, #3b82f6, #8b5cf6, transparent)",
              opacity: isHovering ? 0.8 : 0.5,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Inner border */}
          <div className="absolute inset-[2px] bg-[#0a0e1a] rounded-full" />

          {/* Center dot with glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                scale: isClicking ? 0.5 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm opacity-60" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="pointer-events-none fixed z-40 mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 1.2 : isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="relative w-32 h-32">
          <div
            className="absolute inset-0 rounded-full blur-2xl transition-colors duration-300"
            style={{
              background: isHovering
                ? "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="pointer-events-none fixed z-40"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-20 h-20 border-2 border-cyan-400 rounded-full" />
        </motion.div>
      )}

      {/* Code bracket indicators when hovering */}
      {isHovering && (
        <>
          <motion.div
            className="pointer-events-none fixed z-50 font-mono text-cyan-400"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
            }}
            initial={{ x: -25, y: -10, opacity: 0 }}
            animate={{ x: -20, y: -10, opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            {"<"}
          </motion.div>
          <motion.div
            className="pointer-events-none fixed z-50 font-mono text-cyan-400"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
            }}
            initial={{ x: 15, y: -10, opacity: 0 }}
            animate={{ x: 20, y: -10, opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            {">"}
          </motion.div>
        </>
      )}
    </>
  );
}
