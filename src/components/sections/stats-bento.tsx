"use client";

import React from "react";
import { CLIENT_TESTIMONIALS, CORE_PRINCIPLES } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Quote, CheckCircle2 } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export function StatsBentoSection() {
  return (
    <section className="py-20 relative bg-[#0a0a0c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with [05] numbering */}
        <FadeIn className="mb-10 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
            <span>[05]</span>
            <span className="text-zinc-600">/</span>
            <span>ПРИНЦИПЫ И ОТЗЫВЫ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Принципы работы и отзывы клиентов
          </h2>
        </FadeIn>

        {/* 1. Core Principles (Short and punchy) */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
          {CORE_PRINCIPLES.map((principle) => (
            <FadeInItem key={principle.number} className="h-full">
              <SpotlightCard className="h-full p-5">
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-3 pb-2 border-b border-white/[0.06]">
                      <span>/{principle.number}</span>
                      <span className="text-[10px] text-emerald-400/90">{principle.code}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                      {principle.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>

                  {/* Strictly pinned to the bottom */}
                  <div className="mt-auto pt-3 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 border-t border-white/[0.04]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ГАРАНТИЯ КАЧЕСТВА</span>
                  </div>
                </div>
              </SpotlightCard>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* 2. Client Testimonials */}
        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {CLIENT_TESTIMONIALS.map((testimonial) => (
            <FadeInItem key={testimonial.id} className="h-full">
              <SpotlightCard className="h-full p-5 group">
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-zinc-500">
                      <Quote className="w-5 h-5 text-white/20 group-hover:text-emerald-400/60 transition-colors" />
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {testimonial.impact}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Strictly pinned to bottom */}
                  <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{testimonial.author}</div>
                      <div className="text-[10px] text-zinc-400">{testimonial.role}</div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono text-xs font-bold text-zinc-300">
                      {testimonial.avatar}
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
