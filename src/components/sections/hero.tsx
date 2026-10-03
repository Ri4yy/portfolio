"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLeadModal } from "@/context/lead-modal-context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThreeCanvas } from "@/components/interactive/three-canvas";

export function HeroSection() {
  const { openLeadModal } = useLeadModal();

  const scrollToCases = () => {
    const el = document.getElementById("cases");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0a0a0c]">
      {/* 1. Interactive 3D Wireframe Canvas */}
      <ThreeCanvas className="absolute inset-0 pointer-events-none opacity-50 z-0" />

      {/* 2. Delicate Background Elements: Concentric Circles and Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Soft Ambient Radial Glow (3-5% opacity) */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[300px] bg-emerald-500/[0.04] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-20 w-[500px] h-[350px] bg-indigo-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      {/* Content Container (Left-aligned as requested) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-left flex flex-col items-start">
          {/* Engineering Brutalist Metadata Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-zinc-300 tracking-wide uppercase">
              [ДОСТУПЕН ДЛЯ ПРОЕКТОВ] · RI4Y
            </span>
          </motion.div>

          {/* Compact, clean headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]"
          >
            Разработка сайтов, плагинов и модулей{" "}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
              для бизнеса
            </span>
          </motion.h1>

          {/* Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-sans"
          >
            Создаю сайты под ключ на 1С-Битрикс, WordPress и MODX. Разрабатываю кастомные плагины, чат-боты, настраиваю интеграции и ускоряю работу существующих сайтов с 2020 года.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            <MagneticButton
              onClick={() => openLeadModal()}
              className="px-7 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Обсудить задачу</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>

            <button
              onClick={scrollToCases}
              className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.1] text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Смотреть работы</span>
              <ArrowDown className="w-3 h-3 text-zinc-400" />
            </button>
          </motion.div>
        </div>

        {/* 4 Cards (First 2 kept, other 2 updated to ri4y's stack) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-3 font-mono"
        >
          {[
            { label: "Опыт в разработке", value: "С 2020 ГОДА", sub: "Более 4 лет практики" },
            { label: "Реализовано проектов", value: "50+ РАБОТ", sub: "Сайты и модули" },
            { label: "Популярные CMS", value: "БИТРИКС / WP / MODX", sub: "Темы, плагины, D7" },
            { label: "Доработки и сервисы", value: "PAGESPEED 90+", sub: "Интеграции и чат-боты" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm text-left hover:border-white/[0.14] transition-colors"
            >
              <div className="text-[11px] text-zinc-400 font-sans">{item.label}</div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                {item.value}
              </div>
              <div className="text-[10px] text-emerald-400/90 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
