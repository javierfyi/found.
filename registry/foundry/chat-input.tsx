"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Plus, ArrowUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const BOT_RESPONSES = [
  "Got it! \u{1F44D}",
  "Interesting, tell me more",
  "On it \u{1F680}",
  "Sounds good!",
  "Makes sense \u{2728}",
];

export interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  className?: string;
  maxMessages?: number;
}

export function ChatInput({
  placeholder = "Send Message",
  onSend,
  className,
  maxMessages = 8,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const botResponseIndex = useRef(0);

  const hasValue = value.trim().length > 0;

  function addMessage(text: string) {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      text,
      sender: "user",
    };

    setMessages((prev) => {
      const next = [...prev, userMsg];
      return next.slice(-maxMessages);
    });

    onSend?.(text);

    setTimeout(() => {
      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: BOT_RESPONSES[botResponseIndex.current % BOT_RESPONSES.length],
        sender: "bot",
      };
      botResponseIndex.current += 1;
      setMessages((prev) => {
        const next = [...prev, botMsg];
        return next.slice(-maxMessages);
      });
    }, 600);
  }

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    addMessage(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className={cn("relative w-full max-w-lg", className)}>
      {/* Messages */}
      <div
        className="pointer-events-none absolute bottom-[70px] right-0 z-[1] flex w-full flex-col items-end gap-2"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className={cn(
                "max-w-[260px] break-words overflow-hidden text-ellipsis px-[14px] py-[10px] text-sm",
                msg.sender === "user"
                  ? "self-end rounded-[14px_14px_6px_14px] bg-white text-black shadow-[0_10px_20px_-6px_rgba(0,0,0,0.1)]"
                  : "self-start rounded-[14px_14px_14px_6px] bg-sky-500 text-white shadow-[0_10px_20px_-6px_rgba(0,0,0,0.2)]"
              )}
            >
              <p className="will-change-transform">{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="relative rounded-3xl bg-white p-1 shadow-[0_10px_20px_-6px_rgba(0,0,0,0.1)]">
        <div className="z-[2] relative flex items-center justify-between rounded-3xl border-gray-100 bg-white p-1.5">
          <div className="flex flex-1 items-center gap-3 pr-3">
            <button
              type="button"
              className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#f5f4f3] transition-colors hover:bg-[#eeedec]"
              aria-label="Attach"
            >
              <Plus className="size-5 text-gray-400" aria-hidden="true" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent font-medium outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasValue}
            className={cn(
              "flex size-10 items-center justify-center overflow-hidden rounded-lg transition-colors",
              hasValue
                ? "bg-black hover:bg-neutral-800"
                : "bg-[#f5f4f3]"
            )}
            aria-label="Send"
          >
            <span className="-rotate-90">
              <ArrowUp
                className={cn(
                  "size-5 stroke-[2.5]",
                  hasValue ? "text-white" : "text-gray-400"
                )}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
