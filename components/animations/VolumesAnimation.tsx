"use client";

import { motion, AnimatePresence } from "framer-motion";

interface VolumesAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

function ContainerBox({
  x,
  y,
  width,
  height,
  label,
  opacity = 1,
  delay = 0,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  opacity?: number;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill="#1e3a5f"
        stroke="#2496ED"
        strokeWidth={2}
      />
      <motion.text
        x={x + width / 2}
        y={y + 20}
        textAnchor="middle"
        fill="#2496ED"
        fontSize={12}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

function VolumeIcon({
  cx,
  cy,
  color = "#2496ED",
  delay = 0,
}: {
  cx: number;
  cy: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      {/* Cylinder top ellipse */}
      <motion.ellipse cx={cx} cy={cy - 16} rx={30} ry={8} fill={color} fillOpacity={0.8} />
      {/* Cylinder body */}
      <motion.rect x={cx - 30} y={cy - 16} width={60} height={32} fill={color} fillOpacity={0.5} />
      {/* Cylinder bottom ellipse */}
      <motion.ellipse cx={cx} cy={cy + 16} rx={30} ry={8} fill={color} fillOpacity={0.6} />
      {/* Side lines */}
      <motion.line x1={cx - 30} y1={cy - 16} x2={cx - 30} y2={cy + 16} stroke={color} strokeWidth={1.5} />
      <motion.line x1={cx + 30} y1={cy - 16} x2={cx + 30} y2={cy + 16} stroke={color} strokeWidth={1.5} />
    </motion.g>
  );
}

function FileIcon({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay }}
    >
      <motion.path
        d={`M ${x} ${y + 20} V ${y + 2} H ${x + 10} L ${x + 16} ${y + 8} V ${y + 20} Z`}
        fill="#64748b"
        stroke="#94a3b8"
        strokeWidth={1}
      />
      <motion.line x1={x + 3} y1={y + 12} x2={x + 12} y2={y + 12} stroke="#94a3b8" strokeWidth={0.5} />
      <motion.line x1={x + 3} y1={y + 15} x2={x + 12} y2={y + 15} stroke="#94a3b8" strokeWidth={0.5} />
    </motion.g>
  );
}

function DatabaseIcon({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay }}
    >
      <motion.ellipse cx={x + 10} cy={y + 3} rx={10} ry={3} fill="#94a3b8" fillOpacity={0.6} />
      <motion.rect x={x} y={y + 3} width={20} height={14} fill="#64748b" fillOpacity={0.6} />
      <motion.ellipse cx={x + 10} cy={y + 17} rx={10} ry={3} fill="#94a3b8" fillOpacity={0.6} />
      <motion.line x1={x} y1={y + 3} x2={x} y2={y + 17} stroke="#94a3b8" strokeWidth={0.8} />
      <motion.line x1={x + 20} y1={y + 3} x2={x + 20} y2={y + 17} stroke="#94a3b8" strokeWidth={0.8} />
    </motion.g>
  );
}

