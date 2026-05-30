"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "default",
        position: "relative",
        transition: "border-color 0.4s ease",
      }}
      className="group hover:border-[#E63946]/25"
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 30%, rgba(8,8,8,0.85) 100%)",
            transition: "opacity 0.4s ease",
          }}
          className="group-hover:opacity-70"
        />

        {/* Index number */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
            background: "rgba(8,8,8,0.6)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: "3px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          {project.tags &&
            project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
        </div>

        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.6rem",
            letterSpacing: "0.04em",
            color: "#fff",
            marginBottom: "8px",
            transition: "color 0.3s ease",
            lineHeight: 1.1,
          }}
          className="group-hover:text-[#E63946]"
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.65,
            fontWeight: 300,
            marginBottom: "20px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              background: "#E63946",
              color: "#fff",
              textAlign: "center",
              padding: "10px 16px",
              borderRadius: "3px",
              textDecoration: "none",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.14em",
              boxShadow: "0 0 20px rgba(230,57,70,0.2)",
              transition: "box-shadow 0.3s ease",
            }}
            className="hover:shadow-[0_0_30px_rgba(230,57,70,0.45)]"
          >
            LIVE DEMO
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              background: "transparent",
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
              padding: "10px 16px",
              borderRadius: "3px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.14em",
              transition: "all 0.3s ease",
            }}
            className="hover:border-white/30 hover:text-white"
          >
            GITHUB
          </motion.a>
        </div>
      </div>

      {/* Bottom red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
        style={{
          height: "1px",
          background: "linear-gradient(90deg, #E63946, transparent)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}
