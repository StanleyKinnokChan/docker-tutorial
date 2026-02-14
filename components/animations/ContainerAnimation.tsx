"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContainerAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 120, damping: 14 };

function VMStack({ index, dimmed }: { index: number; dimmed: boolean }) {
  const xBase = 30 + index * 120;
  const yBase = 160;
  const layers = [
    { label: "App", color: "#ef4444", h: 30 },
    { label: "Bins/Libs", color: "#f97316", h: 25 },
    { label: "Guest OS", color: "#8b5cf6", h: 35 },
  ];

  let yOffset = yBase + 160;
  const rects: { y: number; h: number; color: string; label: string }[] = [];
  for (let i = layers.length - 1; i >= 0; i--) {
    yOffset -= layers[i].h;
    rects.push({ y: yOffset, h: layers[i].h, color: layers[i].color, label: layers[i].label });
  }
  rects.reverse();

  return (
    <motion.g
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: dimmed ? 0.3 : 1, y: 0 }}
      transition={{ ...springTransition, delay: index * 0.15 }}
    >
      {rects.map((r, i) => (
        <g key={i}>
          <motion.rect
            x={xBase}
            y={r.y}
            width={105}
            height={r.h}
            rx={4}
            fill={r.color}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...springTransition, delay: index * 0.15 + i * 0.1 }}
            style={{ originY: "100%", originX: "50%" }}
          />
          <motion.text
            x={xBase + 52}
            y={r.y + r.h / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize={10}
            fontFamily="system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.3 : 1 }}
            transition={{ delay: index * 0.15 + i * 0.1 + 0.2 }}
          >
            {r.label}
          </motion.text>
        </g>
      ))}
      <motion.rect
        x={xBase}
        y={yBase + 130}
        width={105}
        height={30}
        rx={4}
        fill="transparent"
        stroke={dimmed ? "#666" : "#fff"}
        strokeWidth={1}
        strokeDasharray="4 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: dimmed ? 0.2 : 0.5 }}
        transition={{ delay: index * 0.15 + 0.4 }}
      />
      <motion.text
        x={xBase + 52}
        y={yBase + 149}
        textAnchor="middle"
        fill={dimmed ? "#666" : "#aaa"}
        fontSize={8}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: dimmed ? 0.2 : 0.6 }}
        transition={{ delay: index * 0.15 + 0.4 }}
      >
        VM {index + 1}
      </motion.text>
    </motion.g>
  );
}

function ContainerStack({ index, glowing }: { index: number; glowing: boolean }) {
  const xBase = 440 + index * 120;
  const yBase = 260;
  const layers = [
    { label: "App", color: "#2496ED", h: 30 },
    { label: "Bins/Libs", color: "#1a7fd4", h: 25 },
  ];

  let yOffset = yBase + 55;
  const rects: { y: number; h: number; color: string; label: string }[] = [];
  for (let i = layers.length - 1; i >= 0; i--) {
    yOffset -= layers[i].h;
    rects.push({ y: yOffset, h: layers[i].h, color: layers[i].color, label: layers[i].label });
  }
  rects.reverse();

  return (
    <motion.g
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: index * 0.15 }}
    >
      {rects.map((r, i) => (
        <g key={i}>
          <motion.rect
            x={xBase}
            y={r.y}
            width={105}
            height={r.h}
            rx={4}
            fill={r.color}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...springTransition, delay: index * 0.15 + i * 0.1 }}
            style={{ originY: "100%", originX: "50%" }}
          />
          {glowing && (
            <motion.rect
              x={xBase - 2}
              y={r.y - 2}
              width={109}
              height={r.h + 4}
              rx={6}
              fill="none"
              stroke="#2496ED"
              strokeWidth={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <motion.text
            x={xBase + 52}
            y={r.y + r.h / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize={10}
            fontFamily="system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + i * 0.1 + 0.2 }}
          >
            {r.label}
          </motion.text>
        </g>
      ))}
    </motion.g>
  );
}

