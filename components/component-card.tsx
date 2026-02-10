"use client"

import Link from "next/link"
import { BadgeDollarSign } from "lucide-react"
import { useSoundContext } from "@/contexts/sound-context"
import { AnimatedStack } from "@/registry/foundry/animated-stack"
import { ShimmeringText } from "@/registry/foundry/shimmering-text"
import { TypingText, TypingTextCursor } from "@/registry/foundry/typing-text"
import { AnimatedNumberDemo } from "@/registry/foundry/animated-number"
import { Feedback } from "@/registry/foundry/feedback"

interface ComponentCardProps {
  name: string
  title: string
  description: string
  id: string
  size?: "normal" | "tall" | "wide"
  previewType: "scrollbar" | "island" | "emoji" | "list" | "parallax" | "canvas" | "button" | "text" | "card" | "typewriter"
  isPro?: boolean
  imageUrl?: string
  videoUrl?: string
}

export function ComponentCard({
  name,
  title,
  id,
  size = "normal",
  previewType,
  isPro = false,
  imageUrl,
  videoUrl,
}: ComponentCardProps) {
  const { playClick, playHover } = useSoundContext()

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
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
          {/* Render actual component when available (add new names + import above) */}
          {name === "animated-stack" ? (
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="scale-[0.7] origin-center">
                <AnimatedStack />
              </div>
            </div>
          ) : name === "shimmering-text" ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              <ShimmeringText text="Shimmering Text" className="text-xl font-bold" duration={1.5} repeatDelay={1} />
            </div>
          ) : name === "typing-text" ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              <TypingText
                text="Typing Text"
                delay={0.05}
                holdDelay={1}
                loop
                className="text-lg font-semibold"
              >
                <TypingTextCursor className="!h-5 !w-0.5 rounded-full ml-0.5" />
              </TypingText>
            </div>
          ) : name === "animated-number" ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              <AnimatedNumberDemo />
            </div>
          ) : name === "feedback" ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              <Feedback
                onSubmit={async () => {}}
                buttonText="Feedback"
                successDuration={0}
              />
            </div>
          ) : imageUrl ? (
            <>
              <img
                className="h-full w-full object-cover"
                alt=""
                loading="lazy"
                src={imageUrl}
              />
              {videoUrl && (
                <video
                  className="absolute top-0 left-0 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity group-hover:opacity-100"
                  playsInline
                  preload="none"
                  loop
                  muted
                >
                  <source src={videoUrl} />
                </video>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ComponentPreview type={previewType} title={title} />
            </div>
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

export function ComponentPreview({
  type,
  title,
}: {
  type: ComponentCardProps["previewType"]
  title?: string
}) {
  switch (type) {
    case "scrollbar":
      return (
        <div className="w-full h-full bg-[#1a1a1a] p-5 overflow-hidden flex flex-col justify-between">
          {/* Text content */}
          <div className="space-y-0 font-sans text-[11px] leading-[1.6] text-[#888] text-justify">
            <p className="mb-0">
              soluta veritatis aspernatur odit assumenda odio sit, expedita culpa? Quia delectus doloremque iste porro obcaecati tempore ab molestiae blanditiis nam ducimus labore, mollitia quae unde animi quis iusto omnis sequi libero commodi.
            </p>
            <p className="mb-0">
              Quos enim quam nihil. Quis, nobis illo nam dolore ut labore distinctio odio fuga alias error repudiandae animi nihil voluptatibus voluptates dolorem delectus sequi pariatur aliquid.
            </p>
          </div>
          
          {/* Scrollbar indicator in middle */}
          <div className="flex items-center justify-center my-3">
            <div className="flex items-center">
              <span className="text-red-500 text-sm font-mono">|</span>
              <div className="h-2.5 w-32 bg-[#3a3a3a] rounded-sm flex items-center">
                <div className="h-full w-8 bg-[#666] rounded-sm" />
              </div>
            </div>
          </div>
          
          <div className="font-sans text-[11px] leading-[1.6] text-[#888] text-justify">
            <p>
              spernatur commodi earum veritatis quaerat facilis nihil libero laudantium, voluptate est corrupti sunt voluptatibus sed!
            </p>
          </div>
        </div>
      )

    case "island":
      return (
        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 rounded-[20px] bg-[#2a2a2a] px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-[11px] text-white/90 font-medium">0:02</span>
              </div>
              <span className="text-[10px] text-white/50">Recording Saved</span>
              <div className="h-8 w-8 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )

    case "emoji":
      return (
        <div className="w-full h-full bg-white p-4 grid grid-cols-6 gap-2 content-center">
          {["??", "??", "??", "??", "???", "??", "??", "??", "?", "??", "??", "???", "??", "??", "??", "??", "??", "??", "??", "??", "??", "?", "???", "?"].map((emoji, i) => (
            <div key={i} className="aspect-square flex items-center justify-center text-lg">
              {emoji}
            </div>
          ))}
        </div>
      )

    case "list":
      return (
        <div className="w-full h-full bg-[#1a1a1a] p-5 flex">
          {/* Left side - List */}
          <div className="flex-1 flex flex-col gap-0.5">
            {[
              { name: "Arjan Dhillon", active: false },
              { name: "Lost Horizons", active: false },
              { name: "Eternal Echoes", active: false },
              { name: "Abstract Dimensions", active: false },
              { name: "Silent Stories", active: false },
              { name: "Fading Memories", active: false },
              { name: "Karan Aujla", active: true },
              { name: "Shattered Glass", active: false },
              { name: "Timeless Essence", active: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-0.5">
                <span className={`text-[11px] ${item.active ? "text-white" : "text-white/30"}`}>
                  {item.name}
                </span>
                <span className="text-[9px] text-white/15 tracking-widest">----</span>
              </div>
            ))}
          </div>
          {/* Right side - Album art */}
          <div className="ml-3 flex items-end">
            <div className="h-24 w-20 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600" />
            </div>
          </div>
        </div>
      )

    case "parallax":
      return (
        <div className="w-full h-full bg-[#1a1a1a] flex flex-col relative overflow-hidden">
          {/* Top section with grayscale image */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#333] to-[#1a1a1a] opacity-50" />
          </div>
          {/* Bottom beige banner */}
          <div className="bg-[#f5f0e8] px-4 py-4 text-center">
            <span className="text-[15px] font-semibold tracking-[0.15em] text-[#1a1a1a] uppercase">
              MY PROJECT X
            </span>
            <div className="mt-1.5 flex justify-center">
              <div className="h-1 w-1 rounded-full bg-[#999]" />
            </div>
          </div>
        </div>
      )

    case "canvas":
      return (
        <div className="w-full h-full bg-[#1a1a1a] p-3">
          <div className="grid grid-cols-4 grid-rows-3 gap-1.5 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded overflow-hidden bg-[#2a2a2a]">
                <div className="w-full h-full bg-gradient-to-br from-[#3a3a3a] to-[#252525]" />
              </div>
            ))}
          </div>
        </div>
      )

    case "button":
      return (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Click me
          </button>
        </div>
      )

    case "text":
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title ?? "Shimmer Text"}</h3>
            <p className="text-gray-600">Animated text effect</p>
          </div>
        </div>
      )

    case "card":
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-6">
          <div className="w-full h-full rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded" />
              <div className="h-2 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      )

    case "typewriter":
      return (
        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center p-8">
          <div className="text-white font-mono text-lg">
            <span>Hello World</span>
            <span className="animate-pulse">|</span>
          </div>
        </div>
      )

    default:
      return (
        <div className="text-[13px] text-[#999]">
          Preview
        </div>
      )
  }
}
