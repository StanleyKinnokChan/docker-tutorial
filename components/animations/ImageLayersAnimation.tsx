"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ImageLayersAnimationProps {
  step?: number;
}

const layers = [
  { label: "Base OS (Ubuntu 22.04)", size: "188 MB", color: "#1e3a5f" },
  { label: "apt-get update", size: "45 MB", color: "#1e4d7a" },
  { label: "Install Node.js", size: "67 MB", color: "#1e6091" },
  { label: "Copy package.json", size: "2 KB", color: "#2496ED" },
  { label: "npm install", size: "120 MB", color: "#3ba4f0" },
  { label: "Copy source code", size: "15 MB", color: "#5bb8f5" },
  { label: "App Layer", size: "8 MB", color: "#7dcbfa" },
];

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

const layerHeight = 38;
const layerGap = 3;
const baseX = 80;
const baseWidth = 380;
const startY = 430;

function getLayerY(index: number) {
  return startY - (index + 1) * (layerHeight + layerGap);
}

function LayerRect({
  layer,
  index,
  x,
  width,
  delay,
  dimmed,
}: {
  layer: (typeof layers)[number];
  index: number;
  x: number;
  width: number;
  delay: number;
  dimmed?: boolean;
}) {
  const y = getLayerY(index);
  return (
    <motion.g
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: dimmed ? 0.4 : 1, x: 0 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={layerHeight}
        rx={6}
        fill={layer.color}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...springTransition, delay }}
        style={{ originX: "0%" }}
      />
      <motion.text
        x={x + 12}
        y={y + layerHeight / 2 + 4}
        fill="white"
        fontSize={12}
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: dimmed ? 0.4 : 1 }}
        transition={{ delay: delay + 0.15 }}
      >
        {layer.label}
      </motion.text>
    </motion.g>
  );
}

