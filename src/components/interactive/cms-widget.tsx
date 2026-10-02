"use client";

import React, { useState } from "react";
import { Check, Layers, Code, Sparkles } from "lucide-react";

interface CmsItem {
  id: string;
  name: string;
  badge: string;
  features: string[];
  tech: string;
}

const CMS_LIST: CmsItem[] = [
  {
    id: "bitrix",
    name: "1С-Битрикс",
    badge: "D7 / Интернет-магазины",
    features: ["Синхронизация с 1С:Предприятие", "Кастомный чекаут и корзина", "Компоненты на D7 и фасетный фильтр"],
    tech: "PHP 8.x · D7 ORM · MySQL",
  },
  {
    id: "wordpress",
    name: "WordPress",
    badge: "ACF Pro / Без билдеров",
    features: ["Кастомная легкая тема с нуля", "Flexible Content блоки для контента", "Интеграция с AmoCRM / Битрикс24"],
    tech: "PHP · ACF Pro · REST API",
  },
  {
    id: "modx",
    name: "MODX Revo",
    badge: "pdoTools / Скорость",
    features: ["Шаблонизатор Fenom и pdoTools", "Каталоги на mSearch2 / miniShop2", "Мгновенная отдача без тяжести"],
    tech: "Fenom · MIGX · Fast Cache",
  },
];

export function CmsWidget() {
  const [selectedId, setSelectedId] = useState("bitrix");
  const selectedCms = CMS_LIST.find((c) => c.id === selectedId) || CMS_LIST[0];

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3 space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          CMS_PLATFORMS
        </span>
        <span className="text-emerald-400 text-[10px]">ВЫБЕРИТЕ CMS:</span>
      </div>

      {/* CMS Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5">
        {CMS_LIST.map((cms) => {
          const isSelected = selectedId === cms.id;
          return (
            <button
              key={cms.id}
              onClick={() => setSelectedId(cms.id)}
              className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] ${
                isSelected
                  ? "bg-white text-zinc-950 font-bold shadow-sm"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200 border border-white/[0.04]"
              }`}
            >
              {cms.name}
            </button>
          );
        })}
      </div>

      {/* Selected CMS details */}
      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-emerald-400 font-semibold">{selectedCms.badge}</span>
          <span className="text-zinc-400">{selectedCms.tech}</span>
        </div>

        <div className="space-y-1 font-sans text-[11px] text-zinc-300">
          {selectedCms.features.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
