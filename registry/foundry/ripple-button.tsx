"use client"

import React from "react"

import { useState, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface Ripple {
  x: number
  y: number
  id: number
}

export function RippleButton({ children, className, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)

    props.onClick?.(e)
  }

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
      <style jsx>{`
        @keyframes ripple {
          from {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </button>
  )
}
