"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLeadModal } from "@/context/lead-modal-context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Menu, X, ArrowUpRight, Terminal, Clock, Activity } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Live UTC+3 clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("ru-RU", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Initial hash check
    if (typeof window !== "undefined" && window.location.hash) {
      setActiveSection(window.location.hash);
    }

    const handleHash = () => {
      setActiveSection(window.location.hash);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const scrollPos = window.scrollY + 260;
      const faqEl = document.getElementById("faq");
      const pricingEl = document.getElementById("pricing");

      const faqTop = faqEl ? faqEl.offsetTop : Infinity;
      const pricingTop = pricingEl ? pricingEl.offsetTop : Infinity;

      if (scrollPos >= faqTop) {
        setActiveSection("#faq");
      } else if (scrollPos >= pricingTop) {
        setActiveSection("#pricing");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHash);

    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [pathname]);

  const navLinks = [
    { name: "Главная", href: "/" },
    { name: "Кейсы", href: "/projects" },
    { name: "Услуги и цены", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
    { name: "Контакты", href: "/contact" },
  ];

  const checkIsActive = (href: string) => {
    if (pathname === "/") {
      if (href === "/#pricing") return activeSection === "#pricing";
      if (href === "/#faq") return activeSection === "#faq";
      if (href === "/") return !activeSection;
      return false;
    }
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#0d0d11]/85 backdrop-blur-xl border border-white/[0.1] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              : "bg-[#0d0d11]/60 backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Left: Branding & Status Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group text-white font-mono font-bold tracking-tight text-sm select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-xs text-white group-hover:border-emerald-400/50 transition-colors">
                <Terminal className="w-3.5 h-3.5 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
              </div>
              <span className="hidden sm:inline">RI4Y<span className="text-zinc-500">.DEV</span></span>
            </Link>

            {/* Pulsing Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ДОСТУПЕН ДЛЯ ПРОЕКТОВ</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links with active hash highlight */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (link.href === "/#pricing") setActiveSection("#pricing");
                    else if (link.href === "/#faq") setActiveSection("#faq");
                    else if (link.href === "/") setActiveSection("");
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-sm font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Telemetry & Lead CTA */}
          <div className="flex items-center gap-3">
            {/* UTC Clock & Ping */}
            <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono text-zinc-400 border-r border-white/[0.08] pr-3 select-none">
              <span className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3 h-3 text-zinc-400" />
                {currentTime || "12:00:00"} <span className="text-[9px] text-zinc-400">MSK</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400/90">
                <Activity className="w-3 h-3" />
                24ms
              </span>
            </div>

            {/* Primary Action Button */}
            <MagneticButton
              onClick={() => openLeadModal()}
              className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold tracking-tight transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Обсудить задачу</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#0d0d11]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      if (link.href === "/#pricing") setActiveSection("#pricing");
                      else if (link.href === "/#faq") setActiveSection("#faq");
                      else if (link.href === "/") setActiveSection("");
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? "text-white bg-white/[0.08]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ДОСТУПЕН ДЛЯ ЗАКАЗОВ
              </span>
              <span>{currentTime} MSK</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
