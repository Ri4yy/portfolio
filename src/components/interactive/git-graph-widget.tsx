"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, GitMerge, Check, Sparkles } from "lucide-react";

interface BranchItem {
  name: string;
  hash: string;
  message: string;
  status: string;
}

const BRANCHES: BranchItem[] = [
  {
    name: "main",
    hash: "a4f912c",
    message: "feat: zero-copy binary streaming pipeline",
    status: "deployed",
  },
  {
    name: "feat/spatial-engine",
    hash: "7bc39e1",
    message: "opt: WebGL2 KTX2 texture decompression",
    status: "passing",
  },
  {
    name: "feat/ai-dag-worker",
    hash: "1d803fa",
    message: "core: isolated Pyodide WASM runtime",
    status: "verified",
  },
];

export function GitGraphWidget() {
  const [activeBranch, setActiveBranch] = useState("main");

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3.5 space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
          GIT_PIPELINE
        </span>
        <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          CI_CD PASSED
        </span>
      </div>

      {/* Branch selector pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {BRANCHES.map((b) => (
          <button
            key={b.name}
            onClick={() => setActiveBranch(b.name)}
            className={`px-2 py-1 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeBranch === b.name
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                : "bg-white/[0.03] text-zinc-400 border border-white/[0.04] hover:bg-white/[0.06]"
            }`}
          >
            <GitCommit className="w-3 h-3" />
            {b.name}
          </button>
        ))}
      </div>

      {/* Commit Detail Display */}
      {BRANCHES.filter((b) => b.name === activeBranch).map((b) => (
        <div key={b.name} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">commit: <span className="text-zinc-200">{b.hash}</span></span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              {b.status}
            </span>
          </div>
          <div className="text-zinc-300 text-[11px] truncate font-sans font-normal">
            {b.message}
          </div>
          <div className="text-[10px] text-zinc-400 pt-0.5">
            2 checks passed · verified commit signature
          </div>
        </div>
      ))}
    </div>
  );
}
