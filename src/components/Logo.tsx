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
    sm: { imgSize: 28, textClass: "text-lg", subClass: "text-[7.5px]" },
    md: { imgSize: 38, textClass: "text-2xl", subClass: "text-[8.5px]" },
    lg: { imgSize: 52, textClass: "text-3xl", subClass: "text-[10px]" }
  };

  const { imgSize, textClass, subClass } = dimensions[size] || dimensions.md;

  if (variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center group ${className}`}>
        <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div 
          className="relative flex items-center justify-center"
          style={{ width: imgSize, height: imgSize }}
        >
          <Image
            src="/logo-emblem.png"
            alt="EcoVault Emblem"
            width={imgSize * 2}
            height={imgSize * 2}
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* Emblem with clean transparent background and hover aura */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div 
          className="relative flex items-center justify-center flex-shrink-0"
          style={{ width: imgSize, height: imgSize }}
        >
          <Image
            src="/logo-emblem.png"
            alt="EcoVault Emblem"
            width={imgSize * 2}
            height={imgSize * 2}
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black tracking-tight flex items-center ${textClass}`}>
          <span style={{ color: light ? "#FFFFFF" : "#064E3B" }}>Eco</span>
          <span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">Vault</span>
        </div>
        
        {variant === "full" && (
          <span 
            className={`font-black tracking-[0.22em] uppercase mt-0.5 ${subClass}`}
            style={{ 
              color: light ? "rgba(255, 255, 255, 0.75)" : "#10B981" 
            }}
          >
            MAKE CARBON COUNT.
          </span>
        )}
      </div>
    </div>
  );
}
