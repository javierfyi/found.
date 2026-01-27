"use client"

import Link from "next/link"
import Image from "next/image"
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

export default function AboutPage() {
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

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-4 pt-20 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-8rem)]">
          {/* Left Column - Bio, Contact, Portrait, Copyright */}
          <div className="flex flex-col gap-12">
            {/* Biography Section */}
            <div className="max-w-2xl">
              <p className="text-sm leading-relaxed text-black/60">
                Hi, i'm a <span className="font-bold text-black">digital designer</span> based in Amsterdam, currently working at <span className="font-bold text-black">Higuita</span>. I work across projects from startups to established brands, bringing a blend of visual design and motion. Whether I'm crafting sleek interfaces, dynamic brand identities, or engaging animations, I focus on creating thoughtful, visually striking experiences that stand out across digital platforms.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-black/60">Contact</h2>
              <div className="flex flex-col items-start leading-none gap-0">
                <a href="mailto:e.planeix@gmail.com" className="text-xs font-bold text-black transition-colors hover:text-black/70">
                  e.planeix@gmail.com
                </a>
                <a href="tel:+31621613350" className="-mt-0.5 text-xs font-bold text-black transition-colors hover:text-black/70">
                  (+31) 6 216 133 50
                </a>
                <a href="https://instagram.com/eplaneix" className="-mt-0.5 text-xs font-bold text-black transition-colors hover:text-black/70">
                  @eplaneix
                </a>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="mt-auto">
              <div className="relative w-full aspect-square max-w-sm">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Copyright */}
            <div className="text-xs font-bold text-black">
              © 2025 Etienne Planeix
            </div>
          </div>

          {/* Right Column - Social Links and Contact (Bottom Right) */}
          <div className="flex flex-col justify-end items-start lg:items-end pb-4">
            <div className="flex flex-col items-start leading-none gap-0">
              <a href="https://instagram.com/eplaneix" target="_blank" rel="noopener" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
                Instagram
              </a>
              <a href="https://linkedin.com/in/etienne-planeix" target="_blank" rel="noopener" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
                Linkedin
              </a>
              <a href="https://behance.net/thatfrenchguy" target="_blank" rel="noopener" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
                Behance
              </a>
            </div>

            <div className="flex flex-col items-start leading-none gap-0 mt-6">
              <a href="mailto:e.planeix@gmail.com" className="text-xs font-bold text-black/40 transition-colors hover:text-black">
                e.planeix@gmail.com
              </a>
              <a href="tel:+31621613350" className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black">
                (+31) 6 216 133 50
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
