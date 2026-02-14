"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MultiStageAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

function SizeLabel({
  x,
  y,
  size,
  color,
  delay = 0,
}: {
  x: number;
  y: number;
  size: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x - 30}
        y={y - 12}
        width={60}
        height={22}
        rx={11}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.5}
      />
      <motion.text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={color}
        fontSize={12}
        fontWeight="bold"
        fontFamily="monospace"
      >
        {size}
      </motion.text>
    </motion.g>
  );
}

function StackItem({
  x,
  y,
  width,
  label,
  color,
  textColor = "white",
  delay = 0,
  strikethrough = false,
  highlight = false,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  color: string;
  textColor?: string;
  delay?: number;
  strikethrough?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: strikethrough ? 0.4 : 1, x: 0 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={26}
        rx={4}
        fill={color}
        fillOpacity={highlight ? 0.8 : 0.5}
        stroke={highlight ? "#22c55e" : "none"}
        strokeWidth={highlight ? 2 : 0}
      />
      <motion.text
        x={x + width / 2}
        y={y + 17}
        textAnchor="middle"
        fill={textColor}
        fontSize={10}
        fontFamily="system-ui, sans-serif"
        textDecoration={strikethrough ? "line-through" : "none"}
      >
        {label}
      </motion.text>
      {strikethrough && (
        <motion.line
          x1={x + 5}
          y1={y + 13}
          x2={x + width - 5}
          y2={y + 13}
          stroke="#ef4444"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        />
      )}
    </motion.g>
  );
}

