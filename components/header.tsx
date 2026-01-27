"use client"

import Link from "next/link"
import { Command, Maximize2 } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSoundContext } from "@/contexts/sound-context"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const { playClick, playOpen, playClose } = useSoundContext()
  const [isMaximized, setIsMaximized] = useState(false)

  if (isHomePage) {
    // Minimal header for home page
    return (
      <header className="absolute top-0 left-0 right-0 z-10 w-full px-5 py-4">
        <nav className="flex w-full items-center justify-between">
          {/* Navigation Links - Light gray buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/about"
              className="rounded-lg bg-muted px-4 py-2 text-sm font-medium uppercase text-foreground transition-colors hover:bg-muted/80"
              onMouseDown={() => playClick()}
            >
              About
            </Link>
            <Link
              href="/components"
              className="rounded-lg bg-muted px-4 py-2 text-sm font-medium uppercase text-foreground transition-colors hover:bg-muted/80"
              onMouseDown={() => playClick()}
            >
              Components
            </Link>
          </div>

          {/* Action Button - Black button */}
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium uppercase text-background transition-colors hover:bg-foreground/90"
            >
              Cart (0)
            </button>
          </div>
        </nav>
        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-200" />
      </header>
    )
  }

  // Floating header for other pages
  return (
    <header className="fixed left-1/2 top-3 z-50 -translate-x-1/2 w-full max-w-[calc(100%-2rem)] px-4">
      <nav className="flex w-full items-center justify-between rounded-2xl border border-muted2 bg-muted px-5 py-2.5 pr-2.5 shadow-glass backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-2 py-1 text-sm font-semibold">
          <Image
            src="https://cdn.skiper-ui.com/logos/logo.svg"
            alt="Logo"
            width={24}
            height={24}
            className="size-6"
          />
          <Link href="/" className="text-foreground">
            FOUNDRY
          </Link>
        </div>

        {/* Navigation Links and Actions */}
        <div className="flex items-center gap-4 text-[13px]">
          <Link
            href="/about"
            className="hidden rounded-md opacity-50 outline-offset-4 outline-sky-500 transition-opacity hover:opacity-100 focus-visible:outline-1 md:block"
            onMouseDown={() => playClick()}
          >
            About
          </Link>
          <Link
            href="/components"
            className="hidden items-center gap-1 rounded-md text-foreground/50 outline-offset-4 outline-sky-500 transition-colors hover:text-foreground focus-visible:outline-1 md:flex"
            onMouseDown={() => playClick()}
          >
            Components
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Command Button */}
            <div className="flex size-8 items-center justify-center rounded-[12px] bg-muted4">
              <button
                type="button"
                className="flex size-full items-center justify-center rounded-2xl"
                aria-label="Command + K"
                onMouseDown={() => playClick()}
              >
                <span className="flex size-full cursor-pointer items-center justify-center transition-all ease-in-out active:scale-95">
                  <Command className="size-4" />
                </span>
                <span className="sr-only">Command + K</span>
              </button>
            </div>

            {/* Maximize Button */}
            <div className="flex size-8 items-center justify-center rounded-[12px] bg-muted4">
              <button
                type="button"
                className="flex size-full items-center justify-center"
                aria-label="Show Menu"
                onMouseDown={() => {
                  setIsMaximized(!isMaximized)
                  if (isMaximized) {
                    playClose()
                  } else {
                    playOpen()
                  }
                }}
              >
                <span className="flex size-full cursor-pointer items-center justify-center transition-all ease-in-out active:scale-95">
                  <Maximize2 className="size-4" />
                </span>
                <span className="sr-only">Show Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
