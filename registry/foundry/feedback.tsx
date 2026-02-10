"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hook for detecting clicks outside of a referenced element
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>, // ← FIXED: Accept nullable refs
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

/**
 * Simple loading dots - no custom CSS required!
 */
function LoadingDots() {
  return (
    <span className="flex items-center gap-0.5">
      Sending
      <span className="flex">
        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
          .
        </span>
        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>
          .
        </span>
        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>
          .
        </span>
      </span>
    </span>
  );
}

type FeedbackState = "idle" | "loading" | "success" | "error";

export interface FeedbackProps {
  /**
   * Callback fired when feedback is submitted
   * Should return a Promise that resolves on success or rejects on error
   */
  onSubmit: (feedback: string) => Promise<void>;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Text for the trigger button
   * @default "Feedback"
   */
  buttonText?: string;

  /**
   * Icon to show before button text
   */
  buttonIcon?: React.ReactNode;

  /**
   * Placeholder text for the textarea
   * @default "Share your feedback..."
   */
  placeholder?: string;

  /**
   * Maximum character length
   * @default 500
   */
  maxLength?: number;

  /**
   * Success message title
   * @default "Feedback received!"
   */
  successTitle?: string;

  /**
   * Success message description
   * @default "Thanks for helping us improve."
   */
  successMessage?: string;

  /**
   * Error message to show on submit failure
   * @default "Failed to submit feedback. Please try again."
   */
  errorMessage?: string;

  /**
   * How long to show success state before auto-closing (ms)
   * Set to 0 to disable auto-close
   * @default 3300
   */
  successDuration?: number;

  /**
   * Submit button text
   * @default "Send feedback"
   */
  submitText?: string;

  /**
   * Custom class for the trigger button
   */
  triggerClassName?: string;

  /**
   * Custom class for the popover
   */
  popoverClassName?: string;

  /**
   * Show character counter
   * @default true
   */
  showCharacterCounter?: boolean;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
}

const defaultTriggerClass =
  "flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 text-sm font-medium outline-none transition-all hover:border-neutral-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700";

const defaultPopoverClass =
  "absolute h-48 w-[364px] overflow-hidden rounded-xl bg-neutral-100 p-1 shadow-lg dark:bg-neutral-900";

/**
 * Feedback - A polished feedback form with morphing animation
 *
 * Built for shadcn/ui registry - zero custom CSS required!
 *
 * Features:
 * - Button morphs into popover with smooth layoutId animation
 * - Character counter with live updates
 * - Loading state with animated dots (no custom CSS!)
 * - Success animation with staggered elements
 * - Error handling with retry
 * - Full keyboard support (Escape, Cmd+Enter)
 * - Accessible with proper ARIA labels
 * - Dark mode support
 *
 * @example
 * ```tsx
 * <Feedback
 *   onSubmit={async (feedback) => {
 *     await fetch('/api/feedback', {
 *       method: 'POST',
 *       body: JSON.stringify({ feedback })
 *     });
 *   }}
 * />
 * ```
 */