export default function MultiStageAnimation({ step = 0 }: MultiStageAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker multi-stage builds animation">
      <defs>
        <filter id="stageGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2496ED" floodOpacity="0.4" />
        </filter>
        <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#2496ED" />
        </marker>
        <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#f97316" />
        </marker>
        <marker id="arrowGreen2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill="#22c55e" />
        </marker>
      </defs>

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
        Multi-Stage Builds
      </motion.text>

      {/* Step 0: Single oversized image */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Large bloated container */}
            <motion.rect
              x={200}
              y={55}
              width={400}
              height={370}
              rx={10}
              fill="#1e293b"
              stroke="#ef4444"
              strokeWidth={2.5}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={springTransition}
            />
            <motion.text
              x={400}
              y={82}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={14}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Development Image
            </motion.text>

            {/* Warning triangles */}
            <motion.text
              x={220}
              y={82}
              fill="#ef4444"
              fontSize={16}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠
            </motion.text>
            <motion.text
              x={570}
              y={82}
              fill="#ef4444"
              fontSize={16}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ⚠
            </motion.text>

            {/* Stacked items inside */}
            {[
              { label: "Node.js Runtime", color: "#3b8132" },
              { label: "TypeScript Compiler", color: "#3178c6" },
              { label: "Dev Dependencies (testing, linting)", color: "#7c3aed" },
              { label: "Build Tools (webpack, babel)", color: "#f97316" },
              { label: "Source Code (.ts files)", color: "#2496ED" },
              { label: "node_modules (all)", color: "#dc2626" },
              { label: "Test Files & Fixtures", color: "#7c3aed" },
              { label: ".git history", color: "#64748b" },
            ].map((item, i) => (
              <StackItem
                key={i}
                x={230}
                y={95 + i * 34}
                width={340}
                label={item.label}
                color={item.color}
                delay={0.3 + i * 0.08}
              />
            ))}

            {/* Size label - 1.2 GB in red */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 1 }}
            >
              <motion.rect
                x={340}
                y={375}
                width={120}
                height={35}
                rx={17}
                fill="#ef4444"
                fillOpacity={0.2}
                stroke="#ef4444"
                strokeWidth={2}
              />
              <motion.text
                x={400}
                y={398}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={18}
                fontWeight="bold"
                fontFamily="monospace"
              >
                1.2 GB
              </motion.text>
            </motion.g>

            {/* Label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <motion.rect x={250} y={440} width={300} height={36} rx={6} fill="#ef4444" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={463}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={15}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Too big for production!
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Two stages side by side */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Stage 1: Builder (left) */}
            <motion.g
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              <motion.rect
                x={40}
                y={55}
                width={310}
                height={310}
                rx={8}
                fill="#1e293b"
                stroke="#f97316"
                strokeWidth={2}
              />
              <motion.text
                x={195}
                y={78}
                textAnchor="middle"
                fill="#f97316"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Stage 1: Builder
              </motion.text>
              <motion.text
                x={195}
                y={95}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="monospace"
              >
                FROM node:18
              </motion.text>

              {[
                { label: "Node.js + npm", color: "#3b8132" },
                { label: "All Dependencies", color: "#7c3aed" },
                { label: "TypeScript Compiler", color: "#3178c6" },
                { label: "Source Code", color: "#2496ED" },
              ].map((item, i) => (
                <StackItem
                  key={i}
                  x={60}
                  y={108 + i * 32}
                  width={270}
                  label={item.label}
                  color={item.color}
                  delay={0.3 + i * 0.1}
                />
              ))}

              {/* Compile step indicator */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.text x={100} y={257} fill="#f97316" fontSize={10} fontFamily="monospace">
                  npm run build
                </motion.text>
              </motion.g>

              {/* Test checkmark */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <motion.text x={80} y={280} fill="#22c55e" fontSize={14}>✓</motion.text>
                <motion.text x={100} y={280} fill="#22c55e" fontSize={10} fontFamily="monospace">
                  Tests passed
                </motion.text>
              </motion.g>

              {/* Build output highlighted */}
              <StackItem
                x={60}
                y={295}
                width={270}
                label="Build Output (dist/)"
                color="#22c55e"
                highlight
                delay={1.2}
              />

              {/* Size */}
              <SizeLabel x={195} y={350} size="1.2 GB" color="#ef4444" delay={0.5} />
            </motion.g>

            {/* Arrow between stages */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.line
                x1={355}
                y1={210}
                x2={445}
                y2={210}
                stroke="#22c55e"
                strokeWidth={3}
                markerEnd="url(#arrowGreen2)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              />
              <motion.text
                x={400}
                y={200}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={9}
                fontWeight="bold"
                fontFamily="monospace"
              >
                COPY --from
              </motion.text>

              {/* Animated block traveling across */}
              <motion.rect
                width={40}
                height={16}
                rx={3}
                fill="#22c55e"
                fillOpacity={0.6}
                animate={{ x: [355, 440], y: [205, 205], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 2 }}
              />
            </motion.g>

            {/* Stage 2: Production (right) */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.5 }}
            >
              <motion.rect
                x={450}
                y={100}
                width={310}
                height={220}
                rx={8}
                fill="#1e293b"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={605}
                y={123}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Stage 2: Production
              </motion.text>
              <motion.text
                x={605}
                y={140}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="monospace"
              >
                FROM node:18-alpine
              </motion.text>

              {[
                { label: "Alpine Linux (slim)", color: "#2496ED" },
                { label: "Node.js Runtime Only", color: "#3b8132" },
                { label: "Production node_modules", color: "#0ea5e9" },
              ].map((item, i) => (
                <StackItem
                  key={i}
                  x={470}
                  y={150 + i * 32}
                  width={270}
                  label={item.label}
                  color={item.color}
                  delay={0.8 + i * 0.1}
                />
              ))}

              {/* Build output received */}
              <StackItem
                x={470}
                y={246}
                width={270}
                label="Build Output (dist/)"
                color="#22c55e"
                highlight
                delay={1.8}
              />

              {/* Size */}
              <SizeLabel x={605} y={300} size="85 MB" color="#22c55e" delay={1.5} />
            </motion.g>

            {/* Size comparison animation */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.text
                x={400}
                y={400}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={12}
                fontFamily="system-ui, sans-serif"
              >
                Size Reduction
              </motion.text>
              {/* Bar shrink animation */}
              <motion.rect x={200} y={410} width={400} height={8} rx={4} fill="#1e293b" />
              <motion.rect
                x={200}
                y={410}
                height={8}
                rx={4}
                fill="#ef4444"
                initial={{ width: 400 }}
                animate={{ width: [400, 400, 28] }}
                transition={{ duration: 1.5, delay: 2.2, times: [0, 0.3, 1] }}
              />
              <motion.rect
                x={200}
                y={410}
                width={28}
                height={8}
                rx={4}
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.7 }}
              />
              <motion.text
                x={400}
                y={440}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8 }}
              >
                1.2 GB → 85 MB (93% smaller!)
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Builder pattern detail */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Builder box (left) */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              <motion.rect
                x={30}
                y={55}
                width={290}
                height={330}
                rx={8}
                fill="#1e293b"
                stroke="#f97316"
                strokeWidth={2}
              />
              <motion.text
                x={175}
                y={78}
                textAnchor="middle"
                fill="#f97316"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Builder Stage
              </motion.text>

              {/* Labeled sections */}
              {[
                { label: "Dependencies Layer", color: "#7c3aed", y: 90 },
                { label: "Compile Layer (tsc)", color: "#3178c6", y: 130 },
                { label: "Test Layer (jest)", color: "#eab308", y: 170 },
              ].map((section, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <motion.rect
                    x={50}
                    y={section.y}
                    width={250}
                    height={32}
                    rx={4}
                    fill={section.color}
                    fillOpacity={0.3}
                  />
                  <motion.text
                    x={175}
                    y={section.y + 20}
                    textAnchor="middle"
                    fill={section.color}
                    fontSize={11}
                    fontFamily="system-ui, sans-serif"
                  >
                    {section.label}
                  </motion.text>
                </motion.g>
              ))}

              {/* Build output layer - highlighted */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.rect
                  x={50}
                  y={215}
                  width={250}
                  height={40}
                  rx={4}
                  fill="#22c55e"
                  fillOpacity={0.3}
                  stroke="#22c55e"
                  strokeWidth={2}
                  animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.text
                  x={175}
                  y={240}
                  textAnchor="middle"
                  fill="#22c55e"
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                >
                  Build Output (/app/dist)
                </motion.text>
              </motion.g>

              {/* Items NOT copied - shown below with strikethrough */}
              <motion.text
                x={175}
                y={280}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={10}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                NOT copied:
              </motion.text>
              {[
                "devDependencies",
                ".git history",
                "test files",
                "source .ts files",
              ].map((item, i) => (
                <StackItem
                  key={item}
                  x={60}
                  y={290 + i * 22}
                  width={230}
                  label={item}
                  color="#ef4444"
                  strikethrough
                  delay={0.9 + i * 0.1}
                />
              ))}
            </motion.g>

            {/* COPY --from arrow */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <motion.path
                d="M 320 235 C 380 235, 400 200, 460 200"
                stroke="#22c55e"
                strokeWidth={3}
                fill="none"
                markerEnd="url(#arrowGreen2)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              <motion.text
                x={390}
                y={200}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={8}
                fontWeight="bold"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                COPY --from=builder
              </motion.text>
              <motion.text
                x={390}
                y={212}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={8}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                /app/dist ./dist
              </motion.text>
            </motion.g>

            {/* Production box (right) - slim */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
            >
              <motion.rect
                x={465}
                y={80}
                width={300}
                height={230}
                rx={8}
                fill="#1e293b"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={615}
                y={103}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Production Image
              </motion.text>
              <motion.text
                x={615}
                y={118}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="monospace"
              >
                FROM node:18-alpine
              </motion.text>

              {[
                { label: "Alpine Base (5 MB)", color: "#2496ED" },
                { label: "Node.js Runtime", color: "#3b8132" },
                { label: "Production node_modules", color: "#0ea5e9" },
              ].map((item, i) => (
                <StackItem
                  key={i}
                  x={485}
                  y={128 + i * 32}
                  width={260}
                  label={item.label}
                  color={item.color}
                  delay={0.6 + i * 0.1}
                />
              ))}

              {/* dist folder - highlighted as received */}
              <StackItem
                x={485}
                y={224}
                width={260}
                label="dist/ (compiled JS)"
                color="#22c55e"
                highlight
                delay={1.8}
              />

              {/* Size */}
              <SizeLabel x={615} y={285} size="85 MB" color="#22c55e" delay={1.5} />
            </motion.g>

            {/* Label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <motion.rect x={200} y={420} width={400} height={36} rx={6} fill="#22c55e" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={443}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Only the build output is copied to production
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Security comparison */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Left: Without Multi-Stage */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              <motion.rect
                x={40}
                y={55}
                width={330}
                height={350}
                rx={8}
                fill="#1e293b"
                stroke="#ef4444"
                strokeWidth={2}
              />
              <motion.text
                x={205}
                y={80}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Without Multi-Stage
              </motion.text>

              {/* Skull / warning items with attack surface labels */}
              {[
                { label: "gcc / make (compiler)", icon: "⚠" },
                { label: "Dev tools & debuggers", icon: "⚠" },
                { label: "Test frameworks", icon: "⚠" },
                { label: "Linters & formatters", icon: "⚠" },
                { label: "Full OS packages", icon: "💀" },
                { label: "Build scripts & secrets", icon: "💀" },
              ].map((item, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <motion.rect
                    x={60}
                    y={95 + i * 34}
                    width={290}
                    height={28}
                    rx={4}
                    fill="#ef4444"
                    fillOpacity={0.15}
                  />
                  <motion.text
                    x={80}
                    y={114 + i * 34}
                    fill="#ef4444"
                    fontSize={14}
                  >
                    {item.icon}
                  </motion.text>
                  <motion.text
                    x={105}
                    y={114 + i * 34}
                    fill="#fca5a5"
                    fontSize={11}
                    fontFamily="system-ui, sans-serif"
                  >
                    {item.label}
                  </motion.text>
                </motion.g>
              ))}

              {/* Attack surface label */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <motion.rect x={80} y={305} width={230} height={24} rx={4} fill="#ef4444" fillOpacity={0.2} />
                <motion.text
                  x={195}
                  y={322}
                  textAnchor="middle"
                  fill="#ef4444"
                  fontSize={11}
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                >
                  Large Attack Surface
                </motion.text>
              </motion.g>

              {/* Scan results */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                <motion.rect x={60} y={340} width={290} height={50} rx={6} fill="#0f172a" stroke="#ef4444" strokeWidth={1} />
                <motion.text x={80} y={360} fill="#94a3b8" fontSize={10} fontFamily="system-ui, sans-serif">
                  Vulnerability Scan:
                </motion.text>
                <motion.text x={80} y={378} fill="#ef4444" fontSize={12} fontWeight="bold" fontFamily="monospace">
                  12 critical, 45 high
                </motion.text>
              </motion.g>
            </motion.g>

            {/* VS divider */}
            <motion.text
              x={400}
              y={230}
              textAnchor="middle"
              fill="#64748b"
              fontSize={18}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              VS
            </motion.text>

            {/* Right: With Multi-Stage */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <motion.rect
                x={430}
                y={55}
                width={330}
                height={350}
                rx={8}
                fill="#1e293b"
                stroke="#22c55e"
                strokeWidth={2}
              />
              <motion.text
                x={595}
                y={80}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                With Multi-Stage
              </motion.text>

              {/* Clean minimal items */}
              {[
                { label: "Alpine Linux (minimal)", color: "#2496ED" },
                { label: "Node.js Runtime Only", color: "#3b8132" },
                { label: "Compiled JS (dist/)", color: "#22c55e" },
                { label: "Production Dependencies", color: "#0ea5e9" },
              ].map((item, i) => (
                <StackItem
                  key={i}
                  x={450}
                  y={95 + i * 34}
                  width={290}
                  label={item.label}
                  color={item.color}
                  delay={0.5 + i * 0.1}
                />
              ))}

              {/* Shield icon */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 1 }}
              >
                <motion.path
                  d="M 595 250 L 575 260 L 575 280 Q 575 300 595 310 Q 615 300 615 280 L 615 260 Z"
                  fill="#22c55e"
                  fillOpacity={0.3}
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <motion.text
                  x={595}
                  y={288}
                  textAnchor="middle"
                  fill="#22c55e"
                  fontSize={16}
                  fontWeight="bold"
                >
                  ✓
                </motion.text>
              </motion.g>
              <motion.text
                x={595}
                y={330}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={11}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Minimal Attack Surface
              </motion.text>

              {/* Scan results */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                <motion.rect x={450} y={340} width={290} height={50} rx={6} fill="#0f172a" stroke="#22c55e" strokeWidth={1} />
                <motion.text x={470} y={360} fill="#94a3b8" fontSize={10} fontFamily="system-ui, sans-serif">
                  Vulnerability Scan:
                </motion.text>
                <motion.text x={470} y={378} fill="#22c55e" fontSize={12} fontWeight="bold" fontFamily="monospace">
                  0 critical, 2 low
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Non-root user badge */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.6 }}
            >
              <motion.rect x={510} y={420} width={200} height={28} rx={14} fill="#2496ED" fillOpacity={0.2} stroke="#2496ED" strokeWidth={1} />
              <motion.text
                x={610}
                y={439}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={11}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                USER node (non-root)
              </motion.text>
            </motion.g>

            {/* Bottom label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <motion.rect x={120} y={460} width={560} height={30} rx={6} fill="#22c55e" fillOpacity={0.1} />
              <motion.text
                x={400}
                y={480}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Multi-stage builds reduce attack surface and vulnerabilities
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
