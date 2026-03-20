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
| `animated-number` | Smooth spring-physics number transitions |
| `animated-stack` | Expandable card stack with spring animations |
| `arrow-tooltip` | Tooltip with arrow indicator (Radix UI) |
| `chat-input` | Chat UI with animated message bubbles |
| `feedback` | Feedback form with loading state |
| `hover-card` | Card revealing content on hover |
| `progressive-blur` | Gradient blur overlay for scrollable content |
| `shimmering-text` | Motion-powered shimmer animation |
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
