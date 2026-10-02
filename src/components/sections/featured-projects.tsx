"use client";

import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectMockup } from "@/components/ui/project-mockup";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export function FeaturedProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="cases" className="py-20 relative bg-[#0a0a0c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider uppercase">
              <span>[02]</span>
              <span className="text-zinc-600">/</span>
              <span>ИЗБРАННЫЕ РАБОТЫ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Избранные проекты
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.1] text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Все проекты ({PROJECTS.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </FadeIn>

        {/* Bento Case Grid */}
        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: 1C-Bitrix Store (Large, 7 cols) */}
          {featured[0] && (
            <FadeInItem className="lg:col-span-7 h-full">
              <SpotlightCard className="h-full p-6 sm:p-8 group">
              <div className="flex flex-col justify-between flex-1 h-full">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="mono">[{featured[0].id}] · {featured[0].year}</Badge>
                      <Badge variant="accent">{featured[0].category}</Badge>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{featured[0].duration}</span>
                  </div>

                  <div>
                    <Link href={`/projects/${featured[0].slug}`} className="block group/title">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover/title:text-emerald-400 transition-colors">
                        {featured[0].title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-sans">
                      {featured[0].tagline}
                    </p>
                  </div>

                  {/* Metrics Pill Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {featured[0].metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <div className="text-[10px] text-zinc-500 font-mono truncate">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">{m.value}</div>
                        <div className="text-[9px] text-zinc-400 truncate">{m.trend}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup (Clickable) */}
                <Link
                  href={`/projects/${featured[0].slug}`}
                  className="block mt-5 pt-2 h-56 sm:h-64 cursor-pointer"
                >
                  <ProjectMockup type={featured[0].mockupType} accent={featured[0].accent} />
                </Link>

                {/* Footer link pinned to bottom with generous spacing */}
                <div className="mt-auto pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featured[0].techStack[0].items.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${featured[0].slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors"
                  >
                    <span>Детали кейса</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>
        )}

        {/* Card 2: MODX Portal (5 cols) */}
        {featured[1] && (
          <FadeInItem className="lg:col-span-5 h-full">
            <SpotlightCard className="h-full p-6 sm:p-8 group">
              <div className="flex flex-col justify-between flex-1 h-full">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="mono">[{featured[1].id}] · {featured[1].year}</Badge>
                      <Badge variant="accent">{featured[1].category}</Badge>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{featured[1].duration}</span>
                  </div>

                  <div>
                    <Link href={`/projects/${featured[1].slug}`} className="block group/title">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover/title:text-sky-400 transition-colors">
                        {featured[1].title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-sans">
                      {featured[1].tagline}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {featured[1].metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <div className="text-[10px] text-zinc-500 font-mono truncate">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold text-sky-400 font-mono mt-0.5">{m.value}</div>
                        <div className="text-[9px] text-zinc-400 truncate">{m.trend}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup (Clickable) */}
                <Link
                  href={`/projects/${featured[1].slug}`}
                  className="block mt-5 pt-2 h-52 sm:h-56 cursor-pointer"
                >
                  <ProjectMockup type={featured[1].mockupType} accent={featured[1].accent} />
                </Link>

                {/* Footer link pinned to bottom with generous spacing */}
                <div className="mt-auto pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featured[1].techStack[0].items.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${featured[1].slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-sky-400 transition-colors"
                  >
                    <span>Детали кейса</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>
        )}

        {/* Card 3: WordPress ACF Custom Portal (6 cols) */}
        {featured[2] && (
          <FadeInItem className="lg:col-span-6 h-full">
            <SpotlightCard className="h-full p-6 sm:p-8 group">
              <div className="flex flex-col justify-between flex-1 h-full">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="mono">[{featured[2].id}] · {featured[2].year}</Badge>
                      <Badge variant="accent">{featured[2].category}</Badge>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{featured[2].duration}</span>
                  </div>

                  <div>
                    <Link href={`/projects/${featured[2].slug}`} className="block group/title">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover/title:text-indigo-400 transition-colors">
                        {featured[2].title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-sans">
                      {featured[2].tagline}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {featured[2].metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <div className="text-[10px] text-zinc-500 font-mono truncate">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold text-indigo-400 font-mono mt-0.5">{m.value}</div>
                        <div className="text-[9px] text-zinc-400 truncate">{m.trend}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup (Clickable) */}
                <Link
                  href={`/projects/${featured[2].slug}`}
                  className="block mt-5 pt-2 h-52 sm:h-56 cursor-pointer"
                >
                  <ProjectMockup type={featured[2].mockupType} accent={featured[2].accent} />
                </Link>

                {/* Footer link pinned to bottom with generous spacing */}
                <div className="mt-auto pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featured[2].techStack[0].items.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${featured[2].slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors"
                  >
                    <span>Детали кейса</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>
        )}

        {/* Card 4: Telegram Bot Automation (6 cols) */}
        {featured[3] && (
          <FadeInItem className="lg:col-span-6 h-full">
            <SpotlightCard className="h-full p-6 sm:p-8 group">
              <div className="flex flex-col justify-between flex-1 h-full">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="mono">[{featured[3].id}] · {featured[3].year}</Badge>
                      <Badge variant="accent">{featured[3].category}</Badge>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{featured[3].duration}</span>
                  </div>

                  <div>
                    <Link href={`/projects/${featured[3].slug}`} className="block group/title">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover/title:text-purple-400 transition-colors">
                        {featured[3].title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-sans">
                      {featured[3].tagline}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {featured[3].metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <div className="text-[10px] text-zinc-500 font-mono truncate">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold text-purple-400 font-mono mt-0.5">{m.value}</div>
                        <div className="text-[9px] text-zinc-400 truncate">{m.trend}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup (Clickable) */}
                <Link
                  href={`/projects/${featured[3].slug}`}
                  className="block mt-5 pt-2 h-52 sm:h-56 cursor-pointer"
                >
                  <ProjectMockup type={featured[3].mockupType} accent={featured[3].accent} />
                </Link>

                {/* Footer link pinned to bottom with generous spacing */}
                <div className="mt-auto pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featured[3].techStack[0].items.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${featured[3].slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-purple-400 transition-colors"
                  >
                    <span>Детали кейса</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </FadeInItem>
        )}
      </FadeInStagger>
      </div>
    </section>
  );
}
