"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تأثير لتغيير شكل الهيدر عند النزول بالصفحة
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["ABOUT", "PROJECTS", "SKILLS", "CONTACT"];

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
                  transition-all duration-500 ease-in-out px-4 py-2
                  flex items-center justify-between rounded-full
                  ${
                    scrolled
                      ? "w-[90%] md:w-[600px] bg-white/70 backdrop-blur-lg shadow-lg border border-white/40"
                      : "w-[95%] md:w-[800px] bg-[#FDF6ED]/50 backdrop-blur-md border border-[#F5E0DC]"
                  }`}
    >
      {/* Logo + Profile */}
      <div className="flex items-center ml-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#B06B6B] shadow-inner">
          <Image src="/about.jpg" alt="Tala" fill className="object-cover" />
        </div>
        <span className="ml-3 font-bold text-[#3A2F2F] tracking-tight hidden sm:block">
          TALA.
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-1 items-center">
        {links.map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-5 py-2 text-sm font-bold text-[#5A4A4A] hover:text-[#B06B6B] transition-all duration-300 relative group"
          >
            {item}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#B06B6B] rounded-full transition-all duration-300 group-hover:w-4"></span>
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-[#B06B6B] rounded-full shadow-md"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`h-0.5 w-5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
        ></span>
        <span
          className={`h-0.5 w-5 bg-white transition-all ${open ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`h-0.5 w-5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
        ></span>
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 mt-4 p-4 bg-white/90 backdrop-blur-2xl 
                    rounded-[2rem] border border-white shadow-2xl flex flex-col items-center gap-4 
                    md:hidden transition-all duration-300 origin-top
                    ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        {links.map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[#3A2F2F] text-lg font-bold w-full text-center py-3 hover:bg-[#F5E0DC]/30 rounded-2xl"
            onClick={() => setOpen(false)}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}