export default function VolumesAnimation({ step = 0 }: VolumesAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker volumes animation">
      <defs>
        <filter id="volumeGlow">
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
        Docker Volumes &amp; Data
      </motion.text>

      {/* Step 0: Data lost when container removed */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Phase 1: Container with data */}
            <motion.g
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: [1, 1, 0, 0, 0], y: [0, 0, 50, 50, 50] }}
              transition={{ duration: 6, times: [0, 0.3, 0.45, 0.55, 1], repeat: Infinity }}
            >
              <motion.rect
                x={180}
                y={80}
                width={200}
                height={160}
                rx={8}
                fill="#1e3a5f"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={280}
                y={105}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container
              </motion.text>
              {/* Data inside container */}
              <FileIcon x={200} y={120} />
              <FileIcon x={230} y={120} />
              <FileIcon x={260} y={120} />
              <DatabaseIcon x={300} y={118} />
              <motion.text
                x={280}
                y={165}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="monospace"
              >
                user data, logs, db
              </motion.text>
            </motion.g>

            {/* Red X marks when data disappears */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 1, 1] }}
              transition={{ duration: 6, times: [0, 0.3, 0.45, 0.5, 1], repeat: Infinity }}
            >
              <motion.text
                x={280}
                y={180}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={40}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                ✕
              </motion.text>
              <motion.text
                x={280}
                y={210}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Data destroyed!
              </motion.text>
            </motion.g>

            {/* docker rm command */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 1, 1] }}
              transition={{ duration: 6, times: [0, 0.3, 0.4, 0.45, 1], repeat: Infinity }}
            >
              <motion.rect x={180} y={260} width={200} height={28} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1} />
              <motion.text x={190} y={279} fill="#ef4444" fontSize={11} fontFamily="monospace">
                $ docker rm container
              </motion.text>
            </motion.g>

            {/* New container appears without data */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0, 1] }}
              transition={{ duration: 6, times: [0, 0.55, 0.6, 0.65, 0.75], repeat: Infinity }}
            >
              <motion.rect
                x={420}
                y={80}
                width={200}
                height={160}
                rx={8}
                fill="#1e3a5f"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={520}
                y={105}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                New Container
              </motion.text>
              <motion.text
                x={520}
                y={155}
                textAnchor="middle"
                fill="#64748b"
                fontSize={12}
                fontFamily="system-ui, sans-serif"
              >
                (empty)
              </motion.text>
              <motion.text
                x={520}
                y={175}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={11}
                fontFamily="system-ui, sans-serif"
              >
                No data!
              </motion.text>
            </motion.g>

            {/* Arrow between */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 1, 1] }}
              transition={{ duration: 6, times: [0, 0.55, 0.6, 0.7, 1], repeat: Infinity }}
            >
              <motion.path
                d="M 385 160 L 415 160"
                stroke="#64748b"
                strokeWidth={2}
                fill="none"
                markerEnd="url(#arrowGray)"
              />
            </motion.g>

            <defs>
              <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M 0 0 L 8 3 L 0 6 Z" fill="#64748b" />
              </marker>
            </defs>

            {/* Label */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.rect x={200} y={330} width={400} height={36} rx={6} fill="#ef4444" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={353}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={15}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Data lost when container is removed!
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Named Volumes persist */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Container that fades away */}
            <motion.g
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: [1, 1, 0, 0, 0, 0], y: [0, 0, 40, 40, 40, 40] }}
              transition={{ duration: 8, times: [0, 0.25, 0.38, 0.42, 0.5, 1], repeat: Infinity }}
            >
              <motion.rect
                x={160}
                y={70}
                width={180}
                height={130}
                rx={8}
                fill="#1e3a5f"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={250}
                y={95}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container A
              </motion.text>
              <motion.text
                x={250}
                y={140}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={11}
                fontFamily="monospace"
              >
                /data
              </motion.text>
              {/* Dashed line to volume */}
              <motion.line
                x1={250}
                y1={200}
                x2={250}
                y2={260}
                stroke="#2496ED"
                strokeWidth={2}
                strokeDasharray="6 3"
              />
            </motion.g>

            {/* Volume - always persists */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <VolumeIcon cx={250} cy={300} color="#2496ED" delay={0.3} />
              <motion.text
                x={250}
                y={335}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={11}
                fontWeight="bold"
                fontFamily="monospace"
              >
                my_data_vol
              </motion.text>
            </motion.g>

            {/* Green checkmark on volume when container removed */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 1, 1, 1] }}
              transition={{ duration: 8, times: [0, 0.25, 0.38, 0.45, 0.5, 1], repeat: Infinity }}
            >
              <motion.circle cx={290} cy={280} r={12} fill="#22c55e" fillOpacity={0.2} />
              <motion.text
                x={290}
                y={285}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={16}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                ✓
              </motion.text>
              <motion.text
                x={330}
                y={285}
                fill="#22c55e"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
              >
                Persists!
              </motion.text>
            </motion.g>

            {/* New container reconnects */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0, 0, 1] }}
              transition={{ duration: 8, times: [0, 0.42, 0.48, 0.5, 0.58, 0.68], repeat: Infinity }}
            >
              <motion.rect
                x={440}
                y={70}
                width={180}
                height={130}
                rx={8}
                fill="#1e3a5f"
                stroke="#22c55e"
                strokeWidth={2}
              />
              <motion.text
                x={530}
                y={95}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container B (new)
              </motion.text>
              <motion.text
                x={530}
                y={140}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={11}
                fontFamily="monospace"
              >
                /data
              </motion.text>
              {/* Line reconnecting to same volume */}
              <motion.path
                d="M 530 200 Q 530 250 250 270"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="6 3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.text
                x={530}
                y={165}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
              >
                Data intact!
              </motion.text>
            </motion.g>

            {/* Label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <motion.rect x={220} y={380} width={360} height={36} rx={6} fill="#22c55e" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={403}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={15}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Named Volumes persist!
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Bind Mounts for Development */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Host machine (left) */}
            <motion.g
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              <motion.rect
                x={60}
                y={70}
                width={240}
                height={260}
                rx={8}
                fill="#1e293b"
                stroke="#94a3b8"
                strokeWidth={2}
              />
              <motion.text
                x={180}
                y={95}
                textAnchor="middle"
                fill="white"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Host Machine
              </motion.text>

              {/* File tree */}
              {[
                { name: "project/", indent: 0, isDir: true },
                { name: "src/", indent: 1, isDir: true },
                { name: "index.ts", indent: 2, isDir: false },
                { name: "app.ts", indent: 2, isDir: false },
                { name: "package.json", indent: 1, isDir: false },
                { name: "tsconfig.json", indent: 1, isDir: false },
                { name: "Dockerfile", indent: 1, isDir: false },
              ].map((item, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <motion.text
                    x={90 + item.indent * 18}
                    y={125 + i * 22}
                    fill={item.isDir ? "#f97316" : "#94a3b8"}
                    fontSize={11}
                    fontFamily="monospace"
                  >
                    {item.isDir ? "📁 " : "📄 "}{item.name}
                  </motion.text>
                </motion.g>
              ))}

              {/* Pencil / edit indicator */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <motion.text
                  x={240}
                  y={168}
                  fill="#eab308"
                  fontSize={14}
                  fontFamily="system-ui, sans-serif"
                >
                  ✎
                </motion.text>
                <motion.circle
                  cx={260}
                  cy={160}
                  r={6}
                  fill="#eab308"
                  fillOpacity={0.3}
                  animate={{ r: [6, 12, 6], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
              </motion.g>
            </motion.g>

            {/* Arrow: bind mount */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <defs>
                <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M 0 0 L 8 3 L 0 6 Z" fill="#22c55e" />
                </marker>
              </defs>
              <motion.line
                x1={310}
                y1={200}
                x2={480}
                y2={200}
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="8 4"
                markerEnd="url(#arrowGreen)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.text
                x={395}
                y={190}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={11}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                bind mount
              </motion.text>

              {/* Sparkle sync effect */}
              <motion.g
                animate={{ x: [0, 170, 170], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <motion.text
                  x={315}
                  y={218}
                  fill="#eab308"
                  fontSize={12}
                  fontFamily="system-ui, sans-serif"
                >
                  ✦
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Container (right) */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <motion.rect
                x={490}
                y={70}
                width={240}
                height={260}
                rx={8}
                fill="#1e3a5f"
                stroke="#2496ED"
                strokeWidth={2}
              />
              <motion.text
                x={610}
                y={95}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container
              </motion.text>

              {/* Mounted path */}
              <motion.rect
                x={510}
                y={110}
                width={200}
                height={30}
                rx={4}
                fill="#22c55e"
                fillOpacity={0.15}
                stroke="#22c55e"
                strokeWidth={1}
              />
              <motion.text
                x={610}
                y={130}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={12}
                fontWeight="bold"
                fontFamily="monospace"
              >
                /app (mounted)
              </motion.text>

              {/* Mirrored files */}
              {["src/", "  index.ts", "  app.ts", "package.json"].map((name, i) => (
                <motion.text
                  key={i}
                  x={520}
                  y={165 + i * 20}
                  fill="#94a3b8"
                  fontSize={11}
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {name}
                </motion.text>
              ))}

              {/* Matching sparkle */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
              >
                <motion.text
                  x={700}
                  y={168}
                  fill="#eab308"
                  fontSize={14}
                  fontFamily="system-ui, sans-serif"
                >
                  ✦
                </motion.text>
              </motion.g>

              <motion.text
                x={610}
                y={290}
                textAnchor="middle"
                fill="#64748b"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Changes sync instantly!
              </motion.text>
            </motion.g>

            {/* Label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <motion.rect x={220} y={370} width={360} height={36} rx={6} fill="#22c55e" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={393}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={15}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Bind Mounts for Development
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Choose the right mount type */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Container */}
            <motion.rect
              x={250}
              y={60}
              width={300}
              height={120}
              rx={8}
              fill="#1e3a5f"
              stroke="#2496ED"
              strokeWidth={2}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTransition}
            />
            <motion.text
              x={400}
              y={90}
              textAnchor="middle"
              fill="#2496ED"
              fontSize={14}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Container
            </motion.text>

            {/* Mount points inside container */}
            {[
              { path: "/data", x: 310, color: "#2496ED" },
              { path: "/app", x: 400, color: "#22c55e" },
              { path: "/tmp", x: 490, color: "#94a3b8" },
            ].map((mount, i) => (
              <motion.g
                key={mount.path}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <motion.rect
                  x={mount.x - 30}
                  y={110}
                  width={60}
                  height={22}
                  rx={3}
                  fill={mount.color}
                  fillOpacity={0.2}
                  stroke={mount.color}
                  strokeWidth={1}
                />
                <motion.text
                  x={mount.x}
                  y={125}
                  textAnchor="middle"
                  fill={mount.color}
                  fontSize={10}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {mount.path}
                </motion.text>
              </motion.g>
            ))}

            {/* Diagonal lines connecting to mount types */}
            {[
              { x1: 310, y1: 132, x2: 195, y2: 265, color: "#2496ED" }, // to Named Volume
              { x1: 400, y1: 132, x2: 400, y2: 240, color: "#22c55e" }, // to Bind Mount
              { x1: 490, y1: 132, x2: 615, y2: 240, color: "#94a3b8" }, // to tmpfs
            ].map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              />
            ))}

            {/* 1. Named Volume (blue cylinder) */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.7 }}
            >
              <VolumeIcon cx={160} cy={270} color="#2496ED" delay={0.7} />
              <motion.text
                x={160}
                y={305}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Named Volume
              </motion.text>
              <motion.text
                x={160}
                y={320}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={10}
                fontFamily="monospace"
              >
                db_data
              </motion.text>
              {/* Annotation box */}
              <motion.rect x={90} y={335} width={140} height={50} rx={4} fill="#2496ED" fillOpacity={0.1} />
              <motion.text x={160} y={352} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Managed by Docker
              </motion.text>
              <motion.text x={160} y={365} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Best for databases
              </motion.text>
              <motion.text x={160} y={378} textAnchor="middle" fill="#2496ED" fontSize={9} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Database
              </motion.text>
            </motion.g>

            {/* 2. Bind Mount (green folder) */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.9 }}
            >
              {/* Folder icon */}
              <motion.path
                d="M 380 250 L 380 240 L 395 240 L 400 245 L 420 245 L 420 290 L 380 290 Z"
                fill="#22c55e"
                fillOpacity={0.6}
                stroke="#22c55e"
                strokeWidth={1.5}
              />
              <motion.text
                x={400}
                y={308}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Bind Mount
              </motion.text>
              <motion.text
                x={400}
                y={323}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={10}
                fontFamily="monospace"
              >
                ./src:/app
              </motion.text>
              {/* Annotation box */}
              <motion.rect x={330} y={335} width={140} height={50} rx={4} fill="#22c55e" fillOpacity={0.1} />
              <motion.text x={400} y={352} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Maps host directory
              </motion.text>
              <motion.text x={400} y={365} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Live reload in dev
              </motion.text>
              <motion.text x={400} y={378} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Source Code
              </motion.text>
            </motion.g>

            {/* 3. tmpfs (gray cloud) */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.1 }}
            >
              {/* Cloud icon */}
              <motion.path
                d="M 610 270 Q 590 250 605 240 Q 615 230 630 238 Q 640 225 655 235 Q 670 230 670 245 Q 685 248 680 260 Q 685 275 665 275 L 610 275 Q 595 275 600 265 Z"
                fill="#64748b"
                fillOpacity={0.5}
                stroke="#94a3b8"
                strokeWidth={1.5}
              />
              <motion.text
                x={640}
                y={305}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                tmpfs Mount
              </motion.text>
              <motion.text
                x={640}
                y={320}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="monospace"
              >
                tmpfs:/tmp
              </motion.text>
              {/* Annotation box */}
              <motion.rect x={570} y={335} width={140} height={50} rx={4} fill="#94a3b8" fillOpacity={0.1} />
              <motion.text x={640} y={352} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                In-memory only
              </motion.text>
              <motion.text x={640} y={365} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Never written to disk
              </motion.text>
              <motion.text x={640} y={378} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Temp/Secrets
              </motion.text>
            </motion.g>

            {/* Label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <motion.rect x={230} y={420} width={340} height={36} rx={6} fill="#2496ED" fillOpacity={0.15} />
              <motion.text
                x={400}
                y={443}
                textAnchor="middle"
                fill="#2496ED"
                fontSize={15}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Choose the right mount type
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
