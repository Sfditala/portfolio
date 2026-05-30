"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        padding: "8px 12px",
        transition: "border-color 0.3s ease",
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = "rgba(230,57,70,0.4)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
      }
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="اسأل تالا..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 300,
          color: "rgba(255,255,255,0.75)",
          padding: "2px 0",
        }}
      />
      <motion.button
        onClick={handleSend}
        disabled={!message.trim()}
        whileHover={message.trim() ? { scale: 1.15 } : {}}
        whileTap={message.trim() ? { scale: 0.9 } : {}}
        style={{
          background: "transparent",
          border: "none",
          cursor: message.trim() ? "pointer" : "default",
          color: message.trim() ? "#E63946" : "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          padding: 0,
          transition: "color 0.3s ease",
        }}
      >
        <Send size={17} />
      </motion.button>
    </div>
  );
}
