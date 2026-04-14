"use client";
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";

export default function ContactSection() {
  const socialLinks = [
    {
      name: "GitHub",
      IconComponent: FaGithub,
      url: "https://github.com/sfditala",
      bgColor: "#24292e",
    },
    {
      name: "LinkedIn",
      IconComponent: FaLinkedin,
      url: "https://www.linkedin.com/in/talasfdi/",
      bgColor: "#0077b5",
    },
    {
      name: "Instagram",
      IconComponent: FaInstagram,
      url: "https://www.instagram.com/talasafadyy/",
      bgColor: "#ee2a7b",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-20 bg-[#FDF6ED] overflow-hidden py-20"
    >
      {/* الدائرة الخلفية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#F5E0DC] rounded-full blur-[80px] md:blur-[120px] opacity-50"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        <div className="mb-10 md:mb-16">
          <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#C18A82] font-bold mb-4">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#3A2F2F] leading-tight px-2">
            Let’s talk about <br className="hidden sm:block" />
            <span className="text-[#B06B6B]">your next project.</span>
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
          {/* بطاقة الإيميل */}
          <a
            href="mailto:safaditalaworksp@gmail.com"
            className="group relative p-1 w-full max-w-md md:max-w-xl"
          >
            <div className="absolute inset-0 bg-[#B06B6B] rounded-2xl md:rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-white/60 backdrop-blur-xl border border-white px-6 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B06B6B] text-white rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg shrink-0">
                <FaEnvelope />
              </div>
              <div className="text-center sm:text-left overflow-hidden">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#C18A82] font-bold">
                  Mail me at
                </p>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-[#3A2F2F] truncate">
                  safaditalaworksp@gmail.com
                </p>
              </div>
            </div>
          </a>

          {/* زر تحميل الـ CV - الإضافة الجديدة */}
          <a
            href="/cv.pdf" // تأكدي من وضع ملف الـ pdf بهذا الاسم داخل مجلد public
            download="Tala_AlSafadi_CV.pdf"
            className="group relative flex items-center gap-3 bg-[#ffffff] text-[#FDF6ED] px-8 py-4 rounded-2xl font-bold tracking-wide shadow-lg transition-all duration-300 hover:bg-[#B06B6B] hover:shadow-[#B06B6B]/40 hover:-translate-y-1 active:scale-95"
          >
            <FaDownload className="text-lg group-hover:animate-bounce" />
            <span>Download My CV</span>
          </a>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-[#F5E0DC] text-[#3A2F2F] text-xl sm:text-2xl md:text-3xl shadow-sm transition-all duration-500 hover:-rotate-12 hover:rounded-[1.5rem] md:hover:rounded-[2rem] overflow-hidden"
              >
                <span className="z-10 transition-colors duration-300 group-hover:text-white">
                  <link.IconComponent />
                </span>

                <div
                  className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 z-0"
                  style={{ backgroundColor: link.bgColor }}
                ></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
