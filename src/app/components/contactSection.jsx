"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";

const socials = [
  {
    name: "GitHub",
    Icon: FaGithub,
    url: "https://github.com/sfditala",
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedin,
    url: "https://www.linkedin.com/in/talasfdi/",
    color: "#0077b5",
  },
  {
    name: "Instagram",
    Icon: FaInstagram,
    url: "https://www.instagram.com/talasafadyy/",
    color: "#ee2a7b",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        .contact-v2 { background: #080808; }
      `}</style>

      <section
        id="contact"
        className="contact-v2 w-full py-32 relative overflow-hidden"
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

        {/* Big ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={ref}
          className="max-w-7xl mx-auto px-6 md:px-16 relative z-10"
        >
          {/* Label */}
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
            — Get In Touch
          </motion.span>

          {/* Big title */}
          <div style={{ overflow: "hidden", marginBottom: "16px" }}>
            {["LET'S", "WORK", "TOGETHER."].map((w, i) => (
              <motion.div
                key={w}
                initial={{ y: 120 }}
                animate={inView ? { y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(4rem,10vw,10rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.01em",
                  color: i < 2 ? "#fff" : "#E63946",
                  textShadow: i === 2 ? "0 0 80px rgba(230,57,70,0.4)" : "none",
                  display: "block",
                }}
              >
                {w}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              width: "60px",
              height: "2px",
              background: "#E63946",
              transformOrigin: "left",
              boxShadow: "0 0 12px rgba(230,57,70,0.5)",
              marginBottom: "64px",
            }}
          />

          {/* Cards row */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch mb-12">
            {/* Email card */}
            <motion.a
              href="mailto:safaditalaworksp@gmail.com"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -6, borderColor: "rgba(230,57,70,0.4)" }}
              style={{
                flex: 2,
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "28px 32px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "#E63946",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 24px rgba(230,57,70,0.35)",
                  fontSize: "1.3rem",
                  color: "#fff",
                }}
              >
                <FaEnvelope />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    color: "#E63946",
                    marginBottom: "4px",
                  }}
                >
                  MAIL ME AT
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.85rem,1.5vw,1.05rem)",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  safaditalaworksp@gmail.com
                </p>
              </div>
              {/* Hover shimmer */}
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "60px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                  pointerEvents: "none",
                }}
              />
            </motion.a>

            {/* CV button */}
            <motion.a
              href="/cv.pdf"
              download="Tala_AlSafadi_CV.pdf"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.42 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                background: "rgba(230,57,70,0.08)",
                border: "1px solid rgba(230,57,70,0.2)",
                borderRadius: "8px",
                padding: "28px 24px",
                textDecoration: "none",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.14em",
                color: "#E63946",
                transition: "all 0.3s ease",
              }}
              className="hover:bg-[rgba(230,57,70,0.15)] hover:border-[#E63946]/50"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaDownload />
              </motion.div>
              DOWNLOAD CV
            </motion.a>
          </div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, rotate: -8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                style={{
                  width: "54px",
                  height: "54px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "1.25rem",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  transition: "color 0.3s ease",
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: s.color,
                    zIndex: 0,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.2s ease",
                  }}
                  className="group-hover:text-white"
                >
                  <s.Icon />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