export function Feedback({
  onSubmit,
  onOpenChange,
  buttonText = "Feedback",
  buttonIcon,
  placeholder = "Share your feedback...",
  maxLength = 500,
  successTitle = "Feedback received!",
  successMessage = "Thanks for helping us improve.",
  errorMessage = "Failed to submit feedback. Please try again.",
  successDuration = 3300,
  submitText = "Send feedback",
  triggerClassName,
  popoverClassName,
  showCharacterCounter = true,
  open: controlledOpen,
  defaultOpen,
}: FeedbackProps) {
  const [formState, setFormState] = React.useState<FeedbackState>("idle");
  const [feedback, setFeedback] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setFormState("idle");
        setFeedback("");
        setError(null);
      }, 300);
    }
  };

  useOnClickOutside(ref, () => setOpen(false), open && formState !== "loading");

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && formState !== "loading") setOpen(false);
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "Enter" &&
        formState === "idle" &&
        feedback.trim()
      ) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState, feedback]);

  useEffect(() => {
    if (open && textareaRef.current && formState === "idle") {
      textareaRef.current.focus();
    }
  }, [open, formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || formState === "loading") return;
    setFormState("loading");
    setError(null);
    try {
      await onSubmit(feedback);
      setFormState("success");
      if (successDuration > 0) setTimeout(() => setOpen(false), successDuration);
    } catch (err) {
      setFormState("error");
      setError(err instanceof Error ? err.message : errorMessage);
    }
  };

  const defaultIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 transition-colors"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 8.25H16.5M7.5 12H13.5M21 12C21 16.9706 16.9706 21 12 21C10.2733 21 8.66722 20.4791 7.32333 19.5815L3 21L4.41848 16.6767C3.52094 15.3328 3 13.7267 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            layoutId="feedback-wrapper"
            key="feedback-button"
            onClick={() => {
              setOpen(true);
              setFormState("idle");
              setFeedback("");
              setError(null);
            }}
            className={cn(defaultTriggerClass, triggerClassName)}
            style={{ borderRadius: 8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
          >
            <motion.span layoutId="feedback-title" className="flex items-center gap-2">
              {buttonIcon ?? defaultIcon}
              {buttonText}
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            layoutId="feedback-wrapper"
            key="feedback-popover"
            ref={ref}
            className={cn(defaultPopoverClass, popoverClassName)}
            style={{ borderRadius: 12 }}
          >
            <motion.span
              aria-hidden
              layoutId="feedback-title"
              className="absolute left-3.5 top-3 flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400"
              data-success={formState === "success" ? "true" : "false"}
              data-feedback={feedback ? "true" : "false"}
            >
              {buttonIcon ?? defaultIcon}
              {buttonText}
            </motion.span>

            {/* Nested AnimatePresence prevents button content from disappearing */}
            <AnimatePresence mode="popLayout">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="flex h-full flex-col items-center justify-center px-6 pt-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.4, delay: 0.1 }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="-mt-1"
                    >
                      <path
                        d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        fill="#2090FF"
                        fillOpacity="0.16"
                      />
                      <path
                        d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                        stroke="#2090FF"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-1 mt-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100"
                  >
                    {successTitle}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    {successMessage}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  onSubmit={handleSubmit}
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white pt-10 dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <textarea
                    ref={textareaRef}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value.slice(0, maxLength))}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    required
                    disabled={formState === "loading"}
                    aria-label="Feedback message"
                    className="flex-1 resize-none border-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-600"
                  />

                  <div className="relative flex h-12 items-center border-t border-dashed border-neutral-200 px-2.5 dark:border-neutral-800">
                    {/* Decorative half-circles */}
                    <div className="absolute -left-[3px] top-0 -translate-y-1/2">
                      <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
                        <path
                          d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                          className="fill-neutral-100 dark:fill-neutral-900"
                        />
                        <path
                          d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                          className="stroke-neutral-200 dark:stroke-neutral-800"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="absolute -right-[3px] top-0 -translate-y-1/2 rotate-180">
                      <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
                        <path
                          d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                          className="fill-neutral-100 dark:fill-neutral-900"
                        />
                        <path
                          d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                          className="stroke-neutral-200 dark:stroke-neutral-800"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="flex w-full items-center justify-between px-1">
                      {showCharacterCounter && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: feedback.length > 0 ? 1 : 0 }}
                          className="font-mono text-xs text-neutral-400 dark:text-neutral-600"
                        >
                          {feedback.length}/{maxLength}
                        </motion.span>
                      )}

                      <button
                        type="submit"
                        disabled={!feedback.trim() || formState === "loading"}
                        className="ml-auto flex h-7 min-w-[104px] items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-blue-500 to-blue-600 px-3 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={formState}
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                            className="flex items-center justify-center"
                          >
                            {formState === "loading" ? <LoadingDots /> : submitText}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>

                  {formState === "error" && error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}