"use client"

import { HeroSection } from "@/components/hero-section"
import Link from "next/link"
import { useEffect, useState } from "react"

function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const period = hours >= 12 ? "p.m." : "a.m."
      const displayHours = hours % 12 || 12
      setTime(`${displayHours}:${minutes}:${seconds} ${period}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span>{time}</span>
}

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="flex w-full items-center justify-between px-4 py-[0.425rem] backdrop-blur-[20px]"
          style={{ backgroundColor: "rgba(176, 176, 176, 0.2)" }}
        >
          {/* Left - Logo/Name - Hidden on mobile */}
          <Link href="/" className="hidden md:block text-xs font-bold text-black transition-colors hover:text-black">
            Foundry
          </Link>

          {/* Mobile - Navigation Links - Centered */}
          <nav className="flex md:hidden w-full items-center justify-center gap-x-12">
            <Link href="/components" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
              Components
            </Link>
            <Link href="/docs" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
              Docs
            </Link>
            <Link href="/pricing" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
              Pricing
            </Link>
          </nav>

          {/* Desktop - Navigation Links and Time */}
          <div className="hidden md:flex items-center gap-x-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-x-24 md:mr-16 lg:mr-32 xl:mr-38">
              <Link href="/components" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
                Components
              </Link>
              <Link href="/docs" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
                Docs
              </Link>
              <Link href="/pricing" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
                Pricing
              </Link>
            </nav>

            {/* Live Time */}
            <div className="min-w-[100px] text-right text-xs font-bold text-black/50">
              <LiveClock />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Center */}
      <main className="flex flex-1 items-center justify-center pt-12">
        <HeroSection />
      </main>

      {/* Footer */}
      <footer className="flex w-full items-end gap-x-20 px-4 py-4 text-xs">
        {/* Left - Copyright */}
        <div className="w-[50%] lg:w-[55%] font-bold text-black">
          © 2026 Foundry
        </div>

        {/* Center - Social Links */}
        <div className="flex flex-1 flex-col items-start leading-none gap-0">
          <a href="https://github.com" target="_blank" rel="noopener" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
            LinkedIn
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
            Pinterest
          </a>
        </div>

        {/* Right - Contact */}
        <div className="flex flex-1 flex-col items-start leading-none gap-0">
          <a href="mailto:hello@foundry.dev" target="_blank" rel="noopener" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
            hello@foundry.dev
          </a>
          <a href="tel:+1234567890" target="_blank" rel="noopener" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
            (+1) 234 567 890
          </a>
        </div>
      </footer>
    </div>
  )
}
