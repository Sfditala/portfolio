"use client";
import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "أهلاً بك! أنا Tala، المساعدة الذكية لتالا صفدي. كيف يمكنني مساعدتك اليوم؟ 😊",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMsg = { id: Date.now(), text: userText, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `أنتِ Tala، المساعدة الذكية لتالا صفدي.
            
**القاعدة الذهبية:** أجيبي **فقط** على قدر السؤال. إذا سأل عن المشاريع، لا تذكري الأسعار. إذا سأل عن التواصل، لا تذكري التخصص. كوني محددة ومختصرة كما في ملف تدريبك.

**قاعدة البيانات الخاصة بكِ:**
- **الهوية:** مطورة Frontend، طالبة هندسة ذكاء اصطناعي (سنة أولى).
- **المشاريع:** 1. ماها ستور (بالتعاون مع مزن الشوا).
  2. داشبورد ماها ستور.
  3. ShadowAI Detector.
  4. Tala AI (أنا).
- **الأسعار:** من 1800 إلى 7000 شيكل.
- **التسليم:** صفحة واحدة (يوم ونصف)، مشروع كامل (شهر ونصف).
- **التواصل:** البريد safaditalaworksp@gmail.com.
-**التقنيات المستخدمة:** React, Next.js, Tailwind CSS.

**الأسلوب:**
- ردي بأسلوب ودي واحترافي مع إيموجي.
- إذا كان السؤال خارج نطاق العمل، اعتذري بلباقة وأخبريه أنكِ هنا للأعمال فقط.`,
          },
          { role: "user", content: userText },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.4, // خفضنا القيمة من 0.4 إلى 0.2 لزيادة الدقة والالتزام
        max_tokens: 400, // تحديد عدد الكلمات يمنع الموديل من الرغي الزائد
      });

      const aiText = completion.choices[0]?.message?.content;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiText, isUser: false },
      ]);
    } catch (error) {
      console.error("Groq Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[350px] fixed bottom-5 right-5 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-50 transition-all duration-300">
      {/* Header - رأس النافذة بحجم أنحف وأرتب */}
      <div className="bg-[#B06B6B] p-3 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs border border-white/10">
            T
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-wide">Tala Assistant</h3>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-[9px] text-white/80">Online</p>
            </div>
          </div>
        </div>
        <button className="text-white/60 hover:text-white transition-colors">
          {/* يمكنك إضافة أيقونة إغلاق هنا إذا أردتِ */}
        </button>
      </div>

      {/* Messages Area - مساحة الرسائل */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FCF9F7] scrollbar-thin scrollbar-thumb-gray-200"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}

        {isLoading && (
          <div className="self-start flex items-center gap-1 bg-white border border-gray-100 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        )}
      </div>

      {/* Input Area - منطقة الإدخال مدمجة بشكل أفضل */}
      <div className="p-3 bg-white border-t border-gray-50">
        <ChatInput onSendMessage={handleSendMessage} />
        <p className="text-[8px] text-center text-gray-400 mt-2">
          Powered by Tala AL Safadi & Gorq
        </p>
      </div>
    </div>
  );
}
