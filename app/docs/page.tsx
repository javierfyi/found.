"use client"

import { Copy, Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useSoundContext } from "@/contexts/sound-context"
import { HeaderSoundAndClock } from "@/components/header-sound-and-clock"

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

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-xs font-bold text-black">
      {children}
    </code>
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
              Foundry is a shadcn/ui component registry. Components are installed
              directly into your project via the shadcn CLI — no packages to
              manage, no version conflicts. You own the source code.
            </p>
          </div>

          {/* Prerequisites */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Prerequisites
            </h2>
            <p className="mb-4 text-xs font-bold text-black/40">
              Foundry components are built for projects that already have
              shadcn/ui initialized. If you haven&apos;t set it up yet:
            </p>
            <CodeBlock
              label="Terminal"
              code="npx shadcn@latest init"
            />
            <p className="mt-4 text-xs font-bold text-black/40">
              This scaffolds the <InlineCode>components.json</InlineCode> config,
              adds the <InlineCode>cn</InlineCode> utility, and sets up
              your path aliases. Foundry uses
              the <InlineCode>new-york</InlineCode> style
              with <InlineCode>lucide-react</InlineCode> icons.
            </p>
          </section>

          {/* Installation */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Installation
            </h2>
            <p className="mb-6 text-xs font-bold text-black/40">
              Install any component by pointing the shadcn CLI at the
              Foundry registry URL. The CLI resolves dependencies, writes the
              source file into your project, and updates your imports.
            </p>

            <CodeBlock
              label="Terminal"
              code="npx shadcn add https://foundry.dev/r/animated-stack.json"
            />

            <p className="mt-4 mb-6 text-xs font-bold text-black/40">
              Replace <InlineCode>animated-stack</InlineCode> with the
              component name you want. Each component page shows the exact
              install command with a copy button.
            </p>

            <p className="text-xs font-bold text-black/40">
              Some components depend on <InlineCode>motion</InlineCode> (Framer
              Motion). The CLI handles this automatically — if the dependency
              isn&apos;t in your <InlineCode>package.json</InlineCode>, it will
              be added.
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              How it works
            </h2>
            <p className="mb-4 text-xs font-bold text-black/40">
              Foundry serves component metadata as JSON from
              the <InlineCode>/r/[name].json</InlineCode> endpoint. Each JSON
              file follows
              the <InlineCode>shadcn registry-item</InlineCode> schema and
              includes the component name, type, dependencies, and full source
              code.
            </p>
            <p className="mb-4 text-xs font-bold text-black/40">
              When you run <InlineCode>npx shadcn add</InlineCode>, the CLI
              fetches that JSON, reads the dependency list, installs anything
              missing, and writes the component file into
              your <InlineCode>components/</InlineCode> directory.
            </p>
            <p className="text-xs font-bold text-black/40">
              Because components are copied into your project as source code,
              you can modify them freely. There is no runtime dependency on
              Foundry.
            </p>
          </section>

          {/* Project Structure */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Project structure
            </h2>
            <p className="mb-4 text-xs font-bold text-black/40">
              After installation, components land in your configured components
              directory. A typical setup looks like:
            </p>
            <CodeBlock
              label="Project"
              code={`components/
  ui/              # shadcn/ui primitives (button, dialog, tabs...)
  animated-stack.tsx   # installed from Foundry
  hover-card.tsx       # installed from Foundry
lib/
  utils.ts         # cn() utility`}
            />
            <p className="mt-4 text-xs font-bold text-black/40">
              Components use <InlineCode>@/lib/utils</InlineCode> for
              the <InlineCode>cn</InlineCode> classname helper and
              import from <InlineCode>motion/react</InlineCode> for animations.
              No other internal dependencies.
            </p>
          </section>

          {/* Usage */}
          <section className="mb-12">
            <h2 className="mb-4 text-xs font-bold text-black">
              Usage
            </h2>
            <p className="mb-6 text-xs font-bold text-black/40">
              Import the component from your local components directory and use
              it like any other React component. All Foundry components are
              client components (<InlineCode>&quot;use client&quot;</InlineCode>).
            </p>
            <CodeBlock
              label="app/page.tsx"
              code={`import { AnimatedNumber } from "@/components/animated-number"

export default function Page() {
  return <AnimatedNumber value={500} className="text-4xl font-bold" />
}`}
            />
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="mb-4 text-xs font-bold text-black">
              Tech stack
            </h2>
            <p className="text-xs font-bold text-black/40">
              Foundry components are built
              with <InlineCode>React 19</InlineCode>,{" "}
              <InlineCode>TypeScript</InlineCode>,{" "}
              <InlineCode>Tailwind CSS v4</InlineCode>,
              and <InlineCode>Motion</InlineCode> (Framer Motion). The registry
              itself runs on <InlineCode>Next.js 16</InlineCode> with the App
              Router and conforms to
              the <InlineCode>shadcn registry-item</InlineCode> JSON schema.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
