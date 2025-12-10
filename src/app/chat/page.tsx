"use client";

import { useEffect, useState, useRef } from "react";

interface IMessage {
  from: "user" | "bot";
  text: string;
}

// Мок WebSocket для локальной работы
class MockWebSocket {
  readyState = 1;
  onmessage: ((event: { data: string }) => void) | null = null;
  send(msg: string) {
    setTimeout(() => this.onmessage?.({ data: `Эхо: ${msg}` }), 200);
  }
  close() {}
}

export default function ChatPage() {
  const [socket, setSocket] = useState<MockWebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new MockWebSocket();
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, { from: "bot", text: event.data }]);
    };
    setSocket(ws);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !socket || socket.readyState !== 1) return;

    setMessages((prev) => [...prev, { from: "user", text: message }]);
    socket.send(message);
    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Чат</h1>

      <div className="flex-1 border rounded-lg p-4 overflow-y-auto flex flex-col gap-2 
                      bg-gradient-to-b from-gray-100 to-gray-200">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 break-words max-w-[70%] transition-all duration-200
              ${m.from === "user"
                ? "self-end bg-blue-500 text-white shadow-md rounded-l-lg rounded-tr-lg animate-slide-in-right"
                : "self-start bg-gray-300 text-gray-900 shadow-sm rounded-r-lg rounded-tl-lg animate-slide-in-left"
              }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4 gap-2">
        <input
          ref={inputRef}
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
        >
          ➤
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.2s ease-out; }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left { animation: slide-in-left 0.2s ease-out; }
      `}</style>
    </div>
  );
}