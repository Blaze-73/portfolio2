import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/useTheme'
import { SEOHead } from './components/ui/SEOHead'
import { ScrollPath } from './components/ui/ScrollPath'
import { Navbar } from './components/ui/Navbar'
import { LandingSection } from './components/sections/LandingSection'
import { AboutSection } from './components/sections/AboutSection'
import { WorkflowSection } from './components/sections/WorkflowSection'
import { TechStackSection } from './components/sections/TechStackSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { useReducedMotion } from './hooks/useReducedMotion'

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

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <div className="relative">
          <Suspense fallback={null}>
            <div id="liquid-ether-bg" className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
              <LiquidEther
                colors={['#aa3bff', '#7c3aed', '#5227FF']}
                autoDemo={!reducedMotion}
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
          <div className="relative z-10">
            <Navbar sectionIds={SECTION_IDS} />
            <ScrollPath sectionIds={SECTION_IDS} />
            <LandingSection />
            <AboutSection />
            <WorkflowSection />
            <TechStackSection />
            <ProjectsSection />
            <Suspense fallback={<SectionFallback />}>
              <GitHubSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ExperienceSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
