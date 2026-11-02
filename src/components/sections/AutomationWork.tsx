import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ReplayStage from "@/components/workflow/ReplayStage";
import { projects } from "@/content/projects";

const automations = projects.filter((p) => p.category === "automation");

export default function AutomationWork() {
  return (
    <Section id="work">
      <SectionHeading
        index="02"
        label="Agents in action"
        title="Watch an agent do the work."
        description="Pick a workflow and press Run. Every node shows what it received and what it produced, so you can see exactly how the work gets done."
      />
      <ReplayStage projects={automations} />
    </Section>
  );
}
