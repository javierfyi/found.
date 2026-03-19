# Arrow Tooltip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished arrow tooltip component to the Foundry shadcn registry with a bordered arrow design, and add a global "Keep in mind" + "Contact" footer to all component detail pages.

**Architecture:** Registry component built on `@radix-ui/react-tooltip` with a custom SVG bordered arrow. Component follows existing Foundry patterns (named exports, JSDoc, `cn()` utility). Detail page gets a new reusable footer section in `component-docs.tsx`.

**Tech Stack:** React 19, Radix UI Tooltip, Tailwind CSS 4, Next.js 16

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `registry/foundry/arrow-tooltip.tsx` | Create | The registry component itself |
| `registry.json` | Modify | Add registry entry for `arrow-tooltip` |
| `lib/components-data.ts` | Modify | Add component metadata, API reference, example |
| `app/components/[name]/page.tsx` | Modify | Add preview case + import for arrow-tooltip |
| `components/component-docs.tsx` | Modify | Add `KeepInMindSection` and `ContactSection` components |

---

### Task 1: Create the Arrow Tooltip Registry Component

**Files:**
- Create: `registry/foundry/arrow-tooltip.tsx`

- [ ] **Step 1: Create the component file**

```tsx
"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * ArrowTooltip - A tooltip with a custom bordered arrow
 *
 * Built on Radix UI Tooltip with a refined arrow design featuring
 * a border outline that matches the tooltip content border.
 *
 * @example
 * ```tsx
 * <ArrowTooltip>
 *   <ArrowTooltipTrigger>Hover me</ArrowTooltipTrigger>
 *   <ArrowTooltipContent>Tooltip content</ArrowTooltipContent>
 * </ArrowTooltip>
 * ```
 */

function ArrowTooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="arrow-tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function ArrowTooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <ArrowTooltipProvider>
      <TooltipPrimitive.Root data-slot="arrow-tooltip" {...props} />
    </ArrowTooltipProvider>
  );
}

function ArrowTooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger data-slot="arrow-tooltip-trigger" {...props} />
  );
}

function ArrowTooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="arrow-tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-md bg-background px-3 py-1.5 text-xs text-foreground outline-1 outline-border",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow asChild>
          <BorderedArrow />
        </TooltipPrimitive.Arrow>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

function BorderedArrow(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-px -mt-px"
      {...props}
    >
      {/* Arrow fill — matches tooltip background */}
      <path
        d="M10.3356 7.39793L15.1924 3.02682C15.9269 2.36577 16.8801 2 17.8683 2H20V0H0V2H1.4651C2.4532 2 3.4064 2.36577 4.1409 3.02682L8.9977 7.39793C9.378 7.7402 9.9553 7.74021 10.3356 7.39793Z"
        fill="var(--color-background)"
      />
      {/* Arrow inner shadow line */}
      <path d="M11.1363 8.14124C10.3757 8.82575 9.22111 8.82578 8.46041 8.14122L3.60361 3.77011C3.05281 3.27432 2.33791 2.99999 1.59681 2.99999L4.24171 3L9.12941 7.39793C9.50971 7.7402 10.087 7.7402 10.4674 7.39793L15.3544 3L18 2.99999C17.2589 2.99999 16.544 3.27432 15.9931 3.77011L11.1363 8.14124Z" />
      {/* Arrow border outline — matches tooltip border */}
      <path
        d="M9.6667 6.65461L14.5235 2.28352C15.4416 1.45721 16.6331 1 17.8683 1H20V2H17.8683C16.8801 2 15.9269 2.36577 15.1924 3.02682L10.3356 7.39793C9.9553 7.74021 9.378 7.7402 8.9977 7.39793L4.1409 3.02682C3.4064 2.36577 2.4532 2 1.4651 2H0V1H1.4651C2.7002 1 3.8917 1.45722 4.8099 2.28352L9.6667 6.65461Z"
        fill="var(--color-border)"
      />
    </svg>
  );
}

export {
  ArrowTooltip,
  ArrowTooltipContent,
  ArrowTooltipProvider,
  ArrowTooltipTrigger,
};
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat registry/foundry/arrow-tooltip.tsx | head -5`
Expected: `"use client";` followed by imports

- [ ] **Step 3: Commit**

```bash
git add registry/foundry/arrow-tooltip.tsx
git commit -m "feat: add arrow-tooltip registry component"
```

---

### Task 2: Register the Component

**Files:**
- Modify: `registry.json` (add item to items array)

- [ ] **Step 1: Add registry entry**

Add to the `items` array in alphabetical order (after `animated-stack`, before `blur-fade`):

```json
{
  "name": "arrow-tooltip",
  "type": "registry:component",
  "title": "Arrow Tooltip",
  "description": "A tooltip with a custom bordered arrow design, built on Radix UI.",
  "files": [{"path": "registry/foundry/arrow-tooltip.tsx", "type": "registry:component"}],
  "dependencies": ["@radix-ui/react-tooltip"]
}
```

