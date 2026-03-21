"use client";

import { ComponentCard } from "@/components/component-card";
import { Search, GraduationCap, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSoundContext } from "@/contexts/sound-context";
import { componentsData } from "@/lib/components-data";
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock";

type SortOrder = "asc" | "desc";

export default function ComponentsPage() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const { playClick, playHover, playWelcome } = useSoundContext();

  const filteredComponents = componentsData
    .filter((component) =>
      component.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice()
    .sort((a, b) => {
      const cmp = a.title.localeCompare(b.title, undefined, {
        sensitivity: "base",
      });
      return sortOrder === "asc" ? cmp : -cmp;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className="flex w-full items-center justify-between px-3 py-2 md:px-4 md:py-[0.425rem] backdrop-blur-[20px]"
          style={{ backgroundColor: "rgba(176, 176, 176, 0.2)" }}
        >
          {/* Left - Logo/Name */}
          <Link
            href="/"
            onClick={() => playWelcome()}
            className={`text-xs font-bold transition-colors hover:text-black ${
              pathname === "/" ? "text-black" : "text-black/40"
            }`}
          >
            Foundry
          </Link>

          {/* Mobile - Navigation Links - Centered */}
          <nav className="flex md:hidden items-center justify-center gap-x-6">
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

          {/* Mobile - Mute and Live Time */}
          <div className="flex md:hidden">
            <HeaderSoundAndClock />
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

        {/* Masonry Grid or Empty State */}
        {filteredComponents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xs font-bold text-black/40 mb-2">
              No components found
            </p>
            <p className="text-xs font-bold text-black/20">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {filteredComponents.map((component) => (
              <div key={component.name}>
                <ComponentCard {...component} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Fade Overlay */}
        <div className="pointer-events-none fixed bottom-0 z-20 hidden h-24 w-full lg:block">
          <div
            aria-hidden="true"
            className="fade_root fixed bottom-0 z-20 h-24 w-full"
            data-side="bottom"
            style={
              {
                "--stop": "25%",
                "--blur": "6px",
                "--background": "var(--color-background)",
              } as React.CSSProperties
            }
          />
        </div>

        {/* Floating Toolbar */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-5">
          <div className="flex w-full flex-wrap items-center gap-2">
            {/* Search */}
            <div
              className={`flex h-[45px] w-full items-center justify-start gap-2 rounded-[13px] border border-muted bg-muted px-4 py-2 shadow-glass transition-[width] duration-200 ease-out ${isSearchFocused ? "md:w-[240px]" : "md:w-[200px]"}`}
            >
              <Search className="h-4 w-4 shrink-0 text-black/40" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setIsSearchFocused(true);
                  playHover();
                }}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full border-none bg-transparent text-xs font-bold text-black/40 outline-none placeholder:text-black/40"
              />
            </div>

            {/* Sort */}
            <div className="flex h-[45px] w-full items-center justify-between gap-2 rounded-[13px] border border-muted bg-muted py-2 pl-4 pr-2 shadow-glass md:w-fit">
              <div className="flex items-center gap-2 pr-2">
                <GraduationCap className="h-4 w-4 text-black/40" />
                <p className="text-xs font-bold text-black/40">Sort</p>
              </div>
              <button
                type="button"
                title="A → Z"
                className={`flex h-full items-center justify-center rounded-lg px-2 transition-opacity hover:bg-foreground/5 ${sortOrder === "asc" ? "text-foreground" : "text-foreground/20"}`}
                onMouseDown={() => {
                  playClick();
                  setSortOrder("asc");
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                title="Z → A"
                className={`relative flex h-full items-center justify-center rounded-lg px-2 transition-opacity hover:bg-foreground/5 ${sortOrder === "desc" ? "text-foreground" : "text-foreground/20"}`}
                onMouseDown={() => {
                  playClick();
                  setSortOrder("desc");
                }}
              >
                <svg
                  className="rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
