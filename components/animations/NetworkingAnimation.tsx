"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NetworkingAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 120, damping: 14 };
const gentleSpring = { type: "spring" as const, stiffness: 80, damping: 18 };

function ContainerBox({
  x,
  y,
  name,
  ip,
  color,
  delay,
  width = 100,
  height = 60,
}: {
  x: number;
  y: number;
  name: string;
  ip?: string;
  color: string;
  delay: number;
  width?: number;
  height?: number;
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
        width={width}
        height={height}
        rx={6}
        fill={color}
        filter="url(#netShadow)"
      />
      <motion.text
        x={x + width / 2}
        y={y + height / 2 - (ip ? 2 : 0)}
        textAnchor="middle"
        fill="white"
        fontSize={11}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {name}
      </motion.text>
      {ip && (
        <motion.text
          x={x + width / 2}
          y={y + height / 2 + 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize={8}
          fontFamily="monospace"
        >
          {ip}
        </motion.text>
      )}
    </motion.g>
  );
}

function NetworkBar({
  x,
  y,
  width,
  label,
  color,
  delay,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ ...springTransition, delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={20}
        rx={10}
        fill={color}
        opacity={0.3}
        stroke={color}
        strokeWidth={2}
      />
      <motion.text
        x={x + width / 2}
        y={y + 14}
        textAnchor="middle"
        fill={color}
        fontSize={10}
        fontWeight="bold"
        fontFamily="monospace"
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

function AnimatedPacket({
  path,
  color,
  delay,
  duration = 2,
}: {
  path: string;
  color: string;
  delay: number;
  duration?: number;
}) {
  return (
    <motion.g>
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: duration * 0.6, delay }}
      />
      <motion.circle
        r={4}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay + 0.3}s`}
          repeatCount="indefinite"
          path={path}
        />
      </motion.circle>
    </motion.g>
  );
}

export default function NetworkingAnimation({ step = 0 }: NetworkingAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker networking animation">
      <defs>
        <filter id="netShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <marker id="arrowWhite" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#94a3b8" />
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
        </marker>
        <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
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
        Docker Networking
      </motion.text>

      {/* ===== STEP 0: Default bridge network ===== */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Host machine outline */}
            <motion.rect
              x={100}
              y={60}
              width={600}
              height={400}
              rx={12}
              fill="none"
              stroke="#475569"
              strokeWidth={2}
              strokeDasharray="10 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            />
            <motion.text
              x={120}
              y={85}
              fill="#94a3b8"
              fontSize={14}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Host Machine
            </motion.text>

            {/* Docker Engine */}
            <motion.rect
              x={250}
              y={100}
              width={300}
              height={40}
              rx={8}
              fill="#2496ED"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            />
            <motion.text
              x={400}
              y={125}
              textAnchor="middle"
              fill="white"
              fontSize={14}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Docker Engine
            </motion.text>

            {/* Default bridge network bar */}
            <NetworkBar
              x={200}
              y={230}
              width={400}
              label="bridge (docker0)"
              color="#6366f1"
              delay={0.5}
            />

            {/* Vertical lines to containers */}
            <motion.line
              x1={320}
              y1={250}
              x2={320}
              y2={310}
              stroke="#6366f1"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            />
            <motion.line
              x1={500}
              y1={250}
              x2={500}
              y2={310}
              stroke="#6366f1"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            />

            {/* Containers */}
            <ContainerBox x={270} y={310} name="Container 1" ip="172.17.0.2" color="#2496ED" delay={0.8} />
            <ContainerBox x={450} y={310} name="Container 2" ip="172.17.0.3" color="#2496ED" delay={0.9} />

            {/* External traffic arrow */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 1.1 }}
            >
              <motion.line
                x1={30}
                y1={240}
                x2={195}
                y2={240}
                stroke="#94a3b8"
                strokeWidth={2}
                markerEnd="url(#arrowWhite)"
              />
              <motion.text
                x={110}
                y={228}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Port Mapping
              </motion.text>
              <motion.text
                x={110}
                y={260}
                textAnchor="middle"
                fill="#64748b"
                fontSize={9}
                fontFamily="monospace"
              >
                -p 8080:80
              </motion.text>
            </motion.g>

            {/* Label */}
            <motion.text
              x={400}
              y={430}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Default bridge network - containers communicate via IP addresses
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 1: Custom networks with isolation ===== */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Frontend network bar */}
            <NetworkBar
              x={50}
              y={180}
              width={320}
              label="frontend-net"
              color="#3b82f6"
              delay={0.2}
            />

            {/* Backend network bar */}
            <NetworkBar
              x={430}
              y={180}
              width={320}
              label="backend-net"
              color="#22c55e"
              delay={0.3}
            />

            {/* Frontend containers - vertical lines */}
            <motion.line
              x1={140}
              y1={200}
              x2={140}
              y2={260}
              stroke="#3b82f6"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
            <motion.line
              x1={290}
              y1={200}
              x2={290}
              y2={260}
              stroke="#3b82f6"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            />

            {/* Frontend containers */}
            <ContainerBox x={90} y={260} name="nginx" color="#3b82f6" delay={0.5} />
            <ContainerBox x={240} y={260} name="react-app" color="#3b82f6" delay={0.6} />

            {/* Backend containers - vertical lines */}
            <motion.line
              x1={520}
              y1={200}
              x2={520}
              y2={260}
              stroke="#22c55e"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            />
            <motion.line
              x1={670}
              y1={200}
              x2={670}
              y2={260}
              stroke="#22c55e"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            />

            {/* Backend containers */}
            <ContainerBox x={470} y={260} name="api" color="#22c55e" delay={0.7} />
            <ContainerBox x={620} y={260} name="database" color="#22c55e" delay={0.8} />

            {/* API container dual-homed: additional line to frontend-net */}
            <motion.path
              d="M 520 260 Q 520 220 370 195"
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="6 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
            <motion.text
              x={470}
              y={222}
              textAnchor="middle"
              fill="#a78bfa"
              fontSize={9}
              fontWeight="bold"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              dual-homed
            </motion.text>

            {/* Lock icon between networks (isolation) */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 1.0 }}
            >
              <motion.rect x={382} y={160} width={36} height={36} rx={6} fill="#1e293b" stroke="#ef4444" strokeWidth={2} />
              {/* Lock body */}
              <motion.rect x={392} y={175} width={16} height={14} rx={2} fill="#ef4444" />
              {/* Lock shackle */}
              <motion.path
                d="M 395 175 L 395 170 Q 395 164 400 164 Q 405 164 405 170 L 405 175"
                fill="none"
                stroke="#ef4444"
                strokeWidth={2}
              />
              {/* Lock keyhole */}
              <motion.circle cx={400} cy={181} r={2} fill="#1e293b" />
            </motion.g>

            {/* Isolation label */}
            <motion.text
              x={400}
              y={210}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={9}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              isolated
            </motion.text>

            {/* Step label */}
            <motion.text
              x={400}
              y={380}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Custom networks provide isolation - only the API bridges both networks
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 2: DNS resolution ===== */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Source container: webapp */}
            <ContainerBox x={80} y={200} name="webapp" color="#3b82f6" delay={0.2} width={110} height={70} />

            {/* DNS Server box */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.4 }}
            >
              <motion.rect
                x={330}
                y={100}
                width={140}
                height={60}
                rx={8}
                fill="#7c3aed"
                filter="url(#netShadow)"
              />
              <motion.text
                x={400}
                y={125}
                textAnchor="middle"
                fill="white"
                fontSize={16}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                DNS
              </motion.text>
              <motion.text
                x={400}
                y={145}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize={9}
                fontFamily="monospace"
              >
                Docker DNS Server
              </motion.text>
            </motion.g>

            {/* Destination container: db */}
            <ContainerBox x={610} y={200} name="db" ip="172.18.0.3" color="#f97316" delay={0.3} width={110} height={70} />

            {/* Step 1: webapp sends request to DNS */}
            <AnimatedPacket
              path="M 190 215 Q 280 100 330 130"
              color="#3b82f6"
              delay={0.6}
              duration={2.5}
            />

            {/* Label: query */}
            <motion.text
              x={230}
              y={145}
              textAnchor="middle"
              fill="#3b82f6"
              fontSize={10}
              fontWeight="bold"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, delay: 0.7, repeat: Infinity }}
            >
              {'"'}where is db?{'"'}
            </motion.text>

            {/* Step 2: DNS resolves */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.rect
                x={340}
                y={180}
                width={120}
                height={24}
                rx={4}
                fill="#1e293b"
                stroke="#a78bfa"
                strokeWidth={1}
              />
              <motion.text
                x={400}
                y={196}
                textAnchor="middle"
                fill="#a78bfa"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0.5] }}
                transition={{ duration: 3, delay: 1.2, repeat: Infinity }}
              >
                db → 172.18.0.3
              </motion.text>
            </motion.g>

            {/* Step 3: Packet travels to db */}
            <AnimatedPacket
              path="M 470 130 Q 560 100 610 235"
              color="#22c55e"
              delay={1.5}
              duration={2.5}
            />

            {/* Label: resolved */}
            <motion.text
              x={570}
              y={155}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={10}
              fontWeight="bold"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, delay: 1.6, repeat: Infinity }}
            >
              172.18.0.3
            </motion.text>

            {/* Direct connection line at the bottom */}
            <motion.path
              d="M 190 270 L 610 270"
              fill="none"
              stroke="#475569"
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.0 }}
            />

            {/* Explanation labels */}
            <motion.text
              x={400}
              y={300}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              Actual data flows directly between containers
            </motion.text>

            {/* Step flow labels */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <motion.circle cx={160} cy={350} r={12} fill="#3b82f6" />
              <motion.text x={160} y={354} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" fontFamily="system-ui, sans-serif">1</motion.text>
              <motion.text x={180} y={354} fill="#94a3b8" fontSize={10} fontFamily="system-ui, sans-serif">webapp resolves hostname {'"'}db{'"'}</motion.text>
            </motion.g>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <motion.circle cx={160} cy={380} r={12} fill="#7c3aed" />
              <motion.text x={160} y={384} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" fontFamily="system-ui, sans-serif">2</motion.text>
              <motion.text x={180} y={384} fill="#94a3b8" fontSize={10} fontFamily="system-ui, sans-serif">Docker DNS returns 172.18.0.3</motion.text>
            </motion.g>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <motion.circle cx={160} cy={410} r={12} fill="#22c55e" />
              <motion.text x={160} y={414} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" fontFamily="system-ui, sans-serif">3</motion.text>
              <motion.text x={180} y={414} fill="#94a3b8" fontSize={10} fontFamily="system-ui, sans-serif">Traffic routed to db container</motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ===== STEP 3: Network types comparison ===== */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* === BRIDGE === */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              {/* Section label */}
              <motion.text
                x={140}
                y={75}
                textAnchor="middle"
                fill="#6366f1"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Bridge
              </motion.text>

              {/* Host box */}
              <motion.rect
                x={40}
                y={90}
                width={200}
                height={230}
                rx={8}
                fill="none"
                stroke="#475569"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              <motion.text x={55} y={108} fill="#64748b" fontSize={9} fontFamily="monospace">host</motion.text>

              {/* Isolation box for containers */}
              <motion.rect
                x={60}
                y={140}
                width={160}
                height={130}
                rx={6}
                fill="rgba(99,102,241,0.1)"
                stroke="#6366f1"
                strokeWidth={1}
              />

              {/* Bridge bar */}
              <motion.rect x={70} y={180} width={140} height={12} rx={6} fill="#6366f1" opacity={0.5} />

              {/* Containers */}
              <ContainerBox x={70} y={210} name="App A" color="#6366f1" delay={0.3} width={60} height={45} />
              <ContainerBox x={150} y={210} name="App B" color="#6366f1" delay={0.35} width={60} height={45} />

              {/* Port mapping arrow */}
              <motion.line
                x1={20}
                y1={200}
                x2={55}
                y2={200}
                stroke="#94a3b8"
                strokeWidth={1.5}
                markerEnd="url(#arrowWhite)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <motion.text
                x={38}
                y={192}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={7}
                fontFamily="monospace"
              >
                -p 80:80
              </motion.text>

              {/* Description */}
              <motion.text
                x={140}
                y={340}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                Isolated network with
              </motion.text>
              <motion.text
                x={140}
                y={354}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                port mapping to host
              </motion.text>
            </motion.g>

            {/* === HOST === */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              {/* Section label */}
              <motion.text
                x={400}
                y={75}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Host
              </motion.text>

              {/* Host box */}
              <motion.rect
                x={300}
                y={90}
                width={200}
                height={230}
                rx={8}
                fill="none"
                stroke="#475569"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              <motion.text x={315} y={108} fill="#64748b" fontSize={9} fontFamily="monospace">host</motion.text>

              {/* Container directly on host (no isolation box) */}
              <ContainerBox x={330} y={160} name="App C" color="#f59e0b" delay={0.5} width={140} height={60} />

              {/* Host network label */}
              <motion.rect x={330} y={240} width={140} height={16} rx={8} fill="#f59e0b" opacity={0.3} stroke="#f59e0b" strokeWidth={1} />
              <motion.text
                x={400}
                y={252}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={9}
                fontFamily="monospace"
              >
                host network stack
              </motion.text>

              {/* No isolation indicator */}
              <motion.text
                x={400}
                y={285}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                No network isolation
              </motion.text>

              {/* Description */}
              <motion.text
                x={400}
                y={340}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                Container shares host
              </motion.text>
              <motion.text
                x={400}
                y={354}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                network directly
              </motion.text>
            </motion.g>

            {/* === OVERLAY === */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.5 }}
            >
              {/* Section label */}
              <motion.text
                x={660}
                y={75}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Overlay
              </motion.text>

              {/* Host 1 box */}
              <motion.rect
                x={565}
                y={90}
                width={90}
                height={170}
                rx={6}
                fill="none"
                stroke="#475569"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              <motion.text x={575} y={108} fill="#64748b" fontSize={8} fontFamily="monospace">Host 1</motion.text>

              {/* Host 2 box */}
              <motion.rect
                x={700}
                y={90}
                width={90}
                height={170}
                rx={6}
                fill="none"
                stroke="#475569"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              <motion.text x={710} y={108} fill="#64748b" fontSize={8} fontFamily="monospace">Host 2</motion.text>

              {/* Container on Host 1 */}
              <ContainerBox x={575} y={130} name="Svc 1" color="#22c55e" delay={0.7} width={70} height={45} />

              {/* Container on Host 2 */}
              <ContainerBox x={710} y={130} name="Svc 2" color="#22c55e" delay={0.8} width={70} height={45} />

              {/* Overlay network spanning both hosts */}
              <motion.rect
                x={560}
                y={195}
                width={235}
                height={20}
                rx={10}
                fill="rgba(34,197,94,0.15)"
                stroke="#22c55e"
                strokeWidth={2}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...springTransition, delay: 0.9 }}
              />
              <motion.text
                x={677}
                y={210}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={9}
                fontWeight="bold"
                fontFamily="monospace"
              >
                overlay network
              </motion.text>

              {/* Lines from containers to overlay */}
              <motion.line
                x1={610}
                y1={175}
                x2={610}
                y2={195}
                stroke="#22c55e"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              />
              <motion.line
                x1={745}
                y1={175}
                x2={745}
                y2={195}
                stroke="#22c55e"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              />

              {/* Animated data packet between hosts */}
              <AnimatedPacket
                path="M 620 205 L 735 205"
                color="#22c55e"
                delay={1.2}
                duration={1.5}
              />

              {/* Description */}
              <motion.text
                x={660}
                y={340}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                Spans multiple hosts
              </motion.text>
              <motion.text
                x={660}
                y={354}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                (Docker Swarm / K8s)
              </motion.text>
            </motion.g>

            {/* Bottom summary */}
            <motion.text
              x={400}
              y={420}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Choose the right network driver for your use case
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
