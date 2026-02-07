export type ComponentPreviewType = "scrollbar" | "island" | "emoji" | "list" | "parallax" | "canvas" | "button" | "text" | "card" | "typewriter"

export interface ComponentData {
  name: string
  title: string
  description: string
  id: string
  size?: "normal" | "tall" | "wide"
  previewType: ComponentPreviewType
  isPro?: boolean
  imageUrl?: string
  videoUrl?: string
  code?: string
}

export const componentsData: ComponentData[] = [
  {
    name: "animated-stack",
    title: "Animated Stack",
    description: "An interactive stack of cards that expand and animate on hover with smooth spring animations",
    id: "foundry1",
    size: "tall",
    previewType: "card",
    code: `"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedStackProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedStack({ children, className }: AnimatedStackProps) {
  // Implementation here
  return <div className={cn("", className)}>{children}</div>
}`,
  },
  {
    name: "shimmering-text",
    title: "Shimmering Text",
    description: "A text component with beautiful shimmer animation effects that glide across the text.",
    id: "foundry-shimmer",
    size: "normal",
    previewType: "text",
    code: `"use client"

import React, { useMemo, useRef } from "react"
import { motion, useInView, type UseInViewOptions } from "motion/react"
import { cn } from "@/lib/utils"

interface ShimmeringTextProps {
  text: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  className?: string
  startOnView?: boolean
  once?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  spread?: number
  color?: string
  shimmerColor?: string
}

export function ShimmeringText({
  text,
  duration = 2,
  delay = 0,
  repeat = true,
  repeatDelay = 0.5,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  spread = 2,
  color,
  shimmerColor,
}: ShimmeringTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: inViewMargin })
  const dynamicSpread = useMemo(() => text.length * spread, [text, spread])
  const shouldAnimate = !startOnView || isInView

  return (
    <motion.span
      ref={ref}
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        "[--base-color:var(--color-zinc-400)] [--shimmer-color:var(--color-zinc-950)]",
        "[background-repeat:no-repeat,padding-box]",
        "[--shimmer-bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),var(--shimmer-color),transparent_calc(50%+var(--spread)))]",
        "dark:[--base-color:var(--color-zinc-600)] dark:[--shimmer-color:var(--color-white)]",
        className
      )}
      style={
        {
          "--spread": \`\${dynamicSpread}px\`,
          ...(color && { "--base-color": color }),
          ...(shimmerColor && { "--shimmer-color": shimmerColor }),
          backgroundImage: \`var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))\`,
        } as React.CSSProperties
      }
      initial={{ backgroundPosition: "100% center", opacity: 0 }}
      animate={shouldAnimate ? { backgroundPosition: "0% center", opacity: 1 } : {}}
      transition={{
        backgroundPosition: { repeat: repeat ? Infinity : 0, duration, delay, repeatDelay, ease: "linear" },
        opacity: { duration: 0.3, delay },
      }}
    >
      {text}
    </motion.span>
  )
}`,
  },
]

// Helper function to get component by name
export function getComponentByName(name: string): ComponentData | undefined {
  return componentsData.find((component) => component.name === name)
}
