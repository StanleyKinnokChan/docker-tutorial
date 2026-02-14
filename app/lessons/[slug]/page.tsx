import { getLessonBySlug, getAllLessonSlugs } from "@/lib/lessons";
import { notFound } from "next/navigation";
import LessonContent from "./LessonContent";

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lesson Not Found" };
  return {
    title: `${lesson.title} - Docker Tutorial`,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return <LessonContent lesson={lesson} />;
}
