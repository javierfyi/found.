"use client"

import { Copy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const componentId = "foundry1"
  const installCommand = `npx shadcn add @foundry/${componentId}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden text-foreground">
      {/* Content - Centered */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 sm:px-10">
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          {/* Install Command */}
          <div
            className="group flex cursor-pointer items-center justify-center rounded-2xl bg-muted font-mono text-foreground"
            style={{ padding: "12px 20px" }}
            tabIndex={0}
            onClick={handleCopy}
          >
            <div className="flex items-center text-xs group-active:scale-[0.999] sm:text-sm lg:text-base">
              <span className="hidden sm:inline">npx shadcn add </span>
              <span className="sm:hidden">npx shadcn add </span>
              @foundry
              <span className="text-foreground/60">/{componentId}</span>
              <span className="hidden lg:block ml-2">
                <Copy className="size-4" />
              </span>
            </div>
          </div>

          {/* Quick Start Button */}
          <Link href="/components/foundry1" className="flex items-center justify-center">
            <div
              className="flex cursor-pointer items-center justify-center rounded-2xl bg-blue-500 text-xs font-medium text-white sm:text-[15px]"
              style={{ padding: "12px 20px" }}
              tabIndex={0}
            >
              Quick Start
            </div>
          </Link>
        </div>
      </div>

    </section>
  )
}
