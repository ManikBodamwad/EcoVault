"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { MessageSquare, X, Send, Trash2, HelpCircle, Sparkles, Loader2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper component to parse inline markdown (bold, italic, code)
function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const tokens = text.split(regex);

  tokens.forEach((token, index) => {
    if (!token) return;
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={index} className="font-bold text-slate-950">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      parts.push(
        <em key={index} className="italic text-slate-700">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={index} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[11px] font-mono border border-emerald-200">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(token);
    }
  });

  return parts;
}

// Full rich markdown renderer for AI responses
function FormattedMessage({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <div className="leading-relaxed">{content}</div>;
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = (keyIndex: number) => {
    if (tableRows.length > 0) {
      const headers = tableRows[0];
      const dataRows = tableRows.slice(1).filter(r => !r.every(c => c.match(/^:?-+:?$/))); // filter out separator line
      
      elements.push(
        <div key={`table-${keyIndex}`} className="my-2.5 overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
          <table className="min-w-full divide-y divide-slate-200 text-[11px]">
            <thead className="bg-emerald-50/80">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-2.5 py-1.5 text-left font-bold text-emerald-950">
                    {formatInlineText(h.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-2.5 py-1.5 text-slate-700 whitespace-nowrap">
                      {formatInlineText(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for Table line
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      inTable = true;
      const cells = trimmed.split("|").slice(1, -1);
      tableRows.push(cells);
      return;
    } else if (inTable) {
      flushTable(index);
    }

    if (!trimmed) {
      elements.push(<div key={`spacer-${index}`} className="h-1.5" />);
      return;
    }

    // Headers (### or ##)
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      const headerText = trimmed.replace(/^#{2,3}\s+/, "");
      elements.push(
        <h4 key={index} className="font-bold text-emerald-950 text-xs mt-2 mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          {formatInlineText(headerText)}
        </h4>
      );
      return;
    }

    // Bullet points (- or * or •)
    if (trimmed.match(/^[-*•]\s+/)) {
      const bulletText = trimmed.replace(/^[-*•]\s+/, "");
      elements.push(
        <div key={index} className="flex items-start gap-2 my-1 pl-1 text-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
          <div className="flex-1 leading-relaxed">
            {formatInlineText(bulletText)}
          </div>
        </div>
      );
      return;
    }

    // Numbered lists (1. 2. etc)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const num = numMatch[1];
      const itemText = numMatch[2];
      elements.push(
        <div key={index} className="flex items-start gap-2 my-1 pl-1 text-slate-800">
          <span className="font-bold text-emerald-700 text-[11px] min-w-[14px] flex-shrink-0">{num}.</span>
          <div className="flex-1 leading-relaxed">
            {formatInlineText(itemText)}
          </div>
        </div>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={index} className="my-1 leading-relaxed text-slate-800">
        {formatInlineText(trimmed)}
      </p>
    );
  });

  if (inTable) {
    flushTable(lines.length);
  }

  return <div className="space-y-0.5 text-xs">{elements}</div>;
}

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

  // Show typing animation while real AI call executes
  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setInputText("");
    setIsTyping(true);
    
    try {
      await sendChatMessage(text);
    } catch (e) {
      console.warn("Chat error:", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(inputText);
    }
  };

  const prompts = [
    { label: "Forestry Projects", query: "Show me verified forestry projects in India" },
    { label: "Biogas Projects", query: "Show me agricultural biogas projects" },
    { label: "Under ₹300/ton", query: "Which credits are priced under ₹300/ton?" },
    { label: "How Escrow Works", query: "How does the EcoVault institutional escrow protect transactions?" },
    { label: "What is ACVA?", query: "What is ACVA verification and satellite audit?" },
    { label: "BRSR Reporting", query: "How do EcoVault retirement certificates support BRSR compliance?" }
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
        className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-emerald-500 hover:shadow-emerald-500/30 transition-all border border-emerald-400/40 cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {/* Subtle notification badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[420px] md:w-[460px] h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-[#0B3D2E] text-white p-4 flex items-center justify-between border-b border-emerald-900/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/80 flex items-center justify-center border border-emerald-400/30 shadow-xs">
                  <Bot className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">EcoVault AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-300 font-semibold tracking-wide uppercase">Groq AI • GCI Registry Live</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <FormattedMessage content={msg.text} isUser={msg.sender === "user"} />
                    <div
                      className={`text-[9px] mt-1.5 text-right font-mono ${
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
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 text-xs text-slate-600">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span className="font-medium">Querying carbon registry & analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt suggestions pills (always accessible) */}
            <div className="px-3 py-2 bg-slate-100/95 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              {prompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSend(p.query)}
                  className="text-[11px] whitespace-nowrap bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200/80 hover:border-emerald-300 transition-all shadow-2xs flex-shrink-0 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about carbon credits, ACVA audits, pricing..."
                className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50 focus:bg-white transition-all text-slate-800"
              />
              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-emerald-600 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

