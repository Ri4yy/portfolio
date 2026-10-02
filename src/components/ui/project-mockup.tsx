"use client";

import React from "react";
import { Terminal, Activity, Cpu, Sparkles, Layers, Box, ArrowUpRight } from "lucide-react";

interface ProjectMockupProps {
  type: "fintech" | "ai-kernel" | "luxury-3d" | "telemetry" | "design-system";
  accent?: string;
  className?: string;
}

export function ProjectMockup({ type, accent = "#10b981", className = "" }: ProjectMockupProps) {
  return (
    <div className={`w-full h-full rounded-xl bg-[#09090c] border border-white/[0.08] overflow-hidden select-none flex flex-col ${className}`}>
      {/* Browser / App Header bar */}
      <div className="h-7 bg-[#141419] border-b border-white/[0.06] px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
        </div>
        <div className="text-[10px] font-mono text-zinc-400 bg-black/40 px-3 py-0.5 rounded-md border border-white/[0.04]">
          {type === "fintech" && "apex-orderbook.internal:8080"}
          {type === "ai-kernel" && "cora-studio.runtime/dag"}
          {type === "luxury-3d" && "kroma-3d.ch/configurator"}
          {type === "telemetry" && "pulse.telemetry.edge/mesh"}
          {type === "design-system" && "forge-ui.dev/components"}
        </div>
        <div className="w-8" />
      </div>

      {/* Dynamic Screen Viewport */}
      <div className="flex-1 p-3.5 relative overflow-hidden bg-gradient-to-b from-[#0e0e13] to-[#09090c] flex flex-col justify-between">
        {type === "fintech" && (
          <div className="h-full flex flex-col justify-between font-mono text-[10px]">
            {/* Ticker bar */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
              <span className="text-zinc-200 font-bold">BTC/USDT PERP</span>
              <span className="text-emerald-400 font-semibold">$64,820.50 (+4.82%)</span>
              <span className="text-zinc-400">LATENCY: 1.8MS</span>
            </div>

            {/* Depth Chart & Orderbook simulation */}
            <div className="grid grid-cols-2 gap-2 my-auto">
              <div className="space-y-1">
                <div className="text-[9px] text-zinc-400">BIDS (BUY)</div>
                <div className="space-y-0.5">
                  {[
                    { p: "64,819.00", q: "12.450", w: "85%" },
                    { p: "64,818.50", q: "8.120", w: "65%" },
                    { p: "64,817.00", q: "19.800", w: "95%" },
                    { p: "64,815.00", q: "5.210", w: "40%" },
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
                <div className="text-[9px] text-zinc-400">ASKS (SELL)</div>
                <div className="space-y-0.5">
                  {[
                    { p: "64,821.50", q: "9.340", w: "70%" },
                    { p: "64,822.00", q: "14.200", w: "90%" },
                    { p: "64,823.50", q: "6.850", w: "45%" },
                    { p: "64,825.00", q: "18.100", w: "92%" },
                  ].map((row, i) => (
                    <div key={i} className="relative flex justify-between px-1.5 py-0.5 rounded bg-rose-500/[0.04]">
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-rose-500/[0.12] rounded pointer-events-none"
                        style={{ width: row.w }}
                      />
                      <span className="text-rose-400 relative z-10">{row.p}</span>
                      <span className="text-zinc-400 relative z-10">{row.q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution indicator */}
            <div className="flex items-center justify-between pt-1 border-t border-white/[0.05] text-[9px] text-zinc-400">
              <span>OFFSCREENCANVAS 120 FPS</span>
              <span className="text-emerald-400">ZERO MEMORY LEAK</span>
            </div>
          </div>
        )}

        {type === "ai-kernel" && (
          <div className="h-full flex flex-col justify-between font-mono text-[10px]">
            {/* Visual Node Graph representation */}
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.05]">
              <span className="text-indigo-400 font-bold flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                CORA DAG RUNTIME
              </span>
              <span className="text-zinc-400">TOKENS: 4,812 / 128K</span>
            </div>

            {/* Interactive Connected Nodes Diagram */}
            <div className="my-auto flex items-center justify-between gap-2 px-1">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 w-28 shrink-0">
                <div className="text-[9px] text-zinc-400">AGENT 01</div>
                <div className="font-semibold text-zinc-200">Vision Planner</div>
                <div className="text-[8px] text-emerald-400 mt-1">status: completed</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-px bg-indigo-500/40 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                </div>
                <span className="text-[8px] text-zinc-400 mt-1 font-sans">SSE stream</span>
              </div>

              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-200 w-28 shrink-0">
                <div className="text-[9px] text-zinc-400">AGENT 02</div>
                <div className="font-semibold text-zinc-100">Code Sandbox</div>
                <div className="text-[8px] text-indigo-400 mt-1 animate-pulse">Pyodide WASM...</div>
              </div>
            </div>

            <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-[9px] text-zinc-400 truncate">
              {">>"} <span className="text-indigo-300">Tool execution:</span> generate_wasm_binary() -&gt; ok (42ms)
            </div>
          </div>
        )}

        {type === "luxury-3d" && (
          <div className="h-full flex flex-col justify-between font-mono text-[10px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Box className="w-3 h-3" />
                KROMA CHRONOMETER
              </span>
              <span className="text-zinc-400">WEBGL 2 · DRACO</span>
            </div>

            {/* 3D Model Wireframe Graphic */}
            <div className="relative my-auto flex items-center justify-center h-28">
              <div className="w-24 h-24 rounded-full border border-amber-400/30 flex items-center justify-center relative">
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/20 animate-spin" style={{ animationDuration: "25s" }} />
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-amber-400/60 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  </div>
                </div>
                <div className="absolute top-2 text-[8px] text-zinc-400">XII</div>
                <div className="absolute bottom-2 text-[8px] text-zinc-400">VI</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-zinc-400">
              <span>CASE: GRADE-5 TITANIUM</span>
              <span className="text-amber-400">KTX2 COMPRESSED 1.4MB</span>
            </div>
          </div>
        )}

        {type === "telemetry" && (
          <div className="h-full flex flex-col justify-between font-mono text-[10px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
              <span className="text-sky-400 font-bold flex items-center gap-1">
                <Activity className="w-3 h-3" />
                GLOBAL MESH TELEMETRY
              </span>
              <span className="text-emerald-400">65 NODES UP</span>
            </div>

            <div className="my-auto space-y-2">
              <div className="flex items-end gap-1 h-16 justify-between px-2">
                {[45, 60, 30, 80, 55, 90, 70, 85, 40, 65, 95, 80, 50, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-sky-500/30 hover:bg-sky-400 transition-colors rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-zinc-400 px-2">
                <span>00:00 UTC</span>
                <span>PEAK: 2.4B REQ/DAY</span>
                <span>NOW</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-zinc-400">
              <span>CLICKHOUSE OLAP</span>
              <span className="text-sky-400">QUERY TIME: 38MS</span>
            </div>
          </div>
        )}

        {type === "design-system" && (
          <div className="h-full flex flex-col justify-between font-mono text-[10px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
              <span className="text-purple-400 font-bold flex items-center gap-1">
                <Layers className="w-3 h-3" />
                FORGE UI COMPONENTS
              </span>
              <span className="text-purple-300">WCAG AAA AUDITED</span>
            </div>

            <div className="my-auto space-y-2">
              <div className="flex gap-2">
                <button className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[9px]">
                  Button.Primary
                </button>
                <button className="px-2.5 py-1 rounded bg-white/[0.04] text-zinc-300 border border-white/10 text-[9px]">
                  Button.Secondary
                </button>
                <div className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Accessible
                </div>
              </div>

              <div className="p-2 rounded bg-black/40 border border-white/[0.04] flex items-center justify-between">
                <span className="text-zinc-400 text-[9px]">npm install @forge-ui/react</span>
                <span className="text-purple-400 text-[9px]">v2.4.0</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-zinc-400">
              <span>RADIX HEADLESS</span>
              <span className="text-purple-400">8.4K GITHUB STARS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
