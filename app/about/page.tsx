"use client"

import Link from "next/link"
import Image from "next/image"
import { useSoundContext } from "@/contexts/sound-context"
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock"

export default function AboutPage() {
  const { playWelcome } = useSoundContext()
  
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="flex w-full items-center justify-between px-4 py-[0.425rem] backdrop-blur-[20px]"
          style={{ backgroundColor: "rgba(176, 176, 176, 0.2)" }}
        >
          {/* Left - Logo/Name - Hidden on mobile */}
          <Link 
            href="/" 
            onClick={() => playWelcome()}
            className="hidden md:block text-xs font-bold text-black transition-colors hover:text-black"
          >
            Foundry
          </Link>

          {/* Mobile - Navigation Links - Centered */}
          <nav className="flex md:hidden w-full items-center justify-center gap-x-12">
            <Link 
              href="/components" 
              onClick={() => playWelcome()}
              className="text-xs font-bold text-black/40 transition-colors hover:text-black"
            >
              Components
            </Link>
            <Link 
              href="/docs" 
              onClick={() => playWelcome()}
              className="text-xs font-bold text-black/40 transition-colors hover:text-black"
            >
              Docs
            </Link>
            <Link 
              href="/about" 
              onClick={() => playWelcome()}
              className="text-xs font-bold text-black/40 transition-colors hover:text-black"
            >
              About
            </Link>
          </nav>

          {/* Desktop - Navigation Links and Time */}
          <div className="hidden md:flex items-center gap-x-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-x-24 md:mr-16 lg:mr-32 xl:mr-38">
              <Link 
                href="/components" 
                onClick={() => playWelcome()}
                className="text-xs font-bold text-black/40 transition-colors hover:text-black"
              >
                Components
              </Link>
              <Link 
                href="/docs" 
                onClick={() => playWelcome()}
                className="text-xs font-bold text-black/40 transition-colors hover:text-black"
              >
                Docs
              </Link>
              <Link 
                href="/about" 
                onClick={() => playWelcome()}
                className="text-xs font-bold text-black/40 transition-colors hover:text-black"
              >
                About
              </Link>
            </nav>

            {/* Mute Button and Live Time */}
            <HeaderSoundAndClock />
          </div>

          {/* Mobile - Mute and Live Time */}
          <div className="flex md:hidden">
            <HeaderSoundAndClock />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col pt-20 pb-4">
        <div className="w-full min-h-[calc(100vh-8rem)] px-4">
          <div className="flex flex-col gap-12 max-w-7xl">
            {/* About Section */}
            <div className="max-w-7xl">
              <p 
                className="font-semibold"
                style={{
                  fontFamily: '"Neue Haas Grotesk Display Pro 65 Medium", "Neue Haas Grotesk Display Pro 65 Medium Placeholder", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '0px',
                  lineHeight: '100%',
                  color: 'rgb(153, 153, 153)'
                }}
              >
                Foundry is an open <span style={{ color: 'rgb(0, 0, 0)' }}>shadcn/ui component registry</span> — a curated set of <span style={{ color: 'rgb(0, 0, 0)' }}>animation-first React components</span> built with Motion and Tailwind CSS. Install any component into your project with a single <span style={{ color: 'rgb(0, 0, 0)' }}>npx shadcn add</span> command. The source code is copied directly into your codebase — no runtime dependency on Foundry, no packages to keep in sync. Modify the components however you want.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-black/60">Contact</h2>
              <div className="flex flex-col items-start leading-none gap-0">
                <a href="mailto:hello@euler.fyi" className="text-xs font-bold text-black transition-colors hover:text-black/70">
                  hello@euler.fyi
                </a>
                <a href="https://github.com/javierfyi" className="-mt-0.5 text-xs font-bold text-black transition-colors hover:text-black/70">
                  @javierfyi
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
