"use client";
import React from "react";

export default function SkillsSection() {
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
  ];

  // نكررهم 4 مرات عشان الشريط ما ينقطع
  const repeated = [...skills, ...skills, ...skills, ...skills];

  return (
    <section
      id="skills"
      className="relative w-full py-24 bg-[#FDF6ED] overflow-hidden"
    >
      {/* عنوان */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-[#C18A82] mb-2 block">
          What I work with
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#3A2F2F]">
          Skills
        </h2>
      </div>

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #FDF6ED, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #FDF6ED, transparent)" }}
      />

      {/* الشريط */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex gap-8 w-max">
          {repeated.map((skill, i) => (
            <div
              key={i}
              className="group flex flex-col items-center gap-3 cursor-default"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-md border-2 border-[#F5E0DC] flex items-center justify-center p-4 transition-all duration-300 group-hover:border-[#B06B6B] group-hover:shadow-[0_8px_24px_rgba(176,107,107,0.2)] group-hover:-translate-y-2">
                <img
                  src={skill.src}
                  alt={skill.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-bold text-[#9A7A7A] group-hover:text-[#B06B6B] transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 20s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
