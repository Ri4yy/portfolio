"use client";

import React, { useState } from "react";
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Layers,
  ExternalLink,
} from "lucide-react";

interface ProjectMockupProps {
  type?: "fintech" | "ai-kernel" | "luxury-3d" | "telemetry" | "design-system" | string;
  accent?: string;
  className?: string;
  imageUrl?: string;
  liveUrl?: string;
  title?: string;
  slug?: string;
}

function formatDisplayUrl(url?: string, slug?: string): { protocol: string; host: string } {
  if (!url) {
    return { protocol: "https://", host: `${slug || "project"}.dev` };
  }
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return {
      protocol: `${parsed.protocol}//`,
      host: parsed.host + (parsed.pathname !== "/" ? parsed.pathname : ""),
    };
  } catch {
    return { protocol: "https://", host: url.replace(/^https?:\/\//, "") };
  }
}

export function ProjectMockup({
  type = "fintech",
  accent = "#10b981",
  className = "",
  imageUrl,
  liveUrl,
  title,
  slug,
}: ProjectMockupProps) {
  const [imgError, setImgError] = useState(false);
  const displayUrl = formatDisplayUrl(liveUrl, slug);

  return (
    <div
      className={`w-full h-full rounded-xl sm:rounded-2xl bg-[#09090e] border border-white/[0.08] overflow-hidden select-none flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.5)] group/browser transition-all duration-300 ${className}`}
    >
      {/* Realistic Browser Header Bar */}
      <div className="h-8 sm:h-9 bg-[#121218] border-b border-white/[0.07] px-3 sm:px-3.5 flex items-center justify-between gap-2 shrink-0 select-none">
        {/* Left: Window Controls (macOS Traffic Lights) & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 group-hover/browser:bg-[#ef4444] transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 group-hover/browser:bg-[#f59e0b] transition-colors shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 group-hover/browser:bg-[#10b981] transition-colors shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-zinc-600 pl-1 border-l border-white/[0.06]">
            <ChevronLeft className="w-3 h-3 text-zinc-600" />
            <ChevronRight className="w-3 h-3 text-zinc-700" />
            <RotateCw className="w-2.5 h-2.5 text-zinc-600 ml-0.5" />
          </div>
        </div>

        {/* Center: URL Address Bar with SSL Lock */}
        <div className="flex-1 max-w-[240px] sm:max-w-[320px] md:max-w-[380px] mx-auto">
          <div className="flex items-center justify-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-md bg-black/60 border border-white/[0.07] text-[10px] sm:text-[11px] font-mono text-zinc-300 truncate shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-zinc-500 font-mono text-[9px] sm:text-[10px]">{displayUrl.protocol}</span>
            <span className="text-zinc-200 font-mono font-medium truncate">{displayUrl.host}</span>
          </div>
        </div>

        {/* Right: Window / Status Indicators */}
        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono">
          <span className="hidden md:inline-block text-[9px] text-zinc-600 uppercase tracking-widest">
            100%
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
        </div>
      </div>

      {/* Screen Viewport: Screenshot or Tech Mockup Fallback */}
      {imageUrl && !imgError ? (
        <div className="relative w-full flex-1 overflow-hidden bg-[#09090d] flex items-start justify-center">
          <img
            src={imageUrl}
            alt={title || "Скриншот сайта"}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/browser:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
          {/* Subtle gradient vignette at bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Top highlight shine line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />
        </div>
      ) : (
        <div className="flex-1 p-3.5 relative overflow-hidden bg-gradient-to-b from-[#0e0e13] to-[#09090c] flex flex-col justify-between">
          {type === "fintech" && (
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-zinc-200 font-bold">1C-BITRIX / E-COMMERCE</span>
                <span className="text-emerald-400 font-semibold">24K ITEMS SYNC</span>
                <span className="text-zinc-400">0.7S LCP</span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-auto">
                <div className="space-y-1">
                  <div className="text-[9px] text-zinc-400">ПОСТУПЛЕНИЕ ОСТАТКОВ</div>
                  <div className="space-y-0.5">
                    {[
                      { p: "Станки ЧПУ", q: "12 шт", w: "85%" },
                      { p: "Оснастка VF", q: "84 шт", w: "65%" },
                      { p: "Прессы HP", q: "19 шт", w: "95%" },
                    ].map((row, i) => (
                      <div key={i} className="relative flex justify-between px-1.5 py-0.5 rounded bg-emerald-500/[0.04]">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-emerald-500/[0.12] rounded pointer-events-none"
                          style={{ width: row.w }}
                        />
                        <span className="text-emerald-400 relative z-10">{row.p}</span>
                        <span className="text-zinc-400 relative z-10">{row.q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] text-zinc-400">ОФОРМЛЕННЫЕ ЗАКАЗЫ</div>
                  <div className="space-y-0.5">
                    {[
                      { p: "Заказ #4912", q: "2.8M ₽", w: "70%" },
                      { p: "Заказ #4911", q: "1.4M ₽", w: "90%" },
                      { p: "Заказ #4910", q: "650K ₽", w: "45%" },
                    ].map((row, i) => (
                      <div key={i} className="relative flex justify-between px-1.5 py-0.5 rounded bg-sky-500/[0.04]">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-sky-500/[0.12] rounded pointer-events-none"
                          style={{ width: row.w }}
                        />
                        <span className="text-sky-400 relative z-10">{row.p}</span>
                        <span className="text-zinc-400 relative z-10">{row.q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] text-[9px] text-zinc-400">
                <span>COMMERCEML REALTIME SYNC</span>
                <span className="text-emerald-400">PAGESPEED 94+</span>
              </div>
            </div>
          )}

          {type === "ai-kernel" && (
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.05]">
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  TELEGRAM BOT ENGINE
                </span>
                <span className="text-zinc-400">WEBHOOK: ACTIVE</span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-auto text-center">
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[8px] text-zinc-500">ВРЕМЯ ОТВЕТА</div>
                  <div className="text-sm font-bold text-purple-400 mt-1">0.2s</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[8px] text-zinc-500">ОБРАБОТАНО</div>
                  <div className="text-sm font-bold text-white mt-1">3.8K+</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[8px] text-zinc-500">MYSQL SYNC</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">100%</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] text-[9px] text-zinc-400">
                <span>TELEGRAM WEBAPP SUPPORT</span>
                <span className="text-purple-400">NODE.JS / PHP</span>
              </div>
            </div>
          )}

          {type === "luxury-3d" && (
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-indigo-400 font-bold">WORDPRESS ACF PRO</span>
                <span className="text-emerald-400">ZERO BLOAT</span>
              </div>

              <div className="my-auto space-y-1.5">
                <div className="flex justify-between text-[9px] text-zinc-400">
                  <span>Flexible Blocks System</span>
                  <span className="text-indigo-400">18 Custom Modules</span>
                </div>
                <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[96%]" />
                </div>
                <div className="flex justify-between text-[8px] text-zinc-500">
                  <span>Google PageSpeed: 96/100</span>
                  <span>AmoCRM Webhook Connected</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] text-[9px] text-zinc-400">
                <span>CLEAN THEME (NO ELEMENTOR)</span>
                <span className="text-indigo-400">REST API</span>
              </div>
            </div>
          )}

          {type === "telemetry" && (
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-sky-400 font-bold">MODX REVOLUTION + FENOM</span>
                <span className="text-emerald-400">0.5S TTFB</span>
              </div>

              <div className="my-auto space-y-1.5">
                <div className="flex items-end gap-1 h-12 pt-2">
                  {[45, 60, 75, 40, 85, 95, 65, 80, 98].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-sky-500/30 hover:bg-sky-400 transition-colors rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] text-zinc-400 px-1">
                  <span>mSearch2 AJAX</span>
                  <span>PageSpeed 98/100</span>
                  <span>JS Calculator</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-zinc-400">
                <span>PDOTOOLS CACHE</span>
                <span className="text-sky-400">+65% LEADS</span>
              </div>
            </div>
          )}

          {type === "design-system" && (
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  PERFORMANCE OPTIMIZATION
                </span>
                <span className="text-emerald-400">98 / 100</span>
              </div>

              <div className="my-auto space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-zinc-500">LCP TIME</div>
                    <div className="text-emerald-400 font-bold mt-0.5">0.8s (was 4.6s)</div>
                  </div>
                  <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-zinc-500">PAGE WEIGHT</div>
                    <div className="text-sky-400 font-bold mt-0.5">1.1 MB (-83%)</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-zinc-400">
                <span>WEBP / AVIF / BROTLI</span>
                <span className="text-amber-400">ZERO CONSOLE ERRORS</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
