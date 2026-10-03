"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectMockup } from "@/components/ui/project-mockup";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const CATEGORIES = [
  "Все направления",
  "Интернет-магазины",
  "Корпоративные сайты",
  "Модули и плагины",
  "Чат-боты и сервисы",
] as const;

interface ProjectsCatalogProps {
  initialProjects: ProjectItem[];
}

export function ProjectsCatalog({ initialProjects = [] }: ProjectsCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Все направления");

  const filteredProjects =
    activeCategory === "Все направления"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeIn className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>// ВЫПОЛНЕННЫЕ РАБОТЫ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Кейсы и выполненные проекты
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-sans">
          Примеры разработанных сайтов на 1С-Битрикс, WordPress и MODX, кастомных модулей, плагинов и решений по ускорению загрузки.
        </p>
      </FadeIn>

      {/* Filter Pills */}
      <FadeIn delay={0.08} className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.06]">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-white text-zinc-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </FadeIn>

      {/* Projects Grid with smooth animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <SpotlightCard className="h-full p-6 flex flex-col justify-between group-hover:border-white/20 transition-all duration-300">
                    <div className="space-y-4">
                      {/* Top line: Id & Category */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="mono">/{project.id}</Badge>
                          <Badge variant="accent">{project.category}</Badge>
                        </div>
                        <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                      </div>

                      {/* Preview Viewport inside realistic browser frame */}
                      <div className="h-44 sm:h-52 w-full pt-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                        <ProjectMockup
                          type={project.mockupType}
                          accent={project.accent}
                          imageUrl={project.imageUrl}
                          liveUrl={project.liveUrl}
                          title={project.title}
                          slug={project.slug}
                        />
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-emerald-400 shrink-0" />
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Primary Highlight Metric */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase">{project.metrics[0]?.label}</div>
                          <div className="text-sm font-bold font-mono text-emerald-400">{project.metrics[0]?.value}</div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded">
                          {project.duration}
                        </span>
                      </div>
                    </div>

                    {/* Tech stack tags pinned to bottom */}
                    <div className="mt-auto pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack[0]?.items.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.04]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors shrink-0">
                        <span>Детали</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-sm font-mono text-zinc-400">
                // В данной категории пока нет опубликованных кейсов
              </p>
              <button
                onClick={() => setActiveCategory("Все направления")}
                className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
              >
                Показать все проекты
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
