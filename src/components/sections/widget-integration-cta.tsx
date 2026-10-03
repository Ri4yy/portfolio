"use client";

import React from "react";
import { Bot, ArrowUpRight, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { useLeadModal } from "@/context/lead-modal-context";

export function WidgetIntegrationCta() {
  const { openLeadModal } = useLeadModal();

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-950/40 via-[#131120] to-[#0a0a0f] border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>ГОТОВОЕ РЕШЕНИЕ ДЛЯ ВАШЕГО БИЗНЕСА</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Подключите данный автономный ИИ-виджет к вашему сайту
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openLeadModal("Подключение ИИ-виджета на сайт")}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] shrink-0 cursor-pointer"
        >
          <span>Подключить на свой сайт</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-3xl">
        Если вы желаете автоматизировать общение с клиентами и кратно увеличить конверсию в заявки — этот виджет можно внедрить на ваш сайт (1С-Битрикс, WordPress, Tilda или кастомный стек) всего за 1-2 рабочих дня.
      </p>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 font-sans">
            <span className="text-white font-semibold block mb-0.5">Обучение на вашей базе</span>
            Парсинг страниц сайта, загрузка прайсов, PDF и каталога
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 font-sans">
            <span className="text-white font-semibold block mb-0.5">1 строка кода для установки</span>
            Легкий автономный скрипт без замедления работы сайта
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 font-sans">
            <span className="text-white font-semibold block mb-0.5">Сбор лидов 24/7</span>
            Мгновенная отправка контактов клиентов в Telegram и CRM
          </div>
        </div>
      </div>
    </div>
  );
}
