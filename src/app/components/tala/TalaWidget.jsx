"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { motion, AnimatePresence } from "framer-motion";

export default function TalaWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* نافذة الدردشة مع أنيميشن عند الظهور والاختفاء */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-2 shadow-2xl origin-bottom-right"
          >
            {/* نمرر دالة الإغلاق هنا لكي يعمل زر X الموجود داخل النافذة أيضاً */}
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر العائم (Floating Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "bg-gray-100 text-gray-600" : "bg-[#B06B6B] text-white"
        }`}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="relative">
            <MessageCircle size={28} />
            {/* نقطة إشعار صغيرة تعطي حيوية للزر */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        )}
      </button>
    </div>
  );
}
