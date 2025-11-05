import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal-style error display */}
          <div className="bg-[#0f172a] rounded-lg border border-slate-700 p-8 mb-8">
            <div className="bg-[#1e293b] rounded-t-lg border border-slate-700 p-3 flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 text-slate-400 text-sm font-mono">
                ~/error/404.ts
              </div>
            </div>

            <div className="space-y-4 text-left font-mono">
              <div className="flex gap-4">
                <div className="text-slate-600 select-none text-sm">1</div>
                <div className="flex-1">
                  <span className="text-red-400">console</span>
                  <span className="text-slate-400">.</span>
                  <span className="text-yellow-400">error</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-green-400">
                    &apos;404: Page Not Found&apos;
                  </span>
                  <span className="text-slate-400">);</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-slate-600 select-none text-sm">2</div>
                <div className="flex-1">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-cyan-400">error</span>{" "}
                  <span className="text-pink-400">=</span>{" "}
                  <span className="text-green-400">
                    &apos;Page does not exist&apos;
                  </span>
                  <span className="text-slate-400">;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-mono font-bold text-cyan-400 mb-4">
              404
            </h1>
            <h2 className="text-2xl font-mono text-slate-300 mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50 min-h-[44px]"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-200 hover:bg-slate-800/50 hover:border-violet-500 hover:text-violet-400 min-h-[44px]"
            >
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </motion.div>

          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 font-mono text-sm max-w-md mx-auto"
          >
            <div className="flex gap-2">
              <span className="text-green-400">$</span>
              <span className="text-slate-400">cd /home</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-green-400">$</span>
              <span className="text-slate-400 animate-pulse">_</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
