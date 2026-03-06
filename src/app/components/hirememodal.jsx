"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function HireMeModal({ isOpen, onClose }) {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(formRef.current);

    try {
      await emailjs.send(
        "service_05zw87j",
        "template_4eq53hl", // ← هون

        {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        },
        "MuHIsByv_CrRa30Zo",
      );
      formRef.current.reset();
      setStatus("idle");
      onClose();
    } catch (error) {
      console.error("EmailJS error:", JSON.stringify(error));
      setStatus("error");
    }
  };
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative bg-[#FDF6ED] rounded-3xl shadow-2xl w-full max-w-md p-8 animate-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#F5E0DC] text-[#B06B6B] hover:bg-[#E7C9C1] transition-all duration-200 text-lg font-bold"
          >
            ×
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-[#3A2F2F] mb-1">
              Let's Work Together 💼
            </h2>
            <p className="text-sm text-[#9A7A7A]">
              Send me a message and I'll get back to you soon!
            </p>
          </div>

          {status === "success" ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                ✅
              </div>
              <p className="text-[#3A2F2F] font-bold text-lg">Message Sent!</p>
              <p className="text-[#9A7A7A] text-sm text-center">
                Thank you! I'll reply to you as soon as possible.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#B06B6B] text-white rounded-xl font-bold hover:bg-[#9A5A5A] transition-all duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            // Form
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#9A7A7A] uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="px-4 py-3 bg-white border-2 border-[#F5E0DC] rounded-xl text-[#3A2F2F] placeholder-[#C8A8A0] focus:outline-none focus:border-[#B06B6B] transition-all duration-200 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#9A7A7A] uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="px-4 py-3 bg-white border-2 border-[#F5E0DC] rounded-xl text-[#3A2F2F] placeholder-[#C8A8A0] focus:outline-none focus:border-[#B06B6B] transition-all duration-200 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#9A7A7A] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="px-4 py-3 bg-white border-2 border-[#F5E0DC] rounded-xl text-[#3A2F2F] placeholder-[#C8A8A0] focus:outline-none focus:border-[#B06B6B] transition-all duration-200 text-sm resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Something went wrong. Please try again!
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 px-8 py-4 bg-[#B06B6B] text-white rounded-2xl font-bold shadow-[0_10px_20px_rgba(176,107,107,0.3)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {status === "loading" ? "Sending... ✨" : "Send Message 🚀"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal {
          animation: modalIn 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
