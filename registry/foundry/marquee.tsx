'use client';

import React from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  speed?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex gap-4 overflow-hidden [--gap:1rem]",
        className
      )}
    >
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 gap-4",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </div>
      ))}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-100% - var(--gap))); }
          to { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
    </div>
  )
}
