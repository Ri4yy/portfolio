"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);

    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds smooth engineering load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic curve
      const eased = Math.floor((1 - Math.pow(1 - rawProgress, 3)) * 100);
      setProgress(eased);

      if (rawProgress >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
        }, 220);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-12 bg-[#09090c] text-zinc-100 font-mono select-none"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYS.KERNEL // v4.2</span>
            </div>
            <div className="hidden sm:block text-zinc-400">
              LOCATION: UTC+3 · PRODUCTION_ENV
            </div>
          </div>

          {/* Central Logo & Smooth Percentage Counter */}
          <div className="flex flex-col items-center justify-center my-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-2"
            >
              <div className="text-3xl sm:text-5xl font-bold tracking-tight font-sans text-white">
                RI4Y <span className="text-zinc-400">// АНТОН</span>
              </div>
              <p className="text-xs text-zinc-400 tracking-widest uppercase">
                Сайты под ключ · Модули и плагины · Оптимизация
              </p>
            </motion.div>

            {/* Massive Monospace Percentage */}
            <div className="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-100 tabular-nums">
              {progress.toString().padStart(2, "0")}
              <span className="text-2xl sm:text-3xl text-emerald-400 ml-1 font-normal">%</span>
            </div>
          </div>

          {/* Bottom Loading Bar & Diagnostics */}
          <div className="space-y-3 max-w-md mx-auto w-full">
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span className="text-emerald-400/90">
                {progress < 35
                  ? "INITIALIZING ENGINE..."
                  : progress < 75
                  ? "OPTIMIZING ASSETS AND SCRIPTS..."
                  : progress < 100
                  ? "HYDRATING VIRTUAL DOM..."
                  : "SYSTEM READY"}
              </span>
              <span>[{progress}/100]</span>
            </div>
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
