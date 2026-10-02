"use client";

import React, { useState } from "react";
import { WORK_EXPERIENCE } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CheckCircle2 } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export function ExperienceTimelineSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 relative bg-[#0a0a0c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Compact, no '&') */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase">
              <span>[07]</span>
              <span className="text-zinc-600">/</span>
              <span>ОПЫТ РАБОТЫ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Опыт разработки и специализация
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500">
            ПРАКТИКА С 2020 ГОДА · БОЛЕЕ 50 ПРОЕКТОВ
          </div>
        </FadeIn>

        {/* Experience List */}
        <FadeInStagger className="space-y-4">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <FadeInItem key={idx}>
              <SpotlightCard
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="p-6 sm:p-7 transition-all duration-300"
              >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Period & Duration */}
                <div className="lg:col-span-3 space-y-1 font-mono">
                  <div className="text-xs text-emerald-400 font-semibold tracking-wider">
                    {exp.period}
                  </div>
                  <div className="text-[11px] text-zinc-500">{exp.duration} · {exp.location}</div>
                </div>

                {/* Role & Company */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-xs sm:text-sm text-zinc-400 font-medium">
                    {exp.company}
                  </div>
                </div>

                {/* Description & Key Achievements */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
