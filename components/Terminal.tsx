"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
  commands: Record<string, { output: string; hint?: string }>;
  onCommandSuccess?: (cmd: string) => void;
  prompt?: string;
  initialMessages?: string[];
}

interface HistoryEntry {
  id: number;
  command: string;
  output: string;
  isError: boolean;
}

export default function Terminal({
  commands,
  onCommandSuccess,
  prompt = "$ ",
  initialMessages = [],
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setPastCommands((prev) => [...prev, trimmed]);
      setCommandIndex(-1);

      const match = commands[trimmed];
      if (match) {
        const entry: HistoryEntry = {
          id: idCounter.current++,
          command: trimmed,
          output: match.output,
          isError: false,
        };
        setHistory((prev) => [...prev, entry]);
        onCommandSuccess?.(trimmed);
      } else if (trimmed === "clear") {
        setHistory([]);
      } else if (trimmed === "help") {
        const entry: HistoryEntry = {
          id: idCounter.current++,
          command: trimmed,
          output: `Available commands: ${Object.keys(commands).join(", ")}`,
          isError: false,
        };
        setHistory((prev) => [...prev, entry]);
      } else {
        const validCmds = Object.keys(commands);
        const entry: HistoryEntry = {
          id: idCounter.current++,
          command: trimmed,
          output: `Command not recognized. Try: ${validCmds.join(", ")}`,
          isError: true,
        };
        setHistory((prev) => [...prev, entry]);
      }

      setInput("");
    },
    [commands, onCommandSuccess]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const newIndex = commandIndex === -1 ? pastCommands.length - 1 : Math.max(0, commandIndex - 1);
        setCommandIndex(newIndex);
        setInput(pastCommands[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex !== -1) {
        const newIndex = commandIndex + 1;
        if (newIndex >= pastCommands.length) {
          setCommandIndex(-1);
          setInput("");
        } else {
          setCommandIndex(newIndex);
          setInput(pastCommands[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl"
      onClick={focusInput}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 bg-[#181825] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#f38ba8]" />
        <div className="h-3 w-3 rounded-full bg-[#f9e2af]" />
        <div className="h-3 w-3 rounded-full bg-[#a6e3a1]" />
        <span className="ml-3 text-xs text-white/40 font-mono select-none">terminal</span>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="h-[350px] overflow-y-auto bg-[#1e1e2e] px-4 py-3 font-mono text-sm leading-relaxed"
      >
        {/* Initial Messages */}
        {initialMessages.map((msg, i) => (
          <div key={`init-${i}`} className="text-gray-400 mb-1 whitespace-pre-wrap">
            {msg}
          </div>
        ))}

        {/* Command History */}
        <AnimatePresence mode="popLayout">
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-2"
            >
              {/* Command line */}
              <div className="flex">
                <span className="text-[#a6e3a1] select-none">{prompt}</span>
                <span className="text-white">{entry.command}</span>
              </div>
              {/* Output */}
              {entry.output && (
                <div
                  className={`whitespace-pre-wrap pl-0 mt-0.5 ${
                    entry.isError ? "text-[#f38ba8]" : "text-gray-400"
                  }`}
                >
                  {entry.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-[#a6e3a1] select-none">{prompt}</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white outline-none caret-transparent font-mono text-sm"
              spellCheck={false}
            />
            {/* Blinking cursor */}
            <span
              className="pointer-events-none absolute top-0 left-0 text-white font-mono text-sm"
              aria-hidden
            >
              <span className="invisible">{input}</span>
              <motion.span
                className="inline-block w-[8px] h-[1.1em] bg-[#a6e3a1] align-middle ml-px"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" as const, ease: "linear" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
