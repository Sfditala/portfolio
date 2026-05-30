"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from "react-icons/fa";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        .footer-v2 { background: #050505; }
        .footer-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.75rem; letter-spacing: 0.22em;
          color: rgba(255,255,255,0.3); text-decoration: none;
          transition: color 0.3s ease; text-transform: uppercase;
        }
        .footer-link:hover { color: #E63946; }
      `}</style>

      <footer
        ref={ref}
        className="footer-v2 relative pt-14 pb-8 overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(230,57,70,0.2), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center md:items-start gap-3"
            >
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    background: "#E63946",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.85rem",
                    boxShadow: "0 0 16px rgba(230,57,70,0.4)",
                  }}
                >
                  <FaCode />
                </div>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.5rem",
                    letterSpacing: "0.06em",
                    color: "#fff",
                  }}
                >
                  TALA<span style={{ color: "#E63946" }}>.</span>
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.28)",
                  maxWidth: "220px",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  textAlign: "center",
                }}
                className="md:text-left"
              >
                Building digital experiences with precision and passion.
              </p>
            </motion.div>

            {/* Nav */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-10"
            >
              {["Home", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="footer-link"
                >
                  {item}
                </a>
              ))}
            </motion.nav>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-3"
            >
              {[
                { Icon: FaGithub, url: "https://github.com/sfditala" },
                {
                  Icon: FaLinkedin,
                  url: "https://www.linkedin.com/in/talasfdi/",
                },
                {
                  Icon: FaInstagram,
                  url: "https://www.instagram.com/talasafadyy/",
                },
              ].map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, color: "#E63946" }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
            className="md:flex-row md:justify-between"
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 300,
              }}
            >
              © {currentYear}{" "}
              <span style={{ color: "rgba(255,255,255,0.45)" }}>
                Eng. Tala Al-Safadi
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
