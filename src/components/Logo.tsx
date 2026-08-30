import React from "react";

interface LogoProps {
  variant?: "full" | "horizontal" | "icon";
  className?: string;
  light?: boolean;
}

export default function Logo({ variant = "horizontal", className = "", light = false }: LogoProps) {
  const brandDark = "#0B3D2E";
  const brandPrimary = "#16A34A";
  const brandLight = "#4ADE80";
  
  const textMainColor = light ? "#F7FAF8" : "#0B3D2E";
  const textSubColor = light ? "#A3E635" : "#16A34A";

  // SVG Logo Icon
  const LogoIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-10 h-10 select-none flex-shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle Vault Frame */}
      <circle cx="50" cy="50" r="46" stroke={light ? brandLight : brandPrimary} strokeWidth="3.5" strokeDasharray="3 2" />
      <circle cx="50" cy="50" r="40" fill={brandDark} />
      
      {/* Stylized Leaf-E Icon with Keyhole */}
      {/* E-Shape and Keyhole Backing */}
      <path
        d="M32 35 C32 30, 68 30, 68 35 M32 50 L62 50 M32 65 C32 70, 68 70, 68 65"
        stroke={light ? "#ffffff" : brandLight}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Vault Keyhole inside E */}
      <circle cx="48" cy="50" r="6" fill="#FBBF24" />
      <path d="M45 50 L51 50 L53 62 L43 62 Z" fill="#FBBF24" />
      
      {/* Overlaying Leaf Shape on the Right side */}
      <path
        d="M62 30 C72 40, 72 60, 62 70 C56 60, 56 40, 62 30 Z"
        fill={brandPrimary}
        opacity="0.85"
      />
      <path
        d="M62 30 L62 70"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Little green node */}
      <circle cx="50" cy="22" r="3.5" fill={brandLight} />
    </svg>
  );

  if (variant === "icon") {
    return <LogoIcon />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col justify-center leading-none">
        <span 
          className="text-xl font-bold tracking-tight" 
          style={{ color: textMainColor, fontFamily: "var(--font-sans)" }}
        >
          Eco<span style={{ color: textSubColor }}>Vault</span>
        </span>
        {variant === "full" && (
          <span 
            className="text-[9px] font-semibold tracking-widest uppercase mt-0.5" 
            style={{ color: light ? "rgba(247, 250, 248, 0.7)" : "#64748B" }}
          >
            Make Carbon Count
          </span>
        )}
      </div>
    </div>
  );
}
