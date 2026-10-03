"use client";

import React from "react";
import { Check, Minus, UserCheck, Building2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

interface RowItem {
  criterion: string;
  anton: string;
  agency: string;
}

const COMPARISON_ROWS: RowItem[] = [
  {
    criterion: "Коммуникация",
    anton: "Прямой контакт в Telegram. Вопросы и правки решаются оперативно без посредников.",
    agency: "Через аккаунт- и проджект-менеджеров. Задержки согласований и «сломанный телефон».",
  },
  {
    criterion: "Стоимость и смета",
    anton: "Честная ставка за реальные часы кода. Без наценок на содержание офиса и менеджмента.",
    agency: "Переплата в 2–3 раза за счет содержания офиса, руководства и штата нетехнических сотрудников.",
  },
  {
    criterion: "Качество кода",
    anton: "Чистая модульная архитектура, официальные стандарты CMS, отсутствие костылей и документация.",
    agency: "Зависит от случайности: на проект часто ставят начинающих младших разработчиков.",
  },
  {
    criterion: "Процесс разработки",
    anton: "Живой тестовый сервер с первого дня. Вы видите прогресс и тестируете фичи до релиза.",
    agency: "Длинные согласовательные цепочки, закрытые спринты и сложная отчетность.",
  },
  {
    criterion: "Гарантия на результат",
    anton: "Гарантийный период 30–60 дней на бесплатное устранение любых скрытых дефектов.",
    agency: "Платная техподдержка по часовому SLA даже за мелкие исправления.",
  },
];

export function ComparisonMatrixSection() {
  return (
    <section className="py-24 border-t border-white/[0.06] bg-[#0c0c0f] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with bracketed numbering */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
            <span>[04]</span>
            <span className="text-zinc-600">/</span>
            <span>ФОРМАТ СОТРУДНИЧЕСТВА</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Прямой разработчик или веб-агентство
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Сравнение ключевых подходов к созданию и развитию сайтов для бизнеса.
          </p>
        </FadeIn>

        {/* 2-Column Direct Comparison */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8 items-stretch">
          {/* 1. ri4y (Highlighted Primary Option) */}
          <FadeInItem className="h-full">
            <SpotlightCard className="h-full p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#14141d] to-[#0e0e15] border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.12)] relative ring-1 ring-emerald-500/30">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-5">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Разработчик ri4y</h3>
                        <div className="text-[11px] font-mono text-emerald-400">Прямой автор кода</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider font-semibold">
                      Оптимально
                    </span>
                  </div>

                  {/* Criteria items */}
                  <div className="space-y-4 text-xs font-sans">
                    {COMPARISON_ROWS.map((row, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400/80 uppercase font-semibold">
                          {row.criterion}
                        </span>
                        <p className="text-zinc-200 leading-relaxed flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.anton}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom box with clean separation and generous spacing */}
                <div className="mt-auto pt-6 border-t border-white/[0.08]">
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 text-center font-mono font-medium">
                    Прямая ответственность за результат и сроки
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>

          {/* 2. Web Agency */}
          <FadeInItem className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#0f0f13]/70 border border-white/[0.08] flex flex-col justify-between">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Веб-агентство</h3>
                      <div className="text-[11px] font-mono text-zinc-500">Большой штат и наценки</div>
                    </div>
                  </div>

                  {/* Criteria items */}
                  <div className="space-y-4 text-xs font-sans">
                    {COMPARISON_ROWS.map((row, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{row.criterion}</span>
                        <p className="text-zinc-400 leading-relaxed flex items-start gap-2.5">
                          <Minus className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                          <span>{row.agency}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom box */}
                <div className="mt-auto pt-6 border-t border-white/[0.06]">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 text-center font-mono">
                    Длинная бюрократия и завышенные бюджеты
                  </div>
                </div>
              </div>
            </div>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
