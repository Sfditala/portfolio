import Hero from "@/components/sections/Hero";
import StackStrip from "@/components/sections/StackStrip";
import AiRankFeature from "@/components/sections/AiRankFeature";
import Services from "@/components/sections/Services";
import AutomationWork from "@/components/sections/AutomationWork";
import ProductsWork from "@/components/sections/ProductsWork";
import Process from "@/components/sections/Process";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FinalCta from "@/components/sections/FinalCta";
import { SectionDivider } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Hero />
      <StackStrip />
      <AiRankFeature />
      <SectionDivider />
      <Services />
      <AutomationWork />
      <ProductsWork />
      <SectionDivider />
      <Process />
      <AboutTeaser />
      <SectionDivider />
      <FinalCta />
    </>
  );
}
