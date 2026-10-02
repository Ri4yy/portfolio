"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "warranty",
    question: "Что если после релиза обнаружатся скрытые ошибки или баги?",
    answer:
      "На каждый разработанный сайт или модуль действует гарантия от 30 до 60 дней. Если в этот период обнаружится любая ошибка или несоответствие согласованному техническому заданию, я устраняю её оперативно и полностью бесплатно.",
  },
  {
    id: "legacy",
    question: "Беретесь ли вы за аудит и доработку чужого кода?",
    answer:
      "Да, регулярно работаю с действующими проектами на 1С-Битрикс, WordPress и MODX. Провожу предварительный технический аудит, исправляю накопившиеся ошибки и внедряю новые модули без необходимости переписывать сайт с нуля.",
  },
  {
    id: "payment",
    question: "Как строится процесс оплаты за разработку?",
    answer:
      "Работа строится поэтапно с прозрачным разделением: предоплата 30–50% перед стартом и финальный расчет только после демонстрации и вашей проверки на живом тестовом сервере.",
  },
  {
    id: "ownership",
    question: "Кому принадлежат исходный код, доступы и репозиторий?",
    answer:
      "Все исходные файлы, репозиторий Git, база данных и доступы к хостингу на 100% принадлежат заказчику. Никаких скрытых лицензионных привязок или искусственной зависимости от одного специалиста.",
  },
  {
    id: "timeline",
    question: "Сколько времени занимает создание сайта или кастомного модуля?",
    answer:
      "Сроки зависят от масштаба задачи: интеграция API или кастомный плагин обычно занимает от 2 до 5 рабочих дней; полноценный интернет-магазин или портал — от 2 до 4 недель. Точный срок фиксируется до начала разработки.",
  },
  {
    id: "process",
    question: "Как проходит коммуникация и контроль в процессе работы?",
    answer:
      "Мы общаемся напрямую в Telegram без посредников. В начале работы разворачивается тестовый стенд, где вы можете в реальном времени наблюдать за прогрессом и тестировать функции еще до публикации на основном домене.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("warranty");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 border-t border-white/[0.06] bg-[#0c0c0f] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 space-y-2">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
            <span>[08]</span>
            <span className="text-zinc-600">/</span>
            <span>ЧАСТЫЕ ВОПРОСЫ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Часто задаваемые вопросы
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Ключевые детали взаимодействия, гарантий и процесса разработки.
          </p>
        </FadeIn>

        {/* Accordion List */}
        <FadeInStagger className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <FadeInItem key={item.id}>
                <SpotlightCard
                  className={`transition-all duration-200 border-white/[0.08] ${
                    isOpen ? "bg-[#111117] border-white/20" : "bg-[#0d0d12]/70"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="font-mono text-xs text-emerald-400/80 font-bold shrink-0">
                          0{index + 1}.
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-zinc-100 group-hover:text-white transition-colors leading-snug">
                          {item.question}
                        </span>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-zinc-400"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/[0.06] text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pl-7">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
