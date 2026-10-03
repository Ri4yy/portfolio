import React from "react";
import { getProjects } from "@/lib/projects-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PrefooterCta } from "@/components/sections/prefooter-cta";
import { ProjectsCatalog } from "@/components/sections/projects-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы и выполненные проекты — Веб-разработка ri4y",
  description: "Примеры разработанных сайтов на 1С-Битрикс, WordPress, кастомных интернет-магазинов, корпоративных порталов и интеграций.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <ProjectsCatalog initialProjects={projects} />
      </main>

      <PrefooterCta />
      <Footer />
    </div>
  );
}
