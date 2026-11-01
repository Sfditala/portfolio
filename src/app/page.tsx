// Phase 0: old sections still render here until Home v2 replaces them in Phase 1.
import AboutSection from "./components/aboutSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/Projectsection";
import SkillsSection from "./components/skillsSection";
import ContactSection from "./components/contactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
