import { Heart, Code2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0a0e1a] border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Code2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span className="font-mono">
              Built with{" "}
              <Heart
                className="w-4 h-4 inline text-red-500 fill-current mx-1"
                aria-label="love"
              />{" "}
              using Next.js, ShadCN, Framer-Motion, TypeScript & TailwindCSS
            </span>
          </div>

          <div className="text-slate-500 text-sm font-mono">
            © <time dateTime={currentYear.toString()}>{currentYear}</time>{" "}
            FardinMahadi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
