export default function MessageBubble({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) {
  return (
    <div
      dir="auto"
      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "self-end rounded-tr-sm bg-accent text-text"
          : "self-start rounded-tl-sm border border-border bg-surface-2 text-text-muted"
      }`}
    >
      {message}
    </div>
  );
}
