"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface DockerfileAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

interface CodeLine {
  text: string;
  keyword?: string;
  args?: string;
}

const codeSteps: CodeLine[][] = [
  [{ text: "FROM node:18-alpine", keyword: "FROM", args: " node:18-alpine" }],
  [
    { text: "WORKDIR /app", keyword: "WORKDIR", args: " /app" },
    { text: 'COPY package*.json ./', keyword: "COPY", args: " package*.json ./" },
    { text: "RUN npm install", keyword: "RUN", args: " npm install" },
  ],
  [{ text: "COPY . .", keyword: "COPY", args: " . ." }],
  [
    { text: "EXPOSE 3000", keyword: "EXPOSE", args: " 3000" },
    { text: 'CMD ["node", "server.js"]', keyword: "CMD", args: ' ["node", "server.js"]' },
  ],
];

function TypingText({
  text,
  keyword,
  args,
  delay,
  y,
}: {
  text: string;
  keyword?: string;
  args?: string;
  delay: number;
  y: number;
}) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  const displayText = text.slice(0, visibleChars);
  const keywordEnd = keyword ? keyword.length : 0;

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      {/* Keyword part */}
      <text x={25} y={y} fontFamily="monospace" fontSize={11}>
        <tspan fill="#569cd6">{displayText.slice(0, Math.min(visibleChars, keywordEnd))}</tspan>
        <tspan fill="#ce9178">{visibleChars > keywordEnd ? displayText.slice(keywordEnd) : ""}</tspan>
      </text>
      {/* Cursor */}
      {visibleChars < text.length && (
        <motion.rect
          x={25 + visibleChars * 6.6}
          y={y - 10}
          width={6}
          height={13}
          fill="#569cd6"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}

function LayerBox({
  y,
  width,
  height,
  color,
  label,
  delay,
}: {
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ ...springTransition, delay }}
      style={{ originY: "100%" }}
    >
      <motion.rect x={440} y={y} width={width} height={height} rx={6} fill={color} />
      <motion.text
        x={440 + width / 2}
        y={y + height / 2 + 4}
        textAnchor="middle"
        fill="white"
        fontSize={11}
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

export default function DockerfileAnimation({ step = 0 }: DockerfileAnimationProps) {
  const visibleLines: { line: CodeLine; stepIndex: number; lineIndex: number }[] = [];
  for (let s = 0; s <= step && s < codeSteps.length; s++) {
    codeSteps[s].forEach((line, li) => {
      visibleLines.push({ line, stepIndex: s, lineIndex: li });
    });
  }

  // Layer definitions for right side
  const rightLayers = [
    { label: "Base: node:18-alpine", color: "#1e3a5f", forStep: 0, y: 400, h: 45 },
    { label: "WORKDIR /app", color: "#1e4d7a", forStep: 1, y: 350, h: 30 },
    { label: "package*.json", color: "#2496ED", forStep: 1, y: 315, h: 30 },
    { label: "node_modules", color: "#3ba4f0", forStep: 1, y: 280, h: 30 },
    { label: "Source Files", color: "#5bb8f5", forStep: 2, y: 245, h: 30 },
    { label: "Expose + CMD", color: "#7dcbfa", forStep: 3, y: 210, h: 30 },
  ];

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Dockerfile animation">
      {/* Background */}
      <rect width="800" height="500" fill="#0f172a" rx={12} />

      {/* Title */}
      <motion.text
        x={400}
        y={35}
        textAnchor="middle"
        fill="white"
        fontSize={20}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Dockerfile: Line by Line
      </motion.text>

      {/* Left side: Code editor */}
      <motion.rect
        x={10}
        y={50}
        width={400}
        height={430}
        rx={8}
        fill="#1e1e2e"
        stroke="#313244"
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Editor title bar */}
      <rect x={10} y={50} width={400} height={28} rx={8} fill="#313244" />
      <circle cx={28} cy={64} r={5} fill="#f38ba8" />
      <circle cx={44} cy={64} r={5} fill="#fab387" />
      <circle cx={60} cy={64} r={5} fill="#a6e3a1" />
      <text x={200} y={68} textAnchor="middle" fill="#6c7086" fontSize={10} fontFamily="monospace">
        Dockerfile
      </text>

      {/* Line numbers and code */}
      {visibleLines.map((item, idx) => {
        const yPos = 100 + idx * 22;
        const isCurrentStep = item.stepIndex === step;
        const lineDelay = isCurrentStep ? item.lineIndex * 0.4 : 0;

        return (
          <g key={`line-${idx}`}>
            {/* Line number */}
            <motion.text
              x={18}
              y={yPos}
              fill="#6c7086"
              fontSize={10}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: lineDelay }}
            >
              {idx + 1}
            </motion.text>

            {/* Highlight bar for current step */}
            {isCurrentStep && (
              <motion.rect
                x={14}
                y={yPos - 12}
                width={390}
                height={18}
                fill="#2496ED"
                fillOpacity={0.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: lineDelay }}
              />
            )}

            {/* Code text with typing for current step */}
            {isCurrentStep ? (
              <TypingText
                text={item.line.text}
                keyword={item.line.keyword}
                args={item.line.args}
                delay={lineDelay}
                y={yPos}
              />
            ) : (
              <text x={25} y={yPos} fontFamily="monospace" fontSize={11}>
                <tspan fill="#569cd6">{item.line.keyword}</tspan>
                <tspan fill="#ce9178">{item.line.args}</tspan>
              </text>
            )}
          </g>
        );
      })}

      {/* Right side: Layer visualization */}
      <motion.text
        x={620}
        y={70}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={14}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Image Layers
      </motion.text>

      {/* Arrow from left to right */}
      <motion.path
        d="M 415 250 L 435 250"
        stroke="#2496ED"
        strokeWidth={2}
        fill="none"
        markerEnd="url(#arrowhead)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
      />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#2496ED" />
        </marker>
      </defs>

      {/* Render layers for current and previous steps */}
      <AnimatePresence>
        {rightLayers
          .filter((l) => l.forStep <= step)
          .map((layer, i) => (
            <LayerBox
              key={`layer-${i}`}
              y={layer.y}
              width={320}
              height={layer.h}
              color={layer.color}
              label={layer.label}
              delay={layer.forStep === step ? 0.3 : 0}
            />
          ))}
      </AnimatePresence>

      {/* Step 2: File icons animating in */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g>
            {["index.js", "utils.js", "routes/"].map((name, i) => (
              <motion.g
                key={`file-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <motion.rect
                  x={455 + i * 80}
                  y={248}
                  width={65}
                  height={20}
                  rx={3}
                  fill="#334155"
                />
                <motion.text
                  x={455 + i * 80 + 32}
                  y={262}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={9}
                  fontFamily="monospace"
                >
                  {name}
                </motion.text>
              </motion.g>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Port indicator and play button */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Port circle */}
            <motion.circle
              cx={480}
              cy={195}
              r={16}
              fill="none"
              stroke="#22c55e"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={springTransition}
            />
            <motion.text
              x={480}
              y={199}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={9}
              fontWeight="bold"
              fontFamily="monospace"
            >
              3000
            </motion.text>

            {/* Play button */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...springTransition, delay: 0.8 }}
            >
              <motion.circle cx={720} cy={195} r={20} fill="#22c55e" fillOpacity={0.2} />
              <motion.path
                d="M 712 183 L 732 195 L 712 207 Z"
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.g>

            {/* Ready label */}
            <motion.text
              x={620}
              y={470}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={13}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ delay: 1.2, duration: 1.5 }}
            >
              Image Ready to Run!
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
