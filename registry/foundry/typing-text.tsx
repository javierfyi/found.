"use client"

import React, { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TypingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text to type out */
  text: string
  /** Delay between each character in seconds */
  delay?: number
  /** Pause at end before restart (when loop is true) in seconds */
  holdDelay?: number
  /** Whether to loop the animation */
  loop?: boolean
  /** Custom className */
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
    <motion.div
      className={cn("inline-flex items-baseline flex-wrap", className)}
      {...props}
    >
      <span>{text.slice(0, visibleLength)}</span>
      {children}
    </motion.div>
  )
}

interface TypingTextCursorProps {
  className?: string
}

export function TypingTextCursor({ className }: TypingTextCursorProps) {
  return (
    <motion.span
      className={cn("inline-block h-4 w-0.5 rounded-full bg-current ml-0.5 align-baseline", className)}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      aria-hidden
    />
  )
}