export default function ImageLayersAnimation({ step = 0 }: ImageLayersAnimationProps) {
  const sharedLayerCount = 3;

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker image layers animation">
      <defs>
        <filter id="layerGlow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2496ED" floodOpacity="0.4" />
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
        Docker Image Layers
      </motion.text>

      {/* Step 0: Primary image layers stacking */}
      <AnimatePresence>
        {step >= 0 && (
          <motion.g>
            {/* Image label */}
            <motion.text
              x={baseX + baseWidth / 2}
              y={60}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Image: my-node-app
            </motion.text>

            {layers.map((layer, i) => (
              <LayerRect
                key={i}
                layer={layer}
                index={i}
                x={baseX}
                width={baseWidth}
                delay={i * 0.12}
                dimmed={false}
              />
            ))}

            {/* Size labels */}
            {layers.map((layer, i) => (
              <motion.text
                key={`size-${i}`}
                x={baseX + baseWidth + 15}
                y={getLayerY(i) + layerHeight / 2 + 4}
                fill="#64748b"
                fontSize={11}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.12 + 0.2 }}
              >
                {layer.size}
              </motion.text>
            ))}

            {/* Read-only indicator */}
            <motion.text
              x={baseX + baseWidth + 15}
              y={startY + 20}
              fill="#64748b"
              fontSize={10}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Read-Only Layers
            </motion.text>
            <motion.line
              x1={baseX + baseWidth + 15}
              y1={getLayerY(6) - 5}
              x2={baseX + baseWidth + 15}
              y2={getLayerY(0) + layerHeight + 5}
              stroke="#64748b"
              strokeWidth={1}
              strokeDasharray="3 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Second image sharing base layers */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.text
              x={660}
              y={60}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Image: my-python-app
            </motion.text>

            {/* Shared layers - lines connecting */}
            {layers.slice(0, sharedLayerCount).map((layer, i) => {
              const y = getLayerY(i);
              return (
                <motion.g key={`shared-${i}`}>
                  {/* Connection line */}
                  <motion.path
                    d={`M ${baseX + baseWidth} ${y + layerHeight / 2} L ${560} ${y + layerHeight / 2}`}
                    stroke={layer.color}
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                  />
                  {/* Shared label */}
                  {i === 1 && (
                    <motion.text
                      x={490}
                      y={y + layerHeight / 2 - 8}
                      textAnchor="middle"
                      fill="#22c55e"
                      fontSize={10}
                      fontWeight="bold"
                      fontFamily="system-ui, sans-serif"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      SHARED
                    </motion.text>
                  )}
                  {/* Right side shared layer */}
                  <motion.rect
                    x={560}
                    y={y}
                    width={200}
                    height={layerHeight}
                    rx={6}
                    fill={layer.color}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ ...springTransition, delay: i * 0.15 + 0.3 }}
                    style={{ originX: "0%" }}
                  />
                  <motion.text
                    x={572}
                    y={y + layerHeight / 2 + 4}
                    fill="white"
                    fontSize={10}
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.5 }}
                  >
                    {layer.label}
                  </motion.text>
                </motion.g>
              );
            })}

            {/* Different upper layers for second image */}
            {[
              { label: "Install Python", color: "#306998", size: "55 MB" },
              { label: "Copy requirements.txt", color: "#4B8BBE", size: "1 KB" },
              { label: "pip install", color: "#FFD43B", size: "95 MB" },
              { label: "Python App Layer", color: "#FFE873", size: "5 MB" },
            ].map((layer, i) => {
              const y = getLayerY(sharedLayerCount + i);
              return (
                <motion.g key={`py-${i}`}>
                  <motion.rect
                    x={560}
                    y={y}
                    width={200}
                    height={layerHeight}
                    rx={6}
                    fill={layer.color}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ ...springTransition, delay: 0.6 + i * 0.12 }}
                    style={{ originX: "0%" }}
                  />
                  <motion.text
                    x={572}
                    y={y + layerHeight / 2 + 4}
                    fill={i >= 2 ? "#1e293b" : "white"}
                    fontSize={10}
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.12 }}
                  >
                    {layer.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Writable container layer on top */}
      <AnimatePresence>
        {step >= 2 && step < 3 && (
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            {/* Writable layer */}
            <motion.rect
              x={baseX}
              y={getLayerY(layers.length) - 5}
              width={baseWidth}
              height={layerHeight + 4}
              rx={6}
              fill="none"
              stroke="#22c55e"
              strokeWidth={2}
              strokeDasharray="8 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.rect
              x={baseX + 1}
              y={getLayerY(layers.length) - 4}
              width={baseWidth - 2}
              height={layerHeight + 2}
              rx={5}
              fill="#22c55e"
              fillOpacity={0.15}
            />
            <motion.text
              x={baseX + baseWidth / 2}
              y={getLayerY(layers.length) + layerHeight / 2 + 1}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={12}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Writable Container Layer
            </motion.text>

            {/* Container box outline */}
            <motion.rect
              x={baseX - 5}
              y={getLayerY(layers.length) - 10}
              width={baseWidth + 10}
              height={startY - getLayerY(layers.length) + 15}
              rx={8}
              fill="none"
              stroke="#22c55e"
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
            />
            <motion.text
              x={baseX - 5}
              y={getLayerY(layers.length) - 18}
              fill="#22c55e"
              fontSize={12}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Container
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Multiple containers sharing layers */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[0, 1, 2].map((ci) => {
              const containerWidth = baseWidth / 3 - 6;
              const cx = baseX + ci * (containerWidth + 9);
              const cy = getLayerY(layers.length) - 5;
              const colors = ["#22c55e", "#eab308", "#f97316"];
              return (
                <motion.g
                  key={`container-${ci}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: ci * 0.2 }}
                >
                  {/* Writable layer per container */}
                  <motion.rect
                    x={cx}
                    y={cy}
                    width={containerWidth}
                    height={layerHeight}
                    rx={5}
                    fill={colors[ci]}
                    fillOpacity={0.2}
                    stroke={colors[ci]}
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                  />
                  <motion.text
                    x={cx + containerWidth / 2}
                    y={cy + 14}
                    textAnchor="middle"
                    fill={colors[ci]}
                    fontSize={9}
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    Container {ci + 1}
                  </motion.text>
                  <motion.text
                    x={cx + containerWidth / 2}
                    y={cy + 28}
                    textAnchor="middle"
                    fill={colors[ci]}
                    fontSize={8}
                    fontFamily="system-ui, sans-serif"
                    fillOpacity={0.7}
                  >
                    R/W Layer
                  </motion.text>

                  {/* Pulsing dot */}
                  <motion.circle
                    cx={cx + containerWidth - 10}
                    cy={cy + 10}
                    r={4}
                    fill={colors[ci]}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: ci * 0.3 }}
                  />
                </motion.g>
              );
            })}

            {/* Shared label */}
            <motion.text
              x={baseX + baseWidth / 2}
              y={startY + 20}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              All containers share the same read-only image layers
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
