import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { CapabilitiesBento } from "@/components/sections/capabilities-bento";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ServicesPricingSection } from "@/components/sections/services-pricing";
import { ComparisonMatrixSection } from "@/components/sections/comparison-matrix";
import { StatsBentoSection } from "@/components/sections/stats-bento";
import { ProjectGuaranteesSection } from "@/components/sections/project-guarantees";
import { ExperienceTimelineSection } from "@/components/sections/experience-timeline";
import { FaqSection } from "@/components/sections/faq-section";
import { PrefooterCta } from "@/components/sections/prefooter-cta";
import { getFeaturedProjects } from "@/lib/projects-data";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col selection:bg-white/20 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero with 3D Canvas & Value Proposition */}
        <HeroSection />

        {/* 2. Bento Capabilities & Interactive Live Widgets */}
        <CapabilitiesBento />

        {/* 3. Featured Commercial Projects Showcase */}
        <FeaturedProjectsSection initialProjects={featuredProjects} />

        {/* 4. Services & Transparent Pricing Floor */}
        <ServicesPricingSection />

        {/* 5. Direct Developer vs Agency vs Freelance Comparison */}
        <ComparisonMatrixSection />

        {/* 6. Engineering Principles & Client Social Proof */}
        <StatsBentoSection />

        {/* 7. Security Standards & Project Handover */}
        <ProjectGuaranteesSection />

        {/* 8. Brutalist Experience & Leadership Timeline */}
        <ExperienceTimelineSection />

        {/* 9. High-Conversion FAQ Accordion */}
        <FaqSection />

        {/* 10. Lead Generation Pre-Footer & Fast Form */}
        <PrefooterCta />
      </main>

      <Footer />
    </div>
  );
}
