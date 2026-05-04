"use client";

import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi 👋 How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", content: data.reply || "No response" },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", content: "⚠️ Error getting response" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">

      {/* 🔘 FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => {
            console.log("CLICK WORKING"); // debug
            setOpen(true);
          }}
          className="pointer-events-auto fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl flex items-center justify-center text-xl cursor-pointer"
        >
          💬
        </button>
      )}

      {/* 💬 CHAT WINDOW */}
      {open && (
        <div className="pointer-events-auto fixed bottom-6 right-6 w-96 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <button onClick={() => setOpen(false)} className="text-white">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto space-y-2 mb-3 pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
                <span className="inline-block bg-white/10 text-white px-3 py-2 rounded-xl text-sm max-w-[80%]">
                  {msg.content}
                </span>
              </div>
            ))}

            {loading && <p className="text-xs text-gray-400">Typing...</p>}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg text-sm outline-none"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 rounded-lg text-sm text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}