"use client";

import React, { useState } from "react";
import { Zap, ArrowRight, Check, Send, Users, Database } from "lucide-react";

interface StepItem {
  id: string;
  shortName: string;
  fullName: string;
  desc: string;
  icon: any;
  status: string;
}

const STEPS: StepItem[] = [
  {
    id: "site",
    shortName: "Сайт",
    fullName: "Формы сайта и валидация",
    desc: "Адаптивные формы, валидация полей, honeypot защита от спама и подсказки DaData.",
    icon: Database,
    status: "Валидация 100%",
  },
  {
    id: "crm",
    shortName: "CRM",
    fullName: "Интеграция с CRM и эквайрингом",
    desc: "Передача лидов в AmoCRM / Битрикс24 по REST API, прием оплат через ЮKassa по 54-ФЗ.",
    icon: Users,
    status: "REST API webhook",
  },
  {
    id: "bot",
    shortName: "Telegram",
    fullName: "Telegram-бот и уведомления",
    desc: "Мгновенная доставка заявки дежурному менеджеру со всеми деталями и ссылкой на клиента.",
    icon: Send,
    status: "< 1 сек доставка",
  },
];

export function IntegrationWidget() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3 space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          СХЕМА ИНТЕГРАЦИИ
        </span>
        <span className="text-[10px] text-emerald-400">АКТИВНА</span>
      </div>

      {/* Step buttons (Concise labels that always fit in 1 line) */}
      <div className="flex items-center gap-1">
        {STEPS.map((step, idx) => {
          const isCurrent = activeStep === idx;
          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all text-[11px] ${
                  isCurrent
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold shadow-sm"
                    : "bg-white/[0.03] text-zinc-400 border border-white/[0.04] hover:bg-white/[0.06] hover:text-zinc-200"
                }`}
              >
                <span>{step.shortName}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step details card */}
      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] space-y-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-zinc-200 font-bold">{STEPS[activeStep].fullName}</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" />
            {STEPS[activeStep].status}
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
          {STEPS[activeStep].desc}
        </p>
      </div>
    </div>
  );
}
