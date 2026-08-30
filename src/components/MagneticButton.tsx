"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button"
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring configurations for magnetic pull feel
  const springConfig = { stiffness: 220, damping: 18, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate offset from center (-0.5 to 0.5)
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.3;
    const deltaY = (clientY - centerY) * 0.3;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Variant classes
  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/10 border border-emerald-500/30",
    secondary:
      "bg-[#0B3D2E] hover:bg-emerald-950 text-white shadow-md shadow-emerald-950/20 border border-emerald-900/40",
    outline:
      "bg-white/80 hover:bg-emerald-50/60 text-slate-700 hover:text-emerald-800 border border-slate-200/80 hover:border-emerald-300 shadow-sm",
    ghost:
      "bg-transparent hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700 border border-transparent"
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      transition={{ ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden select-none disabled:opacity-50 disabled:pointer-events-none group ${variantStyles[variant]} ${className}`}
    >
      {/* Inner sheen / gradient sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
      
      {/* Soft inner glow on hover */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-white/20" />
      
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </motion.button>
  );
}
