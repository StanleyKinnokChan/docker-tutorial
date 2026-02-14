"use client";

import { motion, AnimatePresence } from "framer-motion";

interface OrchestrationAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

function MiniContainer({
  x,
  y,
  color,
  delay,
  crashed,
  label,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
  crashed?: boolean;
  label?: string;
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
        width={50}
        height={35}
        rx={4}
        fill={crashed ? "#7f1d1d" : color}
        stroke={crashed ? "#ef4444" : color === "#1e293b" ? "#475569" : color}
        strokeWidth={1.5}
        strokeOpacity={0.6}
        fillOpacity={0.3}
      />
      {crashed && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: delay + 0.3 }}
        >
          <motion.path
            d={`M ${x + 18} ${y + 10} L ${x + 32} ${y + 25}`}
            stroke="#ef4444"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <motion.path
            d={`M ${x + 32} ${y + 10} L ${x + 18} ${y + 25}`}
            stroke="#ef4444"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </motion.g>
      )}
      {!crashed && (
        <motion.rect
          x={x + 8}
          y={y + 10}
          width={34}
          height={15}
          rx={2}
          fill={color}
          fillOpacity={0.5}
        />
      )}
      {label && (
        <motion.text
          x={x + 25}
          y={y + 48}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={8}
          fontFamily="monospace"
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}

export default function OrchestrationAnimation({ step = 0 }: OrchestrationAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Container orchestration animation">
      <defs>
        <filter id="orchShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2496ED" floodOpacity="0.3" />
        </filter>
        <marker id="orchArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#2496ED" />
        </marker>
        <marker id="orchArrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
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
        Container Orchestration
      </motion.text>

      {/* Step indicator */}
      <motion.g>
        {["Why Orchestration?", "Docker Swarm", "Scaling", "Kubernetes"].map((label, i) => (
          <motion.g key={label}>
            <motion.rect
              x={95 + i * 170}
              y={52}
              width={130}
              height={24}
              rx={12}
              fill={i === step ? "#2496ED" : "#1e293b"}
              stroke={i <= step ? "#2496ED" : "#334155"}
              strokeWidth={1}
              animate={{
                fill: i === step ? "#2496ED" : "#1e293b",
                stroke: i <= step ? "#2496ED" : "#334155",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.text
              x={160 + i * 170}
              y={68}
              textAnchor="middle"
              fill={i <= step ? "white" : "#64748b"}
              fontSize={10}
              fontFamily="monospace"
              animate={{ fill: i <= step ? "white" : "#64748b" }}
            >
              {label}
            </motion.text>
          </motion.g>
        ))}
      </motion.g>

      {/* Step 0: Why Orchestration? */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top label */}
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize={16}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Why Orchestration?
            </motion.text>

            {/* Single host box */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect
                x={200}
                y={130}
                width={400}
                height={200}
                rx={10}
                fill="#1e293b"
                stroke="#475569"
                strokeWidth={2}
              />
              <motion.text
                x={400}
                y={155}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Single Host
              </motion.text>

              {/* Server icon */}
              <motion.rect x={370} y={138} width={8} height={8} rx={1} fill="#64748b" />
              <motion.rect x={380} y={138} width={8} height={8} rx={1} fill="#64748b" />

              {/* Three containers */}
              <MiniContainer x={230} y={175} color="#2496ED" delay={0.4} label="app-1" />
              <MiniContainer x={330} y={175} color="#2496ED" delay={0.5} crashed label="app-2" />
              <MiniContainer x={430} y={175} color="#2496ED" delay={0.6} label="app-3" />

              {/* Warning icon on crashed container */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 1.0 }}
              >
                <motion.circle
                  cx={355}
                  cy={172}
                  r={10}
                  fill="#ef4444"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.text
                  x={355}
                  y={177}
                  textAnchor="middle"
                  fill="white"
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                >
                  !
                </motion.text>
              </motion.g>

              {/* Crash label */}
              <motion.text
                x={355}
                y={240}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={10}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
              >
                CRASHED
              </motion.text>
            </motion.g>

            {/* Problem labels appearing one by one */}
            {[
              { text: "No auto-restart", x: 240, delay: 1.5 },
              { text: "No scaling", x: 400, delay: 2.0 },
              { text: "Single point of failure", x: 560, delay: 2.5 },
            ].map((problem, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: problem.delay }}
              >
                <motion.rect
                  x={problem.x - 80}
                  y={355}
                  width={160}
                  height={32}
                  rx={6}
                  fill="#7f1d1d"
                  fillOpacity={0.4}
                  stroke="#ef4444"
                  strokeWidth={1}
                />
                {/* X icon */}
                <motion.path
                  d={`M ${problem.x - 65} ${364} L ${problem.x - 57} ${378}`}
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <motion.path
                  d={`M ${problem.x - 57} ${364} L ${problem.x - 65} ${378}`}
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <motion.text
                  x={problem.x + 5}
                  y={376}
                  textAnchor="middle"
                  fill="#fca5a5"
                  fontSize={11}
                  fontFamily="system-ui, sans-serif"
                >
                  {problem.text}
                </motion.text>
              </motion.g>
            ))}

            {/* Bottom note */}
            <motion.text
              x={400}
              y={425}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0 }}
            >
              We need a system to manage containers across multiple hosts automatically
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Docker Swarm */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Docker Swarm header */}
            <motion.text
              x={400}
              y={110}
              textAnchor="middle"
              fill="#2496ED"
              fontSize={16}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Docker Swarm
            </motion.text>

            {/* Swarm Mode badge */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <motion.rect x={335} y={115} width={130} height={22} rx={11} fill="#14532d" stroke="#22c55e" strokeWidth={1} />
              <motion.text x={400} y={130} textAnchor="middle" fill="#22c55e" fontSize={10} fontWeight="bold" fontFamily="monospace">
                Swarm Mode
              </motion.text>
            </motion.g>

            {/* Large swarm box */}
            <motion.rect
              x={60}
              y={145}
              width={680}
              height={280}
              rx={12}
              fill="#0f172a"
              stroke="#2496ED"
              strokeWidth={2}
              strokeDasharray="6 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />

            {/* Manager node */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.5 }}
            >
              <motion.rect
                x={300}
                y={160}
                width={200}
                height={100}
                rx={8}
                fill="#172554"
                stroke="#2496ED"
                strokeWidth={2}
                filter="url(#orchShadow)"
              />
              {/* Crown icon */}
              <motion.path
                d={`M 375 170 L 365 185 L 370 180 L 380 190 L 390 180 L 395 185 L 385 170 L 380 178 Z`}
                fill="#f59e0b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />
              <motion.text x={400} y={210} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Manager
              </motion.text>
              <motion.text x={400} y={228} textAnchor="middle" fill="#60a5fa" fontSize={10} fontFamily="monospace">
                Leader Node
              </motion.text>

              {/* Containers inside manager */}
              <motion.rect x={320} y={235} width={30} height={18} rx={3} fill="#2496ED" fillOpacity={0.3} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} />
            </motion.g>

            {/* Worker 1 */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.7 }}
            >
              <motion.rect x={80} y={300} width={200} height={100} rx={8} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
              <motion.text x={180} y={330} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Worker 1
              </motion.text>
              <motion.text x={180} y={348} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">
                Node
              </motion.text>
              {/* Containers */}
              <motion.rect x={100} y={360} width={30} height={18} rx={3} fill="#2496ED" fillOpacity={0.3} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} />
              <motion.rect x={140} y={360} width={30} height={18} rx={3} fill="#2496ED" fillOpacity={0.3} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />
            </motion.g>

            {/* Worker 2 */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.9 }}
            >
              <motion.rect x={520} y={300} width={200} height={100} rx={8} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
              <motion.text x={620} y={330} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Worker 2
              </motion.text>
              <motion.text x={620} y={348} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">
                Node
              </motion.text>
              {/* Containers */}
              <motion.rect x={540} y={360} width={30} height={18} rx={3} fill="#2496ED" fillOpacity={0.3} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
              <motion.rect x={580} y={360} width={30} height={18} rx={3} fill="#2496ED" fillOpacity={0.3} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} />
            </motion.g>

            {/* Arrows from manager to workers */}
            <motion.path
              d="M 350 260 L 200 300"
              fill="none"
              stroke="#2496ED"
              strokeWidth={2}
              markerEnd="url(#orchArrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.0, duration: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 450 260 L 600 300"
              fill="none"
              stroke="#2496ED"
              strokeWidth={2}
              markerEnd="url(#orchArrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease: "easeInOut" }}
            />

            {/* Command text */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.rect x={240} y={440} width={320} height={28} rx={6} fill="#1e1e2e" stroke="#334155" strokeWidth={1} />
              <motion.text x={260} y={458} fill="#22c55e" fontSize={12} fontFamily="monospace">
                $ docker swarm init
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: Scaling */}
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
              Service Scaling &amp; Load Balancing
            </motion.text>

            {/* Load balancer icon at top */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <motion.rect x={340} y={125} width={120} height={45} rx={8} fill="#1e293b" stroke="#22c55e" strokeWidth={2} />
              {/* LB arrows icon */}
              <motion.path d="M 380 140 L 370 148 L 380 156" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
              <motion.path d="M 420 140 L 430 148 L 420 156" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
              <motion.text x={400} y={152} textAnchor="middle" fill="#22c55e" fontSize={10} fontWeight="bold" fontFamily="monospace">
                LB
              </motion.text>
              <motion.text x={400} y={185} textAnchor="middle" fill="#94a3b8" fontSize={9} fontFamily="system-ui, sans-serif">
                Load Balancer
              </motion.text>
            </motion.g>

            {/* Service label */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.rect x={30} y={130} width={140} height={50} rx={8} fill="#172554" stroke="#2496ED" strokeWidth={1.5} />
              <motion.text x={100} y={153} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="monospace">
                service: web
              </motion.text>
              <motion.text
                x={100}
                y={170}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={11}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                replicas: 3 → 5
              </motion.text>
            </motion.g>

            {/* Three nodes with containers */}
            {[
              { nx: 100, ny: 220, label: "Node 1" },
              { nx: 340, ny: 220, label: "Node 2" },
              { nx: 580, ny: 220, label: "Node 3" },
            ].map((node, ni) => (
              <motion.g
                key={ni}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.6 + ni * 0.15 }}
              >
                <motion.rect
                  x={node.nx}
                  y={node.ny}
                  width={180}
                  height={140}
                  rx={8}
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth={1.5}
                />
                <motion.text
                  x={node.nx + 90}
                  y={node.ny + 22}
                  textAnchor="middle"
                  fill="white"
                  fontSize={11}
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                >
                  {node.label}
                </motion.text>
              </motion.g>
            ))}

            {/* Initial 3 replicas (staggered) */}
            {[
              { cx: 125, cy: 265, nodeIdx: 0 },
              { cx: 365, cy: 265, nodeIdx: 1 },
              { cx: 605, cy: 265, nodeIdx: 2 },
            ].map((c, i) => (
              <motion.g
                key={`rep-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 1.0 + i * 0.2 }}
              >
                <motion.rect
                  x={c.cx}
                  y={c.cy}
                  width={55}
                  height={35}
                  rx={4}
                  fill="#2496ED"
                  fillOpacity={0.2}
                  stroke="#2496ED"
                  strokeWidth={1.5}
                />
                <motion.text x={c.cx + 27} y={c.cy + 21} textAnchor="middle" fill="#60a5fa" fontSize={9} fontFamily="monospace">
                  web.{i + 1}
                </motion.text>
              </motion.g>
            ))}

            {/* Scaling: 2 more containers appear */}
            {[
              { cx: 195, cy: 265, nodeIdx: 0 },
              { cx: 435, cy: 265, nodeIdx: 1 },
            ].map((c, i) => (
              <motion.g
                key={`scale-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: 2.0 + i * 0.25 }}
              >
                <motion.rect
                  x={c.cx}
                  y={c.cy}
                  width={55}
                  height={35}
                  rx={4}
                  fill="#22c55e"
                  fillOpacity={0.2}
                  stroke="#22c55e"
                  strokeWidth={1.5}
                />
                <motion.text x={c.cx + 27} y={c.cy + 21} textAnchor="middle" fill="#22c55e" fontSize={9} fontFamily="monospace">
                  web.{i + 4}
                </motion.text>
                {/* New badge */}
                <motion.rect x={c.cx + 35} y={c.cy - 8} width={25} height={14} rx={7} fill="#22c55e" />
                <motion.text x={c.cx + 47} y={c.cy + 2} textAnchor="middle" fill="white" fontSize={7} fontWeight="bold" fontFamily="monospace">
                  NEW
                </motion.text>
              </motion.g>
            ))}

            {/* LB arrows to nodes */}
            {[180, 400, 660].map((targetX, i) => (
              <motion.path
                key={`lb-arrow-${i}`}
                d={`M 400 170 L ${targetX} 220`}
                fill="none"
                stroke="#22c55e"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                markerEnd="url(#orchArrowGreen)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.4, ease: "easeInOut" }}
              />
            ))}

            {/* Animated traffic dots */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`traffic-${i}`}
                r={3}
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [400, [180, 400, 660][i]],
                  cy: [170, 220],
                }}
                transition={{
                  delay: 2.5 + i * 0.3,
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
            ))}

            {/* Bottom note */}
            <motion.text
              x={400}
              y={410}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Swarm automatically distributes replicas across available nodes
            </motion.text>

            {/* Scaling command */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <motion.rect x={200} y={430} width={400} height={28} rx={6} fill="#1e1e2e" stroke="#334155" strokeWidth={1} />
              <motion.text x={220} y={448} fill="#22c55e" fontSize={11} fontFamily="monospace">
                $ docker service scale web=5
              </motion.text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Kubernetes */}
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
              Kubernetes (K8s) Architecture
            </motion.text>

            {/* Cluster outer box */}
            <motion.rect
              x={50}
              y={120}
              width={700}
              height={340}
              rx={12}
              fill="#0f172a"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="8 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.text
              x={400}
              y={138}
              textAnchor="middle"
              fill="#8b5cf6"
              fontSize={12}
              fontWeight="bold"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Cluster
            </motion.text>

            {/* Control Plane */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
            >
              <motion.rect x={150} y={148} width={500} height={65} rx={8} fill="#2e1065" fillOpacity={0.5} stroke="#8b5cf6" strokeWidth={1.5} />
              <motion.text x={400} y={168} textAnchor="middle" fill="#c4b5fd" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Control Plane
              </motion.text>

              {/* Components */}
              {[
                { label: "API Server", x: 230 },
                { label: "Scheduler", x: 370 },
                { label: "etcd", x: 500 },
              ].map((comp, i) => (
                <motion.g
                  key={comp.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springTransition, delay: 0.6 + i * 0.15 }}
                >
                  <motion.rect x={comp.x - 40} y={178} width={80} height={24} rx={4} fill="#8b5cf6" fillOpacity={0.3} stroke="#8b5cf6" strokeWidth={1} />
                  <motion.text x={comp.x} y={194} textAnchor="middle" fill="#c4b5fd" fontSize={9} fontFamily="monospace">
                    {comp.label}
                  </motion.text>
                </motion.g>
              ))}
            </motion.g>

            {/* Node 1 */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.8 }}
            >
              <motion.rect x={80} y={235} width={300} height={200} rx={8} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
              <motion.text x={230} y={258} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Node 1
              </motion.text>

              {/* Pods */}
              {[
                { px: 100, py: 270, containers: 2 },
                { px: 230, py: 270, containers: 1 },
              ].map((pod, pi) => (
                <motion.g
                  key={`n1-pod-${pi}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springTransition, delay: 1.0 + pi * 0.2 }}
                >
                  <motion.rect
                    x={pod.px}
                    y={pod.py}
                    width={120}
                    height={70}
                    rx={6}
                    fill="#042f2e"
                    fillOpacity={0.5}
                    stroke="#14b8a6"
                    strokeWidth={1.5}
                  />
                  <motion.text x={pod.px + 60} y={pod.py + 16} textAnchor="middle" fill="#14b8a6" fontSize={9} fontWeight="bold" fontFamily="monospace">
                    Pod
                  </motion.text>
                  {/* Container icons inside pod */}
                  {Array.from({ length: pod.containers }).map((_, ci) => (
                    <motion.rect
                      key={ci}
                      x={pod.px + 10 + ci * 55}
                      y={pod.py + 25}
                      width={45}
                      height={30}
                      rx={3}
                      fill="#2496ED"
                      fillOpacity={0.2}
                      stroke="#2496ED"
                      strokeWidth={1}
                    />
                  ))}
                </motion.g>
              ))}

              {/* Pod label */}
              <motion.rect x={100} y={355} width={80} height={20} rx={4} fill="#14b8a6" fillOpacity={0.15} stroke="#14b8a6" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
              <motion.text x={140} y={369} textAnchor="middle" fill="#14b8a6" fontSize={9} fontFamily="monospace"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                Pods
              </motion.text>

              <motion.rect x={200} y={355} width={100} height={20} rx={4} fill="#2496ED" fillOpacity={0.15} stroke="#2496ED" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
              <motion.text x={250} y={369} textAnchor="middle" fill="#2496ED" fontSize={9} fontFamily="monospace"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                Deployments
              </motion.text>
            </motion.g>

            {/* Node 2 */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 1.0 }}
            >
              <motion.rect x={420} y={235} width={300} height={200} rx={8} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
              <motion.text x={570} y={258} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif">
                Node 2
              </motion.text>

              {/* Pods */}
              {[
                { px: 440, py: 270, containers: 1 },
                { px: 580, py: 270, containers: 2 },
              ].map((pod, pi) => (
                <motion.g
                  key={`n2-pod-${pi}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springTransition, delay: 1.2 + pi * 0.2 }}
                >
                  <motion.rect
                    x={pod.px}
                    y={pod.py}
                    width={120}
                    height={70}
                    rx={6}
                    fill="#042f2e"
                    fillOpacity={0.5}
                    stroke="#14b8a6"
                    strokeWidth={1.5}
                  />
                  <motion.text x={pod.px + 60} y={pod.py + 16} textAnchor="middle" fill="#14b8a6" fontSize={9} fontWeight="bold" fontFamily="monospace">
                    Pod
                  </motion.text>
                  {Array.from({ length: pod.containers }).map((_, ci) => (
                    <motion.rect
                      key={ci}
                      x={pod.px + 10 + ci * 55}
                      y={pod.py + 25}
                      width={45}
                      height={30}
                      rx={3}
                      fill="#2496ED"
                      fillOpacity={0.2}
                      stroke="#2496ED"
                      strokeWidth={1}
                    />
                  ))}
                </motion.g>
              ))}

              {/* Services label */}
              <motion.rect x={480} y={355} width={100} height={20} rx={4} fill="#f59e0b" fillOpacity={0.15} stroke="#f59e0b" strokeWidth={1}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} />
              <motion.text x={530} y={369} textAnchor="middle" fill="#f59e0b" fontSize={9} fontFamily="monospace"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
                Services
              </motion.text>
            </motion.g>

            {/* Service mesh lines connecting pods */}
            <motion.path
              d="M 220 305 C 350 310, 350 310, 500 305"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M 290 305 C 400 330, 500 330, 640 305"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
            />

            {/* Animated mesh traffic */}
            {[0, 1].map((i) => (
              <motion.circle
                key={`mesh-${i}`}
                r={2.5}
                fill="#f59e0b"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [220, 500],
                  cy: [305, 305],
                }}
                transition={{
                  delay: 2.2 + i * 0.5,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}

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
              Kubernetes provides declarative container orchestration at scale
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
