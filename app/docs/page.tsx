"use client"

import { Copy, Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useSoundContext } from "@/contexts/sound-context"
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock"
import { componentsData } from "@/lib/components-data"

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const { playCopy } = useSoundContext()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    playCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-muted bg-muted">
      <div className="flex items-center justify-between border-b border-muted2 px-4 py-1.5">
        <span className="text-xs font-bold text-black/40">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-black/40 transition-colors hover:text-black"
          aria-label="Copy code"
        >
          <Copy 
            className={`size-4 transition-all duration-200 ease ${copied ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
          />
          <Check 
            className={`absolute size-4 transition-all duration-200 ease ${copied ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          />
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-xs font-bold text-black/40">{code}</code>
      </pre>
    </div>
  )
}

export default function DocsPage() {
  const pathname = usePathname()
  const { playWelcome } = useSoundContext()
  
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
      <main className="container mx-auto px-4 pb-16 pt-24">
        <div className="mx-auto max-w-2xl">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="mb-4 text-xs font-bold text-black">
              Docs
            </h1>
            <p className="text-xs font-bold text-black/40">
              Foundry was born out of a training given to a school. It is not
              open to the public — access is by registration only. If you want
              access, use &quot;Request access&quot; on any component page to
              register.
            </p>
          </div>

          {/* Request Access / Registration Section */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Register for access
            </h2>
            <p className="text-xs font-bold text-black/40">
              Foundry is a private registry. If you&apos;d like access, go to any
              component page and click &quot;Request access&quot; to submit your
              email. We&apos;ll get back to you when you&apos;re approved. Once
              you&apos;re in, you&apos;ll see install commands and the Code tab on
              each component page.
            </p>
          </section>

          {/* Installation Section (for those with access) */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Installation (with access)
            </h2>
            <p className="mb-6 text-xs font-bold text-black/40">
              Once you have access and are signed in, install any component
              using the shadcn CLI. The install command and Code tab appear on
              each component detail page. Make sure shadcn/ui is set up in your
              project first.
            </p>

            <CodeBlock
              label="Terminal"
              code="npx shadcn add https://foundry.dev/r/animated-stack.json"
            />

            <p className="mt-4 text-xs font-bold text-black/40">
              Replace{" "}
              <code className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-black/40">
                animated-stack
              </code>{" "}
              with any component name from the registry (e.g.{" "}
              <code className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-black/40">
                feedback
              </code>
              ,{" "}
              <code className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-black/40">
                hover-card
              </code>
              ).
            </p>
          </section>

          {/* Available Components Section */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Available Components
            </h2>
            <div className="space-y-3">
              {componentsData.map((component) => (
                <Link
                  key={component.name}
                  href={`/components/${component.name}`}
                  className="flex items-center justify-between rounded-xl border border-muted bg-muted p-4 transition-colors hover:bg-muted/80"
                >
                  <div className="flex items-center gap-4">
                    <code className="rounded-md bg-background px-3 py-1.5 font-mono text-xs font-bold text-black/40">
                      {component.name}
                    </code>
                    <span className="text-xs font-bold text-black/40">
                      {component.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Origin Section */}
          <section>
            <h2 className="mb-4 text-xs font-bold text-black">
              Origin
            </h2>
            <p className="text-xs font-bold text-black/40">
              Foundry came from a training given to a school. The registry is
              not open; anyone who wants access needs to register via Request
              access.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
