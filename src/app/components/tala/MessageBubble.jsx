export default function MessageBubble({ message, isUser }) {
  return (
    <div
      style={{
        maxWidth: "82%",
        padding: "10px 14px",
        fontSize: "0.82rem",
        lineHeight: 1.6,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        whiteSpace: "pre-wrap",
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? "#E63946" : "rgba(255,255,255,0.05)",
        color: isUser ? "#fff" : "rgba(255,255,255,0.75)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        borderTopRightRadius: isUser ? "2px" : "12px",
        borderTopLeftRadius: isUser ? "12px" : "2px",
        boxShadow: isUser ? "0 0 20px rgba(230,57,70,0.2)" : "none",
      }}
    >
      {message}
    </div>
  );
}
