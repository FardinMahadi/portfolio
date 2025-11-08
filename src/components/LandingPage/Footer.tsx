import { Heart, Code2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-theme-border/70 bg-(--color-background) py-8 px-4 text-theme-text sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-theme-text/70">
            <Code2 className="h-4 w-4 text-theme-primary" aria-hidden="true" />
            <span className="font-mono text-theme-text/75">
              Built with{" "}
              <Heart
                className="mx-1 inline h-4 w-4 fill-current text-theme-accent"
                aria-label="love"
              />{" "}
              using Next.js, ShadCN, Framer-Motion, TypeScript & TailwindCSS
            </span>
          </div>

          <div className="text-sm font-mono text-theme-text/60">
            © <time dateTime={currentYear.toString()}>{currentYear}</time>{" "}
            FardinMahadi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
