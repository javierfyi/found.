"use client";

import { HeroSection } from "@/components/hero-section";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DecorativeIcons } from "@/components/decorative-icons";
import { useSoundContext } from "@/contexts/sound-context";
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock";

export default function HomePage() {
  const pathname = usePathname();
  const { playClick, playWelcome } = useSoundContext();

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
            className={`hidden md:block text-xs font-bold transition-colors hover:text-black ${
              pathname === "/" ? "text-black" : "text-black/40"
            }`}
          >
            Foundry
          </Link>

          {/* Mobile - Navigation Links - Centered */}
          <nav className="flex md:hidden w-full items-center justify-center gap-x-12">
            <Link
              href="/components"
              onClick={() => playWelcome()}
              className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/components" ? "text-black" : "text-black/40"
              }`}
            >
              Components
            </Link>
            <Link
              href="/docs"
              onClick={() => playWelcome()}
              className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/docs" ? "text-black" : "text-black/40"
              }`}
            >
              Docs
            </Link>
            <Link
              href="/about"
              onClick={() => playWelcome()}
              className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/about" ? "text-black" : "text-black/40"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Mobile - Mute and Live Time */}
          <div className="flex md:hidden">
            <HeaderSoundAndClock />
          </div>

          {/* Desktop - Navigation Links and Time */}
          <div className="hidden md:flex items-center gap-x-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-x-24 md:mr-16 lg:mr-32 xl:mr-38">
              <Link
                href="/components"
                onClick={() => playWelcome()}
                className={`text-xs font-bold transition-colors hover:text-black ${
                  pathname === "/components" ? "text-black" : "text-black/40"
                }`}
              >
                Components
              </Link>
              <Link
                href="/docs"
                onClick={() => playWelcome()}
                className={`text-xs font-bold transition-colors hover:text-black ${
                  pathname === "/docs" ? "text-black" : "text-black/40"
                }`}
              >
                Docs
              </Link>
              <Link
                href="/about"
                onClick={() => playWelcome()}
                className={`text-xs font-bold transition-colors hover:text-black ${
                  pathname === "/about" ? "text-black" : "text-black/40"
                }`}
              >
                About
              </Link>
            </nav>

            {/* Mute Button and Live Time */}
            <HeaderSoundAndClock />
          </div>
        </div>
      </header>

      {/* Main Content - Center */}
      <main className="relative flex flex-1 items-center justify-center pt-12">
        <DecorativeIcons />
        <HeroSection />
      </main>

      {/* Welcome Modal - Commented out for now */}

      {/* Footer */}
      <footer className="flex w-full items-end gap-x-20 px-4 py-4 text-xs">
        {/* Left - Copyright */}
        <div className="w-[50%] lg:w-[55%] font-bold text-black">
          © 2026 Foundry
        </div>

        {/* Center - Social Links */}
        <div className="flex flex-1 flex-col items-start leading-none gap-0">
          <a
            href="https://instagram.com/byeulerrr"
            target="_blank"
            rel="noopener"
            className="text-xs font-bold text-black/40 transition-colors hover:text-black"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/in/byeulerrr"
            target="_blank"
            rel="noopener"
            className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black"
          >
            LinkedIn
          </a>
          <a
            href="https://pinterest.com/byeulerrr"
            target="_blank"
            rel="noopener"
            className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black"
          >
            Pinterest
          </a>
        </div>

        {/* Right - Contact */}
        <div className="flex flex-1 flex-col items-start leading-none gap-0">
          <a
            href="mailto:hello@byeuler.org"
            target="_blank"
            rel="noopener"
            className="text-xs font-bold text-black/40 transition-colors hover:text-black"
          >
            hello@byeuler.org
          </a>
          <a
            href="tel:+1234567890"
            target="_blank"
            rel="noopener"
            className="-mt-0.5 text-xs font-bold text-black/40 transition-colors hover:text-black"
          >
            (+1) 234 567 890
          </a>
        </div>
      </footer>
    </div>
  );
}
