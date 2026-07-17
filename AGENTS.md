# port-opencode

## Build & Check Commands
- `npm run dev` — start dev server
- `npm run build` — tsc -b && vite build
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
- `src/hooks/` — custom hooks (useReducedMotion, useScrollProgress, useTheme)
- `src/lib/` — utilities & animation definitions
- Animations live in `src/lib/animations.ts` (staggerContainer, fadeUp, springTransition)
- `public/images/` — all static images served at `/images/` paths

## TypeScript
- `noUnusedLocals` and `noUnusedParameters` are enforced — remove dead code
- `verbatimModuleSyntax` is on — use `type` keyword for type-only imports
- `erasableSyntaxOnly` is on — no enums, no namespaces, files with JSX must be `.tsx`
- Path aliases: `@/` maps to `src/`

## Code Conventions
- Named exports preferred over default exports
- Functional components with TypeScript
- Tailwind classes for styling (no CSS modules or styled-components)
- Use `useReducedMotion()` hook for animation gating (never import `motion` with reduced motion)

## Image & Asset Rules
- ALL static images go in `public/images/` and are referenced as `/images/<filename>`
- NEVER assume an image exists at a path — use `Get-ChildItem` / glob to check first
- NEVER guess a project's tech stack — check its `package.json` or source code
- Profile picture: `/images/pfp.png` (used in LandingSection)

## Common Pitfalls (past mistakes)
- When removing a prop from a component, also remove it from the **interface**, the **destructuring**, and all **call sites**
- `.ts` files cannot contain JSX (erasableSyntaxOnly) — use `.tsx` for files with JSX
- Windows PowerShell — `curl` is an alias for `Invoke-WebRequest`, use `Invoke-RestMethod` instead, don't use `&&` (use `; if ($?) { ... }`)
- `npm run build` runs both `tsc -b` and `vite build` — always run it after changes before considering work done
- GitHub API unauthenticated requests may be rate limited — prefer checking local source code