export default function ContainerAnimation({ step = 0 }: ContainerAnimationProps) {
  const sharedLayers = [
    { label: "Hardware", color: "#6b7280", y: 430, h: 35 },
    { label: "Host OS", color: "#3b82f6", y: 390, h: 35 },
  ];

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Container vs VM comparison animation">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
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
        Containers vs Virtual Machines
      </motion.text>

      {/* Divider */}
      <motion.line
        x1={400}
        y1={50}
        x2={400}
        y2={470}
        stroke="#334155"
        strokeWidth={1}
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* VM Side Label */}
      <motion.text
        x={200}
        y={70}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={16}
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Virtual Machines
      </motion.text>

      {/* Container Side Label */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.text
            x={600}
            y={70}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={16}
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Containers
          </motion.text>
        )}
      </AnimatePresence>

      {/* VM Side - Shared Layers */}
      <AnimatePresence>
        {step >= 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 0.3 : 1 }} transition={{ duration: 0.5 }}>
            {sharedLayers.map((layer, i) => (
              <g key={`vm-shared-${i}`}>
                <motion.rect
                  x={20}
                  y={layer.y}
                  width={360}
                  height={layer.h}
                  rx={6}
                  fill={layer.color}
                  filter="url(#shadow)"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: i * 0.15 }}
                />
                <motion.text
                  x={200}
                  y={layer.y + layer.h / 2 + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={13}
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                >
                  {layer.label}
                </motion.text>
              </g>
            ))}
            {/* Hypervisor */}
            <motion.rect
              x={20}
              y={350}
              width={360}
              height={35}
              rx={6}
              fill="#7c3aed"
              filter="url(#shadow)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            />
            <motion.text
              x={200}
              y={372}
              textAnchor="middle"
              fill="white"
              fontSize={13}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hypervisor
            </motion.text>

            {/* VM Stacks */}
            {[0, 1, 2].map((i) => (
              <VMStack key={i} index={i} dimmed={step >= 2} />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Container Side - Shared Layers */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {sharedLayers.map((layer, i) => (
              <g key={`ct-shared-${i}`}>
                <motion.rect
                  x={420}
                  y={layer.y}
                  width={360}
                  height={layer.h}
                  rx={6}
                  fill={layer.color}
                  filter="url(#shadow)"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: i * 0.15 }}
                />
                <motion.text
                  x={600}
                  y={layer.y + layer.h / 2 + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={13}
                  fontFamily="system-ui, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                >
                  {layer.label}
                </motion.text>
              </g>
            ))}
            {/* Docker Engine */}
            <motion.rect
              x={420}
              y={350}
              width={360}
              height={35}
              rx={6}
              fill="#2496ED"
              filter="url(#shadow)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            />
            <motion.text
              x={600}
              y={372}
              textAnchor="middle"
              fill="white"
              fontSize={13}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Docker Engine
            </motion.text>

            {/* Container Stacks */}
            {[0, 1, 2].map((i) => (
              <ContainerStack key={i} index={i} glowing={step >= 2} />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Highlight label */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            <motion.rect
              x={460}
              y={90}
              width={280}
              height={40}
              rx={20}
              fill="#2496ED"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={springTransition}
            />
            <motion.text
              x={600}
              y={115}
              textAnchor="middle"
              fill="white"
              fontSize={14}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Lighter, Faster, Portable
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Size comparison arrows */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {/* VM height indicator */}
            <motion.line x1={15} y1={170} x2={15} y2={345} stroke="#ef4444" strokeWidth={2} />
            <motion.text x={10} y={260} textAnchor="middle" fill="#ef4444" fontSize={10} fontFamily="system-ui, sans-serif" transform="rotate(-90, 10, 260)">
              Heavy
            </motion.text>

            {/* Container height indicator */}
            <motion.line x1={415} y1={260} x2={415} y2={345} stroke="#22c55e" strokeWidth={2} />
            <motion.text x={410} y={305} textAnchor="middle" fill="#22c55e" fontSize={10} fontFamily="system-ui, sans-serif" transform="rotate(-90, 410, 305)">
              Light
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
