"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 18 });
  const imgX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-9, 9]);

  /* ─── Mouse Parallax ─── */
  useEffect(() => {
    setMounted(true);
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width - 0.5);
      mouseY.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ─── Chalk Canvas Animation ─── */
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Wait for Bebas Neue to load
    document.fonts.ready.then(() => {
      const DPR = window.devicePixelRatio || 1;
      const W = 520;

      const lines = [
        {
          text: "HI, I'M",
          size: 72,
          color: "rgba(255,255,255,0.92)",
          outline: false,
        },
        { text: "TALA", size: 148, color: "#E63946", outline: false },
        {
          text: "SAFADI",
          size: 118,
          color: "rgba(255,255,255,0.13)",
          outline: true,
        },
      ];

      // Measure total height
      let totalH = 0;
      const yPositions = [];
      lines.forEach((l) => {
        ctx.font = `400 ${l.size}px 'Bebas Neue', sans-serif`;
        yPositions.push(totalH + l.size * 0.92);
        totalH += l.size * 0.88;
      });
      totalH += 12;

      canvas.width = W * DPR;
      canvas.height = totalH * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = totalH + "px";
      ctx.scale(DPR, DPR);

      // Build char sequence
      const sequence = [];
      lines.forEach((l, li) => {
        l.text.split("").forEach((ch, ci) => {
          sequence.push({ lineIdx: li, charIdx: ci, char: ch });
        });
      });

      // Pre-measure x offsets per line
      const xOffsets = lines.map((l) => {
        ctx.font = `400 ${l.size}px 'Bebas Neue', sans-serif`;
        const offsets = [0];
        for (let k = 0; k < l.text.length - 1; k++) {
          offsets.push(offsets[k] + ctx.measureText(l.text[k]).width + 0.5);
        }
        return offsets;
      });

      function drawChalkChar(li, ci, char) {
        const l = lines[li];
        ctx.font = `400 ${l.size}px 'Bebas Neue', sans-serif`;
        const x = xOffsets[li][ci];
        const y = yPositions[li];

        // Multiple passes for chalk texture
        const passes = 4;
        for (let p = 0; p < passes; p++) {
          const ox = (Math.random() - 0.5) * 1.2;
          const oy = (Math.random() - 0.5) * 1.2;
          const alpha = l.outline
            ? 0.22 + Math.random() * 0.18
            : 0.45 + Math.random() * 0.45;
          ctx.globalAlpha = alpha;

          if (l.outline) {
            ctx.strokeStyle = l.color;
            ctx.lineWidth = 1.5;
            ctx.strokeText(char, x + ox, y + oy);
          } else {
            ctx.fillStyle = l.color;
            ctx.fillText(char, x + ox, y + oy);
          }
        }

        // Final crisp pass
        ctx.globalAlpha = l.outline ? 0.28 : 0.72;
        if (l.outline) {
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 1.5;
          ctx.strokeText(char, x, y);
        } else {
          ctx.fillStyle = l.color;
          ctx.fillText(char, x, y);
        }

        // Glow for red line
        if (!l.outline && l.color === "#E63946") {
          ctx.globalAlpha = 0.18;
          ctx.shadowColor = "#E63946";
          ctx.shadowBlur = 24;
          ctx.fillStyle = l.color;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = 1;
      }

      let seqIdx = 0;
      const INTERVAL = 38; // ms between chars

      function tick() {
        if (seqIdx >= sequence.length) return;
        const { lineIdx, charIdx, char } = sequence[seqIdx];
        // Skip spaces instantly
        if (char !== " ") drawChalkChar(lineIdx, charIdx, char);
        seqIdx++;
        setTimeout(tick, char === " " ? 10 : INTERVAL);
      }

      // Start after a brief delay
      setTimeout(tick, 500);
    });
  }, [mounted]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .hero-v3 {
          background: #080808;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        /* Subtle noise overlay */
        .hero-v3::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(230,57,70,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,57,70,0.032) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 1;
        }

        .hero-glow-orb {
          position: absolute;
          left: -8%;
          top: 5%;
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, rgba(230,57,70,0.09) 0%, transparent 68%);
          pointer-events: none;
          z-index: 1;
        }

        /* availability badge */
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(230,57,70,0.22);
          background: rgba(230,57,70,0.06);
          padding: 6px 16px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          width: fit-content;
        }

        .green-dot {
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 9px rgba(74,222,128,0.75);
          flex-shrink: 0;
          animation: greenPing 2.2s ease-in-out infinite;
        }

        @keyframes greenPing {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.6); opacity: 0.45; }
        }

        /* chalk canvas wrapper */
        .chalk-canvas-wrap {
          position: relative;
          min-height: 260px;
        }

        .chalk-canvas-wrap canvas {
          display: block;
        }

        /* sub title + desc */
        .hero-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 300;
        }

        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.88rem, 1.3vw, 0.98rem);
          color: rgba(255,255,255,0.38);
          line-height: 1.9;
          max-width: 390px;
          font-weight: 300;
        }

        .hero-desc strong {
          color: rgba(255,255,255,0.82);
          font-weight: 500;
        }

        /* Buttons */
        .btn-hire {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          background: #E63946;
          color: #fff;
          padding: 14px 40px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 0 32px rgba(230,57,70,0.28), inset 0 1px 0 rgba(255,255,255,0.1);
          text-decoration: none;
          display: inline-block;
        }

        .btn-hire::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%);
          transform: translateX(-110%);
          transition: transform 0.6s ease;
        }

        .btn-hire:hover::after  { transform: translateX(110%); }
        .btn-hire:hover {
          box-shadow: 0 0 58px rgba(230,57,70,0.6);
          transform: translateY(-2px);
        }

        .btn-work {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          background: transparent;
          color: rgba(255,255,255,0.6);
          padding: 13px 40px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.11);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-work:hover {
          border-color: rgba(255,255,255,0.38);
          color: #fff;
          transform: translateY(-2px);
          background: rgba(255,255,255,0.03);
        }

        /* Scroll hint */
        .scroll-hint {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.66rem;
          color: rgba(255,255,255,0.16);
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .scroll-bar {
          width: 44px;
          height: 1px;
          background: rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        .scroll-bar::after {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: #E63946;
          animation: barSlide 2.4s ease-in-out infinite;
        }

        @keyframes barSlide {
          0%   { left: -100%; }
          100% { left: 100%; }
        }

        /* Profile image */
        .profile-frame {
          clip-path: polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%);
          position: relative;
          overflow: hidden;
          width: clamp(260px, 30vw, 400px);
          height: clamp(330px, 40vw, 520px);
        }

        .profile-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 52%, rgba(8,8,8,0.72) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Corner brackets */
        .corner {
          position: absolute;
          width: 34px;
          height: 34px;
          border-color: #E63946;
          border-style: solid;
          z-index: 6;
        }
        .corner-tl { top: -2px;    left: -2px;    border-width: 2px 0 0 2px; }
        .corner-br { bottom: -2px; right: -2px;   border-width: 0 2px 2px 0; }

        /* Scanline */
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          z-index: 5;
          background: linear-gradient(90deg, transparent, rgba(230,57,70,0.88) 50%, transparent);
          animation: scanAnim 3.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes scanAnim {
          0%   { top: 0%;   opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Stat cards */
        .stat-card {
          position: absolute;
          background: rgba(5,5,5,0.92);
          border: 1px solid rgba(230,57,70,0.2);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 9px 16px;
          border-radius: 8px;
          z-index: 7;
        }

        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          color: #E63946;
          font-size: 1.75rem;
          line-height: 1;
          display: block;
        }

        .stat-lbl {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.36);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* Red haze behind image */
        .img-glow {
          position: absolute;
          inset: -28px;
          background: radial-gradient(ellipse at center, rgba(230,57,70,0.1) 0%, transparent 70%);
          z-index: -1;
          pointer-events: none;
        }

        /* Bottom fade */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 110px;
          background: linear-gradient(to bottom, transparent, #080808);
          pointer-events: none;
          z-index: 3;
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-v3 relative flex items-center w-full"
        id="hero"
      >
        <div className="hero-grid-bg" />
        <motion.div
          className="hero-glow-orb"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-24 grid md:grid-cols-2 gap-16 items-center">
          {/* ── LEFT ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <span className="avail-badge">
                <span className="green-dot" />
                Available for new projects
              </span>
            </motion.div>

            {/* Chalk Canvas */}
            <motion.div variants={item} className="chalk-canvas-wrap">
              <canvas ref={canvasRef} />
            </motion.div>

            {/* Role */}
            <motion.p variants={item} className="hero-role">
              Frontend Engineer · AI &amp; Data Science Student
            </motion.p>

            {/* Description */}
            <motion.p variants={item} className="hero-desc">
              I build <strong>modern, fast, high-converting</strong> web
              experiences. From landing pages to AI-integrated platforms —
              crafted with obsessive attention to detail.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-hire">
                HIRE ME NOW
              </a>
              <a href="#projects" className="btn-work">
                VIEW WORK
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div variants={item} className="scroll-hint">
              <span className="scroll-bar" />
              Scroll to explore
              <span className="scroll-bar" />
            </motion.div>
          </motion.div>

          {/* ── RIGHT — IMAGE ── */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1.15,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex justify-center md:justify-end"
          >
            <motion.div style={{ x: imgX, y: imgY }} className="relative">
              {/* Profile image */}
              <div className="profile-frame">
                <Image
                  src="/profile.jpg"
                  alt="Tala Al-Safadi"
                  fill
                  priority
                  className="object-cover object-top"
                  style={{
                    transform: "scale(1.07)",
                    filter: "contrast(1.06) saturate(0.88)",
                  }}
                />
              </div>

              {/* Scan + corners */}
              <div className="scan-line" />
              <div className="corner corner-tl" />
              <div className="corner corner-br" />

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: -28, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 1.35,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="stat-card"
                style={{ bottom: "64px", left: "-36px" }}
              >
                <span className="stat-num">2+</span>
                <span className="stat-lbl">Years Exp.</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 1.55,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="stat-card"
                style={{ top: "48px", right: "-36px" }}
              >
                <span className="stat-num">10+</span>
                <span className="stat-lbl">Projects</span>
              </motion.div>

              <div className="img-glow" />
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-bottom-fade" />
      </section>
    </>
  );
}
