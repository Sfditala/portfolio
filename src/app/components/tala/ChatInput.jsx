"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message); // نرسل الرسالة للمكون الأب
      setMessage(""); // ننظف الحقل بعد الإرسال
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#B06B6B] transition-all">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="اسأل تالا..."
          className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 p-1"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="text-[#B06B6B] hover:text-[#B06B6B] disabled:text-gray-300 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
