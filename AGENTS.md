# port-opencode

## Build & Check Commands
- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run lint` — run oxlint
- `npm run preview` — preview production build

## Tech Stack
- React 19 + Vite 8 + TypeScript 6
- Tailwind CSS v4 (via `@tailwindcss/vite`, no config file)
- Framer Motion for animations
- GSAP + Lenis for scroll effects
- Three.js for 3D
- oxlint for linting

## Project Structure
- `src/components/ui/` — reusable primitives (Badge, DecayCard, Section, etc.)
- `src/components/sections/` — page sections (TechStack, Experience, Projects, etc.)
- `src/hooks/` — custom hooks (useReducedMotion, useScrollProgress)
- `src/lib/` — utilities & animation definitions
- Animations live in `src/lib/animations.ts` (staggerContainer, fadeUp, springTransition)

## TypeScript
- `noUnusedLocals` and `noUnusedParameters` are enforced — remove dead code
- `verbatimModuleSyntax` is on — use `type` keyword for type-only imports
- `erasableSyntaxOnly` is on — no enums, no namespaces
- Path aliases: `@/` maps to `src/`

## Code Conventions
- Named exports preferred over default exports
- Functional components with TypeScript
- Tailwind classes for styling (no CSS modules or styled-components)
- Use `useReducedMotion()` hook for animation gating
