"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  colorPalettes,
  ColorPalette,
  getPaletteCSSVariables,
} from "@/lib/colorPalettes";

interface ColorPaletteContextType {
  currentPalette: ColorPalette;
  setPalette: (paletteKey: string) => void;
  availablePalettes: Record<string, ColorPalette>;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined
);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [currentPaletteKey, setCurrentPaletteKey] = useState<string>("default");

  useEffect(() => {
    // Load saved palette from localStorage
    const savedPalette = localStorage.getItem("colorPalette");
    if (savedPalette && colorPalettes[savedPalette]) {
      setCurrentPaletteKey(savedPalette);
    } else {
      // Apply default palette on first load
      const palette = colorPalettes.default;
      const cssVars = getPaletteCSSVariables(palette);
      const root = document.documentElement;

      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, []);

  const setPalette = (paletteKey: string) => {
    if (colorPalettes[paletteKey]) {
      setCurrentPaletteKey(paletteKey);
      localStorage.setItem("colorPalette", paletteKey);

      // Apply CSS variables to document root
      const palette = colorPalettes[paletteKey];
      const cssVars = getPaletteCSSVariables(palette);
      const root = document.documentElement;

      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  };

  useEffect(() => {
    // Apply palette when currentPaletteKey changes
    if (currentPaletteKey) {
      const palette = colorPalettes[currentPaletteKey];
      const cssVars = getPaletteCSSVariables(palette);
      const root = document.documentElement;

      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [currentPaletteKey]);

  const value = {
    currentPalette: colorPalettes[currentPaletteKey],
    setPalette,
    availablePalettes: colorPalettes,
  };

  return (
    <ColorPaletteContext.Provider value={value}>
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error(
      "useColorPalette must be used within a ColorPaletteProvider"
    );
  }
  return context;
}
