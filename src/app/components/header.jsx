"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["ABOUT", "PROJECTS", "SKILLS", "CONTACT"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        .nav-link-v2 {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5);
          transition: color 0.3s ease;
          padding: 4px 0;
        }
        .nav-link-v2::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #E63946;
          transition: width 0.4s cubic-bezier(0.25,1,0.5,1);
        }
        .nav-link-v2:hover { color: #fff; }
        .nav-link-v2:hover::after { width: 100%; }
        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .mobile-menu-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 16px 0;
          display: block;
          width: 100%;
          text-align: left;
        }
        .mobile-menu-item:hover { color: #E63946; padding-left: 10px; }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 flex items-center justify-between rounded-full transition-all duration-500
          ${
            scrolled
              ? "w-[88%] md:w-[640px] bg-[rgba(8,8,8,0.92)] backdrop-blur-xl border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "w-[94%] md:w-[820px] bg-[rgba(8,8,8,0.4)] backdrop-blur-md border border-white/[0.04]"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E63946]/40 shadow-[0_0_12px_rgba(230,57,70,0.3)]">
            <Image
              src="/profile.jpg"
              alt="Tala"
              fill
              className="object-cover"
            />
          </div>
          <span className="logo-text hidden sm:block">
            Eng.TALA<span className="text-[#E63946]">.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
            >
              <Link href={`#${item.toLowerCase()}`} className="nav-link-v2">
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA + Toggle */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="#contact"
              className="flex items-center bg-[#E63946] text-white px-5 py-2 rounded-full transition-all duration-300 hover:bg-[#c1121f] hover:shadow-[0_0_24px_rgba(230,57,70,0.5)] hover:-translate-y-0.5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
              }}
            >
              HIRE ME
            </Link>
          </motion.div>

          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 bg-white/5"
            onClick={() => setOpen(!open)}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
              className="h-[1.5px] w-5 bg-white block origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              className="h-[1.5px] w-5 bg-white block"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
              className="h-[1.5px] w-5 bg-white block origin-center"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8, y: -10 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.8, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[rgba(6,6,6,0.97)] backdrop-blur-2xl rounded-2xl border border-white/[0.06] px-6 py-4 md:hidden"
            >
              {links.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="mobile-menu-item"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                <Link
                  href="#contact"
                  className="mt-4 flex items-center justify-center bg-[#E63946] text-white rounded-xl py-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                  }}
                  onClick={() => setOpen(false)}
                >
                  HIRE ME
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
