"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ComposeAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 120, damping: 14 };
const gentleSpring = { type: "spring" as const, stiffness: 80, damping: 18 };

const services = [
  { name: "Web App", icon: "🌐", color: "#2496ED", x: 100, y: 120, cmd: "docker run -p 3000:3000 webapp" },
  { name: "PostgreSQL", icon: "🐘", color: "#f97316", x: 580, y: 100, cmd: "docker run -p 5432:5432 postgres" },
  { name: "Redis", icon: "⚡", color: "#ef4444", x: 340, y: 320, cmd: "docker run -p 6379:6379 redis" },
];

const organizedPositions = [
  { x: 100, y: 200 },
  { x: 340, y: 200 },
  { x: 580, y: 200 },
];

const logLines = [
  ["webapp  | Listening on :3000", "webapp  | GET / 200 OK", "webapp  | Connected to db"],
  ["postgres | ready for connections", "postgres | port 5432", "postgres | database ready"],
  ["redis   | Ready on port 6379", "redis   | Background save OK", "redis   | 1 clients connected"],
];

function ServiceBox({
  name,
  icon,
  color,
  x,
  y,
  delay,
  showPulse,
}: {
  name: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  delay: number;
  showPulse?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={120}
        height={80}
        rx={8}
        fill={color}
        filter="url(#composeShadow)"
      />
      {showPulse && (
        <motion.rect
          x={x - 2}
          y={y - 2}
          width={124}
          height={84}
          rx={10}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <motion.text
        x={x + 60}
        y={y + 30}
        textAnchor="middle"
        fontSize={18}
        fontFamily="system-ui, sans-serif"
      >
        {icon}
      </motion.text>
      <motion.text
        x={x + 60}
        y={y + 55}
        textAnchor="middle"
        fill="white"
        fontSize={12}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {name}
      </motion.text>
      {showPulse && (
        <motion.circle
          cx={x + 108}
          cy={y + 12}
          r={5}
          fill="#22c55e"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}

function CommandLabel({ x, y, text, delay }: { x: number; y: number; text: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x - 4}
        y={y - 12}
        width={text.length * 6.2 + 12}
        height={18}
        rx={4}
        fill="#1e293b"
        stroke="#334155"
        strokeWidth={1}
      />
      <motion.text
        x={x + 2}
        y={y}
        fill="#22c55e"
        fontSize={9}
        fontFamily="monospace"
      >
        {text}
      </motion.text>
    </motion.g>
  );
}

function ComposeFileIcon({ delay }: { delay: number }) {
  const cx = 360;
  const cy = 130;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      {/* File shape */}
      <motion.path
        d={`M${cx - 25} ${cy - 35} L${cx + 15} ${cy - 35} L${cx + 25} ${cy - 25} L${cx + 25} ${cy + 35} L${cx - 25} ${cy + 35} Z`}
        fill="#1e293b"
        stroke="#3b82f6"
        strokeWidth={2}
      />
      {/* Fold corner */}
      <motion.path
        d={`M${cx + 15} ${cy - 35} L${cx + 15} ${cy - 25} L${cx + 25} ${cy - 25}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={1.5}
      />
      {/* YAML icon lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={cx - 18}
          y={cy - 18 + i * 12}
          width={30 - i * 4}
          height={3}
          rx={1}
          fill="#3b82f6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.1 + i * 0.08 }}
        />
      ))}
      <motion.text
        x={cx}
        y={cy + 52}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={10}
        fontWeight="bold"
        fontFamily="monospace"
      >
        docker-compose.yml
      </motion.text>
    </motion.g>
  );
}

function NetworkLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#3b82f6"
      strokeWidth={1.5}
      strokeDasharray="6 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 0.8, delay }}
    />
  );
}

export default function ComposeAnimation({ step = 0 }: ComposeAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker Compose multi-container animation">
      <defs>
        <filter id="composeShadow">
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
        Docker Compose
      </motion.text>

      {/* ===== STEP 0: Scattered containers with individual commands ===== */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {services.map((svc, i) => (
              <motion.g key={svc.name}>
                <ServiceBox
                  name={svc.name}
                  icon={svc.icon}
                  color={svc.color}
                  x={svc.x}
                  y={svc.y}
                  delay={i * 0.2}
                />
                <CommandLabel
                  x={svc.x - 10}
                  y={svc.y - 10}
                  text={svc.cmd}
                  delay={i * 0.2 + 0.3}
                />
              </motion.g>
            ))}

            {/* Step 0 label */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={14}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Managing containers manually...
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 1: Compose file absorbs commands ===== */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Compose file in center */}
            <ComposeFileIcon delay={0} />

            {/* Animated connection lines from compose to each service */}
            <NetworkLine x1={360} y1={165} x2={organizedPositions[0].x + 60} y2={organizedPositions[0].y} delay={0.3} />
            <NetworkLine x1={360} y1={165} x2={organizedPositions[1].x + 60} y2={organizedPositions[1].y} delay={0.45} />
            <NetworkLine x1={360} y1={165} x2={organizedPositions[2].x + 60} y2={organizedPositions[2].y} delay={0.6} />

            {/* Services in organized grid */}
            {services.map((svc, i) => (
              <ServiceBox
                key={svc.name}
                name={svc.name}
                icon={svc.icon}
                color={svc.color}
                x={organizedPositions[i].x}
                y={organizedPositions[i].y}
                delay={0.3 + i * 0.15}
              />
            ))}

            {/* Services section label */}
            <motion.text
              x={400}
              y={310}
              textAnchor="middle"
              fill="#64748b"
              fontSize={11}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8 }}
            >
              services:
            </motion.text>

            {/* Step 1 label */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...gentleSpring, delay: 0.6 }}
            >
              <motion.rect x={280} y={440} width={240} height={36} rx={18} fill="#3b82f6" />
              <motion.text
                x={400}
                y={463}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                One file to rule them all
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 2: Network connections and depends_on ===== */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Shared network box */}
            <motion.rect
              x={70}
              y={140}
              width={660}
              height={200}
              rx={12}
              fill="none"
              stroke="#22c55e"
              strokeWidth={2}
              strokeDasharray="8 4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ ...gentleSpring, delay: 0.2 }}
            />
            <motion.text
              x={400}
              y={160}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={12}
              fontWeight="bold"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
            >
              app-network
            </motion.text>

            {/* Service boxes */}
            {services.map((svc, i) => (
              <ServiceBox
                key={svc.name}
                name={svc.name}
                icon={svc.icon}
                color={svc.color}
                x={organizedPositions[i].x}
                y={organizedPositions[i].y}
                delay={0.3 + i * 0.12}
              />
            ))}

            {/* Connection: webapp → postgres (db:5432) */}
            <motion.line
              x1={220}
              y1={240}
              x2={340}
              y2={240}
              stroke="#f97316"
              strokeWidth={2}
              markerEnd="url(#arrowOrange)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.text
              x={280}
              y={232}
              textAnchor="middle"
              fill="#f97316"
              fontSize={9}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              db:5432
            </motion.text>

            {/* Connection: webapp → redis (redis:6379) */}
            <motion.path
              d="M 220 260 Q 400 350 580 260"
              fill="none"
              stroke="#ef4444"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <motion.text
              x={400}
              y={325}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={9}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              redis:6379
            </motion.text>

            {/* depends_on arrow from webapp to db */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.line
                x1={220}
                y1={210}
                x2={340}
                y2={210}
                stroke="#a78bfa"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              {/* Clock icon */}
              <motion.circle cx={280} cy={205} r={8} fill="#1e293b" stroke="#a78bfa" strokeWidth={1.5} />
              <motion.line x1={280} y1={201} x2={280} y2={205} stroke="#a78bfa" strokeWidth={1.5} />
              <motion.line x1={280} y1={205} x2={283} y2={207} stroke="#a78bfa" strokeWidth={1.5} />
              <motion.text
                x={280}
                y={195}
                textAnchor="middle"
                fill="#a78bfa"
                fontSize={8}
                fontFamily="monospace"
              >
                depends_on
              </motion.text>
            </motion.g>

            {/* Arrow defs */}
            <defs>
              <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#f97316" />
              </marker>
            </defs>

            {/* Step 2 label */}
            <motion.text
              x={400}
              y={380}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={13}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Services discover each other by name
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 3: Running with docker compose up ===== */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* docker compose up command */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0 }}
            >
              <motion.rect x={260} y={50} width={280} height={30} rx={6} fill="#1e293b" stroke="#22c55e" strokeWidth={1.5} />
              <motion.text
                x={400}
                y={70}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={14}
                fontWeight="bold"
                fontFamily="monospace"
              >
                $ docker compose up
              </motion.text>
            </motion.g>

            {/* Service boxes with green pulse */}
            {services.map((svc, i) => (
              <ServiceBox
                key={svc.name}
                name={svc.name}
                icon={svc.icon}
                color={svc.color}
                x={organizedPositions[i].x}
                y={130}
                delay={0.2 + i * 0.15}
                showPulse
              />
            ))}

            {/* Volume icon connected to PostgreSQL */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.6 }}
            >
              <motion.line
                x1={400}
                y1={210}
                x2={400}
                y2={240}
                stroke="#a78bfa"
                strokeWidth={1.5}
              />
              {/* Volume cylinder */}
              <motion.ellipse cx={400} cy={244} rx={25} ry={6} fill="#7c3aed" />
              <motion.rect x={375} y={244} width={50} height={20} fill="#7c3aed" />
              <motion.ellipse cx={400} cy={264} rx={25} ry={6} fill="#6d28d9" />
              <motion.text
                x={400}
                y={258}
                textAnchor="middle"
                fill="white"
                fontSize={8}
                fontFamily="monospace"
              >
                pgdata
              </motion.text>
            </motion.g>

            {/* Log streams for each service */}
            {services.map((svc, i) => (
              <motion.g key={`logs-${svc.name}`}>
                {/* Log background */}
                <motion.rect
                  x={organizedPositions[i].x - 10}
                  y={295}
                  width={140}
                  height={70}
                  rx={4}
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                />
                {/* Log lines */}
                {logLines[i].map((line, j) => (
                  <motion.text
                    key={j}
                    x={organizedPositions[i].x - 4}
                    y={312 + j * 16}
                    fill={svc.color}
                    fontSize={7}
                    fontFamily="monospace"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 1, 1, 0.5] }}
                    transition={{
                      duration: 3,
                      delay: 0.8 + i * 0.1 + j * 0.6,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    {line}
                  </motion.text>
                ))}
              </motion.g>
            ))}

            {/* Step 3 label */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...gentleSpring, delay: 1.0 }}
            >
              <motion.rect x={320} y={400} width={160} height={36} rx={18} fill="#22c55e" />
              <motion.text
                x={400}
                y={423}
                textAnchor="middle"
                fill="white"
                fontSize={16}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Running!
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
