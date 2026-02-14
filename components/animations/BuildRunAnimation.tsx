"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BuildRunAnimationProps {
  step?: number;
}

const springTransition = { type: "spring" as const, stiffness: 100, damping: 14 };

function DockerfileIcon({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      {/* File shape */}
      <motion.path
        d={`M ${x} ${y} L ${x + 50} ${y} L ${x + 60} ${y + 12} L ${x + 60} ${y + 75} L ${x} ${y + 75} Z`}
        fill="#1e1e2e"
        stroke="#569cd6"
        strokeWidth={1.5}
      />
      {/* Dog-ear */}
      <motion.path
        d={`M ${x + 50} ${y} L ${x + 50} ${y + 12} L ${x + 60} ${y + 12}`}
        fill="none"
        stroke="#569cd6"
        strokeWidth={1.5}
      />
      {/* Text lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={x + 8}
          y={y + 20 + i * 12}
          width={30 + (i % 2) * 14}
          height={5}
          rx={2}
          fill="#569cd6"
          fillOpacity={0.4 + i * 0.1}
        />
      ))}
      {/* Label */}
      <motion.text
        x={x + 30}
        y={y + 90}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={10}
        fontFamily="monospace"
      >
        Dockerfile
      </motion.text>
    </motion.g>
  );
}

function ImageIcon({ x, y, delay, label }: { x: number; y: number; delay: number; label?: string }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay }}
    >
      {/* Stacked layers representing image */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={x}
          y={y + i * 16}
          width={70}
          height={14}
          rx={3}
          fill={`hsl(207, 85%, ${25 + i * 12}%)`}
          stroke="#2496ED"
          strokeWidth={0.5}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...springTransition, delay: delay + i * 0.08 }}
          style={{ originX: "50%" }}
        />
      ))}
      {/* Docker logo simplified */}
      <motion.circle
        cx={x + 35}
        cy={y - 10}
        r={12}
        fill="#2496ED"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...springTransition, delay: delay + 0.3 }}
      />
      <motion.text
        x={x + 35}
        y={y - 6}
        textAnchor="middle"
        fill="white"
        fontSize={10}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        D
      </motion.text>
      <motion.text
        x={x + 35}
        y={y + 82}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={10}
        fontFamily="monospace"
      >
        {label || "Image"}
      </motion.text>
    </motion.g>
  );
}

function AnimatedArrow({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.g>
      <defs>
        <marker id="buildArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#2496ED" />
        </marker>
      </defs>
      <motion.path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke="#2496ED"
        strokeWidth={2.5}
        fill="none"
        markerEnd="url(#buildArrow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.6, ease: "easeInOut" }}
      />
    </motion.g>
  );
}

function ProgressBar({ x, y, width, delay }: { x: number; y: number; width: number; delay: number }) {
  return (
    <motion.g>
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={10}
        rx={5}
        fill="#1e293b"
        stroke="#334155"
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      />
      <motion.rect
        x={x + 1}
        y={y + 1}
        width={0}
        height={8}
        rx={4}
        fill="#2496ED"
        animate={{ 
          width: [0, width - 2, width - 2, 0, 0],
          fill: ["#2496ED", "#2496ED", "#22c55e", "#22c55e", "#2496ED"]
        }}
        transition={{ 
          delay: delay + 0.2, 
          duration: 6, 
          times: [0, 0.4, 0.75, 0.95, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        <motion.text
          x={x + width / 2}
          y={y + 28}
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
          fontFamily="monospace"
          animate={{ 
            fill: ["#2496ED", "#2496ED", "#2496ED", "#2496ED", "#2496ED"],
            opacity: [1, 1, 0, 0, 1]
          }}
          transition={{ 
            duration: 6, 
            times: [0, 0.35, 0.4, 0.95, 1],
            repeat: Infinity,
          }}
        >
          Building...
        </motion.text>
        <motion.text
          x={x + width / 2}
          y={y + 28}
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
          fontFamily="monospace"
          fill="#22c55e"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0, 1, 0]
          }}
          transition={{ 
            duration: 6, 
            times: [0, 0.74, 0.75, 0.95],
            repeat: Infinity,
          }}
        >
          DONE!
        </motion.text>
      </motion.g>
    </motion.g>
  );
}

