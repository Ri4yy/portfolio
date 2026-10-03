"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Mail,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Sparkles,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { sendLeadNotification } from "@/lib/send-lead";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

const contactSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  contact: z.string().min(3, "Укажите контакт (Email или Telegram)"),
  company: z.string().optional(),
  scope: z.string().min(1, "Выберите тип задачи"),
  details: z.string().min(8, "Пожалуйста, опишите задачу хотя бы в 8 символах"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо дать согласие на обработку персональных данных" }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SCOPES = [
  "Интернет-магазин на 1С-Битрикс",
  "Сайт / Каталог на MODX",
  "Сайт на WordPress (ACF Pro)",
  "Кастомный модуль или плагин",
  "Доработка существующего сайта",
  "Telegram-бот или интеграция API",
  "Оптимизация скорости PageSpeed",
];

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Анализ задачи и ТЗ",
    desc: "Изучаю макеты, требования или текущий код сайта, задаю уточняющие вопросы.",
  },
  {
    num: "02",
    title: "Фиксированная оценка",
    desc: "Согласовываем точную стоимость и дедлайн до старта. Без скрытых доплат в процессе.",
  },
  {
    num: "03",
    title: "Разработка на тестовом сервере",
    desc: "Вы видите промежуточный результат на живом тестовом стенде еще до релиза.",
  },
  {
    num: "04",
    title: "Перенос на хостинг и гарантия",
    desc: "Бесшовно запускаю проект на вашем сервере и даю гарантию на весь разработанный код.",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const email = "maksimov.191313@gmail.com";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contact: "",
      company: "",
      scope: "Интернет-магазин на 1С-Битрикс",
      details: "",
      consent: false as unknown as true,
    },
  });

  const selectedScope = watch("scope");

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email скопирован в буфер обмена!");
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const res = await sendLeadNotification({
      name: data.name,
      contact: data.contact,
      company: data.company,
      scope: data.scope,
      details: data.details,
      source: "Страница контактов / Бриф на разработку",
    });
    setIsSubmitting(false);

    if (!res.success) {
      toast.error(res.error || "Не удалось отправить заявку. Попробуйте еще раз или напишите в Telegram.");
      return;
    }

    setIsSuccess(true);

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#10b981", "#6366f1", "#ffffff"],
      });
    } catch (e) {}

    toast.success("Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>// КОНТАКТЫ И БРИФ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Контакты и обсуждение задач
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-sans">
              Напишите мне в Telegram или отправьте описание задачи через форму. Отвечаю оперативно, помогаю составить грамотное техническое задание и сориентирую по срокам.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Direct Contact Channels & Workflow Steps */}
            <FadeInStagger className="lg:col-span-5 space-y-5">
              {/* Direct channels card */}
              <FadeInItem>
                <SpotlightCard className="p-6">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider pb-3 mb-4 border-b border-white/[0.06] flex items-center justify-between">
                    <span>ПРЯМЫЕ КАНАЛЫ СВЯЗИ</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      НА СВЯЗИ
                    </span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {/* Telegram */}
                    <a
                      href="https://t.me/anton_webdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-[#229ED9] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Send className="w-4 h-4" />
                        <div>
                          <div className="text-[10px] text-[#229ED9]/80">TELEGRAM (БЫСТРЫЙ ОТВЕТ)</div>
                          <div className="font-semibold text-zinc-100">@anton_webdev</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    {/* Copy Email */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] hover:border-white/[0.15] flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-[10px] text-zinc-500">EMAIL</div>
                          <div className="text-zinc-200">{email}</div>
                        </div>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                        title="Скопировать"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeInItem>

              {/* Workflow card (fixed gap between title and list) */}
              <FadeInItem>
                <SpotlightCard className="p-6">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider pb-3 mb-5 border-b border-white/[0.06] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>КАК СТРОИТСЯ РАБОТА</span>
                  </div>

                  <div className="space-y-4">
                    {WORKFLOW_STEPS.map((step) => (
                      <div key={step.num} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 mt-0.5">
                          {step.num}
                        </span>
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-white">{step.title}</div>
                          <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </FadeInItem>
            </FadeInStagger>

            {/* Right 7 Cols: Full Brief Form (Without Budget Buttons) */}
            <FadeIn delay={0.15} className="lg:col-span-7">
              <SpotlightCard className="p-7 sm:p-9 border-white/[0.1]">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="pb-3 border-b border-white/[0.06] flex items-center justify-between">
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        Заполнить бриф на разработку
                      </h2>
                      <span className="text-[10px] font-mono text-zinc-400">
                        БЕЗ ЛИШНИХ ШАГОВ
                      </span>
                    </div>

                    {/* Scope Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        Что требуется сделать?
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {SCOPES.map((sc) => {
                          const isSel = selectedScope === sc;
                          return (
                            <button
                              type="button"
                              key={sc}
                              onClick={() => setValue("scope", sc)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                                isSel
                                  ? "bg-white text-zinc-950 font-bold border-white shadow-sm"
                                  : "bg-black/40 text-zinc-400 border border-white/[0.06] hover:bg-white/[0.04] hover:text-zinc-200"
                              }`}
                            >
                              {sc}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-zinc-300">Ваше имя *</label>
                        <input
                          {...register("name")}
                          placeholder="Дмитрий"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-rose-400 mt-0.5">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-zinc-300">Email или Telegram *</label>
                        <input
                          {...register("contact")}
                          placeholder="@username или dmitry@mail.ru"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                        />
                        {errors.contact && (
                          <p className="text-[11px] text-rose-400 mt-0.5">{errors.contact.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Company / Site URL */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        Ссылка на текущий сайт или макеты (опционально)
                      </label>
                      <input
                        {...register("company")}
                        placeholder="https://mysite.ru или ссылка на Figma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    {/* Project details */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        Описание задачи и пожелания *
                      </label>
                      <textarea
                        {...register("details")}
                        rows={4}
                        placeholder="Опишите, что нужно сделать: новый сайт с каталогом, доработка форм, интеграция с CRM, ускорение сайта..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                      {errors.details && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.details.message}</p>
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
                          в соответствии с Федеральным законом № 152-ФЗ
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-[11px] text-rose-400 mt-1 pl-6.5">{errors.consent.message}</p>
                      )}
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Конфиденциальность гарантирована</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !watch("consent")}
                        className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Отправка..." : "Отправить бриф ↗"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-10 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-6">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                      Бриф успешно отправлен!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-7">
                      Спасибо за обращение. Я изучу детали задачи и свяжусь с вами в Telegram или по Email в течение 2–4 часов.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        reset();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/[0.08] hover:border-white/[0.15] cursor-pointer"
                    >
                      Заполнить еще одну заявку
                    </button>
                  </div>
                )}
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
