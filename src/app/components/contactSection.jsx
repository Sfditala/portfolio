"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/sfditala",
      bgColor: "#24292e",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/talasfdi/",
      bgColor: "#0077b5",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/talasafadyy/",
      bgColor: "#ee2a7b",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-8 md:px-20 bg-[#FDF6ED] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5E0DC] rounded-full blur-[120px] opacity-50"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#C18A82] font-bold mb-4">
            Get In Touch
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-[#3A2F2F] leading-tight">
            Let’s talk about <br />
            <span className="text-[#B06B6B]">your next project.</span>
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center gap-10">
          <a
            href="mailto:safaditalaworksp@gmail.com"
            className="group relative p-1"
          >
            <div className="absolute inset-0 bg-[#B06B6B] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex items-center gap-6 bg-white/60 backdrop-blur-xl border border-white px-10 py-6 rounded-3xl shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-14 h-14 bg-[#B06B6B] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                <FaEnvelope />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-[#C18A82] font-bold">
                  Mail me at
                </p>
                <p className="text-xl md:text-2xl font-bold text-[#3A2F2F]">
                  safaditalaworksp@gmail.com
                </p>
              </div>
            </div>
          </a>

          <div className="flex gap-6 mt-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl border border-[#F5E0DC] text-[#3A2F2F] text-2xl md:text-3xl shadow-sm transition-all duration-500 hover:-rotate-12 hover:rounded-[2rem] overflow-hidden"
              >
                <span className="z-10 transition-colors duration-300 group-hover:text-white">
                  {link.icon}
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
