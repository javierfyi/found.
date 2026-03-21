"use client";

import { Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const componentId = "animated-counter";
  const installCommand = `npx shadcn add @foundry/${componentId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden text-foreground">
      {/* Content - Centered */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 sm:px-10">
        {/* Title Text */}
        <p className="text-xl font-bold text-black mb-4">
          Get started with Foundry
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          {/* Install Command */}
          <div
            className="group flex cursor-pointer items-center justify-center rounded-2xl bg-muted font-mono"
            style={{ padding: "12px 20px" }}
            tabIndex={0}
            onClick={handleCopy}
          >
            <div className="flex items-center text-xs font-semibold text-black/40 group-active:scale-[0.999]">
              <span>npx shadcn add </span>
              @foundry
              <span className="text-black/40">/{componentId}</span>
              <span className="relative ml-3 flex items-center">
                <Copy
                  className={`size-4 transition-all duration-200 ease ${copied ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
                />
                <Check
                  className={`absolute size-4 transition-all duration-200 ease ${copied ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                />
              </span>
            </div>
          </div>

          {/* Quick Start Button */}
          <Link href="/components" className="flex items-center justify-center">
            <div
              className="flex cursor-pointer items-center justify-center rounded-2xl bg-blue-500 text-xs font-bold text-white"
              style={{ padding: "12px 20px" }}
              tabIndex={0}
            >
              Quick Start
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
