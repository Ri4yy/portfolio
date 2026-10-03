"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Terminal, Shield, Send, Globe, Mail } from "lucide-react";
import { LinkedinIcon, TelegramIcon } from "@/components/ui/icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-white/[0.08] text-zinc-400 font-mono text-xs select-none">
      {/* Top telemetry status bar (Cyber brutalist style from ref 6) */}
      <div className="border-b border-white/[0.06] py-3 px-4 sm:px-8 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ALL_SYSTEMS_OPERATIONAL
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-500 hidden sm:inline">UPTIME: 99.99%</span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-zinc-500 hidden md:inline">REGION: UTC+3 GLOBAL EDGE</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <span>SCN: 0492-X</span>
            <span>NEXT_GEN_ENGINEERING</span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              RI4Y · ВЕБ-РАЗРАБОТЧИК
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Разработка сайтов под ключ на 1С-Битрикс, WordPress и MODX, кастомных плагинов, модулей, чат-ботов и ускорение работы проектов с 2020 года.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">
              // НАВИГАЦИЯ
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-400 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Главная страница</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">Все кейсы и проекты</Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">Услуги и цены</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">Частые вопросы (FAQ)</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Контакты и бриф</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Конфиденциальность (152-ФЗ)</Link>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-2">
            <div className="text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">
              // КАНАЛЫ СВЯЗИ
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-400 font-sans">
              <li>
                <a
                  href="https://t.me/anton_webdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Telegram (@anton_webdev)
                </a>
              </li>
              <li>
                <a
                  href="mailto:maksimov.191313@gmail.com"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3" />
                  maksimov.191313@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-center sm:text-left">
            <span>© 2020–2026 ri4y. Все права защищены.</span>
            <span className="text-zinc-700 hidden sm:inline">·</span>
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-emerald-400 underline underline-offset-4 transition-colors"
            >
              Политика конфиденциальности и персональных данных (152-ФЗ)
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors border border-white/[0.06] shrink-0"
          >
            <span>В начало страницы</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
