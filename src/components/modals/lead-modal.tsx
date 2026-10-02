"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { X, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLeadModal } from "@/context/lead-modal-context";
import { toast } from "sonner";
import { sendLeadNotification } from "@/lib/send-lead";

const PROJECT_TYPES = [
  "Интернет-магазин под ключ",
  "Корпоративный сайт / Каталог",
  "Доработка существующего сайта",
  "Кастомный плагин / Модуль",
  "Telegram-бот и интеграции",
  "Ускорение (Google PageSpeed)",
];

const leadFormSchema = z.object({
  name: z.string().min(2, "Пожалуйста, укажите ваше имя (минимум 2 символа)").max(50),
  contact: z.string().min(3, "Укажите Email или Telegram (@username)").max(80),
  projectTypes: z.array(z.string()).min(1, "Выберите хотя бы один тип задачи"),
  message: z.string().min(8, "Опишите проект чуть подробнее (минимум 8 символов)").max(1000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо дать согласие на обработку персональных данных" }),
  }),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export function LeadModal() {
  const { isOpen, closeLeadModal, initialType } = useLeadModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      projectTypes: initialType ? [initialType] : ["Интернет-магазин под ключ"],
      message: "",
      consent: false as unknown as true,
    },
  });

  const selectedTypes = watch("projectTypes") || [];

  useEffect(() => {
    if (initialType) {
      setValue("projectTypes", [initialType]);
    }
  }, [initialType, setValue]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeLeadModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLeadModal]);

  const toggleType = (type: string) => {
    const current = [...selectedTypes];
    const index = current.indexOf(type);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
      }
    } else {
      current.push(type);
    }
    setValue("projectTypes", current, { shouldValidate: true });
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    const res = await sendLeadNotification({
      name: data.name,
      contact: data.contact,
      projectTypes: data.projectTypes,
      message: data.message,
      source: "Модальное окно: Обсудить задачу",
    });
    setIsSubmitting(false);

    if (!res.success) {
      toast.error(res.error || "Не удалось отправить заявку. Пожалуйста, напишите напрямую в Telegram.");
      return;
    }

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#10b981", "#6366f1", "#f59e0b", "#ffffff"],
      });
    } catch (e) {}

    toast.success("Заявка успешно отправлена! Я свяжусь с вами в течение 2-4 часов.");
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    reset();
    closeLeadModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLeadModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-2xl md:rounded-3xl bg-[#111115] border border-white/[0.12] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
          >
            {/* Ambient subtle glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px]" />

            {/* Close button */}
            <button
              onClick={closeLeadModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors border border-white/[0.06]"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="space-y-1 mb-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    [ОБСУДИТЬ ЗАДАЧУ] · АНТОН
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Обсудить разработку или доработку
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    Опишите задачу в паре предложений. Я отвечу с оценкой сроков и стоимости в течение нескольких часов.
                  </p>
                </div>

                {/* Form without budget buttons */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name & Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        Ваше имя <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Алексей"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        Email или Telegram <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        {...register("contact")}
                        placeholder="@username или work@mail.ru"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                      {errors.contact && (
                        <p className="text-[11px] text-rose-400 mt-0.5">{errors.contact.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Types Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300 flex items-center justify-between">
                      <span>Направление задачи</span>
                      <span className="text-[10px] text-zinc-500 font-mono">МУЛЬТИВЫБОР</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => toggleType(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-white text-zinc-950 border-white shadow-sm font-semibold"
                                : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-zinc-200"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    {errors.projectTypes && (
                      <p className="text-[11px] text-rose-400">{errors.projectTypes.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300">
                      Детали задачи или ссылка на сайт / макеты
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Опишите, что требуется: разработать новый сайт, доработать модуль, исправить ошибки..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox (152-ФЗ) */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-zinc-400 select-none group">
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

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      Конфиденциально · Без спама
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !watch("consent")}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Отправка данных...</span>
                      ) : (
                        <>
                          <span>Отправить заявку</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Screen */
              <div className="py-8 text-center space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white">Заявка успешно отправлена!</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                    Спасибо! Я изучу вводные и напишу вам в Telegram или на почту в течение 2–4 часов.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleResetAndClose}
                    className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors border border-white/[0.08]"
                  >
                    Вернуться к сайту
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
