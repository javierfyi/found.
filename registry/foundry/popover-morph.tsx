"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";

/**
 * Hook for detecting clicks outside of a referenced element
 * Replaces usehooks-ts dependency
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
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
 * Animation variants for smooth transitions
 */
const ANIMATION_VARIANTS = {
  button: {
    scale: {
      hover: 1.02,
      tap: 0.98,
    },
    transition: {
      type: "spring" as const,
      duration: 0.3,
      bounce: 0.2,
    },
  },
} as const;

export interface PopoverMorphProps {
  /**
   * The trigger element (button content when closed)
   */
  trigger: React.ReactNode;

  /**
   * The popover content (shown when open)
   */
  children: React.ReactNode;

  /**
   * Whether the popover is open (controlled)
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether clicking outside closes the popover
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether pressing Escape closes the popover
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Custom class for the trigger button
   */
  triggerClassName?: string;

  /**
   * Custom class for the popover container
   */
  popoverClassName?: string;

  /**
   * Border radius for button state (in pixels)
   * @default 8
   */
  buttonRadius?: number;

  /**
   * Border radius for popover state (in pixels)
   * @default 12
   */
  popoverRadius?: number;

  /**
   * Layout ID for Framer Motion shared layout animation
   * @default "popover-morph"
   */
  layoutId?: string;

  /**
   * Disable button hover/tap animations
   * @default false
   */
  disableButtonAnimation?: boolean;

  /**
   * Callback fired when popover is fully closed (after animation)
   */
  onClose?: () => void;

  /**
   * Callback fired when popover is fully opened (after animation)
   */
  onOpen?: () => void;
}

/**
 * PopoverMorph - A button that morphs into a popover with smooth animations
 *
 * This component uses Framer Motion's layout animations to create a smooth
 * morphing effect between a button and popover state. Perfect for feedback forms,
 * quick actions, or any content that expands from a button.
 *
 * @example
 * ```tsx
 * <PopoverMorph
 *   trigger={<span>Click me</span>}
 *   onOpenChange={(open) => console.log('Open state:', open)}
 * >
 *   <div className="p-4">
 *     <h3>Popover Content</h3>
 *     <p>Any content here!</p>
 *   </div>
 * </PopoverMorph>
 * ```
 */
export function PopoverMorph({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  triggerClassName = "",
  popoverClassName = "",
  buttonRadius = 8,
  popoverRadius = 12,
  layoutId = "popover-morph",
  disableButtonAnimation = false,
  onClose,
  onOpen,
}: PopoverMorphProps) {
  // Support both controlled and uncontrolled modes
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const popoverRef = useRef<HTMLDivElement>(null);

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);

    // Fire open/close callbacks
    if (newOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  // Handle click outside
  useOnClickOutside(popoverRef, () => setOpen(false), closeOnClickOutside && open);

  // Handle Escape key
  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, open]);

  const buttonAnimationProps = disableButtonAnimation
    ? {}
    : {
        whileHover: { scale: ANIMATION_VARIANTS.button.scale.hover },
        whileTap: { scale: ANIMATION_VARIANTS.button.scale.tap },
        transition: ANIMATION_VARIANTS.button.transition,
      };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="trigger"
            layoutId={layoutId}
            onClick={() => setOpen(true)}
            className={triggerClassName}
            style={{ borderRadius: buttonRadius }}
            {...buttonAnimationProps}
          >
            {trigger}
          </motion.button>
        ) : (
          <motion.div
            key="popover"
            ref={popoverRef}
            layoutId={layoutId}
            className={popoverClassName}
            style={{ borderRadius: popoverRadius }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-export the hook for use in custom implementations
export { useOnClickOutside };
