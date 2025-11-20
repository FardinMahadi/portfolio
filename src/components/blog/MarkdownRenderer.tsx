"use client";

import type { Components } from "react-markdown";

import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components: Partial<Components> = {
    // Headings
    h1: ({ ...props }) => (
      <h1
        className="text-3xl font-bold text-slate-100 mt-8 mb-4 font-mono"
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <h2
        className="text-2xl font-bold text-slate-100 mt-6 mb-3 font-mono"
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <h3
        className="text-xl font-semibold text-slate-100 mt-5 mb-2"
        {...props}
      />
    ),
    h4: ({ ...props }) => (
      <h4
        className="text-lg font-semibold text-slate-100 mt-4 mb-2"
        {...props}
      />
    ),
    // Paragraphs
    p: ({ ...props }) => (
      <p className="text-slate-300 mb-4 leading-relaxed" {...props} />
    ),
    // Lists
    ul: ({ ...props }) => (
      <ul className="list-none space-y-2 my-4" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol
        className="list-decimal list-inside space-y-2 my-4 text-slate-300"
        {...props}
      />
    ),
    li: ({ ...props }) => (
      <li className="flex items-start gap-3 text-slate-300" {...props}>
        <span className="text-theme-primary mt-1.5 shrink-0" aria-hidden="true">
          ▹
        </span>
        <span className="leading-relaxed flex-1">{props.children}</span>
      </li>
    ),
    // Code blocks
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    } & React.HTMLAttributes<HTMLElement>) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return !inline && language ? (
        <div className="my-6">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              background: "#0f172a",
              border: "1px solid rgba(51, 65, 85, 0.5)",
            }}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-slate-900/50 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700/50"
          {...props}
        >
          {children}
        </code>
      );
    },
    // Links
    a: ({ ...props }) => (
      <a
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    // Strong/Bold
    strong: ({ ...props }) => (
      <strong className="text-slate-100 font-semibold" {...props} />
    ),
    // Emphasis/Italic
    em: ({ ...props }) => <em className="text-slate-200 italic" {...props} />,
    // Blockquotes
    blockquote: ({ ...props }) => (
      <blockquote
        className="border-l-4 border-blue-500/50 pl-4 my-4 italic text-slate-300 bg-slate-900/30 py-2 rounded-r"
        {...props}
      />
    ),
    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="border-slate-700/50 my-8" {...props} />
    ),
    // Tables
    table: ({ ...props }) => (
      <div className="overflow-x-auto my-4">
        <table
          className="min-w-full border-collapse border border-slate-700/50"
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-slate-900/50" {...props} />,
    tbody: ({ ...props }) => <tbody {...props} />,
    tr: ({ ...props }) => (
      <tr className="border-b border-slate-700/50" {...props} />
    ),
    th: ({ ...props }) => (
      <th
        className="px-4 py-2 text-left text-slate-200 font-semibold border border-slate-700/50"
        {...props}
      />
    ),
    td: ({ ...props }) => (
      <td
        className="px-4 py-2 text-slate-300 border border-slate-700/50"
        {...props}
      />
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
