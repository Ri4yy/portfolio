"use client";

import React, { useState } from "react";
import { Layers, Database, Cpu, Globe, Check, Zap } from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  type: string;
  icon: any;
  latency: string;
  status: "active" | "standby";
}

const NODES: NodeItem[] = [
  {
    id: "edge",
    name: "Edge Compute Gateway",
    type: "Vercel / Cloudflare Workers",
    icon: Globe,
    latency: "12ms",
    status: "active",
  },
  {
    id: "ssr",
    name: "Next.js App Router (RSC)",
    type: "React 19 Streaming SSR",
    icon: Cpu,
    latency: "18ms",
    status: "active",
  },
  {
    id: "cache",
    name: "Upstash Redis KV Cache",
    type: "Sub-millisecond In-Memory",
    icon: Zap,
    latency: "2ms",
    status: "active",
  },
  {
    id: "db",
    name: "PostgreSQL with pgvector",
    type: "Supabase / Neon DB",
    icon: Database,
    latency: "24ms",
    status: "standby",
  },
];

export function ArchitectureWidget() {
  const [selectedId, setSelectedId] = useState("ssr");

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono px-1">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          ACTIVE_STACK_NODES
        </span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          HEALTHY
        </span>
      </div>

      <div className="space-y-1.5">
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = selectedId === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`w-full text-left p-2 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? "bg-white/[0.08] border-white/20 shadow-sm"
                  : "bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    isSelected ? "bg-white/10 text-white" : "bg-white/[0.03] text-zinc-400"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-200">{node.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{node.type}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-zinc-400">{node.latency}</span>
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-zinc-700 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-2 h-2" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
