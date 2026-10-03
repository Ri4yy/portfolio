import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/projects-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  GitBranch,
  Terminal,
} from "lucide-react";
import type { Metadata } from "next";
import { ProjectCtaCard } from "@/components/sections/project-cta-card";
import { WidgetIntegrationCta } from "@/components/sections/widget-integration-cta";
import { PrefooterCta } from "@/components/sections/prefooter-cta";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Кейс не найден",
    };
  }

  const stackItems = project.techStack.flatMap((s) => s.items);

  return {
    title: `${project.title} — Кейс веб-разработки`,
    description: `${project.tagline} ${project.challenge}`,
    keywords: [
      project.title,
      project.category,
      ...stackItems,
      "кейс веб разработки",
      "ri4y dev",
      "разработка сайтов",
    ],
    openGraph: {
      title: `${project.title} | ri4y.dev`,
      description: project.overview,
      url: `https://ri4y.dev/projects/${project.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button & Eyebrow */}
          <FadeIn className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>НАЗАД К СПИСКУ КЕЙСОВ</span>
            </Link>

            <div className="flex items-center gap-2">
              <Badge variant="mono">КЕЙС #{project.id}</Badge>
              <Badge variant="accent">{project.category}</Badge>
            </div>
          </FadeIn>

          {/* Project Hero Header */}
          <FadeIn delay={0.05} className="space-y-4 mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed font-sans">
              {project.tagline}
            </p>

            {/* Meta Row: Client, Role, Duration, Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.06]">
              <div>
                <span className="text-zinc-600 uppercase">Клиент: </span>
                <span className="text-zinc-200">{project.client}</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="text-zinc-600 uppercase">Роль: </span>
                <span className="text-emerald-400">{project.role}</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div>
                <span className="text-zinc-600 uppercase">Сроки: </span>
                <span className="text-zinc-200">{project.duration}</span>
              </div>

              {project.liveUrl && (
                <div className="ml-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 font-semibold text-xs transition-colors hover:bg-zinc-200"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Key Metrics Bento (Reference 4 & 5 style) */}
          <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {project.metrics.map((metric, i) => (
              <FadeInItem key={i} className="h-full">
                <SpotlightCard className="h-full p-5">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">{metric.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 font-sans">{metric.detail}</div>
                  {metric.trend && (
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {metric.trend}
                    </div>
                  )}
                </SpotlightCard>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* Interactive Screenshot Slider, Mockup & Lightbox */}
          <FadeIn className="w-full mb-16">
            <ProjectGallery
              images={
                project.galleryImages && project.galleryImages.length > 0
                  ? project.galleryImages
                  : project.imageUrl
                  ? [project.imageUrl]
                  : []
              }
              title={project.title}
              liveUrl={project.liveUrl}
              slug={project.slug}
              accent={project.accent}
            />
          </FadeIn>

          {/* Deep-Dive Case Study Content: Problem -> Architecture -> Decisions -> Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 8 Cols: Main Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* 1. Overview & Context */}
              <FadeIn>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                    <span>[01]</span>
                    <span className="text-zinc-600">/</span>
                    <span>КОНТЕКСТ И ЗАДАЧА</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Проблема и бизнес-контекст
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                    {project.overview}
                  </p>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    <span className="text-white font-semibold block mb-1">Ключевой вызов:</span>
                    {project.challenge}
                  </div>
                </section>
              </FadeIn>

              {/* 2. Architecture & Blueprint */}
              <FadeIn>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                    <span>[02]</span>
                    <span className="text-zinc-600">/</span>
                    <span>АРХИТЕКТУРНОЕ РЕШЕНИЕ</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Инженерная архитектура
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                    {project.architecture.summary}
                  </p>

                  {/* Architecture Nodes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.architecture.diagramNodes.map((node, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1 font-mono"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-emerald-400 font-bold">{node.name}</span>
                          <span className="text-zinc-500">{node.type}</span>
                        </div>
                        <div className="text-xs text-zinc-400 font-sans">{node.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture Highlights */}
                  <div className="space-y-2 pt-2">
                    {project.architecture.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 3. Implementation Details */}
              <FadeIn>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                    <span>[03]</span>
                    <span className="text-zinc-600">/</span>
                    <span>РЕАЛИЗАЦИЯ</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Ключевые этапы реализации
                  </h2>
                  <div className="space-y-3">
                    {project.implementation.map((step, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-zinc-300 font-sans flex items-start gap-3"
                      >
                        <span className="font-mono text-xs text-emerald-400 font-bold mt-0.5">
                          0{i + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 4. Business Results */}
              <FadeIn>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                    <span>[04]</span>
                    <span className="text-zinc-600">/</span>
                    <span>ИТОГИ И ВЫГОДА</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Результаты внедрения
                  </h2>
                  <div className="space-y-2.5">
                    {project.results.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 font-sans"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 5. Autonomous Widget Integration Offer (if chat-bot project) */}
              {(project.slug === "nexus-ai-chatbot-widget" || project.category === "Чат-боты и сервисы") && (
                <FadeIn>
                  <WidgetIntegrationCta />
                </FadeIn>
              )}
            </div>

            {/* Right 4 Cols: Tech Stack & Sidebar CTA */}
            <FadeIn className="lg:col-span-4 space-y-6 sticky top-28">
              {/* Tech Stack Breakdown */}
              <SpotlightCard className="p-6 sm:p-7">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 uppercase tracking-wider pb-3.5 border-b border-white/[0.06]">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>ТЕХНОЛОГИЧЕСКИЙ СТЕК</span>
                  </div>

                  <div className="space-y-5">
                    {project.techStack.map((group, i) => (
                      <div key={i} className="space-y-2.5">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                          {group.category}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs font-mono text-zinc-300 bg-white/[0.04] hover:bg-white/[0.07] px-3 py-1.5 rounded-lg border border-white/[0.07] transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

              {/* Direct Project CTA (Opens Lead Modal) */}
              <ProjectCtaCard initialType={project.category} />
            </FadeIn>
          </div>
        </div>
      </main>

      <PrefooterCta />
      <Footer />
    </div>
  );
}
