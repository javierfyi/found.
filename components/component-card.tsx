"use client"

import { useRef } from "react"
import Link from "next/link"
import { BadgeDollarSign } from "lucide-react"
import { useSoundContext } from "@/contexts/sound-context"

interface ComponentCardProps {
  name: string
  title: string
  description: string
  id: string
  size?: "normal" | "tall" | "wide"
  isPro?: boolean
  videoUrl?: string
}

export function ComponentCard({
  name,
  title,
  id,
  size = "normal",
  isPro = false,
  videoUrl,
}: ComponentCardProps) {
  const { playClick, playHover } = useSoundContext()
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    videoRef.current?.play()
  }

  function handleMouseLeave() {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-muted bg-muted p-3 shadow-glass transition-colors hover:bg-muted/90 h-[280px]">
      {/* Premium Badge */}
      {isPro && (
        <div className="absolute right-5 top-5 z-10 flex size-8 items-center justify-end">
          <span className="group/icon flex size-6 items-center justify-center rounded-full bg-[#f5f4f3] text-black transition-colors hover:bg-white">
            <button type="button" className="flex items-center justify-center">
              <BadgeDollarSign className="h-[18px] w-[18px] stroke-[1.5px] transition-all duration-300 ease-in-out group-hover/icon:scale-105" />
              <span className="sr-only">Premium Component</span>
            </button>
          </span>
        </div>
      )}

      {/* Preview Section */}
      <Link
        aria-label={title}
        href={`/components/${name}`}
        className="relative w-full flex-1 overflow-hidden"
        onMouseDown={() => playClick()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
          {/* Base: centered descriptive text */}
          <div className="flex h-full w-full items-center justify-center p-6">
            <p className="text-xl font-semibold text-black/30 text-center">{title}</p>
          </div>

          {/* Video overlay — fades in on hover */}
          {videoUrl && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              playsInline
              preload="metadata"
              loop
              muted
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      </Link>

      {/* Title Section */}
      <div className="flex items-center justify-between gap-2 px-2 pt-2">
        <p className="text-xs font-bold text-black/40">{title}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-black/40">{id}</span>
        </div>
      </div>
    </div>
  )
}

