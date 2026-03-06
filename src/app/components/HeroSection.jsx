"use client";
import { useState } from "react";
import Image from "next/image";
import HireMeModal from "./hirememodal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HireMeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <section
        className="relative min-h-screen w-full flex flex-col md:flex-row justify-center items-center px-8 md:px-20 bg-[#FDF6ED] overflow-hidden"
        id="hero"
      >
        {/* خلفية زخرفية */}
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-[#F5E0DC] rounded-full opacity-60 animate-pulse"
          style={{ filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-10 right-10 w-64 h-64 bg-[#E7C9C1] rounded-full opacity-40"
          style={{ filter: "blur(100px)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#F0D9D4] rounded-full opacity-20"
          style={{ filter: "blur(80px)", transform: "translate(-50%, -50%)" }}
        />

        {/* النصوص */}
        <div className="relative z-10 flex-1 flex flex-col md:pr-12 text-center md:text-left items-center md:items-start">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
            <span className="text-[#C18A82] font-semibold tracking-widest uppercase text-sm">
              Available for new opportunities
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight text-[#3A2F2F]">
            Hi, I'm <span className="text-[#B06B6B]">Tala</span>
          </h1>

          {/* Value Proposition — هاد هو اللي بيبيع */}
          <p className="text-xl md:text-2xl font-semibold text-[#3A2F2F] mb-3 max-w-xl">
            I build modern websites & AI-powered tools for businesses
          </p>

          <p className="text-base md:text-lg max-w-xl mb-10 text-[#5A4A4A] leading-relaxed">
            Front-end Engineer & AI Student specializing in{" "}
            <span className="font-semibold text-[#B06B6B]">
              React & Next.js
            </span>
            . From landing pages to full-stack web apps — fast, clean, and built
            to convert.
          </p>

          {/* CTAs */}
          <div className="flex flex-row gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative w-12 h-12 bg-[#B06B6B] text-white rounded-xl font-bold shadow-[0_8px_16px_rgba(176,107,107,0.35)] hover:shadow-[0_12px_24px_rgba(176,107,107,0.45)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-lg"
            >
              💼
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#3A2F2F] text-white text-xs font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                Hire Me
              </span>
            </button>

            <a
              href="#projects"
              className="group relative w-12 h-12 bg-white border-2 border-[#B06B6B] text-[#B06B6B] rounded-xl font-bold shadow-[0_8px_16px_rgba(176,107,107,0.12)] hover:shadow-[0_12px_24px_rgba(176,107,107,0.22)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-lg"
            >
              🎨
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#3A2F2F] text-white text-xs font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                View My Work
              </span>
            </a>

            <a
              href="mailto:safaditalaworksp@gmail.com?subject=Let's talk!"
              className="group relative w-12 h-12 bg-white border-2 border-[#B06B6B] text-[#B06B6B] rounded-xl font-bold shadow-[0_8px_16px_rgba(176,107,107,0.12)] hover:shadow-[0_12px_24px_rgba(176,107,107,0.22)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-lg"
            >
              ✉️
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#3A2F2F] text-white text-xs font-semibold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                Contact Me
              </span>
            </a>
          </div>

          {/* Social Proof صغير */}
          <div className="mt-8 flex items-center gap-4 text-sm text-[#9A7A7A]">
            <span>🛠 React · Next.js · Node.js · AI</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">⚡ Fast delivery</span>
          </div>
        </div>

        {/* صورة البروفايل */}
        <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-16 md:mt-0">
          <div className="relative" style={{ width: "420px", height: "420px" }}>
            <div
              className="absolute inset-0 bg-[#C18A82] opacity-20 animate-blob"
              style={{ filter: "blur(30px)" }}
            />
            <div className="relative w-full h-full overflow-hidden shadow-2xl transition-all duration-500 blob-shape border-4 border-white">
              <Image
                src="/about.jpg"
                alt="Tala Safadi - Front-end Engineer"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          .blob-shape {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            animation: morph 8s ease-in-out infinite;
          }

          @keyframes morph {
            0% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
            100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
          }

          @keyframes blob {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </section>
    </>
  );
}
