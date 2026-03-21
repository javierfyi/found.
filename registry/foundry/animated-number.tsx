"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  type SpringOptions,
  useSpring,
  useTransform,
} from "motion/react";

export type AnimatedNumberProps = {
  /** The number to be animated */
  value: number;
  /** Optional CSS class for styling the number container */
  className?: string;
  /** Spring options from motion for the animation */
  springOptions?: SpringOptions;
  /** The HTML tag to render the number in */
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}: AnimatedNumberProps) {
  const MotionComponent =
    typeof as === "string"
      ? ((motion as unknown as { [k: string]: React.ComponentType })[as] ??
        motion.span)
      : motion.span;

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}

/** Demo: cycles through values so the number animates in the preview */
export function AnimatedNumberDemo() {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const sequence = [0, 100, 500, 1000, 2500, 0];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % sequence.length;
      setValue(sequence[i]);
    }, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatedNumber
      value={value}
      className="text-4xl font-semibold tabular-nums"
      springOptions={{ stiffness: 100, damping: 20 }}
    />
  );
}
