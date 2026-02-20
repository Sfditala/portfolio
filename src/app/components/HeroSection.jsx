// src/app/components/HeroSection.js
"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col md:flex-row justify-center items-center 
                 px-8 md:px-20 bg-[#FDF6ED] overflow-hidden"
    >
      {/* عناصر خلفية عائمة للجمالية */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-[#F5E0DC] rounded-full opacity-60 animate-pulse"
        style={{ filter: "blur(3xl)" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-64 h-64 bg-[#E7C9C1] rounded-full opacity-40"
        style={{ filter: "blur(100px)" }}
      ></div>

      {/* النصوص */}
      <div className="relative z-10 flex-1 flex flex-col md:pr-12 text-center md:text-left items-center md:items-start">
        <span className="text-[#C18A82] font-bold tracking-widest uppercase text-sm mb-4">
          Available for new opportunities
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight text-[#3A2F2F]">
          Hi, I’m <span className="text-[#B06B6B]">Tala</span>
        </h1>
        <p className="text-lg md:text-xl max-w-xl mb-10 text-[#5A4A4A] leading-relaxed">
          A{" "}
          <span className="font-semibold text-[#3A2F2F]">
            Front-end Engineer
          </span>{" "}
          & AI Student. I craft calm, elegant, and interactive digital
          experiences with a focus on clean code.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-[#B06B6B] text-white rounded-2xl font-bold 
                       shadow-[0_10px_20px_rgba(176,107,107,0.3)] hover:shadow-xl 
                       hover:-translate-y-1 transition-all duration-300 text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-[#B06B6B] text-[#B06B6B] rounded-2xl font-bold 
                       hover:bg-[#F5E0DC]/20 transition-all duration-300 text-center"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* البروفايل مع Blob Animation */}
      <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-16 md:mt-0">
        <div
          className="relative w-72 h-72"
          style={{ width: "450px", height: "450px" }}
        >
          {/* الشكل الانسيابي خلف الصورة */}
          <div
            className="absolute inset-0 bg-[#C18A82] opacity-20 animate-blob"
            style={{ filter: "blur(2xl)" }}
          ></div>

          <div className="relative w-full h-full overflow-hidden shadow-2xl transition-all duration-500 blob-shape border-4 border-white">
            <Image
              src="/about.jpg"
              alt="Tala Profile"
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
  );
}