export default function BuildRunAnimation({ step = 0 }: BuildRunAnimationProps) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="Docker build and run animation">
      <defs>
        <filter id="buildShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2496ED" floodOpacity="0.3" />
        </filter>
        <marker id="dashArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
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
        Docker Build &amp; Run
      </motion.text>

      {/* Step 0: docker build */}
      <AnimatePresence>
        {step === 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Command */}
            <motion.rect x={220} y={100} width={360} height={32} rx={6} fill="#1e1e2e" stroke="#334155" strokeWidth={1} />
            <motion.text x={240} y={120} fill="#22c55e" fontSize={13} fontFamily="monospace">
              $ docker build -t my-app .
            </motion.text>

            <DockerfileIcon x={160} y={180} delay={0.2} />
            <AnimatedArrow x1={235} y1={225} x2={545} y2={225} delay={0.5} />
            <ProgressBar x={280} y={300} width={240} delay={0.8} />
            <ImageIcon x={560} y={190} delay={1.5} label="my-app:latest" />

            {/* Assembling animation */}
            <motion.text
              x={400}
              y={260}
              textAnchor="middle"
              fill="#2496ED"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
              Assembling Image Layers...
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 1: Build Cache */}
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
              Layer Build Cache
            </motion.text>

            {[
              { label: "FROM node:18-alpine", cached: true, size: "188 MB" },
              { label: "RUN apt-get update", cached: true, size: "45 MB" },
              { label: "COPY package.json", cached: true, size: "2 KB" },
              { label: "RUN npm install", cached: true, size: "120 MB" },
              { label: "COPY . .", cached: false, size: "15 MB" },
              { label: 'CMD ["node", "server.js"]', cached: false, size: "0 B" },
            ].map((layer, i) => {
              const y = 135 + i * 52;
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springTransition, delay: i * 0.15 }}
                >
                  {/* Layer bar */}
                  <motion.rect
                    x={100}
                    y={y}
                    width={450}
                    height={40}
                    rx={6}
                    fill={layer.cached ? "#14532d" : "#1e293b"}
                    stroke={layer.cached ? "#22c55e" : "#2496ED"}
                    strokeWidth={1}
                  />

                  {/* Layer label */}
                  <motion.text
                    x={120}
                    y={y + 24}
                    fill="white"
                    fontSize={11}
                    fontFamily="monospace"
                  >
                    {layer.label}
                  </motion.text>

                  {/* Size */}
                  <motion.text
                    x={460}
                    y={y + 24}
                    fill="#64748b"
                    fontSize={10}
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {layer.size}
                  </motion.text>

                  {/* Cached / Building indicator */}
                  {layer.cached ? (
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ ...springTransition, delay: i * 0.15 + 0.3 }}
                    >
                      {/* Checkmark */}
                      <motion.circle cx={580} cy={y + 20} r={12} fill="#22c55e" fillOpacity={0.2} />
                      <motion.path
                        d={`M ${572} ${y + 20} L ${577} ${y + 26} L ${588} ${y + 14}`}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth={2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.15 + 0.4, duration: 0.3 }}
                      />
                      <motion.text
                        x={620}
                        y={y + 24}
                        fill="#22c55e"
                        fontSize={10}
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        CACHED
                      </motion.text>
                    </motion.g>
                  ) : (
                    <motion.g>
                      <motion.text
                        x={620}
                        y={y + 24}
                        fill="#2496ED"
                        fontSize={10}
                        fontFamily="monospace"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        BUILDING
                      </motion.text>
                    </motion.g>
                  )}
                </motion.g>
              );
            })}

            {/* Speed note */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Cached layers are reused instantly - only changed layers rebuild!
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: docker run */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Command */}
            <motion.rect x={180} y={100} width={440} height={32} rx={6} fill="#1e1e2e" stroke="#334155" strokeWidth={1} />
            <motion.text x={200} y={120} fill="#22c55e" fontSize={13} fontFamily="monospace">
              $ docker run -d -p 8080:3000 my-app
            </motion.text>

            {/* Image icon */}
            <ImageIcon x={120} y={200} delay={0.2} label="my-app:latest" />

            {/* Animated arrow */}
            <AnimatedArrow x1={220} y1={240} x2={380} y2={240} delay={0.6} />

            {/* Transformation label */}
            <motion.text
              x={300}
              y={220}
              textAnchor="middle"
              fill="#2496ED"
              fontSize={11}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Creating Container...
            </motion.text>

            {/* Running container */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 1 }}
            >
              <motion.rect
                x={400}
                y={170}
                width={250}
                height={140}
                rx={10}
                fill="#0f172a"
                stroke="#2496ED"
                strokeWidth={2}
                filter="url(#buildShadow)"
              />
              {/* Container header */}
              <motion.rect x={400} y={170} width={250} height={30} rx={10} fill="#2496ED" />
              <rect x={400} y={190} width={250} height={10} fill="#2496ED" />
              <motion.text
                x={525}
                y={190}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container: my-app
              </motion.text>

              {/* Pulsing green dot */}
              <motion.circle
                cx={420}
                cy={185}
                r={5}
                fill="#22c55e"
                animate={{ r: [5, 7, 5], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Container internals */}
              <motion.text x={420} y={225} fill="#94a3b8" fontSize={11} fontFamily="monospace">
                node server.js
              </motion.text>
              <motion.text x={420} y={245} fill="#64748b" fontSize={10} fontFamily="monospace">
                PID 1 | Memory: 45MB
              </motion.text>
              <motion.text x={420} y={265} fill="#64748b" fontSize={10} fontFamily="monospace">
                Status: Running
              </motion.text>

              {/* Running indicator */}
              <motion.rect
                x={420}
                y={280}
                width={60}
                height={18}
                rx={9}
                fill="#22c55e"
                fillOpacity={0.2}
              />
              <motion.text
                x={450}
                y={293}
                textAnchor="middle"
                fill="#22c55e"
                fontSize={10}
                fontWeight="bold"
                fontFamily="monospace"
              >
                RUNNING
              </motion.text>
            </motion.g>

            {/* Container ID */}
            <motion.text
              x={525}
              y={340}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              ID: a1b2c3d4e5f6
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3: Port Mapping */}
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
              Port Mapping: Host 8080 → Container 3000
            </motion.text>

            {/* Host box */}
            <motion.g
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <motion.rect
                x={40}
                y={140}
                width={280}
                height={300}
                rx={10}
                fill="#1e293b"
                stroke="#475569"
                strokeWidth={1.5}
              />
              <motion.text
                x={180}
                y={165}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Host Machine
              </motion.text>

              {/* Browser icon */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springTransition, delay: 0.5 }}
              >
                <motion.rect x={80} y={190} width={200} height={120} rx={8} fill="#0f172a" stroke="#64748b" strokeWidth={1} />
                {/* Browser top bar */}
                <motion.rect x={80} y={190} width={200} height={24} rx={8} fill="#334155" />
                <rect x={80} y={206} width={200} height={8} fill="#334155" />
                <circle cx={96} cy={202} r={4} fill="#f38ba8" />
                <circle cx={110} cy={202} r={4} fill="#fab387" />
                <circle cx={124} cy={202} r={4} fill="#a6e3a1" />
                {/* URL bar */}
                <motion.rect x={140} y={196} width={130} height={12} rx={6} fill="#1e293b" />
                <motion.text x={205} y={205} textAnchor="middle" fill="#94a3b8" fontSize={7} fontFamily="monospace">
                  localhost:8080
                </motion.text>
                {/* Page content */}
                <motion.text
                  x={180}
                  y={260}
                  textAnchor="middle"
                  fill="#2496ED"
                  fontSize={14}
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                >
                  Hello Docker!
                </motion.text>
              </motion.g>

              {/* Host port */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springTransition, delay: 0.7 }}
              >
                <motion.circle cx={260} cy={380} r={24} fill="#f59e0b" fillOpacity={0.15} stroke="#f59e0b" strokeWidth={2} />
                <motion.text x={260} y={377} textAnchor="middle" fill="#f59e0b" fontSize={9} fontFamily="system-ui, sans-serif">
                  PORT
                </motion.text>
                <motion.text x={260} y={392} textAnchor="middle" fill="#f59e0b" fontSize={14} fontWeight="bold" fontFamily="monospace">
                  8080
                </motion.text>
              </motion.g>
            </motion.g>

            {/* Animated dashed connection line */}
            <motion.path
              d="M 284 380 C 370 380, 430 380, 480 380"
              fill="none"
              stroke="#22c55e"
              strokeWidth={2.5}
              strokeDasharray="8 4"
              markerEnd="url(#dashArrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
            />
            <motion.text
              x={382}
              y={370}
              textAnchor="middle"
              fill="#22c55e"
              fontSize={10}
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              8080 → 3000
            </motion.text>

            {/* Animated data flow dots */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`dot-${i}`}
                r={3}
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [284, 480],
                  cy: [380, 380],
                }}
                transition={{
                  delay: 1.5 + i * 0.4,
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
              />
            ))}

            {/* Container box */}
            <motion.g
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
            >
              <motion.rect
                x={480}
                y={140}
                width={280}
                height={300}
                rx={10}
                fill="#0f172a"
                stroke="#2496ED"
                strokeWidth={2}
                filter="url(#buildShadow)"
              />
              <motion.rect x={480} y={140} width={280} height={30} rx={10} fill="#2496ED" />
              <rect x={480} y={162} width={280} height={8} fill="#2496ED" />
              <motion.text
                x={620}
                y={160}
                textAnchor="middle"
                fill="white"
                fontSize={13}
                fontWeight="bold"
                fontFamily="system-ui, sans-serif"
              >
                Container: my-app
              </motion.text>

              {/* Pulsing green dot */}
              <motion.circle
                cx={500}
                cy={155}
                r={5}
                fill="#22c55e"
                animate={{ r: [5, 7, 5], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* App inside container */}
              <motion.rect x={510} y={195} width={220} height={80} rx={6} fill="#1e293b" />
              <motion.text x={620} y={220} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="monospace">
                node server.js
              </motion.text>
              <motion.text x={620} y={240} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">
                Listening on port 3000
              </motion.text>
              <motion.text x={620} y={260} textAnchor="middle" fill="#22c55e" fontSize={10} fontFamily="monospace">
                ● Running
              </motion.text>

              {/* Container port */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springTransition, delay: 0.7 }}
              >
                <motion.circle cx={500} cy={380} r={24} fill="#22c55e" fillOpacity={0.15} stroke="#22c55e" strokeWidth={2} />
                <motion.text x={500} y={377} textAnchor="middle" fill="#22c55e" fontSize={9} fontFamily="system-ui, sans-serif">
                  PORT
                </motion.text>
                <motion.text x={500} y={392} textAnchor="middle" fill="#22c55e" fontSize={14} fontWeight="bold" fontFamily="monospace">
                  3000
                </motion.text>
              </motion.g>

              {/* Network isolation note */}
              <motion.rect
                x={530}
                y={310}
                width={200}
                height={30}
                rx={6}
                fill="#334155"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              />
              <motion.text
                x={630}
                y={330}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                Isolated Network Namespace
              </motion.text>
            </motion.g>

            {/* Bottom explanation */}
            <motion.text
              x={400}
              y={470}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Traffic to host:8080 is forwarded to container:3000
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
