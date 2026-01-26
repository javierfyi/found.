"use client"

import { Header } from "@/components/header"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm text-foreground">{code}</code>
      </pre>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-24">
        <div className="mx-auto max-w-2xl">
          {/* Page Title */}
          <div className="mb-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              DOCUMENTATION
            </p>
            <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter text-foreground">
              QUICK START
            </h1>
            <p className="text-muted-foreground">
              Install Foundry components in your project using the shadcn CLI.
            </p>
          </div>

          {/* Installation Section */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Installation
            </h2>
            <p className="mb-6 text-muted-foreground">
              You can install any Foundry component directly using the shadcn
              CLI. Make sure you have shadcn/ui set up in your project first.
            </p>

            <CodeBlock
              label="Terminal"
              code="npx shadcn add https://foundry.dev/r/magnetic-button.json"
            />

            <p className="mt-4 text-sm text-muted-foreground">
              Replace{" "}
              <code className="rounded-md bg-muted px-2 py-1 text-foreground">
                magnetic-button
              </code>{" "}
              with any component name from our registry.
            </p>
          </section>

          {/* Available Components Section */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Available Components
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "magnetic-button",
                  desc: "A button with magnetic cursor effect",
                },
                {
                  name: "shimmer-text",
                  desc: "Animated shimmer gradient text",
                },
                { name: "glow-card", desc: "Card with cursor-following glow" },
                { name: "typewriter", desc: "Typewriter animation effect" },
              ].map((component) => (
                <div
                  key={component.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-4">
                    <code className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm text-foreground">
                      {component.name}
                    </code>
                    <span className="text-sm text-muted-foreground">
                      {component.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Open in v0 Section */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Open in v0
            </h2>
            <p className="text-muted-foreground">
              Every component includes an &quot;Open in v0&quot; button that
              lets you instantly add the component to a v0 project for further
              customization.
            </p>
          </section>

          {/* Contributing Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Contributing
            </h2>
            <p className="text-muted-foreground">
              Foundry is open source. Feel free to submit your own components
              via pull request on GitHub.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
