"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { lessons } from "@/lib/lessons";

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-docker-blue text-white p-3 rounded-full shadow-lg hover:bg-docker-light-blue transition-colors"
        aria-label="Toggle lesson sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-16 left-0 z-40
          w-72 h-[calc(100vh-4rem)] overflow-y-auto
          bg-sidebar-bg border-r border-border-color
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4 px-3">
            Lessons
          </h2>
          <nav className="flex flex-col gap-1">
            {lessons.map((lesson) => {
              const href = `/lessons/${lesson.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={lesson.slug}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                    ${
                      isActive
                        ? "bg-docker-blue/15 text-docker-light-blue border-l-2 border-docker-blue"
                        : "text-text-muted hover:text-foreground hover:bg-card-bg"
                    }
                  `}
                >
                  <span
                    className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0
                      ${
                        isActive
                          ? "bg-docker-blue text-white"
                          : "bg-card-bg text-text-muted"
                      }
                    `}
                  >
                    {lessons.indexOf(lesson) + 1}
                  </span>
                  <span>{lesson.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
