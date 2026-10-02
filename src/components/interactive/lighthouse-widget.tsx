"use client";

import React, { useState } from "react";
import { Gauge, ShieldCheck, Zap, Activity } from "lucide-react";

export function LighthouseWidget() {
  const [score, setScore] = useState(99);

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3.5 space-y-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-emerald-400" />
          GOOGLE_LIGHTHOUSE_AUDIT
        </span>
        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          RANK A+
        </span>
      </div>

      {/* Main Score Center */}
      <div className="flex items-center gap-4 py-1">
        {/* SVG Circular Ring */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/[0.06]"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-400 transition-all duration-1000 ease-out"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-white tracking-tight leading-none">
              {score}
            </span>
            <span className="text-[8px] text-emerald-400/90 tracking-wide font-sans mt-0.5">
              PERF
            </span>
          </div>
        </div>

        {/* Core Vitals breakdown */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 w-full text-[10px]">
          <div>
            <div className="text-zinc-400">First Contentful</div>
            <div className="text-emerald-400 font-medium">0.38s</div>
          </div>
          <div>
            <div className="text-zinc-400">Largest Contentful</div>
            <div className="text-emerald-400 font-medium">0.68s</div>
          </div>
          <div>
            <div className="text-zinc-400">Cumulative Shift</div>
            <div className="text-emerald-400 font-medium">0.000</div>
          </div>
          <div>
            <div className="text-zinc-400">Speed Index</div>
            <div className="text-emerald-400 font-medium">0.72s</div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>Optimization Factor</span>
          <span className="text-zinc-200">100% Zero-Jank</span>
        </div>
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
