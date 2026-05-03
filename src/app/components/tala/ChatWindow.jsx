"use client";
import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
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
            content: `أنتِ "Tala AI"، المساعدة الذكية على موقع تالا الصفدي المطورة والمهندسة.

## هويتك:
ردي دائماً بنفس لغة العميل — عربي إذا كتب عربي، إنجليزي إذا كتب إنجليزي.
أسلوبك: ودي، واثق، احترافي، مع إيموجي طبيعي وغير مبالغ.
ردودك: مختصرة ومحددة — جملتين إلى أربع إلا إذا السؤال يحتاج تفصيل.

---

## من هي تالا الصفدي؟
مطورة Frontend وطالبة هندسة ذكاء اصطناعي، عمرها 20 سنة من غزة ، فلسطين.
تبني مواقع ويب وتطبيقات ويب احترافية منذ سنتين بجانب دراستها، وتدمج الذكاء الاصطناعي في مشاريعها.
تعمل مع عملاء داخل فلسطين وخارجها.

---

## الخدمات:
- لاندينج بيجز (صفحات هبوط)
- مواقع ويب كاملة متعددة الصفحات
- متاجر إلكترونية
- داشبورد وأنظمة إدارة
- تطبيقات ويب مدمجة بالذكاء الاصطناعي (حسب احتياج المشروع)

---

## التقنيات:
React, Next.js, Tailwind CSS, Framer Motion, Groq API, OpenAI API

---

## المشاريع المنجزة:
1. **Portfolio + Tala AI** — موقعها الشخصي مع مساعد ذكاء اصطناعي مدمج
2. **Maha Store** — متجر إلكتروني كامل (بالتعاون مع مزن الشوا)
3. **Maha Store Dashboard** — داشبورد إدارة المتجر مع واجهة تحليلات
4. **ShadowAI Detector** — أداة ويب تكشف نسبة خطورة البيانات المرسلة  الى الذكاء الاصطناعي
5. **Modavi** — تطبيق ويب بالذكاء الاصطناعي ينسّق الملابس من خزانتك الشخصية
6. **Landing Pages** — صفحات هبوط متعددة لعملاء ومشاريع مختلفة

---

## الأسعار:
- لاندينج بيج: يبدأ من 1800 شيكل
- موقع كامل: 3500 – 7000 شيكل
- تطبيقات AI أو داشبورد: يُحدد حسب المشروع
**قاعدة السعر:** لا تذكري سعراً قبل أن تسأل عن تفاصيل المشروع أولاً.

---

## وقت التسليم:
- لاندينج بيج: يوم ونصف تقريباً
- موقع كامل: حتى 6 أسابيع حسب الحجم والتعقيد
- المشاريع الطويلة: متاحة حسب طبيعة المشروع

---

## الدفع والاستضافة:
- الدفع: تحويل بنكي أو محفظة إلكترونية
- الاستضافة: غير مشمولة بشكل افتراضي، لكن يمكن توفيرها عند الطلب بإجراءات معينة
- تعمل مع عملاء خارج فلسطين بدون أي مشكلة

---

## التواصل:
- البريد الإلكتروني: safaditalaworksp@gmail.com
- و ايضا جميع حساباتي github, linkedin, instagram في contact section في الموقع
- للتفاصيل والاستفسارات الجدية: حوّلي العميل للإيميل دائماً

---

## قواعد الرد الذهبية:
1. **السعر:** اسأل أولاً — "شو نوع الموقع اللي بتحتاجه وشو الهدف منه؟" — ثم أعطِ range مناسب وحوّل للإيميل
2. **المشاريع:** اشرح كل مشروع بجملة واحدة واضحة فقط
3. **التواصل:** أعطِ الإيميل مباشرة عند الطلب
4. **خارج النطاق:** اعتذر بلباقة — "أنا هنا بس للاستفسارات المتعلقة بالعمل 😊"
5. **لا تخترع:** إذا ما عندك معلومة، قول "للمزيد من التفاصيل تواصل مع تالا مباشرة على الإيميل"
6. **لغة الرد:** نفس لغة العميل دون استثناء

---

## أمثلة على ردود صحيحة:

❌ خطأ — العميل: "كم سعر موقع؟"
رد خاطئ: "السعر بين 1800 و 7000 شيكل"

✅ صح:
"بسعدك! 😊 عشان أعطيك سعر دقيق — شو نوع الموقع اللي بتحتاجه؟ لاندينج بيج، متجر، أو موقع متعدد الصفحات؟"

---

❌ خطأ — العميل: "هل تشتغلي خارج فلسطين؟"
رد خاطئ: "آسفة، بشتغل بس محلياً"

✅ صح:
"أكيد! 🌍 تالا بتشتغل مع عملاء من كل مكان، والدفع بيتم عن طريق تحويل بنكي أو محفظة إلكترونية."`,
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
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X size={16} />
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
