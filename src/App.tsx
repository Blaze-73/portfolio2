import { ScrollPath } from './components/ui/ScrollPath'
import { Navbar } from './components/ui/Navbar'
import { LandingSection } from './components/sections/LandingSection'
import { AboutSection } from './components/sections/AboutSection'
import { WorkflowSection } from './components/sections/WorkflowSection'
import { TechStackSection } from './components/sections/TechStackSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { GitHubSection } from './components/sections/GitHubSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { NumbersSection } from './components/sections/NumbersSection'
import { ContactSection } from './components/sections/ContactSection'

const SECTION_IDS = [
  'landing',
  'about',
  'workflow',
  'tech-stack',
  'projects',
  'github',
  'experience',
  'numbers',
  'contact',
]

function App() {
  return (
    <>
      <Navbar sectionIds={SECTION_IDS} />
      <ScrollPath sectionIds={SECTION_IDS} />
      <LandingSection />
      <AboutSection />
      <WorkflowSection />
      <TechStackSection />
      <ProjectsSection />
      <GitHubSection />
      <ExperienceSection />
      <NumbersSection />
      <ContactSection />
    </>
  )
}

export default App
