---
name: new-component
description: Scaffold a new Foundry registry component with registry.json entry and component page
disable-model-invocation: true
---

# New Component Scaffold

Create a new component for the Foundry shadcn registry.

## Arguments

- `name` (required): kebab-case component name (e.g., `scroll-reveal`)
- `description` (required): One-line description of the component
- `dependencies` (optional): npm packages the component uses (e.g., `motion`, `lucide-react`)

## Steps

1. **Create the component source file** at `registry/foundry/<name>.tsx`
   - Single file, self-contained
   - Use `"use client"` directive at the top
   - Export a named React component using PascalCase of the name
   - Use Tailwind classes for styling
   - Follow existing component patterns in `registry/foundry/`

2. **Add entry to `registry.json`** in the `items` array:

   ```json
   {
     "name": "<name>",
     "type": "registry:component",
     "title": "<Title Case Name>",
     "description": "<description>",
     "files": [{"path": "registry/foundry/<name>.tsx", "type": "registry:component"}],
     "dependencies": [<dependencies if any>]
   }
   ```

3. **Create the docs page** at `app/components/<name>/page.tsx`
   - Follow the pattern of existing component pages in `app/components/`
   - Include a live demo and usage example

4. **Add to the component grid** in the main components page if one exists

5. **Verify** by running `pnpm run registry:build` to ensure the component builds cleanly

## Conventions

- Components must be single-file (no separate style files)
- No new dependencies without user approval
- Use `motion` (not `framer-motion`) for animations
- Use Radix UI primitives for accessible interactive elements
- Every component must have a `title` and `description` in registry.json
