import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "accent" | "mono";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-white/[0.06] text-zinc-300 border-white/[0.08]",
    outline: "bg-transparent text-zinc-400 border-white/[0.12]",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    mono: "font-mono text-[11px] tracking-wider uppercase bg-white/[0.04] text-zinc-400 border-white/[0.08]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
