"use client";
import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { X } from "lucide-react";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "أهلاً! أنا Tala AI — المساعدة الذكية لتالا صفدي. كيف يمكنني مساعدتك؟ 😊",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userText, isUser: true },
    ]);
    setIsLoading(true);
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `أنتِ "Tala AI"، المساعدة الذكية على موقع تالا الصفدي المطورة والمهندسة.

## هويتك:
ردي دائماً بنفس لغة العميل — عربي إذا كتب عربي، إنجليزي إذا كتب إنجليزي.
أسلوبك: ودي، واثق، احترافي، مع إيموجي طبيعي وغير مبالغ.
ردودك: مختصرة ومحددة — جملتين إلى أربع إلا إذا السؤال يحتاج تفصيل.

## من هي تالا الصفدي؟
مطورة Frontend وطالبة هندسة ذكاء اصطناعي، عمرها 20 سنة من غزة، فلسطين.
تبني مواقع ويب وتطبيقات ويب احترافية منذ سنتين بجانب دراستها، وتدمج الذكاء الاصطناعي في مشاريعها.

## الخدمات:
- لاندينج بيجز، مواقع كاملة، متاجر إلكترونية، داشبورد، تطبيقات AI

## التقنيات:
React, Next.js, Tailwind CSS, Framer Motion, Groq API, OpenAI API

## الأسعار:
- لاندينج بيج: يبدأ من 1800 شيكل
- موقع كامل: 3500 – 7000 شيكل
- AI أو داشبورد: يُحدد حسب المشروع
قاعدة: لا تذكري سعراً قبل أن تسأل عن تفاصيل المشروع أولاً.

## التواصل:
safaditalaworksp@gmail.com

## قواعد الرد:
1. السعر: اسأل أولاً عن نوع المشروع ثم أعطِ range
2. خارج النطاق: اعتذر بلباقة
3. لغة الرد: نفس لغة العميل دون استثناء`,
          },
          { role: "user", content: userText },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 400,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        width: "340px",
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(230,57,70,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#111",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#E63946",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.9rem",
              color: "#fff",
              boxShadow: "0 0 12px rgba(230,57,70,0.4)",
            }}
          >
            T
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                color: "#fff",
              }}
            >
              TALA ASSISTANT
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#4ade80",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Online
              </span>
            </div>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, color: "#fff" }}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "#0a0a0a",
        }}
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <MessageBubble message={msg.text} isUser={msg.isUser} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              alignSelf: "flex-start",
              display: "flex",
              gap: "4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "10px 14px",
              borderRadius: "12px",
              borderTopLeftRadius: "2px",
            }}
          >
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                style={{
                  width: "5px",
                  height: "5px",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "12px 14px",
        }}
      >
        <ChatInput onSendMessage={handleSendMessage} />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            textAlign: "center",
            color: "rgba(255,255,255,0.15)",
            marginTop: "8px",
            fontWeight: 300,
          }}
        >
          Powered by Tala Al Safadi & Groq
        </p>
      </div>
    </div>
  );
}
