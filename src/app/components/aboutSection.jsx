"use client";
import React from "react";

const points = [
  {
    icon: "💻",
    text: "Self-taught Frontend Developer, mastered React & Next.js",
  },
  { icon: "📊", text: "Built interactive dashboards with clean and smooth UX" },
  {
    icon: "🛒",
    text: "Developed E-commerce stores with polished frontend design",
  },
  {
    icon: "☕",
    text: "Designed Cafe landing pages that are minimal, elegant, and user-friendly",
  },
  {
    icon: "🌟",
    text: "Created personal portfolio to showcase my journey and projects",
  },
  {
    icon: "🔥",
    text: "Curious, ambitious, and detail-oriented, always striving for perfection",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center py-24 bg-[#FDF6ED]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#C18A82] font-bold mb-3">
            Discovery
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#3A2F2F]">
            About Me
          </h3>
          <div className="h-1 w-20 bg-[#C18A82] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Intro Text */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#5A4A4A] text-lg md:text-xl leading-relaxed italic">
            "Hi, I’m <span className="text-[#C18A82] font-bold">Tala!</span> 💖
            A self-taught Frontend Developer and AI & Data Science student. I
            love creating projects that combine clean design, smooth
            functionality, and meaningful impact."
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white border border-transparent hover:border-[#F5E0DC] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(193,138,130,0.1)] transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#FDF6ED] group-hover:bg-[#F5E0DC] transition-colors duration-300 mb-6 text-2xl">
                {point.icon}
              </div>
              <p className="text-[#3A2F2F] font-medium leading-snug">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