- [ ] **Step 2: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('registry.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add registry.json
git commit -m "feat: register arrow-tooltip in registry.json"
```

---

### Task 3: Add Component Metadata

**Files:**
- Modify: `lib/components-data.ts` (add to `componentsData` array)

- [ ] **Step 1: Add component data entry**

Add to the `componentsData` array:

```typescript
{
  name: "arrow-tooltip",
  title: "Arrow Tooltip",
  description: "A tooltip with a custom bordered arrow design. Built on Radix UI with a refined arrow featuring a border outline.",
  id: "foundry-arrow-tooltip",
  size: "normal",
  previewType: "button",
  dependencies: ["@radix-ui/react-tooltip"],
  apiReference: [
    {
      name: "ArrowTooltip",
      description: "Root component that wraps the tooltip trigger and content. Includes a built-in provider with zero delay.",
      props: [],
    },
    {
      name: "ArrowTooltipTrigger",
      description: "The element that triggers the tooltip on hover.",
      props: [],
    },
    {
      name: "ArrowTooltipContent",
      description: "The tooltip content panel with the bordered arrow.",
      props: [
        { name: "sideOffset", type: "number", default: "0", description: "Distance in pixels from the trigger." },
        { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"top\"", description: "Preferred side of the trigger to render against." },
        { name: "className", type: "string", default: "-", description: "Additional CSS classes for the content." },
      ],
    },
  ],
  example: `import {
  ArrowTooltip,
  ArrowTooltipTrigger,
  ArrowTooltipContent,
} from "@/components/arrow-tooltip"

export default function Example() {
  return (
    <ArrowTooltip>
      <ArrowTooltipTrigger>
        <button>Hover me</button>
      </ArrowTooltipTrigger>
      <ArrowTooltipContent>
        Tooltip content here
      </ArrowTooltipContent>
    </ArrowTooltip>
  )
}`,
},
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit lib/components-data.ts` (or run dev server)
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/components-data.ts
git commit -m "feat: add arrow-tooltip metadata and API reference"
```

---

### Task 4: Add Preview to Detail Page

**Files:**
- Modify: `app/components/[name]/page.tsx`

- [ ] **Step 1: Add import**

At the top of the file with the other registry imports (after line 18):

```typescript
import { ArrowTooltip, ArrowTooltipTrigger, ArrowTooltipContent } from "@/registry/foundry/arrow-tooltip"
```

- [ ] **Step 2: Add preview case**

Add a new `if` block in `PreviewSection` before the final `return` (before line 330):

```tsx
if (component.name === "arrow-tooltip") {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-border bg-card p-8">
      <div className="relative w-full max-w-2xl flex items-center justify-center">
        <ArrowTooltip>
          <ArrowTooltipTrigger>
            <button className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
              Hover me
            </button>
          </ArrowTooltipTrigger>
          <ArrowTooltipContent>
            Arrow tooltip with bordered arrow
          </ArrowTooltipContent>
        </ArrowTooltip>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/[name]/page.tsx
git commit -m "feat: add arrow-tooltip preview to detail page"
```

---

### Task 5: Add "Keep in Mind" + "Contact" Footer Sections

**Files:**
- Modify: `components/component-docs.tsx`
- Modify: `app/components/[name]/page.tsx`

- [ ] **Step 1: Add KeepInMindSection and ContactSection to component-docs.tsx**

Add at the bottom of `components/component-docs.tsx`:

```tsx
export function KeepInMindSection() {
  return (
    <div className="mt-16">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Keep in mind
      </h2>
      <p className="max-w-2xl text-base text-foreground">
        Most components here are recreations of the best out there. I don&apos;t
        claim to be the original creator. This is my attempt to reverse-engineer,
        replicate, and often add a few extra features. I&apos;ve tried to credit
        everyone, but if I missed something, let me know.
      </p>
    </div>
  )
}

export function ComponentContactSection() {
  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Contact
      </h2>
      <p className="text-base text-foreground">
        If you find any bug or issue, feel free to{" "}
        <a
          href="mailto:hello@foundry.dev"
          className="font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          hello@foundry.dev
        </a>
        {" "}Drop a dm.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Import and add sections to detail page**

In `app/components/[name]/page.tsx`, update the import from `component-docs`:

```typescript
import { InstallationSection, ApiReferenceSection, KeepInMindSection, ComponentContactSection } from "@/components/component-docs"
```

Add after the API Reference section (after line 240, before `</main>`):

```tsx
<KeepInMindSection />
<ComponentContactSection />
```

- [ ] **Step 3: Verify dev server renders correctly**

Run: `pnpm dev` and navigate to any component detail page
Expected: "Keep in mind" and "Contact" sections visible at bottom

- [ ] **Step 4: Commit**

```bash
git add components/component-docs.tsx app/components/[name]/page.tsx
git commit -m "feat: add keep-in-mind and contact sections to component detail pages"
```

---

### Task 6: Build Registry and Verify

- [ ] **Step 1: Build the shadcn registry**

Run: `pnpm run registry:build` (or equivalent — check `package.json` scripts)
Expected: `public/r/arrow-tooltip.json` is generated

- [ ] **Step 2: Verify the generated file**

Run: `cat public/r/arrow-tooltip.json | head -10`
Expected: Valid JSON with component content

- [ ] **Step 3: Run dev server and test the full flow**

Run: `pnpm dev` and navigate to `/components/arrow-tooltip`
Expected: Preview shows tooltip on hover, installation command works, API reference table renders, "Keep in mind" and "Contact" sections visible

- [ ] **Step 4: Final commit**

```bash
git add public/r/arrow-tooltip.json
git commit -m "chore: build arrow-tooltip registry artifact"
```
