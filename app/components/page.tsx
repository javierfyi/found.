"use client"

import { ComponentCard } from "@/components/component-card"
import { Search, GraduationCap, Plus, Code } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

const components = [
  {
    name: "magnetic-button",
    title: "Magnetic Button",
    description: "A button that follows your cursor with a magnetic effect",
    id: "foundry1",
    size: "normal" as const,
    previewType: "button" as const,
  },
  {
    name: "shimmer-text",
    title: "Shimmer Text",
    description: "Text with an animated shimmer gradient effect",
    id: "foundry2",
    size: "normal" as const,
    previewType: "text" as const,
  },
  {
    name: "glow-card",
    title: "Glow Card",
    description: "A card with a glowing border that follows your cursor",
    id: "foundry3",
    size: "tall" as const,
    previewType: "card" as const,
  },
  {
    name: "typewriter",
    title: "Typewriter",
    description: "Animated typewriter text effect with customizable speed",
    id: "foundry4",
    size: "normal" as const,
    previewType: "typewriter" as const,
  },
  {
    name: "badge",
    title: "Badge",
    description: "Simple badge component for labels and tags",
    id: "foundry5",
    size: "normal" as const,
    previewType: "button" as const,
  },
  {
    name: "alert",
    title: "Alert",
    description: "Alert component for displaying important messages",
    id: "foundry6",
    size: "normal" as const,
    previewType: "card" as const,
  },
  {
    name: "avatar",
    title: "Avatar",
    description: "Avatar component for user profile pictures",
    id: "foundry7",
    size: "normal" as const,
    previewType: "button" as const,
  },
  {
    name: "separator",
    title: "Separator",
    description: "Visual separator component for dividing content",
    id: "foundry8",
    size: "normal" as const,
    previewType: "text" as const,
  },
  {
    name: "skeleton",
    title: "Skeleton",
    description: "Loading skeleton component for better UX",
    id: "foundry9",
    size: "normal" as const,
    previewType: "card" as const,
  },
  {
    name: "tooltip",
    title: "Tooltip",
    description: "Tooltip component for additional information",
    id: "foundry10",
    size: "normal" as const,
    previewType: "button" as const,
  },
]

export default function ComponentsPage() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "free" | "pro">("all")

  const filteredComponents = components.filter((component) =>
    component.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
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
            <Link href="/pricing" className={`text-xs font-bold transition-colors hover:text-black ${
              pathname === "/pricing" ? "text-black" : "text-black/40"
            }`}>
              Pricing
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
              <Link href="/pricing" className={`text-xs font-bold transition-colors hover:text-black ${
                pathname === "/pricing" ? "text-black" : "text-black/40"
              }`}>
                Pricing
              </Link>
            </nav>

            {/* Live Time */}
            <div className="min-w-[100px] text-right text-xs font-bold text-black/40">
              <LiveClock />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-32 pt-24">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex w-full flex-col items-start gap-[10px] pb-[20px] pt-[40px] text-left">
            <h1 className="relative text-sm font-bold text-black/99">
              {"All Components".split(" ").map((word, i) => (
                <span key={i} className="mr-1 inline-block">
                  {word}
                </span>
              ))}
              <span className="absolute top-0 pl-1 text-xs font-semibold text-black/40">
                [{filteredComponents.length}]
              </span>
            </h1>
            <p className="block text-xs font-semibold text-black/40 tracking-[-0.025em]">
              Collection of out of the box components [Hover to play video]
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filteredComponents.map((component) => (
            <div key={component.name} className="mb-5 break-inside-avoid">
              <ComponentCard {...component} />
            </div>
          ))}
        </div>

        {/* Bottom Fade Overlay */}
        <div className="pointer-events-none fixed bottom-0 z-20 hidden h-24 w-full lg:block">
          <div
            aria-hidden="true"
            className="fade_root fixed bottom-0 z-20 h-24 w-full"
            data-side="bottom"
            style={{
              "--stop": "25%",
              "--blur": "6px",
              "--background": "var(--color-background)",
            } as React.CSSProperties}
          />
        </div>

        {/* Floating Toolbar */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-5">
          <div className="flex w-full flex-wrap items-center gap-2">
            {/* Search */}
            <div className="flex h-[45px] w-full items-center justify-start gap-2 rounded-[13px] border border-muted bg-muted px-4 py-2 shadow-glass md:w-fit">
              <Search className="h-4 w-4 shrink-0 text-black/40" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-transparent text-xs font-bold text-black/40 outline-none placeholder:text-black/40"
              />
            </div>

            {/* Sort and Source Container */}
            <div className="flex h-[45px] w-full justify-between gap-2 md:w-fit">
              {/* Sort */}
              <div className="flex h-full w-full items-center justify-between gap-2 rounded-[13px] border border-muted bg-muted py-2 pl-4 pr-2 shadow-glass md:w-fit">
                <div className="flex items-center gap-2 pr-2">
                  <GraduationCap className="h-4 w-4 text-black/40" />
                  <p className="text-xs font-bold text-black/40">Sort</p>
                </div>
                <button
                  type="button"
                  className="flex h-full items-center justify-center rounded-lg px-2 text-foreground/20 transition-opacity hover:bg-foreground/5"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="relative flex h-full items-center justify-center rounded-lg px-2 text-foreground/20 transition-opacity hover:bg-foreground/5"
                >
                  <svg className="rotate-180" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Source */}
              <div className="flex h-full w-full items-center gap-2 rounded-[13px] border border-muted bg-muted px-2 py-2 shadow-glass md:w-fit">
                <div className="flex items-center gap-2 pl-2 pr-4">
                  <Code className="h-4 w-4 text-black/40" />
                  <p className="hidden text-xs font-bold text-black/40 md:block">Source</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterType(filterType === "free" ? "all" : "free")}
                  className={`h-full rounded-lg px-2 text-xs font-bold transition-opacity hover:bg-foreground/5 ${
                    filterType === "free"
                      ? "text-black/40"
                      : "text-black/20"
                  }`}
                >
                  <p>Free</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType(filterType === "pro" ? "all" : "pro")}
                  className={`h-full rounded-lg px-2 text-xs font-bold transition-opacity hover:bg-foreground/5 ${
                    filterType === "pro"
                      ? "text-black/40"
                      : "text-black/20"
                  }`}
                >
                  <p>Pro</p>
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setFilterType("all")
              }}
              className="flex items-center gap-2 opacity-20 transition-opacity hover:opacity-80 lg:ml-2"
            >
              <Plus className="h-4 w-4 rotate-45 text-black/40" />
              <p className="text-xs font-bold text-black/40">Clear Filters</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
