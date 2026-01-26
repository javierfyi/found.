import React from "react"
import { cn } from "@/lib/utils"

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
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  )
}
