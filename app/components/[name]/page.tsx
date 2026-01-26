import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const componentsData: Record<
  string,
  {
    title: string
    description: string
    code: string
  }
> = {
  "magnetic-button": {
    title: "Magnetic Button",
    description: "A button that follows your cursor with a magnetic effect. Uses Framer Motion for smooth animations.",
    code: `"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        className
      )}
    >
      {children}
    </motion.button>
  )
}`,
  },
  "shimmer-text": {
    title: "Shimmer Text",
    description: "Text with an animated shimmer gradient effect. Great for headlines and attention-grabbing text.",
    code: `import { cn } from "@/lib/utils"

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      style={{
        animation: "shimmer 2s linear infinite",
      }}
    >
      {children}
      <style>{\`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      \`}</style>
    </span>
  )
}`,
  },
  "glow-card": {
    title: "Glow Card",
    description: "A card with a glowing border that follows your cursor. Creates an eye-catching hover effect.",
    code: `"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = ref.current!.getBoundingClientRect()
    setPosition({ x: e.clientX - left, y: e.clientY - top })
    setOpacity(1)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(400px circle at \${position.x}px \${position.y}px, hsl(var(--primary) / 0.15), transparent 40%)\`,
        }}
      />
      {children}
    </div>
  )
}`,
  },
  typewriter: {
    title: "Typewriter",
    description: "Animated typewriter text effect with customizable speed. Perfect for hero sections and landing pages.",
    code: `"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 50, className }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={cn("", className)}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}`,
  },
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const component = componentsData[name]

  if (!component) {
    notFound()
  }

  const registryUrl = `https://foundry.dev/r/${name}.json`
  const installCommand = `npx shadcn add ${registryUrl}`

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Link
          href="/components"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to components
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            {component.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {component.description}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
            <code className="text-sm text-muted-foreground">
              {installCommand}
            </code>
            <CopyButton value={installCommand} />
          </div>

          <Button variant="outline" asChild>
            <a
              href={`https://v0.dev/chat?q=${encodeURIComponent(`Add the ${component.title} component from ${registryUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Open in v0
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-border bg-card p-8">
              <ComponentPreview name={name} />
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <div className="relative rounded-lg border border-border bg-card">
              <div className="absolute right-4 top-4">
                <CopyButton value={component.code} />
              </div>
              <pre className="overflow-x-auto p-6">
                <code className="text-sm text-foreground">{component.code}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ComponentPreview({ name }: { name: string }) {
  switch (name) {
    case "magnetic-button":
      return (
        <div className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
          Hover me
        </div>
      )
    case "shimmer-text":
      return (
        <div
          className="bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-4xl font-bold text-transparent"
          style={{ animation: "shimmer 2s linear infinite" }}
        >
          Shimmer Text
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      )
    case "glow-card":
      return (
        <div className="h-32 w-48 rounded-xl border border-primary/30 bg-card p-4 shadow-lg shadow-primary/20">
          <p className="text-sm text-muted-foreground">Hover to see glow</p>
        </div>
      )
    case "typewriter":
      return (
        <div className="font-mono text-2xl">
          <span className="text-foreground">Hello World</span>
          <span className="animate-pulse text-primary">|</span>
        </div>
      )
    default:
      return <div className="text-muted-foreground">Preview not available</div>
  }
}
