"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { InstallationSection, ApiReferenceSection, KeepInMindSection, ComponentContactSection } from "@/components/component-docs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { getComponentByName } from "@/lib/components-data"
import { useSoundContext } from "@/contexts/sound-context"
import { useEffect, useState } from "react"
import { AnimatedStack } from "@/registry/foundry/animated-stack"
import { ShimmeringText } from "@/registry/foundry/shimmering-text"
import { TypingText, TypingTextCursor } from "@/registry/foundry/typing-text"
import { AnimatedNumberDemo } from "@/registry/foundry/animated-number"
import { HoverCard } from "@/registry/foundry/hover-card"
import { Feedback } from "@/registry/foundry/feedback"
import { ProgressiveBlur } from "@/registry/foundry/progressive-blur"
import { ArrowTooltip, ArrowTooltipTrigger, ArrowTooltipContent } from "@/registry/foundry/arrow-tooltip"
import { ChatInput } from "@/registry/foundry/chat-input"
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock"
import { CodeBlock } from "@/components/code-block"
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

  const registryUrl = `https://euler.fyi/r/${name}.json`
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
          <div className="flex items-start justify-between gap-4">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {component.title}
            </h1>
            <div className="flex items-center gap-1 pt-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                }}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Copy link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${component.title} from Foundry`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')
                }}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Share on X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {component.description}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
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
              <div className="relative">
                <div className="flex items-center justify-between rounded-t-2xl border border-b-0 border-border bg-muted/50 px-4 py-2">
                  <span className="text-sm text-muted-foreground">
                    components/{name}.tsx
                  </span>
                  <CopyButton value={sourceCode} />
                </div>
                <div className="max-h-[500px] overflow-auto rounded-b-2xl border border-border bg-muted/50">
                  <CodeBlock code={sourceCode} className="rounded-none border-0" />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-muted p-8 text-center">
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
            <div className="relative">
              <div className="absolute right-4 top-4 z-10">
                <CopyButton value={component.example} />
              </div>
              <CodeBlock code={component.example} />
            </div>
          </div>
        )}

        {/* API Reference */}
        {component.apiReference && component.apiReference.length > 0 && (
          <ApiReferenceSection entries={component.apiReference} />
        )}

        {/* Keep in Mind + Contact */}
        <KeepInMindSection />
        <ComponentContactSection />
      </main>
    </div>
  )
}

function PreviewSection({ component }: { component: ReturnType<typeof getComponentByName> }) {
  if (!component) return null

  if (component.name === "animated-stack") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <AnimatedStack />
        </div>
      </div>
    )
  }

  if (component.name === "shimmering-text") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <ShimmeringText text="Shimmering Text" className="text-2xl font-bold" duration={1.5} repeatDelay={1} />
        </div>
      </div>
    )
  }

  if (component.name === "typing-text") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <TypingText
            text="Hello, world!"
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
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <AnimatedNumberDemo />
        </div>
      </div>
    )
  }

  if (component.name === "hover-card") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
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
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
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

  if (component.name === "arrow-tooltip") {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <ArrowTooltip>
            <ArrowTooltipTrigger>
              <button className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
                Hover me
              </button>
            </ArrowTooltipTrigger>
            <ArrowTooltipContent>
              Arrow tooltip content
            </ArrowTooltipContent>
          </ArrowTooltip>
        </div>
      </div>
    )
  }

  if (component.name === "progressive-blur") {
    return (
      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-2xl bg-muted text-black/40">
        <ProgressiveBlur position="top" backgroundColor="#f5f4f3" />
        <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" />
        <div className="flex h-[500px] w-full flex-col items-center overflow-scroll">
          <div className="mt-42 grid content-start justify-items-center gap-6 text-center text-black">
            <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
              Scroll down to see the effect
            </span>
          </div>
          <div className="mt-24 w-full max-w-lg space-y-20 px-5 text-justify">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae
                voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat
                cumque laudantium libero reprehenderit perferendis quo nulla
                voluptate? Repellat tenetur labore exercitationem dicta libero
                voluptate suscipit, iusto ea assumenda. Ipsa enim, quidem atque
                modi error eaque, debitis perferendis, hic iste libero dignissimos
                ea! Quod inventore beatae aspernatur nulla rem perferendis aperiam
                at debitis delectus odit quia animi ex mollitia vero molestias
                itaque deleniti, quos exercitationem consequatur assumenda dolor?
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (component.name === "chat-input") {
    return (
      <div className="flex min-h-[500px] items-end justify-center rounded-2xl bg-muted p-8 pb-12">
        <ChatInput />
      </div>
    )
  }

  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-muted p-8">
      <p className="text-xl font-semibold text-black/30">{component.title}</p>
    </div>
  )
}
