"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const skills = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    name: "JavaScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    name: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    name: "HTML5",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    name: "CSS3",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    name: "Next.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    name: "Tailwind",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    name: "Python",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    name: "MongoDB",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    name: "Node.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    name: "TypeScript",
  },
];

const repeated = [...skills, ...skills, ...skills, ...skills];

function SkillItem({ skill, index }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="group flex flex-col items-center gap-3 cursor-default flex-shrink-0"
    >
      <div
        style={{
          width: "76px",
          height: "76px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
        className="group-hover:border-[#E63946]/40 group-hover:shadow-[0_0_20px_rgba(230,57,70,0.15)]"
      >
        <img
          src={skill.src}
          alt={skill.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "grayscale(0.2)",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          transition: "color 0.3s ease",
          textTransform: "uppercase",
        }}
        className="group-hover:text-[#E63946]"
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        .skills-v2 { background: #080808; }
        .marquee-row { display: flex; gap: 28px; width: max-content; }
        .marquee-row-1 { animation: marqueeL 22s linear infinite; }
        .marquee-row-2 { animation: marqueeR 26s linear infinite; }
        @keyframes marqueeL { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeR { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .marquee-row:hover { animation-play-state: paused; }
      `}</style>

      <section
        ref={sectionRef}
        id="skills"
        className="skills-v2 w-full py-32 relative overflow-hidden"
      >
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

        {/* Ambient */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16" ref={titleRef}>
          {/* Animated line */}
          <motion.div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              marginBottom: "48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: lineWidth,
                background: "#E63946",
                boxShadow: "0 0 8px rgba(230,57,70,0.5)",
              }}
            />
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
                — Tech Stack
              </motion.span>

              <div style={{ overflow: "hidden" }}>
                {["MY", "SKILLS"].map((w, i) => (
                  <motion.div
                    key={w}
                    initial={{ y: 100 }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(3.5rem,8vw,8rem)",
                      lineHeight: 0.88,
                      color: i === 0 ? "#fff" : "transparent",
                      WebkitTextStroke:
                        i === 1 ? "1px rgba(255,255,255,0.18)" : "0px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {w}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.35)",
                maxWidth: "320px",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Hover over the icons. Everything I ship is built with this stack —
              fast, scalable, and production-ready.
            </motion.p>
          </div>
        </div>

        {/* Fade edges */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(to right, #080808, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(to left, #080808, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Row 1 — Left */}
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div className="marquee-row marquee-row-1">
              {repeated.map((skill, i) => (
                <SkillItem key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Row 2 — Right (reversed direction) */}
          <div style={{ overflow: "hidden" }}>
            <div className="marquee-row marquee-row-2">
              {[...repeated].reverse().map((skill, i) => (
                <SkillItem key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(230,57,70,0.25), transparent)",
          }}
        />
      </section>
    </>
  );
}
