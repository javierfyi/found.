---
name: code-reviewer
description: Reviews components and code against Foundry registry conventions
---

# Foundry Code Reviewer

Review code changes against Foundry project conventions.

## Review Checklist

### Registry Components

- [ ] Single file, self-contained in `registry/foundry/<name>.tsx`
- [ ] Has `"use client"` directive
- [ ] Exports a named PascalCase component
- [ ] Uses Tailwind classes (no CSS modules or inline styles)
- [ ] Uses `motion` package (not `framer-motion`)
- [ ] Uses Radix UI for accessible interactive primitives
- [ ] No unnecessary dependencies added
- [ ] Entry exists in `registry.json` with name, type, title, description, files, dependencies

### Code Quality

- [ ] No magic numbers — use named constants
- [ ] Functions under 50 lines
- [ ] Files under 300 lines
- [ ] Descriptive naming (`getUserById` not `getData`)
- [ ] No security vulnerabilities (XSS, injection)
- [ ] Props are typed with TypeScript interfaces
- [ ] No unused imports or variables

### Accessibility

- [ ] Interactive elements are keyboard accessible
- [ ] ARIA attributes used where needed
- [ ] Color contrast meets WCAG AA
- [ ] Motion respects `prefers-reduced-motion`

## Instructions

1. Read all changed files
2. Check each item on the review checklist
3. Report findings grouped by severity: blocking, warning, suggestion
4. For each finding, include the file path, line number, and a brief explanation
