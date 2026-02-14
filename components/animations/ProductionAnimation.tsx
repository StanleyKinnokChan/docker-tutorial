"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ProductionAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

export default function ProductionAnimation({ step = 0 }: ProductionAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker in production animation">
      <defs>
        <filter id="prodShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2496ED" floodOpacity="0.3" />
        </filter>
        <marker id="prodArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#2496ED" />
        </marker>
        <marker id="prodArrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="800" height="500" fill="#0f172a" rx={12} />

      {/* Title */}
      <motion.text
        x={400}
        y={45}
        textAnchor="middle"
        fill="white"
        fontSize={22}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Docker in Production
      </motion.text>

      {/* Step 0: Health Checks */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Container Health Checks
            </motion.text>

            {/* Container box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect
                x={250}
                y={130}
                width={300}
                height={160}
                rx={10}
                fill="#0f172a"
                stroke="#2496ED"
                strokeWidth={2}
                filter="url(#prodShadow)"
              />
              <motion.rect x={250} y={130} width={300} height={28} rx={10} fill="#2496ED" />
              <rect x={250} y={150} width={300} height={8} fill="#2496ED" />
              <motion.text x={400} y={149} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Container: web-app
              </motion.text>

              {/* Health endpoint */}
              <motion.rect x={360} y={200} width={160} height={35} rx={6} fill="#1e293b" stroke="#475569" strokeWidth={1} />
              <motion.text x={440} y={222} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="monospace">
                /health
              </motion.text>
            </motion.g>

            {/* Heart/pulse icon */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.5 }}
            >
              {/* Heart shape */}
              <motion.path
                d="M 160 190 C 160 180, 175 175, 180 185 C 185 175, 200 180, 200 190 C 200 205, 180 215, 180 215 C 180 215, 160 205, 160 190 Z"
                fill="#ef4444"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ transformOrigin: "180px 195px" }}
              />
              {/* Pulse line */}
              <motion.path
                d="M 145 210 L 160 210 L 168 200 L 175 220 L 182 195 L 190 215 L 200 210 L 215 210"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
              />
            </motion.g>

            {/* Animated ping circles going to health endpoint */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`ping-${i}`}
                r={4}
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  cx: [220, 360],
                  cy: [210, 217],
                }}
                transition={{
                  delay: 1.0 + i * 1.5,
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 4.0,
                }}
              />
            ))}

            {/* Three health states */}
            {/* Healthy state */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.2 }}
            >
              <motion.rect x={100} y={310} width={170} height={55} rx={8} fill="#14532d" fillOpacity={0.4} stroke="#22c55e" strokeWidth={1.5} />
              <motion.circle cx={130} cy={330} r={8} fill="#22c55e"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.text x={160} y={335} fill="#22c55e" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Healthy
              </motion.text>
              <motion.text x={130} y={355} fill="#94a3b8" fontSize={9} fontFamily="monospace">
                HTTP 200 OK
              </motion.text>
            </motion.g>

            {/* Starting state */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.6 }}
            >
              <motion.rect x={310} y={310} width={170} height={55} rx={8} fill="#422006" fillOpacity={0.4} stroke="#f59e0b" strokeWidth={1.5} />
              <motion.circle cx={340} cy={330} r={8} fill="#f59e0b"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }} />
              <motion.text x={370} y={335} fill="#f59e0b" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Starting
              </motion.text>
              <motion.text x={340} y={355} fill="#94a3b8" fontSize={9} fontFamily="monospace">
                Waiting for ready...
              </motion.text>
            </motion.g>

            {/* Failed state with auto-restart */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 2.0 }}
            >
              <motion.rect x={520} y={310} width={170} height={55} rx={8} fill="#7f1d1d" fillOpacity={0.4} stroke="#ef4444" strokeWidth={1.5} />
              {/* Red X */}
              <motion.path d="M 543 323 L 557 337" stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
              <motion.path d="M 557 323 L 543 337" stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
              <motion.text x={580} y={335} fill="#ef4444" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Failed
              </motion.text>
              <motion.text x={550} y={355} fill="#94a3b8" fontSize={9} fontFamily="monospace">
                Connection refused
              </motion.text>
            </motion.g>

            {/* Orchestrator auto-restart - integrated with Failed card */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
            >
              {/* Circular restart arrow looping from Failed card */}
              <motion.path
                d="M 690 330 C 720 330, 730 310, 710 295 C 695 283, 670 290, 670 300"
                fill="none"
                stroke="#2496ED"
                strokeWidth={2}
                markerEnd="url(#prodArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 3.0, duration: 0.6, ease: "easeInOut" }}
              />
              <motion.text
                x={720}
                y={305}
                textAnchor="start"
                fill="#2496ED"
                fontSize={9}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                Auto-restart
              </motion.text>

              {/* New healthy container appearing next to Failed */}
              <motion.rect
                x={545}
                y={380}
                width={120}
                height={35}
                rx={6}
                fill="#14532d"
                fillOpacity={0.4}
                stroke="#22c55e"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 3.4 }}
              />
              <motion.text x={590} y={395} fill="#94a3b8" fontSize={8} fontFamily="monospace" textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                New container
              </motion.text>
              <motion.path
                d={`M 620 400 L 625 407 L 635 396`}
                fill="none"
                stroke="#22c55e"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 3.6, duration: 0.3 }}
              />
            </motion.g>

            {/* Bottom note */}
            <motion.text
              x={400}
              y={460}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              HEALTHCHECK ensures containers are actually serving traffic
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Resource Limits */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Resource Limits: CPU &amp; Memory
            </motion.text>

            {/* Container WITH limits */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect x={40} y={130} width={350} height={280} rx={10} fill="#0f172a" stroke="#2496ED" strokeWidth={2} filter="url(#prodShadow)" />
              <motion.rect x={40} y={130} width={350} height={28} rx={10} fill="#2496ED" />
              <rect x={40} y={150} width={350} height={8} fill="#2496ED" />
              <motion.text x={215} y={149} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Container: api (with limits)
              </motion.text>

              {/* CPU Gauge */}
              <motion.text x={145} y={185} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                CPU
              </motion.text>
              <motion.path d="M 85 270 A 60 60 0 0 1 205 270" fill="none" stroke="#1e293b" strokeWidth={12} strokeLinecap="round" />
              <motion.path
                d="M 85 270 A 60 60 0 0 1 205 270"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={12}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.75 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              />
              <motion.text x={145} y={265} textAnchor="middle" fill="#f59e0b" fontSize={18} fontWeight="bold" fontFamily="monospace">75%</motion.text>
              <motion.text x={145} y={285} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">max: 1.5 cores</motion.text>

              {/* Memory Gauge */}
              <motion.text x={305} y={185} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Memory
              </motion.text>
              <motion.path d="M 245 270 A 60 60 0 0 1 365 270" fill="none" stroke="#1e293b" strokeWidth={12} strokeLinecap="round" />
              <motion.path
                d="M 245 270 A 60 60 0 0 1 365 270"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={12}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.75 }}
                transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
              />
              <motion.text x={305} y={260} textAnchor="middle" fill="#f59e0b" fontSize={14} fontWeight="bold" fontFamily="monospace">384MB</motion.text>
              <motion.text x={305} y={280} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">max: 512MB</motion.text>

              {/* Warning indicator */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1] }}
                transition={{ delay: 2.0, duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                <motion.rect x={90} y={310} width={250} height={24} rx={6} fill="#422006" fillOpacity={0.5} stroke="#f59e0b" strokeWidth={1} />
                <motion.text x={215} y={326} textAnchor="middle" fill="#f59e0b" fontSize={10} fontFamily="monospace">
                  ⚠ Approaching limits — still controlled
                </motion.text>
              </motion.g>

              {/* Green checkmark */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springTransition, delay: 1.0 }}>
                <motion.circle cx={80} cy={380} r={12} fill="#22c55e" fillOpacity={0.2} />
                <motion.path d="M 72 380 L 77 386 L 88 374" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
                <motion.text x={100} y={384} fill="#22c55e" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                  Resources capped — safe
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Container WITHOUT limits */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
            >
              <motion.rect x={420} y={130} width={350} height={280} rx={10} fill="#0f172a" stroke="#ef4444" strokeWidth={2} />
              <motion.rect x={420} y={130} width={350} height={28} rx={10} fill="#ef4444" />
              <rect x={420} y={150} width={350} height={8} fill="#ef4444" />
              <motion.text x={595} y={149} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Container: worker (no limits)
              </motion.text>

              {/* CPU Gauge - maxed */}
              <motion.text x={525} y={185} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                CPU
              </motion.text>
              <motion.path d="M 465 270 A 60 60 0 0 1 585 270" fill="none" stroke="#1e293b" strokeWidth={12} strokeLinecap="round" />
              <motion.path
                d="M 465 270 A 60 60 0 0 1 585 270"
                fill="none"
                stroke="#ef4444"
                strokeWidth={12}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.98 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              />
              <motion.text x={525} y={265} textAnchor="middle" fill="#ef4444" fontSize={18} fontWeight="bold" fontFamily="monospace"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                98%
              </motion.text>
              <motion.text x={525} y={285} textAnchor="middle" fill="#ef4444" fontSize={9} fontFamily="monospace">UNLIMITED</motion.text>

              {/* Memory Gauge - maxed */}
              <motion.text x={685} y={185} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Memory
              </motion.text>
              <motion.path d="M 625 270 A 60 60 0 0 1 745 270" fill="none" stroke="#1e293b" strokeWidth={12} strokeLinecap="round" />
              <motion.path
                d="M 625 270 A 60 60 0 0 1 745 270"
                fill="none"
                stroke="#ef4444"
                strokeWidth={12}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.98 }}
                transition={{ delay: 0.9, duration: 1.0, ease: "easeInOut" }}
              />
              <motion.text x={685} y={260} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold" fontFamily="monospace"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                OOM!
              </motion.text>
              <motion.text x={685} y={280} textAnchor="middle" fill="#ef4444" fontSize={9} fontFamily="monospace">UNLIMITED</motion.text>

              {/* Red warning */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springTransition, delay: 1.5 }}>
                <motion.rect x={460} y={310} width={270} height={24} rx={6} fill="#7f1d1d" fillOpacity={0.5} stroke="#ef4444" strokeWidth={1} />
                <motion.text x={595} y={326} textAnchor="middle" fill="#ef4444" fontSize={10} fontFamily="monospace">
                  ✗ No limits — consumes all resources
                </motion.text>
              </motion.g>

              {/* Red X */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springTransition, delay: 1.8 }}>
                <motion.circle cx={460} cy={380} r={12} fill="#ef4444" fillOpacity={0.2} />
                <motion.path d="M 454 374 L 466 386" stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
                <motion.path d="M 466 374 L 454 386" stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
                <motion.text x={480} y={384} fill="#ef4444" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                  Dangerous in production
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Bottom note */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Always set --memory and --cpus limits to prevent resource starvation
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Logging & Monitoring */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Logging &amp; Monitoring
            </motion.text>

            {/* Container emitting logs */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect x={30} y={130} width={150} height={120} rx={8} fill="#0f172a" stroke="#2496ED" strokeWidth={2} />
              <motion.rect x={30} y={130} width={150} height={24} rx={8} fill="#2496ED" />
              <rect x={30} y={148} width={150} height={6} fill="#2496ED" />
              <motion.text x={105} y={147} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Container: app
              </motion.text>

              {/* stdout label */}
              <motion.text x={105} y={175} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">
                stdout / stderr
              </motion.text>

              {/* Log lines inside */}
              {["INFO: request /api", "WARN: slow query", "INFO: 200 OK"].map((line, i) => (
                <motion.text
                  key={i}
                  x={45}
                  y={195 + i * 14}
                  fill={line.includes("WARN") ? "#f59e0b" : "#22c55e"}
                  fontSize={7}
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.6, 1] }}
                  transition={{ delay: 0.5 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {line}
                </motion.text>
              ))}
            </motion.g>

            {/* Animated log blocks flowing right */}
            {[0, 1, 2].map((i) => (
              <motion.rect
                key={`log-block-${i}`}
                width={30}
                height={8}
                rx={2}
                fill="#2496ED"
                fillOpacity={0.6}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: [185, 310],
                  y: [190 + i * 12, 195],
                }}
                transition={{
                  delay: 0.8 + i * 0.5,
                  duration: 1.0,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}

            {/* Log Driver box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.6 }}
            >
              <motion.rect x={310} y={155} width={140} height={70} rx={8} fill="#1e293b" stroke="#475569" strokeWidth={2} />
              {/* Gear icon */}
              <motion.circle cx={380} y={178} r={10} fill="none" stroke="#94a3b8" strokeWidth={1.5}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "380px 178px" }}
              />
              <motion.text x={380} y={205} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Log Driver
              </motion.text>
            </motion.g>

            {/* Arrow from container to log driver */}
            <motion.path
              d="M 180 190 L 310 190"
              fill="none"
              stroke="#94a3b8"
              strokeWidth={2}
              markerEnd="url(#prodArrowGray)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            />

            {/* Log destinations branching out */}
            {[
              { label: "json-file", icon: "disk", x: 540, y: 120, color: "#94a3b8" },
              { label: "fluentd", icon: "collector", x: 560, y: 180, color: "#22c55e" },
              { label: "CloudWatch", icon: "cloud", x: 540, y: 240, color: "#60a5fa" },
            ].map((dest, i) => (
              <motion.g key={dest.label}>
                {/* Arrow */}
                <motion.path
                  d={`M 450 ${175 + i * 10} L ${dest.x} ${dest.y + 15}`}
                  fill="none"
                  stroke={dest.color}
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0 + i * 0.2, duration: 0.4, ease: "easeInOut" }}
                />
                {/* Destination box */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springTransition, delay: 1.2 + i * 0.2 }}
                >
                  <motion.rect x={dest.x} y={dest.y} width={120} height={35} rx={6} fill="#1e293b" stroke={dest.color} strokeWidth={1.5} />
                  {/* Simple icon based on type */}
                  {dest.icon === "disk" && (
                    <motion.rect x={dest.x + 8} y={dest.y + 10} width={14} height={14} rx={2} fill={dest.color} fillOpacity={0.4} />
                  )}
                  {dest.icon === "collector" && (
                    <motion.circle cx={dest.x + 15} cy={dest.y + 17} r={7} fill={dest.color} fillOpacity={0.4} />
                  )}
                  {dest.icon === "cloud" && (
                    <motion.path
                      d={`M ${dest.x + 6} ${dest.y + 22} C ${dest.x + 6} ${dest.y + 10}, ${dest.x + 24} ${dest.y + 8}, ${dest.x + 24} ${dest.y + 16} C ${dest.x + 28} ${dest.y + 10}, ${dest.x + 32} ${dest.y + 16}, ${dest.x + 28} ${dest.y + 22} Z`}
                      fill={dest.color}
                      fillOpacity={0.4}
                    />
                  )}
                  <motion.text x={dest.x + 70} y={dest.y + 22} textAnchor="middle" fill={dest.color} fontSize={10} fontWeight="bold" fontFamily="monospace">
                    {dest.label}
                  </motion.text>
                </motion.g>
              </motion.g>
            ))}

            {/* Monitoring dashboard mockup */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.8 }}
            >
              <motion.rect x={60} y={290} width={680} height={150} rx={10} fill="#1e293b" stroke="#334155" strokeWidth={1.5} />
              <motion.text x={400} y={312} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Monitoring Dashboard
              </motion.text>

              {/* CPU line chart */}
              <motion.g>
                <motion.rect x={90} y={325} width={180} height={90} rx={5} fill="#0f172a" stroke="#334155" strokeWidth={1} />
                <motion.text x={180} y={340} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">
                  CPU Usage
                </motion.text>
                {/* Chart line */}
                <motion.path
                  d="M 105 395 L 125 380 L 145 385 L 165 370 L 185 375 L 205 360 L 225 365 L 245 355 L 255 360"
                  fill="none"
                  stroke="#2496ED"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, duration: 1.5, ease: "easeInOut" }}
                />
                {/* Data points */}
                {[105, 145, 185, 225, 255].map((px, i) => (
                  <motion.circle
                    key={`cpu-dot-${i}`}
                    cx={px}
                    cy={[395, 385, 375, 365, 360][i]}
                    r={3}
                    fill="#2496ED"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...springTransition, delay: 2.4 + i * 0.15 }}
                  />
                ))}
              </motion.g>

              {/* Memory usage chart with line + area fill */}
              <motion.g>
                <motion.rect x={310} y={325} width={160} height={90} rx={5} fill="#0f172a" stroke="#334155" strokeWidth={1} />
                <motion.text x={390} y={340} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">
                  Memory (MB)
                </motion.text>
                {/* Y-axis labels */}
                <motion.text x={318} y={358} fill="#475569" fontSize={7} fontFamily="monospace">512</motion.text>
                <motion.text x={318} y={380} fill="#475569" fontSize={7} fontFamily="monospace">256</motion.text>
                <motion.text x={325} y={402} fill="#475569" fontSize={7} fontFamily="monospace">0</motion.text>
                {/* Grid lines */}
                <motion.line x1={340} y1={355} x2={460} y2={355} stroke="#1e293b" strokeWidth={0.5} />
                <motion.line x1={340} y1={377} x2={460} y2={377} stroke="#1e293b" strokeWidth={0.5} />
                {/* Area fill under line */}
                <motion.path
                  d="M 340 400 L 340 388 L 360 380 L 380 384 L 400 372 L 420 368 L 440 374 L 460 365 L 460 400 Z"
                  fill="#8b5cf6"
                  fillOpacity={0.15}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7, duration: 0.5 }}
                />
                {/* Memory line chart */}
                <motion.path
                  d="M 340 388 L 360 380 L 380 384 L 400 372 L 420 368 L 440 374 L 460 365"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.5, duration: 1.2, ease: "easeInOut" }}
                />
                {/* Data points */}
                {[
                  [340, 388], [360, 380], [380, 384], [400, 372], [420, 368], [440, 374], [460, 365]
                ].map(([px, py], i) => (
                  <motion.circle
                    key={`mem-dot-${i}`}
                    cx={px}
                    cy={py}
                    r={2.5}
                    fill="#8b5cf6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...springTransition, delay: 2.6 + i * 0.12 }}
                  />
                ))}
                {/* Current value label */}
                <motion.text x={455} y={358} fill="#8b5cf6" fontSize={8} fontWeight="bold" fontFamily="monospace"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
                  384MB
                </motion.text>
              </motion.g>

              {/* Request rate chart with area + line */}
              <motion.g>
                <motion.rect x={510} y={325} width={200} height={90} rx={5} fill="#0f172a" stroke="#334155" strokeWidth={1} />
                <motion.text x={610} y={340} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">
                  Requests / min
                </motion.text>
                {/* Area fill */}
                <motion.path
                  d="M 525 400 L 525 390 L 550 385 L 575 388 L 600 375 L 625 370 L 650 365 L 675 360 L 695 355 L 695 400 Z"
                  fill="#22c55e"
                  fillOpacity={0.12}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.5 }}
                />
                {/* Request rate line */}
                <motion.path
                  d="M 525 390 L 550 385 L 575 388 L 600 375 L 625 370 L 650 365 L 675 360 L 695 355"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.8, duration: 1.5, ease: "easeInOut" }}
                />
                {/* Data points */}
                {[
                  [525, 390], [550, 385], [575, 388], [600, 375], [625, 370], [650, 365], [675, 360], [695, 355]
                ].map(([px, py], i) => (
                  <motion.circle
                    key={`req-dot-${i}`}
                    cx={px}
                    cy={py}
                    r={2.5}
                    fill="#22c55e"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...springTransition, delay: 3.0 + i * 0.1 }}
                  />
                ))}
                {/* Current value */}
                <motion.text x={695} y={348} fill="#22c55e" fontSize={10} fontWeight="bold" fontFamily="monospace"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
                  1,247
                </motion.text>
                <motion.text x={610} y={410} textAnchor="middle" fill="#22c55e" fontSize={8} fontFamily="monospace"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>
                  ↑ +12% from last hour
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Bottom note */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            >
              Centralized logging and monitoring are essential for production containers
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Security */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Security Best Practices
            </motion.text>

            {/* Container being secured */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect
                x={50}
                y={130}
                width={300}
                height={260}
                rx={10}
                fill="#0f172a"
                stroke="#2496ED"
                strokeWidth={2}
                filter="url(#prodShadow)"
              />
              <motion.rect x={50} y={130} width={300} height={28} rx={10} fill="#2496ED" />
              <rect x={50} y={150} width={300} height={8} fill="#2496ED" />
              <motion.text x={200} y={149} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Securing Container
              </motion.text>

              {/* Layer visualization inside container - 3 layers */}
              {[0, 1, 2].map((i) => (
                <motion.rect
                  key={`layer-${i}`}
                  x={70}
                  y={170 + i * 70}
                  width={260}
                  height={55}
                  rx={6}
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth={1}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                />
              ))}
            </motion.g>

            {/* Security checklist on the right */}
            {/* 1. USER node - non-root */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.8 }}
            >
              <motion.rect x={410} y={135} width={350} height={60} rx={8} fill="#1e293b" stroke="#334155" strokeWidth={1} />
              <motion.text x={430} y={155} fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                1. USER node
              </motion.text>
              <motion.text x={430} y={175} fill="#64748b" fontSize={9} fontFamily="monospace">
                Run as non-root user
              </motion.text>

              {/* User icon: red root switching to green non-root */}
              <motion.circle
                cx={710}
                cy={160}
                r={14}
                fill="#ef4444"
                fillOpacity={0.2}
                stroke="#ef4444"
                strokeWidth={1.5}
                animate={{ fill: ["rgba(239,68,68,0.2)", "rgba(34,197,94,0.2)"], stroke: ["#ef4444", "#22c55e"] }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              {/* Person icon */}
              <motion.circle cx={710} cy={153} r={4}
                fill="#ef4444"
                animate={{ fill: ["#ef4444", "#22c55e"] }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              <motion.path
                d="M 700 164 C 700 159, 720 159, 720 164"
                fill="#ef4444"
                animate={{ fill: ["#ef4444", "#22c55e"] }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />

              {/* Label in container layer 0 */}
              <motion.text
                x={200}
                y={202}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                USER node (non-root)
              </motion.text>

              {/* Checkmark */}
              <motion.path
                d="M 745 155 L 750 161 L 760 149"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
              />
            </motion.g>

            {/* 2. --read-only filesystem */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 1.8 }}
            >
              <motion.rect x={410} y={205} width={350} height={60} rx={8} fill="#1e293b" stroke="#334155" strokeWidth={1} />
              <motion.text x={430} y={225} fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                2. --read-only
              </motion.text>
              <motion.text x={430} y={245} fill="#64748b" fontSize={9} fontFamily="monospace">
                Read-only filesystem
              </motion.text>

              {/* Filesystem icon with lock */}
              <motion.rect x={698} y={213} width={22} height={18} rx={3} fill="#f59e0b" fillOpacity={0.3} stroke="#f59e0b" strokeWidth={1} />
              {/* Lock icon appearing */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 2.3 }}
              >
                <motion.rect x={703} y={225} width={12} height={10} rx={2} fill="#22c55e" />
                <motion.path d="M 705 225 L 705 221 C 705 217, 713 217, 713 221 L 713 225" fill="none" stroke="#22c55e" strokeWidth={1.5} />
              </motion.g>

              {/* Label in container layer 1 */}
              <motion.text
                x={200}
                y={272}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
              >
                Filesystem: LOCKED
              </motion.text>

              {/* Checkmark */}
              <motion.path
                d="M 745 225 L 750 231 L 760 219"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.5, duration: 0.3 }}
              />
            </motion.g>

            {/* 3. No secrets in image */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 2.8 }}
            >
              <motion.rect x={410} y={275} width={350} height={60} rx={8} fill="#1e293b" stroke="#334155" strokeWidth={1} />
              <motion.text x={430} y={295} fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                3. No secrets in image
              </motion.text>
              <motion.text x={430} y={315} fill="#64748b" fontSize={9} fontFamily="monospace">
                Use external secrets manager
              </motion.text>

              {/* Key icon moving within the "3. No secrets" box area, left of the vault */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3 }}
              >
                <motion.g
                  animate={{
                    x: [445, 455, 445],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Key shape positioned to the left of the Vault (which is at x=690) */}
                  <motion.circle cx={200} cy={305} r={5} fill="#f59e0b" fillOpacity={0.6} stroke="#f59e0b" strokeWidth={1} />
                  <motion.path d="M 205 305 L 218 305 M 213 302 L 213 308 M 216 302 L 216 308" stroke="#f59e0b" strokeWidth={1.5} />
                </motion.g>
              </motion.g>

              {/* Vault box */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 3.5 }}
              >
                <motion.rect x={690} y={280} width={50} height={40} rx={5} fill="#422006" stroke="#f59e0b" strokeWidth={1.5} />
                <motion.text x={715} y={303} textAnchor="middle" fill="#f59e0b" fontSize={8} fontWeight="bold" fontFamily="monospace">
                  Vault
                </motion.text>
                {/* Lock on vault */}
                <motion.rect x={709} y={310} width={12} height={8} rx={2} fill="#f59e0b" fillOpacity={0.6} />
              </motion.g>

              {/* Checkmark */}
              <motion.path
                d="M 745 295 L 750 301 L 760 289"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 3.8, duration: 0.3 }}
              />
            </motion.g>

            {/* 4. Image scanning */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 4.0 }}
            >
              <motion.rect x={410} y={345} width={350} height={60} rx={8} fill="#1e293b" stroke="#334155" strokeWidth={1} />
              <motion.text x={430} y={365} fill="white" fontSize={11} fontWeight="bold" fontFamily="system-ui, sans-serif">
                4. Image scanning
              </motion.text>
              <motion.text x={430} y={385} fill="#64748b" fontSize={9} fontFamily="monospace">
                Scan for vulnerabilities
              </motion.text>

              {/* Shield icon scanning */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 4.3 }}
              >
                <motion.path
                  d="M 703 350 L 720 345 L 737 350 L 737 370 C 737 380, 720 390, 720 390 C 720 390, 703 380, 703 370 Z"
                  fill="#22c55e"
                  fillOpacity={0.2}
                  stroke="#22c55e"
                  strokeWidth={1.5}
                />
                {/* Check inside shield */}
                <motion.path
                  d="M 712 368 L 717 374 L 728 362"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 4.6, duration: 0.3 }}
                />
              </motion.g>

              {/* Scanning animation removed */}

              {/* Label in container layer 2 */}
              <motion.text
                x={200}
                y={342}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
              >
                0 vulnerabilities found
              </motion.text>

              {/* Checkmark */}
              <motion.path
                d="M 745 365 L 750 371 L 760 359"
                fill="none"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 4.8, duration: 0.3 }}
              />
            </motion.g>

            {/* Bottom note */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.0 }}
            >
              Defense in depth: layer multiple security practices for production containers
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
