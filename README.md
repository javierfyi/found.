# Foundry

A collection of animated React components you can copy into your projects. Built for the [shadcn/ui](https://ui.shadcn.com) ecosystem.

No npm package to install. No runtime dependency. Just grab what you need and make it yours.

**[foundry.dev](https://foundry.dev)**

## Install a component

```bash
npx shadcn@latest add https://foundry.dev/r/animated-stack.json
```

That's it. The component lands in your codebase as source code you own and can modify however you want.

## Components

| Component | Description |
|-----------|-------------|
| `animated-counter` | Animates a number from start to end with easing |
| `animated-number` | Smooth spring-physics number transitions |
| `animated-stack` | Expandable card stack with spring animations |
| `arrow-tooltip` | Tooltip with arrow indicator (Radix UI) |
| `blur-fade` | Blur + fade on scroll into view |
| `chat-input` | Chat UI with animated message bubbles |
| `feedback` | Feedback form with loading state |
| `glow-card` | Mouse-tracking radial gradient glow |
| `gradient-text` | Animated gradient text |
| `hover-card` | Card revealing content on hover |
| `magnetic-button` | Button that follows cursor with spring physics |
| `marquee` | Infinite scrolling text, pausable on hover |
| `popover-morph` | Popover with morphing animations |
| `progressive-blur` | Gradient blur overlay for scrollable content |
| `ripple-button` | Material Design ripple on click |
| `shimmer-text` | Animated shimmer effect across text |
| `shimmering-text` | Motion-powered shimmer animation |
| `text-reveal` | Word-by-word reveal on scroll |
| `typewriter` | Character-by-character typing effect |
| `typing-text` | Typing animation with cursor |

## Run locally

```bash
pnpm install
pnpm dev
```

The registry JSON files are generated at build time:

```bash
pnpm build
```

## Tech stack

- React 19, Next.js 16, TypeScript
- Tailwind CSS 4
- Motion (Framer Motion) for animations
- Radix UI for accessible primitives
- shadcn CLI for the component registry

## Contributing

Found a bug? Have an idea for a component? Open an issue or submit a PR.

## License

MIT
