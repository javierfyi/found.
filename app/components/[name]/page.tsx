"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { InstallationSection, ApiReferenceSection } from "@/components/component-docs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { getComponentByName } from "@/lib/components-data"
import { ComponentPreview } from "@/components/component-card"
import { useSoundContext } from "@/contexts/sound-context"
import { useEffect, useState } from "react"
import { AnimatedStack } from "@/registry/foundry/animated-stack"
import { ShimmeringText } from "@/registry/foundry/shimmering-text"
import { TypingText, TypingTextCursor } from "@/registry/foundry/typing-text"
import { AnimatedNumberDemo } from "@/registry/foundry/animated-number"
import { HoverCard } from "@/registry/foundry/hover-card"
import { Feedback } from "@/registry/foundry/feedback"
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock"
import { getComponentSource } from "./actions"

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
  const [sourceCode, setSourceCode] = useState<string | null>(null)

  useEffect(() => {
    getComponentSource(name).then(setSourceCode)
  }, [name])

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
        </div>

        {/* Preview / Code tabs */}
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <PreviewSection component={component} />
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            {sourceCode ? (
              <div className="relative rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-sm text-muted-foreground">
                    components/{name}.tsx
                  </span>
                  <CopyButton value={sourceCode} />
                </div>
                <pre className="overflow-x-auto p-6">
                  <code className="text-sm text-foreground">{sourceCode}</code>
                </pre>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">Loading source code...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Installation */}
        <InstallationSection
          name={name}
          installCommand={installCommand}
          dependencies={component.dependencies}
          sourceCode={sourceCode}
        />

        {/* Usage */}
        {component.example && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Usage</h2>
            <div className="relative rounded-lg border border-border bg-card">
              <div className="absolute right-4 top-4">
                <CopyButton value={component.example} />
              </div>
              <pre className="overflow-x-auto p-6">
                <code className="text-sm text-foreground">{component.example}</code>
              </pre>
            </div>
          </div>
        )}

        {/* API Reference */}
        {component.apiReference && component.apiReference.length > 0 && (
          <ApiReferenceSection entries={component.apiReference} />
        )}
      </main>
    </div>
  )
}

function PreviewSection({ component }: { component: ReturnType<typeof getComponentByName> }) {
  if (!component) return null

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

  if (component.name === "typing-text") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <TypingText
            text="Typing Text component made with Motion. Highly customizable and easy to use."
            delay={0.05}
            holdDelay={1}
            loop
            className="text-4xl font-semibold"
          >
            <TypingTextCursor className="!h-8 !w-1 rounded-full ml-1" />
          </TypingText>
        </div>
      </div>
    )
  }

  if (component.name === "animated-number") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <AnimatedNumberDemo />
        </div>
      </div>
    )
  }

  if (component.name === "hover-card") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <HoverCard
            href="#"
            title="Hover Card"
            description="A card that reveals its description on hover with a smooth slide-up animation."
            image="/images/hongwei-fan-wGdXZE8jTp8-unsplash.jpg"
          />
        </div>
      </div>
    )
  }

  if (component.name === "feedback") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <Feedback
            onSubmit={async (feedback) => {
              await new Promise((r) => setTimeout(r, 800))
              console.log("Feedback:", feedback)
            }}
            buttonText="Feedback"
            placeholder="Share your feedback..."
            submitText="Send feedback"
          />
        </div>
      </div>
    )
  }

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
