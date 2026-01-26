"use client"

import React from "react"

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
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
