import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FDF6ED] pt-16 pb-8 overflow-hidden">
      {/* خط فاصل علوي بتدرج ناعم */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C18A82] to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* الجانب الأيسر: الشعار والوصف القصير */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#B06B6B] rounded-lg flex items-center justify-center text-white text-sm">
                <FaCode />
              </div>
              <span className="text-2xl font-black text-[#3A2F2F] tracking-tight">
                Tala<span className="text-[#B06B6B]">.</span>
              </span>
            </div>
            <p className="text-[#5A4A4A] text-sm max-w-xs leading-relaxed">
              Building digital experiences with precision and passion.
              Specialized in React, Next.js, and AI integration.
            </p>
          </div>

          {/* الجانب الأوسط: روابط سريعة */}
          <nav className="flex gap-8 text-sm font-bold text-[#3A2F2F] uppercase tracking-widest">
            <a href="#hero" className="hover:text-[#B06B6B] transition-colors">
              Home
            </a>
            <a
              href="#projects"
              className="hover:text-[#B06B6B] transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-[#B06B6B] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* الجانب الأيمن: أيقونات التواصل الاجتماعي */}
          <div className="flex gap-4">
            {[
              { icon: <FaGithub />, url: "https://github.com/sfditala" },
              {
                icon: <FaLinkedin />,
                url: "https://www.linkedin.com/in/talasfdi/",
              },
              {
                icon: <FaInstagram />,
                url: "https://www.instagram.com/talasafadyy/",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#F5E0DC] flex items-center justify-center text-[#3A2F2F] hover:bg-[#B06B6B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* الجزء السفلي: حقوق النشر */}
        <div className="pt-8 border-t border-[#F5E0DC] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9A7A7A] text-xs font-medium">
            © {currentYear}{" "}
            <span className="text-[#3A2F2F]">Tala Al-Safadi</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#9A7A7A]">
            <span>Made with</span>
            <span className="text-[#B06B6B] animate-pulse">❤️</span>
            <span>in Gaza</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
