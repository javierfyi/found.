"use client"

import { ComponentCard } from "@/components/component-card"
import { Search, GraduationCap, Plus, Code } from "lucide-react"
import { useState } from "react"

const components = [
  {
    name: "magnetic-button",
    title: "Anime js scrollbar",
    description: "A button that follows your cursor with a magnetic effect",
    id: "skiper1",
    size: "normal" as const,

    isPro: true,
  },
  {
    name: "shimmer-text",
    title: "Dynamic island",
    description: "Text with an animated shimmer gradient effect",
    id: "skiper2",
    size: "normal" as const,

    isPro: true,
  },
  {
    name: "glow-card",
    title: "Things drag and scroll",
    description: "A card with a glowing border that follows your cursor",
    id: "skiper5",
    size: "normal" as const,

    isPro: true,
  },
  {
    name: "typewriter",
    title: "Tik tik color list",
    description: "Animated typewriter text effect with customizable speed",
    id: "skiper24",
    size: "tall" as const,

    isPro: true,
  },
  {
    name: "parallax",
    title: "Siena parallax",
    description: "Smooth parallax scrolling effect",
    id: "skiper29",
    size: "tall" as const,

    isPro: true,
  },
  {
    name: "infinite-canvas",
    title: "Infinite canvas",
    description: "Infinite scrollable canvas with drag support",
    id: "skiper73",
    size: "normal" as const,

    isPro: true,
  },
]

export function ComponentGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "free" | "pro">("all")

  const filteredComponents = components.filter((component) =>
    component.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="relative pb-40">
      {/* Section Header */}
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex w-full flex-col items-start gap-[10px] pb-[20px] pt-[40px] text-left">
          <h2 className="relative text-2xl font-semibold tracking-tight">
            {"Out of the box".split(" ").map((word, i) => (
              <span key={i} className="mr-1 inline-block">
                {word}
              </span>
            ))}
            <span className="absolute top-0 pl-1 text-sm font-normal text-gray-500">
              [{filteredComponents.length}]
            </span>
          </h2>
          <p className="block text-sm tracking-[-0.16px] opacity-40 md:text-[15px] md:leading-[21px]">
            Collection of out of the box components [Hover to play video]
          </p>
        </div>
      </div>

      {/* Masonry Grid - 3 columns */}
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component, index) => (
            <div 
              key={component.name} 
              style={{ 
                gridRow: component.size === "tall" ? "span 2" : "span 1",
              }}
            >
              <ComponentCard {...component} />
            </div>
          ))}
        </div>
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
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/50"
            />
          </div>

          {/* Sort and Source Container */}
          <div className="flex h-[45px] w-full justify-between gap-2 md:w-fit">
            {/* Sort */}
            <div className="flex h-full w-full items-center justify-between gap-2 rounded-[13px] border border-muted bg-muted py-2 pl-4 pr-2 shadow-glass md:w-fit">
              <div className="flex items-center gap-2 pr-2">
                <GraduationCap className="h-4 w-4 text-foreground" />
                <p className="text-sm text-foreground">Sort</p>
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
                <Code className="h-4 w-4 text-foreground" />
                <p className="hidden text-sm text-foreground md:block">Source</p>
              </div>
              <button
                type="button"
                onClick={() => setFilterType(filterType === "free" ? "all" : "free")}
                className={`h-full rounded-lg px-2 text-sm transition-opacity hover:bg-foreground/5 ${
                  filterType === "free"
                    ? "text-foreground font-medium"
                    : "text-foreground/20"
                }`}
              >
                <p>Free</p>
              </button>
              <button
                type="button"
                onClick={() => setFilterType(filterType === "pro" ? "all" : "pro")}
                className={`h-full rounded-lg px-2 text-sm transition-opacity hover:bg-foreground/5 ${
                  filterType === "pro"
                    ? "text-foreground font-medium"
                    : "text-foreground/20"
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
            <Plus className="h-4 w-4 rotate-45 text-foreground" />
            <p className="text-sm text-foreground">Clear Filters</p>
          </button>
        </div>
      </div>
    </section>
  )
}
