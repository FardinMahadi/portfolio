export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export const colorPalettes: Record<string, ColorPalette> = {
  default: {
    name: "Cyan Blue",
    primary: "#06b6d4", // cyan-500
    secondary: "#3b82f6", // blue-500
    accent: "#8b5cf6", // violet-500
    background: "#0a0e1a",
    surface: "#111827",
    text: "#e4e7f0",
    border: "#1f2937",
  },
  purple: {
    name: "Purple Dream",
    primary: "#a855f7", // purple-500
    secondary: "#c084fc", // purple-400
    accent: "#e879f9", // fuchsia-400
    background: "#0a0a0f",
    surface: "#1a1625",
    text: "#f3e8ff",
    border: "#2d1b3d",
  },
  green: {
    name: "Emerald Forest",
    primary: "#10b981", // emerald-500
    secondary: "#34d399", // emerald-400
    accent: "#22d3ee", // cyan-400
    background: "#0a0f0a",
    surface: "#111f11",
    text: "#e0f2e9",
    border: "#1f3a1f",
  },
  orange: {
    name: "Sunset Orange",
    primary: "#f97316", // orange-500
    secondary: "#fb923c", // orange-400
    accent: "#fbbf24", // amber-400
    background: "#0f0a0a",
    surface: "#1f1611",
    text: "#fff7ed",
    border: "#3a2a1f",
  },
  red: {
    name: "Crimson Red",
    primary: "#ef4444", // red-500
    secondary: "#f87171", // red-400
    accent: "#ec4899", // pink-500
    background: "#0f0a0a",
    surface: "#1f1111",
    text: "#fef2f2",
    border: "#3a1f1f",
  },
  blue: {
    name: "Ocean Blue",
    primary: "#3b82f6", // blue-500
    secondary: "#60a5fa", // blue-400
    accent: "#06b6d4", // cyan-500
    background: "#0a0e1a",
    surface: "#111827",
    text: "#e0e7ff",
    border: "#1e3a5f",
  },
};

export const getPaletteCSSVariables = (palette: ColorPalette): Record<string, string> => {
  return {
    "--color-primary": palette.primary,
    "--color-secondary": palette.secondary,
    "--color-accent": palette.accent,
    "--color-background": palette.background,
    "--color-surface": palette.surface,
    "--color-text": palette.text,
    "--color-border": palette.border,
  };
};

