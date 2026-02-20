import AboutSection from "./components/aboutSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/Projectsection";
import SkillsSection from "./components/skillsSection";
import ContactSection from "./components/contactSection";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#FDF6ED] to-[#F5E0DC] flex flex-col items-center justify-start p-6 md:p-12 gap-12">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
