"use client";

import { Button } from "../../ui/button";
import { MagneticButton } from "../../effects/MagneticButton";

export function HeroActions() {
  return (
    <div className="flex gap-4 justify-center md:justify-start flex-wrap">
      <MagneticButton magneticStrength={0.2}>
        <Button
          size="lg"
          className="text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 min-h-[44px]"
          style={{
            background:
              "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px -5px var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to right, var(--color-primary), var(--color-secondary))";
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to right, var(--color-primary), var(--color-secondary))";
            e.currentTarget.style.filter = "brightness(1)";
          }}
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          aria-label="Navigate to projects section"
        >
          View Projects
        </Button>
      </MagneticButton>
      <MagneticButton magneticStrength={0.2}>
        <Button
          size="lg"
          variant="outline"
          className="min-h-[44px] border-theme-border/70 text-theme-text/85 transition-all duration-300 hover:border-theme-accent hover:bg-theme-surface/60 hover:text-theme-accent"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          aria-label="Navigate to contact section"
        >
          Get In Touch
        </Button>
      </MagneticButton>
    </div>
  );
}
