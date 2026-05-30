"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const points = [
  {
    icon: "💻",
    label: "Self-Taught",
    text: "Mastered React & Next.js from scratch with obsessive dedication",
  },
  {
    icon: "📊",
    label: "Dashboards",
    text: "Built interactive analytics dashboards with rich, smooth UX",
  },
  {
    icon: "🛒",
    label: "E-Commerce",
    text: "Full-stack stores — from pixel-perfect design to deployment",
  },
  {
    icon: "☕",
    label: "Branding",
    text: "Minimal, elegant landing pages engineered to convert",
  },
  {
    icon: "🤖",
    label: "AI Builder",
    text: "Integrated AI into real products solving real problems",
  },
  {
    icon: "🔥",
    label: "Obsessive",
    text: "Every pixel has a purpose — detail-oriented perfectionist",
  },
];

const TECH = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Framer Motion",
  "Groq API",
  "OpenAI",
  "Supabase",
  "Clerk",
  "FastAPI",
  "Python",
  "Shadcn UI",
];

function Card({ point, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, backgroundColor: "rgba(230,57,70,0.04)" }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "6px",
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Bottom red line on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#E63946",
          transformOrigin: "left",
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        whileHover={{ scale: 1.25, rotate: -8 }}
        style={{ fontSize: "1.9rem", display: "block", marginBottom: "14px" }}
      >
        {point.icon}
      </motion.span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          color: "#E63946",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "8px",
        }}
      >
        {point.label}
      </span>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: "1.65",
          fontWeight: 300,
        }}
      >
        {point.text}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .about-v2 { background: #080808; }
        .tech-marquee { display: flex; gap: 40px; width: max-content; animation: marquee 28s linear infinite; align-items: center; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="about-v2 w-full py-32 relative overflow-hidden"
      >
        {/* Parallax red glow */}
        <motion.div
          style={{
            y: bgY,
            position: "absolute",
            right: "-10%",
            top: "0%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(230,57,70,0.25), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          {/* Header */}
          <div
            ref={titleRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#E63946",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                — Discovery
              </motion.span>

              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem,8vw,8rem)",
                  lineHeight: 0.88,
                  overflow: "hidden",
                }}
              >
                {["ABOUT", "ME."].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ y: 120 }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      color: i === 0 ? "#fff" : "transparent",
                      WebkitTextStroke:
                        i === 1 ? "1px rgba(255,255,255,0.2)" : "0px",
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{
                  width: "60px",
                  height: "2px",
                  background: "#E63946",
                  transformOrigin: "left",
                  marginTop: "20px",
                  boxShadow: "0 0 12px rgba(230,57,70,0.5)",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                borderLeft: "2px solid #E63946",
                paddingLeft: "20px",
                maxWidth: "440px",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.95rem,1.6vw,1.1rem)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.9,
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                I'm{" "}
                <strong
                  style={{
                    color: "#E63946",
                    fontStyle: "normal",
                    fontWeight: 600,
                  }}
                >
                  Tala Safadi
                </strong>{" "}
                — a Frontend Engineer & AI student from Palestine. I build web
                experiences that don't just look good — they{" "}
                <strong
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontStyle: "normal",
                    fontWeight: 500,
                  }}
                >
                  perform, convert, and impress.
                </strong>
              </p>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {points.map((pt, i) => (
              <Card key={i} point={pt} index={i} />
            ))}
          </div>

          {/* Tech marquee */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              padding: "18px 0",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to right, #080808, transparent)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to left, #080808, transparent)",
                zIndex: 2,
              }}
            />
            <div className="tech-marquee">
              {[...TECH, ...TECH].map((t, i) => (
                <React.Fragment key={i}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "0.85rem",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.15)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </span>
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      background: "#E63946",
                      opacity: 0.3,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
