"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.08)",
  borderColor = "rgba(255, 255, 255, 0.15)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl md:rounded-3xl bg-[#111115]/90 border border-white/[0.08] transition-all duration-300 overflow-hidden flex flex-col h-full",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_15px_35px_-15px_rgba(0,0,0,0.6)]",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_40px_-12px_rgba(0,0,0,0.75)]",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer (!m-0 prevents space-y shift) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 !m-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle border highlight under cursor (!m-0 prevents space-y shift) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-300 !m-0"
        style={{
          opacity,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
}
