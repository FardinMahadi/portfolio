"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { useColorPalette } from "@/contexts/ColorPaletteContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ColorPaletteSwitcher() {
  const { currentPalette, setPalette, availablePalettes } = useColorPalette();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className="border-slate-700 text-slate-300 transition-all duration-300 min-h-[44px] min-w-[44px] p-2 hover:text-theme-primary hover:border-theme-primary/50"
        aria-label="Change color palette"
      >
        <Palette className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Palette Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg shadow-xl min-w-[200px] z-50 backdrop-blur-sm"
            >
              <div className="p-2 space-y-1 max-h-[50vh] overflow-y-auto">
                {Object.entries(availablePalettes).map(([key, palette]) => {
                  const isSelected = currentPalette.name === palette.name;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setPalette(key);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-3 ${
                        isSelected
                          ? "bg-slate-700/80 text-white font-medium border border-slate-600"
                          : "text-slate-200 hover:bg-slate-700/50 hover:text-white"
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: "rgba(51, 65, 85, 0.8)",
                              borderColor: "var(--color-primary)",
                              boxShadow: `0 0 0 1px var(--color-primary), inset 0 0 20px -10px var(--color-primary)`,
                            }
                          : {}
                      }
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          isSelected ? "border-white/50" : "border-slate-500"
                        }`}
                        style={{
                          backgroundColor: palette.primary,
                          boxShadow: isSelected
                            ? `0 0 8px ${palette.primary}`
                            : undefined,
                        }}
                      />
                      <span className="flex-1">{palette.name}</span>
                      {isSelected && (
                        <span
                          className="ml-auto text-base font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
