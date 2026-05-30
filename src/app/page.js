"use client";
import { useEffect } from "react";
import AboutSection from "./components/aboutSection";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/Projectsection";
import SkillsSection from "./components/skillsSection";
import ContactSection from "./components/contactSection";
import TalaWidget from "./components/tala/TalaWidget";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  // Custom cursor (optional, dark theme)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <>
      <style>{`
        :root { color-scheme: dark; }
        html { background: #080808; }
        body { background: #080808; margin: 0; padding: 0; }
        ::selection { background: rgba(230,57,70,0.35); color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #E63946; border-radius: 2px; }
      `}</style>
      <Header />
      <main style={{ background: "#080808" }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <TalaWidget />
    </>
  );
}
