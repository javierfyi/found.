'use client';

import React from "react"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
}

export function GradientText({
  children,
  className,
  from = "#3b82f6",
  via,
  to = "#8b5cf6",
  animate = false,
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(to right, ${from}, ${via}, ${to})`
    : `linear-gradient(to right, ${from}, ${to})`

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
      style={{
        backgroundImage: gradient,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </span>
  )
}
