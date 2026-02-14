import Link from "next/link";
import { lessons } from "@/lib/lessons";

export default function LessonsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">All Lessons</h1>
      <p className="text-text-muted mb-8">
        Work through each lesson in order to build a solid understanding of
        Docker.
      </p>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/lessons/${lesson.slug}`}
            className="block rounded-xl border border-border-color bg-card-bg p-6 hover:border-docker-blue/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-docker-blue/15 text-docker-blue font-bold text-sm shrink-0">
                {lessons.indexOf(lesson) + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-docker-light-blue transition-colors">
                  {lesson.title}
                </h2>
                <p className="text-text-muted text-sm mt-1">
                  {lesson.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
