"use client";

import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, icon, href, children }: CardProps) {
  const content = (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#1e1e2e] p-6 transition-colors hover:border-[#2496ED]/40"
      whileHover={{
        y: -4,
        boxShadow: "0 8px 30px rgba(36, 150, 237, 0.15)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#2496ED]/[0.05] to-transparent" />

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2496ED]/10 text-[#2496ED]">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-gray-400">{description}</p>

        {/* Children */}
        {children && <div className="mt-4">{children}</div>}

        {/* Link arrow indicator */}
        {href && (
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#2496ED] opacity-0 transition-opacity group-hover:opacity-100">
            Learn more
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}
