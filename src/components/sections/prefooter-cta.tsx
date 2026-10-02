"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { Send, Copy, Check, MessageSquare, ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sendLeadNotification } from "@/lib/send-lead";
import { FadeIn } from "@/components/ui/fade-in";

const quickFormSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(50),
  contact: z.string().min(3, "Укажите Telegram или Email").max(80),
  message: z.string().min(8, "Опишите вашу задачу").max(800),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
  }),
});

type QuickFormData = z.infer<typeof quickFormSchema>;

export function PrefooterCta() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = "maksimov.191313@gmail.com";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuickFormData>({
    resolver: zodResolver(quickFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email скопирован в буфер обмена!");
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = async (data: QuickFormData) => {
    setLoading(true);
    const res = await sendLeadNotification({
      name: data.name,
      contact: data.contact,
      message: data.message,
      source: "Быстрая форма: Prefooter CTA",
    });
    setLoading(false);

    if (!res.success) {
      toast.error(res.error || "Не удалось отправить сообщение. Попробуйте написать в Telegram.");
      return;
    }

    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10b981", "#6366f1", "#ffffff"],
      });
    } catch (e) {}

    toast.success("Сообщение отправлено! Отвечу вам в течение пары часов.");
  };

  return (
    <section className="py-20 relative bg-[#09090c] border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/[0.03] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SpotlightCard className="p-7 sm:p-10 lg:p-12 border-white/[0.12] bg-[#0e0e13]/90">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase mb-1">
                <span>[09]</span>
                <span className="text-zinc-600">/</span>
                <span>ЗАЯВКА И ОЦЕНКА</span>
              </div>

              <div className="space-y-2.5">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Есть задача по сайту? Давайте обсудим
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  Нужен новый сайт под ключ, доработка функционала, разработка кастомного плагина или ускорение текущего проекта? Напишите вводные — сориентирую по срокам и стоимости.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-2.5 pt-1">
                {/* One click email copy */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-zinc-300">
                      <Mail className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500">EMAIL ДЛЯ СВЯЗИ</div>
                      <div className="text-xs sm:text-sm font-mono text-zinc-200">{email}</div>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                    title="Скопировать email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Telegram Pill */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                  <a
                    href="https://t.me/anton_webdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/30 flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram: @anton_webdev</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Inline Fast Contact Form */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-black/50 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-xs text-zinc-300 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    БЫСТРЫЙ ЗАПРОС
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">ОТВЕТ В ТЕЧЕНИЕ ДНЯ</span>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Ваше имя</label>
                      <input
                        {...register("name")}
                        placeholder="Константин"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111115] border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Контакты для связи (Telegram / Email)</label>
                      <input
                        {...register("contact")}
                        placeholder="@username или work@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111115] border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      {errors.contact && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.contact.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">Что нужно сделать?</label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="Нужно разработать сайт на Битрикс / сделать плагин / ускорить загрузку..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111115] border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Consent Checkbox (152-ФЗ) */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400 select-none group">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.05] text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-0 cursor-pointer accent-emerald-500 shrink-0"
                        />
                        <span className="leading-snug">
                          Я даю согласие на{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            className="text-zinc-300 hover:text-emerald-400 underline underline-offset-2 transition-colors"
                          >
                            обработку персональных данных
                          </Link>{" "}
                          по 152-ФЗ
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[11px] text-rose-400 mt-1 pl-6.5">{errors.consent.message}</p>
                      )}
                    </div>

                    <div className="pt-1.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Конфиденциально</span>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !watch("consent")}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {loading ? "Отправка..." : "Отправить задачу ↗"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-5 text-center space-y-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-white">Сообщение отправлено</div>
                    <p className="text-xs text-zinc-400">
                      Спасибо за обращение. Я свяжусь с вами в ближайшее время.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        reset();
                      }}
                      className="text-xs font-mono text-zinc-400 hover:text-white underline pt-1"
                    >
                      Отправить еще одно сообщение
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </FadeIn>
      </div>
    </section>
  );
}
