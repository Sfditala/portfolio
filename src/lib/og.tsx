import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };

// next/og can't read Tailwind or CSS variables, so this is the one place with
// inline styles and literal colours. Keep the values in sync with globals.css.
const BG = "#0a0a0a";
const TEXT = "#f5f5f5";
const MUTED = "#a1a1a1";
const ACCENT = "#e63946";

export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: BG,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
        backgroundSize: "28px 28px",
        color: TEXT,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: MUTED }}>
        <div style={{ display: "flex", width: 18, height: 18, borderRadius: 18, border: `3px solid ${MUTED}` }} />
        <div style={{ display: "flex", width: 44, height: 3, background: ACCENT }} />
        <div style={{ display: "flex", width: 18, height: 18, borderRadius: 18, background: ACCENT, marginRight: 20 }} />
        {eyebrow}
      </div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
        {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: MUTED }}>
        <span>{site.name}</span>
        <span style={{ color: ACCENT }}>{site.title}</span>
      </div>
    </div>,
    OG_SIZE,
  );
}
