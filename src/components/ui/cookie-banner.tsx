"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent_accepted");
      if (!consent) {
        // Small delay so it doesn't pop up abruptly on initial paint
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem("cookie_consent_accepted", "true");
    } catch (e) {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] p-4 rounded-2xl bg-[#111116]/95 border border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md text-xs font-sans text-zinc-300"
          role="region"
          aria-label="Уведомление об использовании файлов cookie"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-4 h-4" />
            </div>

            <div className="space-y-2 flex-1">
              <p className="leading-relaxed text-[11px] sm:text-xs text-zinc-300">
                Сайт использует файлы cookie для корректной работы. Оставаясь на сайте, вы соглашаетесь с{" "}
                <Link
                  href="/privacy"
                  className="text-white hover:text-emerald-400 underline underline-offset-2 transition-colors"
                >
                  Политикой конфиденциальности
                </Link>
                .
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={acceptCookies}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] font-mono"
                >
                  Понятно
                </button>
                <Link
                  href="/privacy"
                  className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors text-xs font-mono"
                >
                  Подробнее
                </Link>
              </div>
            </div>

            <button
              onClick={acceptCookies}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors -mr-1 -mt-1"
              aria-label="Закрыть уведомление"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
