"use client"

import { HeroSection } from "@/components/hero-section"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { DecorativeIcons } from "@/components/decorative-icons"
import { useSoundContext } from "@/contexts/sound-context"
import { VolumeIcon, type VolumeIconHandle } from "@/components/volume-icon"
import { motion } from "framer-motion"

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
  const pathname = usePathname()
  const { isMuted, toggleMute, playClick, playToggle, playWelcome } = useSoundContext()
  const volumeIconRef = useRef<VolumeIconHandle>(null)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  
  useEffect(() => {
    if (volumeIconRef.current) {
      if (isMuted) {
        volumeIconRef.current.stopAnimation()
      } else {
        volumeIconRef.current.startAnimation()
      }
    }
  }, [isMuted])

  // Show welcome modal on first load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("foundry-welcome-seen")
    if (!hasSeenWelcome) {
      // Small delay to ensure sound plays when modal appears
      const timer = setTimeout(() => {
        setShowWelcomeModal(true)
        playWelcome()
        localStorage.setItem("foundry-welcome-seen", "true")
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [playWelcome])

  const handleToggleMute = () => {
    toggleMute()
    playToggle()
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="flex w-full items-center justify-between px-4 py-[0.425rem] backdrop-blur-[20px]"
          style={{ backgroundColor: "rgba(176, 176, 176, 0.2)" }}
        >
          {/* Left - Logo/Name - Hidden on mobile */}
          <Link href="/" className={`hidden md:block text-xs font-bold transition-colors hover:text-black ${
            pathname === "/" ? "text-black" : "text-black/40"
          }`}>
            Foundry
          </Link>

          {/* Mobile - Navigation Links - Centered */}
          <nav className="flex md:hidden w-full items-center justify-center gap-x-12">
            <Link href="/components" className={`text-xs font-bold transition-colors hover:text-black ${
              pathname === "/components" ? "text-black" : "text-black/40"
            }`}>
              Components
            </Link>
            <Link href="/docs" className={`text-xs font-bold transition-colors hover:text-black ${
              pathname === "/docs" ? "text-black" : "text-black/40"
            }`}>
              Docs
            </Link>
            <Link href="/about" className={`text-xs font-bold transition-colors hover:text-black ${
              pathname === "/about" ? "text-black" : "text-black/40"
            }`}>
              About
            </Link>
          </nav>

          {/* Desktop - Navigation Links and Time */}
          <div className="hidden md:flex items-center gap-x-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-x-24 md:mr-16 lg:mr-32 xl:mr-38">
              <Link href="/components" className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/components" ? "text-black" : "text-black/40"
              }`}>
                Components
              </Link>
              <Link href="/docs" className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/docs" ? "text-black" : "text-black/40"
              }`}>
                Docs
              </Link>
              <Link href="/about" className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/about" ? "text-black" : "text-black/40"
              }`}>
                About
              </Link>
            </nav>

            {/* Mute Button and Live Time */}
            <div className="flex items-center gap-x-1">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-xs font-bold text-black/50 transition-colors hover:text-black"
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                <VolumeIcon ref={volumeIconRef} size={14} />
              </button>
              <div className="min-w-[100px] text-right text-xs font-bold text-black/40">
                <LiveClock />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Center */}
      <main className="flex flex-1 items-center justify-center pt-12">
        <HeroSection />
         {/* <DecorativeIcons />  */}
      </main>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
          className="fixed right-4 top-20 z-50 w-full max-w-sm"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              mass: 0.8,
            }}
            className="relative rounded-2xl bg-background border border-border p-6 shadow-lg"
          >
            <motion.button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute right-4 top-4 text-black/40 hover:text-black transition-colors"
              aria-label="Close welcome modal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="text-xl font-bold text-black mb-3 pr-8"
            >
              Welcome to Foundry
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="text-sm text-black/60 mb-4"
            >
              Your component library for building beautiful interfaces. Get started by exploring our components or check out the docs.
            </motion.p>
            <motion.button
              onClick={() => setShowWelcomeModal(false)}
              className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      )}

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
