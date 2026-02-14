"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface AnimationStageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  controls?: boolean;
}

export default function AnimationStage({
  children,
  title,
  description,
  controls = false,
}: AnimationStageProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setResetKey((prev) => prev + 1);
    setIsPlaying(true);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#2496ED]/30 bg-gradient-to-b from-[#2496ED]/[0.03] to-transparent p-[1px]">
      <div className="rounded-[11px] bg-[#1e1e2e] overflow-hidden">
        {/* Header */}
        {(title || description || controls) && (
          <div className="flex items-start justify-between border-b border-white/5 px-6 py-4">
            <div className="flex-1">
              {title && (
                <h3 className="text-base font-semibold text-white">{title}</h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-400">{description}</p>
              )}
            </div>

            {/* Play/Pause/Reset Controls */}
            {controls && (
              <div className="ml-4 flex items-center gap-2">
                <motion.button
                  onClick={handlePlayPause}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleReset}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Reset"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* Stage Area */}
        <div
          key={resetKey}
          className="flex min-h-[400px] items-center justify-center p-6"
          data-playing={isPlaying}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
