"use client";
import { useState } from "react";
import Image from "next/image";
import HireMeModal from "./hirememodal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HireMeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* حقن الستايل مباشرة لضمان العمل في App Router */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .blob-animation {
          animation: morph 8s ease-in-out infinite;
        }
      `,
        }}
      />

      <section
        className="relative min-h-screen w-full flex flex-col md:flex-row justify-center items-center px-8 md:px-20 bg-[#FDF6ED] overflow-hidden"
        id="hero"
      >
        {/* خلفية زخرفية */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F5E0DC] rounded-full opacity-60 animate-pulse blur-[40px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#E7C9C1] rounded-full opacity-40 blur-[100px]" />

        {/* النصوص */}
        <div className="relative z-10 flex-1 flex flex-col md:pr-12 text-center md:text-left items-center md:items-start">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
            <span className="text-[#C18A82] font-semibold tracking-widest uppercase text-sm">
              Available for new opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight text-[#3A2F2F]">
            Hi, I'm <span className="text-[#B06B6B]">Tala</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-[#3A2F2F] mb-3 max-w-xl">
            I build modern websites for businesses.
          </p>

          <p className="text-base md:text-lg max-w-xl mb-10 text-[#5A4A4A] leading-relaxed">
            Front-end Engineer & AI Student specializing in{" "}
            <span className="font-semibold text-[#B06B6B]">
              React & Next.js
            </span>
            . From landing pages to web apps — fast, clean, and built to
            convert.
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative w-12 h-12 bg-[#B06B6B] text-white rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center text-lg"
            >
              💼
              <span className="absolute -top-9 bg-[#3A2F2F] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Hire
              </span>
            </button>

            <a
              href="#projects"
              className="group relative w-12 h-12 bg-white border-2 border-[#B06B6B] text-[#B06B6B] rounded-xl flex items-center justify-center text-lg hover:-translate-y-1 transition-all"
            >
              🎨
            </a>

            <a
              href="mailto:safaditalaworksp@gmail.com"
              className="group relative w-12 h-12 bg-white border-2 border-[#B06B6B] text-[#B06B6B] rounded-xl flex items-center justify-center text-lg hover:-translate-y-1 transition-all"
            >
              ✉️
            </a>
          </div>
        </div>

        {/* صورة البروفايل مع الأنميشن المصلح */}
        <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-16 md:mt-0">
          <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
            {/* التوهج الخلفي */}
            <div className="absolute inset-0 bg-[#C18A82] opacity-20 blur-[30px] blob-animation" />

            {/* إطار الصورة */}
            <div className="relative w-full h-full overflow-hidden shadow-2xl transition-all duration-500 border-4 border-white blob-animation">
              <Image
                src="/profile.jpg"
                alt="Tala Safadi"
                fill
                priority
                className="object-cover object-center scale-125 transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
