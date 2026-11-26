import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/useTheme'
import { SEOHead } from './components/ui/SEOHead'
import { ScrollPath } from './components/ui/ScrollPath'
import { Navbar } from './components/ui/Navbar'
import { LandingSection } from './components/sections/LandingSection'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useMediaQuery } from './hooks/useMediaQuery'

// Everything below the fold is loaded after the hero. This keeps the
// animation libraries (Framer Motion, GSAP) out of the initial bundle.
const AboutSection = lazy(() =>
  import('./components/sections/AboutSection').then((m) => ({ default: m.AboutSection })),
)
const WorkflowSection = lazy(() =>
  import('./components/sections/WorkflowSection').then((m) => ({ default: m.WorkflowSection })),
)
const TechStackSection = lazy(() =>
  import('./components/sections/TechStackSection').then((m) => ({ default: m.TechStackSection })),
)
const ProjectsSection = lazy(() =>
  import('./components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
)
const LiquidEther = lazy(() => import('./components/ui/LiquidEther'))
const GitHubSection = lazy(() =>
  import('./components/sections/GitHubSection').then((m) => ({ default: m.GitHubSection })),
)
const ExperienceSection = lazy(() =>
  import('./components/sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection })),
)
const ContactSection = lazy(() =>
  import('./components/sections/ContactSection').then((m) => ({ default: m.ContactSection })),
)

const SECTION_IDS = [
  'landing',
  'about',
  'workflow',
  'tech-stack',
  'projects',
  'github',
  'experience',
  'contact',
]

function SectionFallback() {
  return <div className="h-64" />
}

function App() {
  const reducedMotion = useReducedMotion()
  // The WebGL background is heavy: skip it on small screens and for reduced-motion users.
  const showBackground = useMediaQuery('(min-width: 1024px)') && !reducedMotion

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <div className="relative">
          {showBackground && (
            <Suspense fallback={null}>
              <div id="liquid-ether-bg" className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
                <LiquidEther
                  colors={['#aa3bff', '#7c3aed', '#5227FF']}
                  autoDemo
                  resolution={0.35}
                  mouseForce={15}
                  cursorSize={80}
                  autoSpeed={0.3}
                  autoIntensity={1.5}
                  takeoverDuration={0.3}
                  autoResumeDelay={2000}
                  style={{ opacity: 0.15 }}
                />
              </div>
            </Suspense>
          )}
          <div className="relative z-10">
            <Navbar sectionIds={SECTION_IDS} />
            <ScrollPath sectionIds={SECTION_IDS} />
            <LandingSection />
            <Suspense fallback={<SectionFallback />}>
              <AboutSection />
              <WorkflowSection />
              <TechStackSection />
              <ProjectsSection />
              <GitHubSection />
              <ExperienceSection />
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
