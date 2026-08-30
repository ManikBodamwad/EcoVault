"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { MessageSquare, X, Send, Trash2, HelpCircle, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatDrawer() {
  const { chatMessages, sendChatMessage, clearChat, persona } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  // Show typing animation briefly when user submits
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendChatMessage(text);
    setInputText("");
    setIsTyping(true);
    
    // Typing stops when new message arrives (simulated after 1s)
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputText);
    }
  };

  const prompts = [
    { label: "🌲 Forestry projects", query: "Show me forestry projects" },
    { label: "🐄 Biogas projects", query: "Show me biogas projects" },
    { label: "📉 Under ₹300/ton", query: "Show me projects under ₹300/ton" },
    { label: "✅ What is ACVA?", query: "What is ACVA verification?" },
    { label: "🛡️ How is escrow safe?", query: "How does the escrow work?" }
  ];

  // Don't show chatbot for seller (they have pricing assistant instead)
  if (persona === "seller") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:shadow-emerald-500/20 transition-all border border-emerald-500/30"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {/* Subtle notification badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-sky-400 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0B3D2E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-none">EcoVault AI Assistant</h3>
                  <span className="text-[9px] text-emerald-400 font-semibold mt-0.5 inline-block">Online • GCI Connected</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded hover:bg-emerald-950/50 text-slate-300 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded hover:bg-emerald-950/50 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[8px] mt-1 text-right ${
                        msg.sender === "user" ? "text-emerald-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>EcoVault AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt suggestions (shows only when chat is thin) */}
            {chatMessages.length <= 2 && (
              <div className="px-4 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {prompts.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handleSend(p.query)}
                    className="text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-medium px-2.5 py-1 rounded-full border border-slate-200/60 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask EcoVault assistant..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all"
              />
              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-emerald-600"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
