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
import { GitHubSection } from './components/sections/GitHubSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ContactSection } from './components/sections/ContactSection'
import LiquidEther from './components/ui/LiquidEther'
import { useReducedMotion } from './hooks/useReducedMotion'

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

function App() {
  const reducedMotion = useReducedMotion()

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <div className="relative">
          <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
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
          <div className="relative z-10">
            <Navbar sectionIds={SECTION_IDS} />
            <ScrollPath sectionIds={SECTION_IDS} />
            <LandingSection />
            <AboutSection />
            <WorkflowSection />
            <TechStackSection />
            <ProjectsSection />
            <GitHubSection />
            <ExperienceSection />
            <ContactSection />
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
