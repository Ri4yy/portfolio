"use client";

import React from "react";
import { Check, ArrowUpRight, Zap, Clock, Shield } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useLeadModal } from "@/context/lead-modal-context";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  timeline: string;
  desc: string;
  features: string[];
  popular?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "module",
    name: "Кастомный плагин / Модуль / API",
    price: "от 15 000 ₽",
    timeline: "2–5 рабочих дней",
    desc: "Разработка нестандартной функциональности под CMS, интеграция с CRM, эквайрингом или доставкой.",
    features: [
      "Связка по REST API (AmoCRM, Битрикс24, ЮKassa)",
      "Чистый код в рамках архитектуры вашей CMS",
      "Защита от спама и валидация входящих данных",
      "Гарантийное сопровождение после релиза",
    ],
  },
  {
    id: "speed",
    name: "Ускорение (Google PageSpeed 90+)",
    badge: "Быстрый буст SEO",
    price: "от 12 000 ₽",
    timeline: "1–3 рабочих дня",
    desc: "Комплексная оптимизация загрузки сайта для роста мобильной конверсии и позиций в поисковой выдаче.",
    features: [
      "Конвертация и сжатие изображений в WebP/AVIF",
      "Оптимизация критического CSS и JS скриптов",
      "Настройка серверного кеширования и Gzip/Brotli",
      "Зеленая зона Google PageSpeed (Mobile / Desktop)",
    ],
  },
  {
    id: "corporate",
    name: "Корпоративный сайт / Каталог",
    price: "от 30 000 ₽",
    timeline: "10–16 рабочих дней",
    desc: "Имиджевый и функциональный сайт для бизнеса на 1С-Битрикс, WordPress или MODX Revolution.",
    features: [
      "Адаптивная верстка под все устройства и Retina",
      "Удобное управление структурой и каталогом товаров",
      "Базовая SEO-оптимизация и микроразметка",
      "Интеграция форм с Telegram и почтой компании",
    ],
  },
  {
    id: "ecommerce",
    name: "Интернет-магазин под ключ",
    badge: "Максимальный спрос",
    popular: true,
    price: "от 50 000 ₽",
    timeline: "2–4 недели",
    desc: "Полнофункциональный e-commerce с фильтрацией, корзиной, приемом оплат и синхронизацией остатков.",
    features: [
      "Каталог с фасетной фильтрацией и быстрым поиском",
      "Онлайн-эквайринг (ЮKassa, Сбер) с чеками по 54-ФЗ",
      "Расчет доставки СДЭК / Boxberry / Почта России",
      "Инструкции по наполнению и гарантия 60 дней",
    ],
  },
];

export function ServicesPricingSection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="pricing" className="py-24 border-t border-white/[0.06] bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
              <span>[03]</span>
              <span className="text-zinc-600">/</span>
              <span>СТОИМОСТЬ И СРОКИ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Стоимость и сроки типовых задач
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-sans leading-relaxed">
              Точная смета и дедлайн фиксируются до старта работ на основе ТЗ. Без скрытых наценок в процессе разработки.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-500 bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Фиксированная цена до релиза</span>
          </div>
        </FadeIn>

        {/* Pricing Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <FadeInItem key={plan.id} className="h-full">
                <SpotlightCard
                  className={`p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 ${
                    isPopular
                      ? "border-emerald-500/40 bg-gradient-to-b from-[#14141b] to-[#0e0e13] shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                      : "border-white/[0.08] bg-[#0e0e12]/90"
                  }`}
                >
                  <div className="space-y-5">
                    {/* Top Badge & Title */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between min-h-[22px]">
                        {plan.badge ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase tracking-wider">
                            {plan.badge}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-600 uppercase">Пакет услуг</span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Price & Timeline */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1 font-mono">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                        {plan.price}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-sans">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{plan.timeline}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {plan.desc}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => openLeadModal(plan.name)}
                      className={`w-full py-3 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isPopular
                          ? "bg-white hover:bg-zinc-200 text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                          : "bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 border border-white/[0.08]"
                      }`}
                    >
                      <span>Запросить смету</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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
