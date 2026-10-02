"use client";

import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useLeadModal } from "@/context/lead-modal-context";

interface ProjectCtaCardProps {
  initialType?: string;
}

export function ProjectCtaCard({ initialType = "Интернет-магазин под ключ" }: ProjectCtaCardProps) {
  const { openLeadModal } = useLeadModal();

  return (
    <SpotlightCard className="p-6 sm:p-7 bg-gradient-to-b from-[#111116] to-[#0c0c10] border-emerald-500/20">
      <div className="space-y-6">
        {/* Accent Icon with generous breathing room */}
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <TrendingUp className="w-5 h-5" />
        </div>

        {/* Text Block with clear vertical rhythm */}
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white tracking-tight">
            Нужен сайт или доработка?
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Разработаю сайт под ключ или настрою кастомный модуль с гарантией качества и точных сроков.
          </p>
        </div>

        {/* Action Button that triggers Lead Modal */}
        <button
          type="button"
          onClick={() => openLeadModal(initialType)}
          className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 active:scale-[0.99] text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.18)] cursor-pointer"
        >
          <span>Запросить расчет</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </SpotlightCard>
  );
}
