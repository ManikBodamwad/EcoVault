"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  shadowColor?: string; // e.g. "rgba(16, 185, 129, 0.15)"
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.02,
  shadowColor = "rgba(16, 185, 129, 0.06)"
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    boxShadow: `0 10px 30px ${shadowColor}`,
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
  });

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
    const shadowX = -mouseX * 15;
    const shadowY = -mouseY * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      boxShadow: `${shadowX}px ${shadowY + 12}px 35px ${shadowColor}`,
      transition: "transform 0.05s ease-out, box-shadow 0.05s ease-out"
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: `0 10px 30px ${shadowColor}`,
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`rounded-2xl transition-all duration-550 select-none ${className}`}
    >
      {children}
    </div>
  );
}
