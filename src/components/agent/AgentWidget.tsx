"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { AGENT_OPEN_EVENT, type AgentOpenDetail } from "@/lib/agent-bus";
import { useAgentChat } from "@/lib/agent/useAgentChat";
import { trackEvent } from "@/lib/analytics";
import ChatWindow from "./ChatWindow";

export default function AgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useAgentChat();
  const { send, markBookingStarted } = chat;

  useEffect(() => {
    const onOpen = (event: Event) => {
      const { message, booking } = (event as CustomEvent<AgentOpenDetail>).detail ?? {};
      trackEvent("agent_open");
      setIsOpen(true);
      if (booking) markBookingStarted();
      if (message) void send(message);
    };
    window.addEventListener(AGENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(AGENT_OPEN_EVENT, onOpen);
  }, [send, markBookingStarted]);

  const toggle = () => {
    if (!isOpen) trackEvent("agent_open");
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-4 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="tala-agent"
            className="origin-bottom-right"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatWindow chat={chat} onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="tala-agent"
        aria-label={isOpen ? "Close Tala AI" : "Talk to Tala AI"}
        className={`flex size-14 items-center justify-center rounded-full border transition-[background-color,color,transform] duration-200 hover:scale-105 active:scale-95 ${
          isOpen
            ? "border-border bg-surface-2 text-text-muted"
            : "border-accent/50 bg-accent-solid text-text shadow-lg shadow-accent-deep/40"
        }`}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
