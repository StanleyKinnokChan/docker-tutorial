"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface LessonStepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function LessonStepper({ steps, currentStep, onStepChange }: LessonStepperProps) {
  const [direction, setDirection] = useState(0);
  const totalSteps = steps.length;
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 100;

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      setDirection(step > currentStep ? 1 : -1);
      onStepChange(step);
    },
    [currentStep, totalSteps, onStepChange]
  );

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[#2496ED]"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="mb-8 flex items-center justify-center gap-1">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;

          return (
            <div key={i} className="flex items-center">
              <button
                onClick={() => goToStep(i)}
                className="group flex flex-col items-center gap-1.5"
              >
                <motion.div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                    isActive
                      ? "border-[#2496ED] bg-[#2496ED] text-white"
                      : isCompleted
                      ? "border-[#2496ED] bg-[#2496ED]/20 text-[#2496ED]"
                      : "border-white/20 bg-transparent text-white/40"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </motion.div>
                <span
                  className={`hidden text-[10px] sm:block ${
                    isActive ? "text-[#2496ED]" : "text-white/40"
                  }`}
                >
                  {step.title}
                </span>
              </button>

              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div
                  className={`mx-1 h-[2px] w-6 sm:w-10 ${
                    i < currentStep ? "bg-[#2496ED]" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="relative min-h-[200px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {steps[currentStep]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/70"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <span className="text-xs text-white/30">
          {currentStep + 1} / {totalSteps}
        </span>

        <button
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center gap-2 rounded-lg bg-[#2496ED] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2496ED]/80 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#2496ED]"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
