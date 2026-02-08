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
  {
    name: "typing-text",
    title: "Typing Text",
    description: "A typing text animation. Highly customizable and easy to use.",
    id: "foundry-typing",
    size: "normal",
    previewType: "typewriter",
    code: `"use client"

import React, { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TypingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  delay?: number
  holdDelay?: number
  loop?: boolean
  className?: string
  children?: React.ReactNode
}

export function TypingText({
  text,
  delay = 0.05,
  holdDelay = 1,
  loop = true,
  className,
  children,
  ...props
}: TypingTextProps) {
  const [visibleLength, setVisibleLength] = useState(0)

  useEffect(() => {
    if (text.length === 0) return
    let timeout: ReturnType<typeof setTimeout>
    const typeNext = (index: number) => {
      if (index <= text.length) {
        setVisibleLength(index)
        if (index < text.length) {
          timeout = setTimeout(() => typeNext(index + 1), delay * 1000)
        } else if (loop) {
          timeout = setTimeout(() => {
            setVisibleLength(0)
            timeout = setTimeout(() => typeNext(1), delay * 1000)
          }, holdDelay * 1000)
        }
      }
    }
    timeout = setTimeout(() => typeNext(1), delay * 1000)
    return () => clearTimeout(timeout)
  }, [text, delay, holdDelay, loop])

  return (
    <motion.div className={cn("inline-flex items-baseline flex-wrap", className)} {...props}>
      <span>{text.slice(0, visibleLength)}</span>
      {children}
    </motion.div>
  )
}

export function TypingTextCursor({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn("inline-block h-4 w-0.5 rounded-full bg-current ml-0.5 align-baseline", className)}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden
    />
  )
}`,
  },
  {
    name: "animated-number",
    title: "Animated Number",
    description: "A number that animates smoothly to a new value using spring physics.",
    id: "foundry-number",
    size: "normal",
    previewType: "button",
    code: `"use client"

import { cn } from "@/lib/utils"
import { motion, type SpringOptions, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"

export type AnimatedNumberProps = {
  value: number
  className?: string
  springOptions?: SpringOptions
  as?: React.ElementType
}

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}: AnimatedNumberProps) {
  const MotionComponent =
    typeof as === "string"
      ? (motion as unknown as Record<string, React.ComponentType>)[as] ?? motion.span
      : motion.span

  const spring = useSpring(value, springOptions)
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  )
}`,
  },
]

// Helper function to get component by name
export function getComponentByName(name: string): ComponentData | undefined {
  return componentsData.find((component) => component.name === name)
}
