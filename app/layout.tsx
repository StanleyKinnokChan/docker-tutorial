import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docker Tutorial - Learn Docker Visually",
  description:
    "An interactive, animated tutorial to learn Docker concepts visually with hands-on examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-bg border-b border-border-color">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and title */}
              <Link href="/" className="flex items-center gap-3 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="w-8 h-8 fill-docker-blue group-hover:fill-docker-light-blue transition-colors"
                >
                  <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-7.6 42.6-1.3 98.4 29.5 137.1C62.7 463 114.6 488 186.3 488c150.4 0 261.8-69.2 314-207.9 21.1 .4 66.6 .1 89.8-44.4 1.5-2.5 6-12.4 7.7-16.1l-8.4-5.6zM187.5 249.5h-66.1v59.4h66.1v-59.4zm-78.2 0h-66.1v59.4h66.1v-59.4zm78.2-72.1h-66.1v60.1h66.1v-60.1zm-78.2 0H43.2v60.1h66.1v-60.1z" />
                </svg>
                <span className="text-lg font-semibold text-foreground group-hover:text-docker-light-blue transition-colors">
                  Docker Tutorial
                </span>
              </Link>

              {/* Navigation links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-text-muted hover:text-docker-light-blue transition-colors text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/lessons"
                  className="text-text-muted hover:text-docker-light-blue transition-colors text-sm font-medium"
                >
                  Lessons
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content with top padding to account for fixed nav */}
        <main className="pt-16 min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border-color bg-nav-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-text-muted text-sm">
                &copy; {new Date().getFullYear()} Docker Tutorial. Built with
                Next.js, Tailwind CSS &amp; Framer Motion.
              </p>
              <p className="text-text-muted text-sm">
                Built by{" "}
                <a
                  href="https://www.linkedin.com/in/staneykinnok-chan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-docker-blue hover:text-docker-light-blue font-medium transition-colors"
                >
                  Stanley Chan
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
