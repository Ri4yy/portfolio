"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Lock,
  ExternalLink,
  ZoomIn,
  RotateCw,
  Image as ImageIcon,
} from "lucide-react";

interface ProjectGalleryProps {
  images?: string[];
  title: string;
  liveUrl?: string;
  slug?: string;
  accent?: string;
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

export function ProjectGallery({
  images = [],
  title,
  liveUrl,
  slug,
  accent = "#10b981",
}: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  // Filter valid images or provide fallback
  const validImages = images.length > 0 ? images : ["/projects/traktor-agromash-1.webp"];
  const displayUrl = formatDisplayUrl(liveUrl, slug);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  }, [validImages.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  }, [validImages.length]);

  // Handle keyboard events in lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, prevImage, nextImage]);

  const activeSrc = validImages[currentIndex];
  const hasError = imageErrorMap[currentIndex];

  const labels = [
    "Главная страница",
    "Каталог и фильтрация",
    "Карточка / Оформление",
    "Спецификация",
  ];

  return (
    <div className="w-full space-y-4">
      {/* Main Browser Mockup Viewport */}
      <div className="relative w-full rounded-2xl md:rounded-3xl bg-[#0b0c10] border border-white/[0.1] shadow-2xl overflow-hidden group select-none transition-all duration-300">
        {/* Realistic Browser Top Bar */}
        <div className="h-10 sm:h-11 bg-[#12131a] border-b border-white/[0.08] px-3.5 sm:px-5 flex items-center justify-between gap-3 shrink-0">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/80 transition-colors shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80 transition-colors shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#10b981]/80 transition-colors shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 pl-3 border-l border-white/[0.07] ml-2">
              <button
                type="button"
                onClick={prevImage}
                title="Предыдущий скриншот"
                className="hover:text-white transition-colors p-0.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                title="Следующий скриншот"
                className="hover:text-white transition-colors p-0.5"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Central URL Address Bar */}
          <div className="flex-1 max-w-[280px] sm:max-w-[420px] md:max-w-[480px] mx-auto">
            <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-black/60 border border-white/[0.08] text-[11px] sm:text-xs font-mono text-zinc-300 truncate shadow-inner">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px]">{displayUrl.protocol}</span>
              <span className="text-zinc-200 font-mono font-medium truncate">{displayUrl.host}</span>
            </div>
          </div>

          {/* Controls: Zoom & Open Live */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
              title="Развернуть скриншот во весь экран"
            >
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Развернуть</span>
            </button>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/[0.05]"
                title="Открыть сайт"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Screen Viewport with Image & Slider Overlay Controls */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full h-[320px] sm:h-[460px] md:h-[520px] lg:h-[580px] bg-[#08080c] cursor-zoom-in overflow-hidden group/image"
        >
          {!hasError ? (
            <img
              src={activeSrc}
              alt={`${title} - Скриншот ${currentIndex + 1}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/image:scale-[1.02]"
              onError={() =>
                setImageErrorMap((prev) => ({ ...prev, [currentIndex]: true }))
              }
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
              <ImageIcon className="w-10 h-10 text-zinc-600" />
              <p className="text-xs font-mono">Скриншот временно недоступен</p>
            </div>
          )}

          {/* Hover Hint Overlay with Zoom Badge */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
            <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-2 shadow-2xl">
              <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Нажмите, чтобы увеличить скриншот</span>
            </div>
          </div>

          {/* Left Arrow Button */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/15 backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95"
              title="Предыдущее изображение"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {validImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/15 backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95"
              title="Следующее изображение"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Badge: Current Screen Label & Number */}
          <div className="absolute bottom-3 left-3.5 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{labels[currentIndex] || `Экран ${currentIndex + 1}`}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              {currentIndex + 1} / {validImages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnails Carousel Bar */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {validImages.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex items-center gap-3 p-1.5 pr-4 rounded-xl border text-left transition-all shrink-0 group/thumb ${
                  isActive
                    ? "bg-white/[0.08] border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50"
                    : "bg-[#101117] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
                }`}
              >
                {/* Thumbnail Image */}
                <div className="w-16 h-10 rounded-lg overflow-hidden bg-black/50 border border-white/10 shrink-0 relative">
                  <img
                    src={img}
                    alt={`Миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-110"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-emerald-500/20 pointer-events-none" />
                  )}
                </div>

                {/* Text Info */}
                <div className="space-y-0.5">
                  <div
                    className={`text-[11px] font-mono font-medium ${
                      isActive ? "text-emerald-400" : "text-zinc-300 group-hover/thumb:text-white"
                    }`}
                  >
                    {labels[idx] || `Скриншот 0${idx + 1}`}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Вид {idx + 1} из {validImages.length}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div
            className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08] shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-white/[0.08] border border-white/10 font-mono text-xs text-emerald-400">
                {currentIndex + 1} / {validImages.length}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  {title}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  {labels[currentIndex] || `Скриншот ${currentIndex + 1}`}
                </p>
              </div>
            </div>

            {/* Keyboard hints & Close Button */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span>← → Листать</span>
                <span className="text-zinc-700">•</span>
                <span>Esc Закрыть</span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-zinc-300 hover:text-white border border-white/10 transition-colors"
                title="Закрыть просмотр (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Centered Image Container */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeSrc}
              alt={`${title} - Полноэкранный скриншот ${currentIndex + 1}`}
              className="max-h-[76vh] max-w-[94vw] object-contain rounded-xl border border-white/15 shadow-2xl shadow-black/90"
            />

            {/* Lightbox Previous Arrow */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-2xl"
                title="Предыдущее изображение (Стрелка влево)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Next Arrow */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-2xl"
                title="Следующее изображение (Стрелка вправо)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Bar */}
          {validImages.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 pt-2 border-t border-white/[0.08] shrink-0 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-14 h-9 sm:w-20 sm:h-12 rounded-lg overflow-hidden border transition-all shrink-0 ${
                    idx === currentIndex
                      ? "border-emerald-400 ring-2 ring-emerald-500/50 scale-105"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
