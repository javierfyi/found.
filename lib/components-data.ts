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
    imageUrl: "/images/animated-stack.png",
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
    name: "magnetic-button",
    title: "Magnetic Button",
    description: "A button that follows your cursor with a magnetic effect. Uses Framer Motion for smooth animations.",
    id: "foundry2",
    size: "normal",
    previewType: "button",
    code: `"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        className
      )}
    >
      {children}
    </motion.button>
  )
}`,
  },
  {
    name: "shimmer-text",
    title: "Shimmer Text",
    description: "Text with an animated shimmer gradient effect. Great for headlines and attention-grabbing text.",
    id: "foundry3",
    size: "normal",
    previewType: "text",
    code: `import { cn } from "@/lib/utils"

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      style={{
        animation: "shimmer 2s linear infinite",
      }}
    >
      {children}
      <style>{\`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      \`}</style>
    </span>
  )
}`,
  },
  {
    name: "glow-card",
    title: "Glow Card",
    description: "A card with a glowing border that follows your cursor. Creates an eye-catching hover effect.",
    id: "foundry4",
    size: "normal",
    previewType: "card",
    code: `"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = ref.current!.getBoundingClientRect()
    setPosition({ x: e.clientX - left, y: e.clientY - top })
    setOpacity(1)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(400px circle at \${position.x}px \${position.y}px, hsl(var(--primary) / 0.15), transparent 40%)\`,
        }}
      />
      {children}
    </div>
  )
}`,
  },
  {
    name: "typewriter",
    title: "Typewriter",
    description: "Animated typewriter text effect with customizable speed. Perfect for hero sections and landing pages.",
    id: "foundry5",
    size: "normal",
    previewType: "typewriter",
    code: `"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 50, className }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={cn("", className)}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}`,
  },
]

// Helper function to get component by name
export function getComponentByName(name: string): ComponentData | undefined {
  return componentsData.find((component) => component.name === name)
}
