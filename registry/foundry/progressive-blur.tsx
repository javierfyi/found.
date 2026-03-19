import React from "react"
import { cn } from "@/lib/utils"

interface ProgressiveBlurProps {
  /** Additional CSS classes for the container */
  className?: string
  /** Background color for the gradient blend */
  backgroundColor?: string
  /** Position of the blur effect */
  position?: "top" | "bottom"
  /** Height of the blur area */
  height?: string
  /** Intensity of the backdrop blur */
  blurAmount?: string
}

export function ProgressiveBlur({
  className,
  backgroundColor = "#f5f4f3",
  position = "top",
  height = "150px",
  blurAmount = "4px",
}: ProgressiveBlurProps) {
  const isTop = position === "top"

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 w-full select-none",
        className
      )}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: `linear-gradient(to ${isTop ? "top" : "bottom"}, transparent, ${backgroundColor})`,
        maskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, ${backgroundColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  )
}
