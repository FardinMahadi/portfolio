"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

export function TargetCursor({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch by checking mounted state
  const [mounted, setMounted] = useState(false);
  const [disableCursor, setDisableCursor] = useState(true);

  // Detect pointer capabilities (mouse/trackpad vs touch) on client side
  useEffect(() => {
    setMounted(true);

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");

    const updateFromMediaQueries = () => {
      const hasMouseLikeInput = finePointerQuery.matches && hoverQuery.matches;
      setDisableCursor(!hasMouseLikeInput);
    };

    const pointerDownHandler = (event: PointerEvent) => {
      const mouseLikePointer =
        event.pointerType === "mouse" || event.pointerType === "pen";
      setDisableCursor(!mouseLikePointer);
    };

    updateFromMediaQueries();

    finePointerQuery.addEventListener
      ? finePointerQuery.addEventListener("change", updateFromMediaQueries)
      : finePointerQuery.addListener(updateFromMediaQueries);

    hoverQuery.addEventListener
      ? hoverQuery.addEventListener("change", updateFromMediaQueries)
      : hoverQuery.addListener(updateFromMediaQueries);

    window.addEventListener("pointerdown", pointerDownHandler);

    return () => {
      finePointerQuery.removeEventListener
        ? finePointerQuery.removeEventListener("change", updateFromMediaQueries)
        : finePointerQuery.removeListener(updateFromMediaQueries);

      hoverQuery.removeEventListener
        ? hoverQuery.removeEventListener("change", updateFromMediaQueries)
        : hoverQuery.removeListener(updateFromMediaQueries);

      window.removeEventListener("pointerdown", pointerDownHandler);
    };
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!mounted || disableCursor || !cursorRef.current) return;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      ".target-cursor-corner"
    );
    let activeTarget: HTMLElement | null = null;
    let currentTargetMove: ((e: MouseEvent) => void) | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: NodeJS.Timeout | null = null;

    const cleanupTarget = (target: HTMLElement) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, {
        rotation: "+=360",
        duration: spinDuration,
        ease: "none",
      });
    };

    createSpinTimeline();

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);

    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, "x") as number;
      const mouseY = gsap.getProperty(cursorRef.current, "y") as number;
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget ||
          elementUnderMouse.closest(targetSelector) === activeTarget);

      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as HTMLElement;
      const allTargets: HTMLElement[] = [];
      let current: HTMLElement | null = directTarget;

      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }

      const target = allTargets[0] || null;

      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      const corners = Array.from(cornersRef.current);

      corners.forEach((corner) => {
        gsap.killTweensOf(corner);
      });

      gsap.killTweensOf(cursorRef.current, "rotation");

      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current!.getBoundingClientRect();
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        const baseTlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };

        const baseTrOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };

        const baseBrOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        const baseBlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        let tlOffset = { ...baseTlOffset };
        let trOffset = { ...baseTrOffset };
        let brOffset = { ...baseBrOffset };
        let blOffset = { ...baseBlOffset };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset = {
            x: baseTlOffset.x + mouseOffsetX,
            y: baseTlOffset.y + mouseOffsetY,
          };
          trOffset = {
            x: baseTrOffset.x + mouseOffsetX,
            y: baseTrOffset.y + mouseOffsetY,
          };
          brOffset = {
            x: baseBrOffset.x + mouseOffsetX,
            y: baseBrOffset.y + mouseOffsetY,
          };
          blOffset = {
            x: baseBlOffset.x + mouseOffsetX,
            y: baseBlOffset.y + mouseOffsetY,
          };
        }

        const tl = gsap.timeline();

        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;

      const targetMove = (ev: MouseEvent) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);

          gsap.killTweensOf(corners);

          const { cornerSize } = constants;

          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();

          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            ) as number;
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();

            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, {
                rotation: "+=360",
                duration: spinDuration,
                ease: "none",
              });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }

          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [
    mounted,
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    hideDefaultCursor,
    disableCursor,
  ]);

  useEffect(() => {
    if (!mounted || disableCursor || !cursorRef.current || !spinTl.current)
      return;

    if (spinTl.current.isActive()) {
      spinTl.current.kill();

      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
        rotation: "+=360",
        duration: spinDuration,
        ease: "none",
      });
    }
  }, [mounted, spinDuration, disableCursor]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted || disableCursor) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ transform: "translate(-50%, -50%)", isolation: "isolate" }}
    >
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-cyan-400 rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(34, 211, 238, 0.8)",
        }}
      />

      <div
        className="target-cursor-corner corner-tl absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-cyan-400"
        style={{
          transform: "translate(-150%, -150%)",
          borderRight: "none",
          borderBottom: "none",
          willChange: "transform",
          filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
        }}
      />

      <div
        className="target-cursor-corner corner-tr absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-cyan-400"
        style={{
          transform: "translate(50%, -150%)",
          borderLeft: "none",
          borderBottom: "none",
          willChange: "transform",
          filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
        }}
      />

      <div
        className="target-cursor-corner corner-br absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-cyan-400"
        style={{
          transform: "translate(50%, 50%)",
          borderLeft: "none",
          borderTop: "none",
          willChange: "transform",
          filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
        }}
      />

      <div
        className="target-cursor-corner corner-bl absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-cyan-400"
        style={{
          transform: "translate(-150%, 50%)",
          borderRight: "none",
          borderTop: "none",
          willChange: "transform",
          filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
        }}
      />
    </div>
  );
}
