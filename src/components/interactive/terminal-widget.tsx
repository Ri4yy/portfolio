"use client";

import React, { useState, useEffect } from "react";
import { Terminal, RefreshCw } from "lucide-react";

const COMMANDS = [
  {
    cmd: "npm run build:frontend",
    output: [
      { text: "⚡ Сборка стилей Tailwind и скриптов...", color: "text-zinc-400" },
      { text: "✓ HTML5 семантика и доступность: OK", color: "text-emerald-400" },
      { text: "✓ Адаптивная верстка: Mobile, Tablet, Desktop", color: "text-emerald-400" },
      { text: "✓ Минификация ассетов: экономия 68%", color: "text-emerald-400" },
      { text: "✨ Верстка готова к посадке на CMS", color: "text-zinc-100" },
    ],
  },
  {
    cmd: "php bitrix_check.php --modules",
    output: [
      { text: "🔍 Проверка ядра 1С-Битрикс D7...", color: "text-zinc-400" },
      { text: "✓ Кастомные компоненты D7: подключены", color: "text-emerald-400" },
      { text: "✓ Синхронизация 1С CommerceML: активна", color: "text-emerald-400" },
      { text: "✓ Композитный режим кэширования: ВКЛ", color: "text-sky-400" },
    ],
  },
  {
    cmd: "tools --optimize-webp --dir /upload/",
    output: [
      { text: "🖼 Оптимизация изображений каталога...", color: "text-zinc-400" },
      { text: "✓ Конвертация в WebP / AVIF завершена", color: "text-emerald-400" },
      { text: "✓ Вес каталога уменьшен на 74%", color: "text-emerald-400" },
      { text: "🚀 Google PageSpeed вырос до 96 баллов", color: "text-emerald-400" },
    ],
  },
];

export function TerminalWidget() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedCmd, setDisplayedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let currentCmd = COMMANDS[activeIdx].cmd;
    let charIndex = 0;
    setDisplayedCmd("");
    setShowOutput(false);
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex <= currentCmd.length) {
        setDisplayedCmd(currentCmd.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setShowOutput(true), 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [activeIdx]);

  return (
    <div className="w-full rounded-xl bg-[#09090c] border border-white/[0.08] p-3.5 font-mono text-xs shadow-inner">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 ml-1.5">
            <Terminal className="w-3 h-3 text-zinc-400" />
            консоль разработчика
          </span>
        </div>
        <button
          onClick={() => setActiveIdx((prev) => (prev + 1) % COMMANDS.length)}
          className="text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04]"
          title="Следующая команда"
        >
          <RefreshCw className="w-2.5 h-2.5" />
          следующая
        </button>
      </div>

      {/* Terminal Prompt Line */}
      <div className="flex items-center gap-2 text-zinc-300">
        <span className="text-emerald-400 font-semibold">~/anton-dev</span>
        <span className="text-zinc-400">$</span>
        <span className="text-zinc-100">{displayedCmd}</span>
        {isTyping && <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse" />}
      </div>

      {/* Output lines */}
      <div className="mt-2.5 space-y-1 min-h-[74px]">
        {showOutput &&
          COMMANDS[activeIdx].output.map((line, i) => (
            <div
              key={i}
              className={`text-[11px] leading-relaxed transition-all duration-200 ${line.color}`}
            >
              {line.text}
            </div>
          ))}
      </div>
    </div>
  );
}
