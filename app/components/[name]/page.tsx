"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { getComponentByName } from "@/lib/components-data"
import { ComponentPreview } from "@/components/component-card"
import { useSoundContext } from "@/contexts/sound-context"
import { useEffect, useState } from "react"
import { AnimatedStack } from "@/registry/foundry/animated-stack"
import { ShimmeringText } from "@/registry/foundry/shimmering-text"

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

export default function ComponentDetailPage() {
  const params = useParams()
  const name = params.name as string
  const component = getComponentByName(name)
  const pathname = `/components/${name}`
  const { playWelcome } = useSoundContext()

  if (!component) {
    notFound()
  }

  const registryUrl = `https://foundry.dev/r/${name}.json`
  const installCommand = `npx shadcn add ${registryUrl}`

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

            {/* Live Time */}
            <div className="min-w-[100px] text-right text-xs font-bold text-black/40">
              <LiveClock />
            </div>
          </div>

          {/* Mobile - Live Time */}
          <div className="flex md:hidden text-xs font-bold text-black/40">
            <LiveClock />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-32 pt-24">
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
            <PreviewSection component={component} />
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            {component.code ? (
              <div className="relative rounded-lg border border-border bg-card">
                <div className="absolute right-4 top-4">
                  <CopyButton value={component.code} />
                </div>
                <pre className="overflow-x-auto p-6">
                  <code className="text-sm text-foreground">{component.code}</code>
                </pre>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">Code not available for this component</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function PreviewSection({ component }: { component: ReturnType<typeof getComponentByName> }) {
  if (!component) return null

  // Render the actual component if it exists
  if (component.name === "animated-stack") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <AnimatedStack />
        </div>
      </div>
    )
  }

  if (component.name === "shimmering-text") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <ShimmeringText text="Shimmering Text" className="text-2xl font-bold" duration={1.5} repeatDelay={1} />
        </div>
      </div>
    )
  }

  // Otherwise, show the interactive preview based on previewType
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
      <div className="relative h-full w-full max-w-2xl overflow-hidden rounded-lg bg-[#f5f5f5]">
        <div className="flex h-full w-full items-center justify-center">
          <ComponentPreview type={component.previewType} />
        </div>
      </div>
    </div>
  )
}
