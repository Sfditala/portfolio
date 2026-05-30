"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

export default function HireMeModal({ isOpen, onClose }) {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(formRef.current);
    try {
      await emailjs.send(
        "service_05zw87j",
        "template_4eq53hl",
        {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        },
        "MuHIsByv_CrRa30Zo",
      );
      formRef.current.reset();
      setStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        .modal-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 300;
          color: #fff; outline: none;
          transition: border-color 0.3s ease;
        }
        .modal-input::placeholder { color: rgba(255,255,255,0.25); }
        .modal-input:focus { border-color: rgba(230,57,70,0.5); }
        .modal-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem;
          letter-spacing: 0.25em; color: rgba(255,255,255,0.35);
          text-transform: uppercase; display: block; margin-bottom: 8px;
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "460px",
                padding: "36px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Red accent top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #E63946, transparent)",
                }}
              />

              {/* Close */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "32px",
                  height: "32px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                ×
              </motion.button>

              {/* Header */}
              <div style={{ marginBottom: "28px" }}>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.8rem",
                    letterSpacing: "0.06em",
                    color: "#fff",
                    marginBottom: "6px",
                  }}
                >
                  LET'S WORK TOGETHER 💼
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 300,
                  }}
                >
                  Send a message — I'll get back to you within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "32px 0",
                      gap: "12px",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: "64px",
                        height: "64px",
                        background: "rgba(74,222,128,0.1)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.8rem",
                      }}
                    >
                      ✅
                    </motion.div>
                    <p
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.4rem",
                        letterSpacing: "0.06em",
                        color: "#fff",
                      }}
                    >
                      MESSAGE SENT!
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.35)",
                        textAlign: "center",
                        fontWeight: 300,
                      }}
                    >
                      Thank you! I'll reply as soon as possible.
                    </p>
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        marginTop: "8px",
                        padding: "12px 32px",
                        background: "#E63946",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.14em",
                      }}
                    >
                      CLOSE
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                    }}
                  >
                    {["name", "email"].map((field, i) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <label className="modal-label">
                          {field === "name" ? "Your Name" : "Your Email"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          required
                          placeholder={
                            field === "name" ? "John Doe" : "john@example.com"
                          }
                          className="modal-input"
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.14 }}
                    >
                      <label className="modal-label">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="modal-input"
                        style={{ resize: "none" }}
                      />
                    </motion.div>

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.78rem",
                          color: "#E63946",
                          textAlign: "center",
                        }}
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 40px rgba(230,57,70,0.5)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.21 }}
                      style={{
                        padding: "15px",
                        background: "#E63946",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor:
                          status === "loading" ? "not-allowed" : "pointer",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1rem",
                        letterSpacing: "0.14em",
                        opacity: status === "loading" ? 0.6 : 1,
                        boxShadow: "0 0 24px rgba(230,57,70,0.3)",
                      }}
                    >
                      {status === "loading"
                        ? "SENDING... ✨"
                        : "SEND MESSAGE 🚀"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
