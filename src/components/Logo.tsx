"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "horizontal" | "icon";
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  variant = "horizontal",
  className = "",
  light = false,
  size = "md"
}: LogoProps) {
  // Dimension mappings
  const dimensions = {
    sm: { imgWidth: 32, imgHeight: 32, hClass: "h-8" },
    md: { imgWidth: 44, imgHeight: 44, hClass: "h-11" },
    lg: { imgWidth: 60, imgHeight: 60, hClass: "h-16" }
  };

  const { imgWidth, imgHeight, hClass } = dimensions[size] || dimensions.md;

  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center group ${className}`}>
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="relative w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="EcoVault Logo"
            width={44}
            height={44}
            className="object-cover object-center w-full h-full scale-[1.4]"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Emblem */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className={`relative ${hClass} aspect-square overflow-hidden rounded-full flex items-center justify-center`}>
          <Image
            src="/logo.png"
            alt="EcoVault Emblem"
            width={imgWidth * 1.3}
            height={imgHeight * 1.3}
            className="object-cover object-top w-full h-full scale-[1.45] transition-transform duration-300 group-hover:scale-[1.55]"
            priority
          />
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <span 
          className="text-xl sm:text-2xl font-black tracking-tight flex items-center transition-colors"
          style={{ 
            color: light ? "#FFFFFF" : "#064E3B",
            fontFamily: "var(--font-sans)"
          }}
        >
          <span>Eco</span>
          <span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">Vault</span>
        </span>
        
        {variant === "full" && (
          <span 
            className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase mt-0.5"
            style={{ 
              color: light ? "rgba(255, 255, 255, 0.7)" : "#10B981" 
            }}
          >
            MAKE CARBON COUNT.
          </span>
        )}
      </div>
    </div>
  );
}
