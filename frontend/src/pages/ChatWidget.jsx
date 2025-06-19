// components/ChatWidget.jsx
import { useEffect, useState } from "react";
import socket from "../socket";
import { FaComments } from "react-icons/fa";

export default function ChatWidget({ name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Get chat history once
    socket.emit("get-chat-history");

    // Listen for full history
    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    // Listen for new messages
    socket.on("chat-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chat-history");
      socket.off("chat-message");
    };
  }, []);

  const handleSend = () => {
    if (msg.trim()) {
      const message = { sender: name, text: msg.trim() };
      socket.emit("chat-message", message);
      setMessages((prev) => [...prev, message]);
      setMsg("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary"
      >
        <FaComments size={24} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="w-80 h-96 bg-white border border-gray-300 shadow-xl rounded-xl p-4 mt-2 flex flex-col">
          <h3 className="text-lg font-semibold text-primary mb-2">💬 Live Chat</h3>

          <div className="flex-1 overflow-y-auto space-y-3 mb-3">
            {messages.map((m, i) => {
              const isTeacher = m.sender.toLowerCase() === "teacher";
              return (
                <div
                  key={i}
                  className={`flex flex-col ${
                    isTeacher ? "items-end text-right" : "items-start text-left"
                  }`}
                >
                  <span className="text-xs font-bold text-gray-500 mb-1">
                    {m.sender}
                  </span>
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                      isTeacher
                        ? "bg-purple-200 text-purple-900"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-3 py-1 rounded-md"
              placeholder="Type message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-3 py-1 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
