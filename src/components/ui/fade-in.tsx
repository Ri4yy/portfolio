"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all" };
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.55,
  direction = "up",
  className,
  viewport = { once: true, margin: "-40px" },
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: 24 };
      case "down":
        return { x: 0, y: -24 };
      case "left":
        return { x: 24, y: 0 };
      case "right":
        return { x: -24, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      }}
      viewport={viewport}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

interface FadeInStaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all" };
}

export function FadeInStagger({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  viewport = { once: true, margin: "-40px" },
  ...props
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
  direction = "up",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
} & React.HTMLAttributes<HTMLDivElement>) {
  const shouldReduceMotion = useReducedMotion();

  const getY = () => {
    if (shouldReduceMotion || direction === "none") return 0;
    if (direction === "up") return 20;
    if (direction === "down") return -20;
    return 0;
  };

  const getX = () => {
    if (shouldReduceMotion || direction === "none") return 0;
    if (direction === "left") return 20;
    if (direction === "right") return -20;
    return 0;
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: getY(), x: getX() },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn("h-full", className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
