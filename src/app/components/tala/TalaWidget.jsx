"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";

export default function TalaWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={
          isOpen
            ? {}
            : {
                boxShadow: [
                  "0 0 0px rgba(230,57,70,0)",
                  "0 0 24px rgba(230,57,70,0.6)",
                  "0 0 0px rgba(230,57,70,0)",
                ],
              }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          background: isOpen ? "rgba(255,255,255,0.06)" : "#E63946",
          border: isOpen
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(230,57,70,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isOpen ? "rgba(255,255,255,0.6)" : "#fff",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "12px",
              height: "12px",
              background: "#fff",
              borderRadius: "50%",
              border: "2px solid #E63946",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
