"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Cafe Shop Landing",
    description:
      "A sleek front-end landing page for a café with smooth animations and elegant design.",
    image: "/cafe.png",
    tags: ["Next.js", "Tailwind CSS"],
    link: "https://cafeshop-seven.vercel.app/",
    github: "https://github.com/Sfditala/cafeshop",
  },
  {
    title: "E-commerce Store",
    description:
      "Full-featured e-commerce store with cart management, checkout flow, and modern UI.",
    image: "/Maha.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "https://mahastore-ecommerce.vercel.app/",
    github: "https://github.com/Sfditala/ecommerce",
  },
  {
    title: "Dashboard App",
    description:
      "Admin dashboard with interactive analytics, charts, and data tables. (Private client work — live demo restricted.)",
    image: "/dash.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Lucide", "Tailwind CSS"],
    link: "https://deploy-link.com/dashboard",
    github: "https://github.com/Sfditala/dashboard",
  },
  {
    title: "Modavi",
    description:
      "Intelligent AI stylist platform with hyper-personalized outfit coordination and style profiling.",
    image: "/modavi.png",
    tags: [
      "Next.js",
      "Shadcn UI",
      "Supabase",
      "Clerk",
      "Framer Motion",
      "Cloudinary",
    ],
    link: "https://modavi.vercel.app/",
    github: "https://github.com/Sfditala/modavi",
  },
  {
    title: "Shadow AI Detector",
    description:
      "Security platform and browser extension with a custom-trained ML model to detect sensitive data exposure to AI systems.",
    image: "/shadow.png",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Python",
      "FastAPI",
      "ML",
    ],
    link: "https://shadowai-frontend-beta.vercel.app/",
    github: "https://github.com/Sfditala/shadowai_frontend",
  },
];

export default function ProjectsSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  // 1. حالات وتجميع الفلاتر
  const [activeFilter, setActiveFilter] = useState("All");
  const allTags = [...new Set(projects.flatMap((p) => p.tags))];

  // 2. تصفية المشاريع بناءً على الفلتر النشط
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        .projects-v2 { background: #050505; }
      `}</style>

      <section
        id="projects"
        className="projects-v2 w-full py-32 relative overflow-hidden"
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

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Header */}
          <div
            ref={titleRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
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
                — Selected Work
              </motion.span>

              <div style={{ overflow: "hidden" }}>
                {["MY", "PROJECTS"].map((w, i) => (
                  <motion.div
                    key={w}
                    initial={{ y: 110 }}
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
                    }}
                  >
                    {w}
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.35)",
                maxWidth: "300px",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Each project built with intention. No templates, no shortcuts.
            </motion.p>
          </div>

          {/* 3. شريط الفلتر (Filter Bar) بتنسيق Tailwind متناسق مع الثيم */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-6"
          >
            {["All", ...allTags].map((tag) => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
                    isActive
                      ? "bg-[#E63946] text-white border-[#E63946] shadow-[0_0_15px_rgba(230,57,70,0.3)]"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tag}
                </button>
              );
            })}
          </motion.div>

          {/* 4. شبكة المشاريع - 3 أعمدة مع AnimatePresence لتأثيرات الفلترة السلسة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    layout: { type: "spring", stiffness: 500, damping: 40 },
                    duration: 0.4,
                    delay: index * 0.03,
                  }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
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
