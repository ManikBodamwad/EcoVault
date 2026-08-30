"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  shadowColor?: string; // e.g. "rgba(16, 185, 129, 0.15)"
  enableSheen?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  scale = 1.015,
  shadowColor = "rgba(16, 185, 129, 0.08)",
  enableSheen = true
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    boxShadow: `0 12px 32px ${shadowColor}`,
    transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to center of card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotate values
    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    // Calculate shadow offset
    const shadowX = -mouseX * 20;
    const shadowY = -mouseY * 20;

    setStyle({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      boxShadow: `${shadowX}px ${shadowY + 16}px 40px ${shadowColor}`,
      transition: "transform 0.08s ease-out, box-shadow 0.08s ease-out"
    });

    if (enableSheen) {
      setGlarePos({
        x: ((e.clientX - rect.left) / width) * 100,
        y: ((e.clientY - rect.top) / height) * 100,
        opacity: 0.12
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: `0 12px 32px ${shadowColor}`,
      transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
    });
    if (enableSheen) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative rounded-2xl select-none overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Specular Sheen Follower */}
      {enableSheen && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.9), transparent 70%)`
          }}
        />
      )}
      {children}
    </div>
  );
}
