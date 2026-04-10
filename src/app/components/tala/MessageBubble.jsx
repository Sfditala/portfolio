export default function MessageBubble({ message, isUser }) {
  return (
    <div
      className={`max-w-[80%] px-4 py-2.5 shadow-sm text-sm ${
        isUser
          ? "bg-[#B06B6B] text-white self-end rounded-2xl rounded-tr-none"
          : "bg-white border border-gray-200 text-gray-800 self-start rounded-2xl rounded-tl-none"
      } whitespace-pre-wrap mb-2`}
    >
      {message}
    </div>
  );
}
