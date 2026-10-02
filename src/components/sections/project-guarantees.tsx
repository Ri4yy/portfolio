"use client";

import React from "react";
import { Smartphone, GitBranch, Video, Globe2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

interface GuaranteeItem {
  id: string;
  icon: any;
  title: string;
  tag: string;
  desc: string;
}

const GUARANTEES: GuaranteeItem[] = [
  {
    id: "crossbrowser",
    icon: Smartphone,
    title: "Кроссбраузерное тестирование",
    tag: "АДАПТИВНОСТЬ",
    desc: "Проверка работы верстки, форм, сценариев корзины и скриптов на реальных устройствах (iOS Safari, Android Chrome, Windows, Mac). Исключены поломки верстки.",
  },
  {
    id: "git",
    icon: GitBranch,
    title: "Git и автоматические бекапы",
    tag: "НАДЕЖНОСТЬ",
    desc: "Разработка ведется через системы контроля версий в отдельных ветках. Исключены случайные поломки работающего боевого сайта.",
  },
  {
    id: "manual",
    icon: Video,
    title: "Видеоинструкции по управлению",
    tag: "ПЕРЕДАЧА ПРОЕКТА",
    desc: "Записываю наглядные скринкасты для ваших контент-менеджеров: как добавлять товары, редактировать контент и управлять модулями без программиста.",
  },
  {
    id: "seo",
    icon: Globe2,
    title: "Бесшовный перенос и сохранение SEO",
    tag: "БЕЗ ПОТЕРИ ТРАФИКА",
    desc: "Перенос на ваш сервер без даунтайма. Сохранение URL-структуры, настройка 301-редиректов и проверка индексации в Яндексе и Google.",
  },
];

export function ProjectGuaranteesSection() {
  return (
    <section className="py-24 border-t border-white/[0.06] bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with [06] numbering */}
        <FadeIn className="max-w-3xl mb-16 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
            <span>[06]</span>
            <span className="text-zinc-600">/</span>
            <span>СТАНДАРТЫ НАДЕЖНОСТИ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Безопасность разработки и сдача проектов
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Внедренные инженерные стандарты, защищающие проект от технических сбоев и потери позиций.
          </p>
        </FadeIn>

        {/* 4 Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <FadeInItem key={item.id} className="h-full">
                <SpotlightCard
                  className="h-full p-6 sm:p-7 border-white/[0.08] bg-[#0d0d12]/80 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col justify-between h-full space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-emerald-400 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                          {item.tag}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Pinned to the bottom */}
                    <div className="mt-auto pt-4 border-t border-white/[0.05] flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Включено в каждый проект</span>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
