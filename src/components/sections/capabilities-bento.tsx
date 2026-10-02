"use client";

import React from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CmsWidget } from "@/components/interactive/cms-widget";
import { TerminalWidget } from "@/components/interactive/terminal-widget";
import { IntegrationWidget } from "@/components/interactive/integration-widget";
import { LighthouseWidget } from "@/components/interactive/lighthouse-widget";
import { Layers, Layout, Puzzle, Zap } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export function CapabilitiesBento() {
  return (
    <section id="capabilities" className="py-20 relative bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase">
              <span>[01]</span>
              <span className="text-zinc-600">/</span>
              <span>ВОЗМОЖНОСТИ И СТЕК</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Возможности и стек технологий
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
            Разработка сайтов под ключ, написание кастомных модулей, интеграция внешних сервисов и оптимизация скорости.
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: CMS Platforms */}
          <FadeInItem className="h-full">
            <SpotlightCard className="p-5 flex flex-col justify-between h-full group">
              <div className="space-y-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    CMS разработка под ключ
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    1С-Битрикс (D7, интеграция 1С), WordPress (кастомные темы на ACF Pro) и MODX Revolution (Fenom).
                  </p>
                </div>
              </div>

              {/* Embedded CMS interactive widget */}
              <div className="mt-auto pt-1">
                <CmsWidget />
              </div>
            </SpotlightCard>
          </FadeInItem>

          {/* Card 2: Frontend & Interfaces */}
          <FadeInItem className="h-full">
            <SpotlightCard className="p-5 flex flex-col justify-between h-full group">
              <div className="space-y-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-colors">
                  <Layout className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Адаптивная верстка и UI
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Pixel-Perfect верстка по макетам Figma. HTML5, CSS3, SCSS, Tailwind CSS, JavaScript и React.
                  </p>
                </div>
              </div>

              {/* Embedded interactive dev terminal */}
              <div className="mt-auto pt-1">
                <TerminalWidget />
              </div>
            </SpotlightCard>
          </FadeInItem>

          {/* Card 3: Modules & Integrations */}
          <FadeInItem className="h-full">
            <SpotlightCard className="p-5 flex flex-col justify-between h-full group">
              <div className="space-y-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                  <Puzzle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Модули, плагины и API
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Кастомные плагины для CMS, связка с AmoCRM, Битрикс24, ЮKassa, СДЭК и DaData по REST API.
                  </p>
                </div>
              </div>

              {/* Embedded integration pipeline */}
              <div className="mt-auto pt-1">
                <IntegrationWidget />
              </div>
            </SpotlightCard>
          </FadeInItem>

          {/* Card 4: Optimization & Bots */}
          <FadeInItem className="h-full">
            <SpotlightCard className="p-5 flex flex-col justify-between h-full group">
              <div className="space-y-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Оптимизация и чат-боты
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Ускорение загрузки (PageSpeed 90+), настройка WebP, кэширования и разработка Telegram-ботов.
                  </p>
                </div>
              </div>

              {/* Embedded Lighthouse score widget */}
              <div className="mt-auto pt-1">
                <LighthouseWidget />
              </div>
            </SpotlightCard>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
