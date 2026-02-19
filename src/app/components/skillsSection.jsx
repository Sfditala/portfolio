"use client";
import React from "react";

export default function SkillsSection() {
  const skills = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      name: "JS",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      name: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      name: "HTML",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      name: "CSS",
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

  return (
    <section
      id="skills"
      className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-[#FDF6ED] py-20"
    >
      {/* العنوان خلف الأيقونات ليعطي عمق (Depth) */}
      <h2 className="absolute z-0 text-7xl md:text-9xl font-black text-[#C18A82]/10 select-none">
        SKILLS
      </h2>

      <div className="relative z-10 w-full max-w-4xl h-[400px]">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-sphere absolute flex flex-col items-center justify-center transition-all duration-500 hover:scale-125 cursor-pointer"
            style={{
              // توزيع عشوائي أولي (يمكنك تعديل النسب لتناسب ذوقك)
              top: `${[10, 60, 20, 70, 40, 15][i]}%`,
              left: `${[10, 20, 50, 60, 80, 85][i]}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`, // سرعات متفاوتة للحركة
            }}
          >
            <div className="w-16 h-16 md:w-24 md:h-24 p-4 bg-white/40 backdrop-blur-sm rounded-full shadow-xl border border-white/50 flex items-center justify-center overflow-hidden">
              <img
                src={skill.src}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-2 text-xs font-bold text-[#C18A82] bg-white/80 px-2 py-1 rounded-full shadow-sm">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <style>
        {`
          .skill-sphere {
            animation: float-around ease-in-out infinite alternate;
          }

          @keyframes float-around {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(15px, -25px) rotate(5deg);
            }
            66% {
              transform: translate(-10px, 15px) rotate(-5deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }

          /* إضافة تأثير توهج خفيف عند الحوم */
          .skill-sphere:hover div {
            box-shadow: 0 0 30px rgba(193, 138, 130, 0.4);
            border-color: #C18A82;
          }
        `}
      </style>
    </section>
  );
}
