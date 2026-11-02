import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Tala Safadi, AI Engineer: I build AI agents that do the work.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "AI Engineer · Co-founder & CEO @ AI Rank",
    title: "I build AI agents that do the work.",
  });
}
