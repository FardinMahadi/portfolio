"use client";

import { useEffect } from "react";
import { useColorPalette } from "@/contexts/ColorPaletteContext";

/**
 * Component that dynamically updates the favicon based on the current color palette theme.
 * Creates an SVG favicon that matches the theme's primary color.
 */
export function FaviconUpdater() {
  const { currentPalette } = useColorPalette();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper function to adjust color brightness
    const adjustBrightness = (color: string, percent: number): string => {
      // Convert hex to RGB
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Adjust brightness (positive percent = lighter, negative = darker)
      const factor = 1 + percent / 100;
      const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
      const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
      const newB = Math.max(0, Math.min(255, Math.round(b * factor)));

      // Convert back to hex
      return `#${[newR, newG, newB]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")}`;
    };

    // Generate SVG favicon with theme color and high contrast
    const generateFaviconSVG = (primaryColor: string): string => {
      // Create a darker gradient for high contrast background
      const darkerColor = adjustBrightness(primaryColor, -30);
      const darkestColor = adjustBrightness(primaryColor, -50);
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${darkerColor};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${darkestColor};stop-opacity:1" />
            </linearGradient>
            <filter id="textShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
              <feOffset dx="0" dy="0" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.8"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="32" height="32" rx="6" fill="url(#grad)"/>
          <text x="16" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central" stroke="#000000" stroke-width="0.3" stroke-opacity="0.5" filter="url(#textShadow)">&lt;/&gt;</text>
        </svg>
      `.trim();
    };

    // Store the previous blob URL for cleanup
    let previousBlobUrl: string | null = null;

    // Remove existing dynamic favicon links and revoke their blob URLs
    const existingLinks = document.querySelectorAll(
      'link[rel*="icon"][data-dynamic-favicon]'
    );
    existingLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("blob:")) {
        URL.revokeObjectURL(href);
      }
      link.remove();
    });

    // Create SVG blob URL
    const svgString = generateFaviconSVG(currentPalette.primary);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    previousBlobUrl = url;

    // Create and add favicon link
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = url;
    link.setAttribute("data-dynamic-favicon", "true");
    document.head.appendChild(link);

    // Also update theme-color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute("content", currentPalette.primary);

    // Cleanup function
    return () => {
      if (previousBlobUrl) {
        URL.revokeObjectURL(previousBlobUrl);
      }
    };
  }, [currentPalette.primary]);

  // This component doesn't render anything
  return null;
}
