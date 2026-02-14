"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Lesson } from "@/lib/lessons";
import { lessons, getLessonIndex } from "@/lib/lessons";
import { globalCommands } from "@/lib/terminal-commands";
import Terminal from "@/components/Terminal";
import AnimationStage from "@/components/AnimationStage";
import ContainerAnimation from "@/components/animations/ContainerAnimation";
import ImageLayersAnimation from "@/components/animations/ImageLayersAnimation";
import DockerfileAnimation from "@/components/animations/DockerfileAnimation";
import BuildRunAnimation from "@/components/animations/BuildRunAnimation";
import ComposeAnimation from "@/components/animations/ComposeAnimation";
import NetworkingAnimation from "@/components/animations/NetworkingAnimation";
import VolumesAnimation from "@/components/animations/VolumesAnimation";
import MultiStageAnimation from "@/components/animations/MultiStageAnimation";
import OrchestrationAnimation from "@/components/animations/OrchestrationAnimation";
import ProductionAnimation from "@/components/animations/ProductionAnimation";

interface LessonContentProps {
  lesson: Lesson;
}

function getAnimationComponent(animation: string, step: number) {
  switch (animation) {
    case "container-vs-vm":
      return <ContainerAnimation step={step} />;
    case "image-layers":
      return <ImageLayersAnimation step={step} />;
    case "dockerfile":
      return <DockerfileAnimation step={step} />;
    case "build-run":
      return <BuildRunAnimation step={step} />;
    case "compose":
      return <ComposeAnimation step={step} />;
    case "networking":
      return <NetworkingAnimation step={step} />;
    case "volumes":
      return <VolumesAnimation step={step} />;
    case "multistage":
      return <MultiStageAnimation step={step} />;
    case "orchestration":
      return <OrchestrationAnimation step={step} />;
    case "production":
      return <ProductionAnimation step={step} />;
    default:
      return <div className="text-text-muted">Animation: {animation}</div>;
  }
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const lessonIndex = getLessonIndex(lesson.slug);
  const step = lesson.steps[currentStep];

  useEffect(() => {
    // Scroll handling removed to prevent page jumping on step changes
    // topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  const terminalCommands = useMemo(() => {
    return { ...globalCommands, ...(step.terminalCommands || {}) };
  }, [step]);

  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scroll anchor */}
      <div ref={topRef} />

      {/* Lesson header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-docker-blue mb-2">
          Lesson {lessonIndex + 1} of {lessons.length}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          {lesson.icon} {lesson.title}
        </h1>
        <p className="text-text-muted text-lg">{lesson.description}</p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-6">
        {lesson.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === currentStep
                ? "bg-docker-blue text-white"
                : i < currentStep
                ? "bg-docker-blue/20 text-docker-light-blue"
                : "bg-card-bg text-text-muted hover:bg-card-bg/80"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
              {i + 1}
            </span>
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-card-bg rounded-full h-1 mb-8">
        <motion.div
          className="bg-docker-blue h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep + 1) / lesson.steps.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step title */}
          <h2 className="text-2xl font-bold mb-4">{step.title}</h2>

          {/* Animation */}
          <AnimationStage
            title={step.title}
            description={`Step ${currentStep + 1} visualization`}
            controls
          >
            {getAnimationComponent(step.animation, currentStep)}
          </AnimationStage>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none mt-8 mb-8 text-foreground/90 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground [&_code]:text-docker-light-blue [&_code]:bg-card-bg [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-card-bg [&_pre]:p-4 [&_pre]:rounded-lg [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_em]:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: step.content }}
          />

          {/* Terminal */}
          {step.terminalCommands && Object.keys(step.terminalCommands).length > 0 && (
            <div className="mt-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Try it yourself
              </h3>
              <Terminal
                commands={terminalCommands}
                initialMessages={[
                  `Welcome to the Docker terminal simulator!`,
                  `Available commands for this step: ${Object.keys(step.terminalCommands).join(", ")}`,
                  `Type 'help' for more options.`,
                ]}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-color">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg border border-border-color text-text-muted hover:text-foreground hover:border-docker-blue transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous Step
        </button>

        <span className="text-sm text-text-muted">
          Step {currentStep + 1} of {lesson.steps.length}
        </span>

        {currentStep < lesson.steps.length - 1 ? (
          <button
            onClick={() =>
              setCurrentStep(Math.min(lesson.steps.length - 1, currentStep + 1))
            }
            className="px-4 py-2 rounded-lg bg-docker-blue text-white hover:bg-docker-light-blue transition-colors"
          >
            Next Step
          </button>
        ) : nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className="px-4 py-2 rounded-lg bg-docker-blue text-white hover:bg-docker-light-blue transition-colors"
          >
            Next Lesson &rarr;
          </Link>
        ) : (
          <span className="px-4 py-2 rounded-lg bg-green-600 text-white">
            Course Complete!
          </span>
        )}
      </div>

      {/* Lesson navigation */}
      <div className="flex items-center justify-between mt-4 text-sm">
        {prevLesson ? (
          <Link
            href={`/lessons/${prevLesson.slug}`}
            className="text-text-muted hover:text-docker-light-blue transition-colors"
          >
            &larr; {prevLesson.title}
          </Link>
        ) : (
          <span />
        )}
        {nextLesson && currentStep === lesson.steps.length - 1 ? (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className="text-text-muted hover:text-docker-light-blue transition-colors"
          >
            {nextLesson.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </motion.div>
  );
}
