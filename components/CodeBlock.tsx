"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

type TokenType = "keyword" | "comment" | "string" | "text";

interface Token {
  type: TokenType;
  value: string;
}

const DOCKERFILE_KEYWORDS = [
  "FROM",
  "RUN",
  "COPY",
  "WORKDIR",
  "EXPOSE",
  "CMD",
  "ENTRYPOINT",
  "ENV",
  "ARG",
  "ADD",
  "LABEL",
  "MAINTAINER",
  "VOLUME",
  "USER",
  "HEALTHCHECK",
  "ONBUILD",
  "STOPSIGNAL",
  "SHELL",
];

function tokenizeLine(line: string, language?: string): Token[] {
  const isDockerfile =
    language === "dockerfile" || language === "docker" || language === "Dockerfile";
  const isShell =
    language === "shell" || language === "bash" || language === "sh" || language === "zsh";

  // Comment line
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#")) {
    const leadingSpace = line.slice(0, line.length - trimmed.length);
    return [
      { type: "text", value: leadingSpace },
      { type: "comment", value: trimmed },
    ];
  }

  if (isDockerfile || isShell) {
    const tokens: Token[] = [];
    let remaining = line;

    // Try to match a leading Dockerfile keyword
    if (isDockerfile) {
      for (const kw of DOCKERFILE_KEYWORDS) {
        const regex = new RegExp(`^(\\s*)(${kw})(\\s|$)`);
        const match = remaining.match(regex);
        if (match) {
          if (match[1]) tokens.push({ type: "text", value: match[1] });
          tokens.push({ type: "keyword", value: kw });
          remaining = remaining.slice(match[1].length + kw.length);
          break;
        }
      }
    }

    // Process the rest for strings
    let i = 0;
    let buffer = "";
    while (i < remaining.length) {
      const ch = remaining[i];
      if (ch === '"' || ch === "'") {
        if (buffer) {
          tokens.push({ type: "text", value: buffer });
          buffer = "";
        }
        const quote = ch;
        let str = quote;
        i++;
        while (i < remaining.length && remaining[i] !== quote) {
          str += remaining[i];
          i++;
        }
        if (i < remaining.length) {
          str += remaining[i];
          i++;
        }
        tokens.push({ type: "string", value: str });
      } else {
        buffer += ch;
        i++;
      }
    }
    if (buffer) tokens.push({ type: "text", value: buffer });

    return tokens.length > 0 ? tokens : [{ type: "text", value: line }];
  }

  // Default: no highlighting
  return [{ type: "text", value: line }];
}

const tokenColorMap: Record<TokenType, string> = {
  keyword: "text-[#2496ED]",
  comment: "text-gray-500",
  string: "text-[#a6e3a1]",
  text: "text-gray-200",
};

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => code.split("\n"), [code]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#181825] px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xs text-gray-400 font-mono">{filename}</span>
            </div>
          )}
          {language && !filename && (
            <span className="text-xs text-gray-500 font-mono uppercase">{language}</span>
          )}
        </div>

        {/* Copy Button */}
        <motion.button
          onClick={handleCopy}
          className="relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-gray-200"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 text-[#a6e3a1]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto bg-[#1e1e2e] p-4">
        <table className="w-full border-collapse font-mono text-sm leading-relaxed">
          <tbody>
            {lines.map((line, i) => {
              const tokens = tokenizeLine(line, language);
              return (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="select-none pr-4 text-right align-top text-gray-600 w-[1%] whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="whitespace-pre">
                    {tokens.map((token, j) => (
                      <span key={j} className={tokenColorMap[token.type]}>
                        {token.value}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
