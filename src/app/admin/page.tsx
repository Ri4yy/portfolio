"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/translit";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  Key,
  LogOut,
  Send,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Archive,
  RefreshCw,
  Search,
  FolderGit2,
  Inbox,
  Sparkles,
  Layers,
  Upload,
  Eye,
  Check,
  Phone,
  Copy,
  Sliders,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  contact: string;
  company: string | null;
  message: string | null;
  source: string;
  page: string;
  services: string[];
  ip: string | null;
  device: string | null;
  status: "new" | "in_progress" | "completed" | "archived";
  notes?: string | null;
  created_at: string;
}

interface ProjectDbRow {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  role: string;
  team: string;
  featured: boolean;
  accent: string;
  mockup_type: string;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  order_index: number;
  metrics: { label: string; value: string; trend?: string; detail?: string }[];
  overview: string;
  challenge: string;
  implementation: string[];
  results: string[];
  tech_stack: { category: string; items: string[] }[];
  gallery_images: string[];
  created_at?: string;
}

const CATEGORY_PRESETS = [
  "Корпоративные сайты",
  "Интернет-магазины",
  "Чат-боты и сервисы",
  "Модули и плагины",
  "Лендинги / Промо",
];

const ACCENT_PRESETS = [
  { label: "Изумруд", hex: "#10b981" },
  { label: "Синий", hex: "#3b82f6" },
  { label: "Фиолетовый", hex: "#a855f7" },
  { label: "Янтарный", hex: "#f59e0b" },
  { label: "Циан", hex: "#06b6d4" },
  { label: "Розовый", hex: "#ec4899" },
];

const MOCKUP_PRESETS = [
  { id: "browser", label: "Окно браузера (Сайт)" },
  { id: "ai-kernel", label: "ИИ-чат / Виджет" },
  { id: "fintech", label: "Финтех / Каталог" },
  { id: "telemetry", label: "Метрики / Аналитика" },
  { id: "design-system", label: "Дизайн-система" },
];

const EXISTING_IMAGES = [
  { label: "Nexus AI (виджет)", path: "/projects/ai-chatbot-widget-5.webp" },
  { label: "Traktor Agromash", path: "/projects/traktor-agromash-1.webp" },
  { label: "Crafer Pro", path: "/projects/crafer-pro-1.webp" },
  { label: "IVEKTA", path: "/projects/ivekta-1.webp" },
  { label: "Яркая Птица", path: "/projects/yarkaya-ptitsa-1.webp" },
  { label: "Центр Силы", path: "/projects/centr-sily-1.webp" },
  { label: "Новогодние Подарки 21", path: "/projects/ngpodarki21-1.webp" },
  { label: "Труд Эксперт", path: "/projects/trud-rf-1.webp" },
];

export default function AdminPage() {
  // Auth state
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"leads" | "add-project" | "projects">("leads");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>("all");
  const [leadSearch, setLeadSearch] = useState("");

  // Projects state
  const [projects, setProjects] = useState<ProjectDbRow[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // New Project Form State
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [projectCategory, setProjectCategory] = useState("Корпоративные сайты");
  const [customCategory, setCustomCategory] = useState("");
  const [projectTagline, setProjectTagline] = useState("");
  const [projectClient, setProjectClient] = useState("");
  const [projectYear, setProjectYear] = useState(new Date().getFullYear().toString());
  const [projectDuration, setProjectDuration] = useState("3 недели");
  const [projectRole, setProjectRole] = useState("Full-Stack разработчик");
  const [projectTeam, setProjectTeam] = useState("Solo (ri4y)");
  const [projectFeatured, setProjectFeatured] = useState(true);
  const [projectAccent, setProjectAccent] = useState("#10b981");
  const [projectMockupType, setProjectMockupType] = useState("browser");
  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [projectOrderIndex, setProjectOrderIndex] = useState(1);
  const [projectOverview, setProjectOverview] = useState("");
  const [projectChallenge, setProjectChallenge] = useState("");
  const [implementationItems, setImplementationItems] = useState<string[]>([
    "Разработка адаптивной структуры и UI-компонентов",
    "Интеграция каталога и динамической фильтрации",
  ]);
  const [resultItems, setResultItems] = useState<string[]>([
    "Увеличение конверсии целевых действий на 30%",
    "Оптимизация скорости загрузки до 90+ в PageSpeed",
  ]);
  const [metrics, setMetrics] = useState<
    { label: string; value: string; trend?: string; detail?: string }[]
  >([
    { label: "Скорость загрузки", value: "0.8s", trend: "PageSpeed 95+" },
    { label: "Рост обращений", value: "+35%", trend: "За 1-й месяц" },
  ]);
  const [techStackInput, setTechStackInput] = useState(
    "1C-Bitrix, PHP, JavaScript, Tailwind CSS, REST API"
  );
  const [galleryImagesInput, setGalleryImagesInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 1. Initial Auth Check
  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        setSession(currentSession);
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setAuthLoading(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch Leads
  const fetchLeads = useCallback(async () => {
    if (!session) return;
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch leads error:", error);
        toast.error("Ошибка загрузки заявок: " + error.message);
      } else {
        setLeads(data || []);
      }
    } catch (err: any) {
      console.error("Fetch leads exception:", err);
    } finally {
      setLeadsLoading(false);
    }
  }, [session]);

  // Fetch Projects
  const fetchProjects = useCallback(async () => {
    if (!session) return;
    setProjectsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Fetch projects error:", error);
      } else {
        setProjects(data || []);
        if (data && data.length > 0) {
          const maxOrder = Math.max(...data.map((p) => p.order_index || 0));
          setProjectOrderIndex(maxOrder + 1);
        }
      }
    } catch (err: any) {
      console.error("Fetch projects exception:", err);
    } finally {
      setProjectsLoading(false);
    }
  }, [session]);

  // Load data when session is active
  useEffect(() => {
    if (session) {
      fetchLeads();
      fetchProjects();
    }
  }, [session, fetchLeads, fetchProjects]);

  // Handle auto-slug generator
  const handleTitleChange = (val: string) => {
    setProjectTitle(val);
    if (!isSlugManual) {
      setProjectSlug(slugify(val));
    }
  };

  // Auth Handler: Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passwordInput,
      });

      if (error) {
        setLoginError(
          error.message === "Invalid login credentials"
            ? "Неверный email или пароль"
            : error.message
        );
        toast.error("Ошибка авторизации: " + error.message);
      } else if (data.session) {
        setSession(data.session);
        toast.success("Добро пожаловать в панель управления!");
      }
    } catch (err: any) {
      setLoginError(err.message || "Ошибка подключения");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Auth Handler: Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toast.success("Сессия завершена");
  };

  // Lead Status Update
  const updateLeadStatus = async (
    id: string,
    newStatus: "new" | "in_progress" | "completed" | "archived"
  ) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        toast.error("Не удалось обновить статус: " + error.message);
        return;
      }

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
      toast.success("Статус заявки обновлен");
    } catch (err: any) {
      toast.error("Ошибка: " + err.message);
    }
  };

  // Lead Delete
  const deleteLead = async (id: string, clientName: string) => {
    if (!confirm(`Удалить заявку от ${clientName}?`)) return;

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) {
        toast.error("Ошибка удаления: " + error.message);
        return;
      }
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Заявка удалена");
    } catch (err: any) {
      toast.error("Ошибка: " + err.message);
    }
  };

  // Project Delete
  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Вы действительно хотите удалить проект «${title}»?`)) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        toast.error("Ошибка удаления проекта: " + error.message);
        return;
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Проект успешно удален");
    } catch (err: any) {
      toast.error("Ошибка: " + err.message);
    }
  };

  // Handle local image upload via /api/upload
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error("Ошибка загрузки: " + (data.error || "Сбой"));
      } else {
        setProjectImageUrl(data.url);
        toast.success("Скриншот успешно загружен в проект!");
      }
    } catch (err: any) {
      toast.error("Сетевая ошибка загрузки файла");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle Add Project Form Submit
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectTitle.trim()) {
      toast.error("Укажите название проекта");
      return;
    }

    const finalSlug = projectSlug.trim() || slugify(projectTitle);
    if (!finalSlug) {
      toast.error("Укажите URL slug проекта");
      return;
    }

    const finalCategory =
      projectCategory === "custom"
        ? customCategory.trim() || "Проект"
        : projectCategory;

    // Parse tech stack into categories
    const techItems = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const techStackArray = [
      {
        category: "Основной стек",
        items: techItems.length > 0 ? techItems : ["Web Technologies"],
      },
    ];

    // Parse gallery images
    const galleryItems = galleryImagesInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (projectImageUrl.trim() && !galleryItems.includes(projectImageUrl.trim())) {
      galleryItems.unshift(projectImageUrl.trim());
    }

    // Filter valid metrics
    const validMetrics = metrics.filter((m) => m.label.trim() && m.value.trim());

    // Generate unique ID
    const nextId = String(Date.now().toString(36));

    const projectPayload = {
      id: nextId,
      slug: finalSlug,
      title: projectTitle.trim(),
      tagline:
        projectTagline.trim() ||
        `Разработка и интеграция решения «${projectTitle.trim()}»`,
      category: finalCategory,
      client: projectClient.trim() || "Заказчик проекта",
      year: projectYear.trim() || new Date().getFullYear().toString(),
      duration: projectDuration.trim() || "3 недели",
      role: projectRole.trim() || "Full-Stack разработчик",
      team: projectTeam.trim() || "Solo (ri4y)",
      featured: projectFeatured,
      accent: projectAccent || "#10b981",
      mockup_type: projectMockupType || "browser",
      image_url: projectImageUrl.trim() || null,
      live_url: projectLiveUrl.trim() || null,
      repo_url: projectRepoUrl.trim() || null,
      order_index: Number(projectOrderIndex) || 0,
      metrics: validMetrics,
      overview:
        projectOverview.trim() ||
        `Комплексная разработка и внедрение проекта «${projectTitle.trim()}». Реализация надежной архитектуры, интерфейса и интеграций.`,
      challenge:
        projectChallenge.trim() ||
        "Разработка современного адаптивного веб-решения с высокой скоростью загрузки и понятным UX для пользователей.",
      architecture: {
        summary: `Архитектура проекта «${projectTitle.trim()}»`,
        highlights: [
          "Оптимизированная серверная и клиентская структура",
          "Интеграция с внешними сервисами и API",
        ],
        diagramNodes: [
          { name: "Frontend", type: "UI", desc: "Клиентский интерфейс" },
          { name: "Backend / CMS", type: "Core", desc: "Серверная логика" },
        ],
      },
      implementation: implementationItems.filter((i) => i.trim()),
      results: resultItems.filter((r) => r.trim()),
      tech_stack: techStackArray,
      gallery_images: galleryItems,
    };

    setIsSubmittingProject(true);

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert(projectPayload)
        .select();

      if (error) {
        console.error("Insert project error:", error);
        toast.error("Ошибка сохранения в базу данных: " + error.message);
      } else {
        toast.success(`Проект «${projectTitle}» успешно опубликован!`);
        // Refresh project list
        await fetchProjects();
        // Reset form partially
        setProjectTitle("");
        setProjectSlug("");
        setIsSlugManual(false);
        setProjectTagline("");
        setProjectClient("");
        setProjectLiveUrl("");
        setProjectRepoUrl("");
        setProjectOverview("");
        setProjectChallenge("");
        setProjectImageUrl("");
        setActiveTab("projects");
      }
    } catch (err: any) {
      toast.error("Ошибка запроса: " + err.message);
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      leadFilterStatus === "all" ? true : lead.status === leadFilterStatus;

    const term = leadSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      lead.name.toLowerCase().includes(term) ||
      lead.contact.toLowerCase().includes(term) ||
      (lead.company && lead.company.toLowerCase().includes(term)) ||
      (lead.message && lead.message.toLowerCase().includes(term)) ||
      (lead.services &&
        lead.services.some((s) => s.toLowerCase().includes(term)));

    return matchesStatus && matchesSearch;
  });

  const countNew = leads.filter((l) => l.status === "new").length;
  const countInProgress = leads.filter((l) => l.status === "in_progress").length;
  const countCompleted = leads.filter((l) => l.status === "completed").length;

  // Format Date for Leads
  const formatLeadDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  // Loading Screen while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400 font-mono">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm tracking-wider">ПРОВЕРКА АВТОРИЗАЦИИ SUPABASE...</p>
      </div>
    );
  }

  // 2. Unauthenticated: Render Login Form
  if (!session) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ri4y.dev ::ADMIN_CONSOLE::</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Вход в панель управления
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Авторизация через Supabase Auth
            </p>
          </div>

          {/* Login Card */}
          <div className="p-7 rounded-2xl bg-[#111115] border border-white/[0.08] shadow-2xl backdrop-blur-xl">
            {loginError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Email администратора
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@ri4y.dev"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Пароль
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Проверка доступа...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Войти в систему</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono inline-flex items-center gap-1"
            >
              ← Вернуться на главную страницу сайта
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated: Render Admin Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-24">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 bg-[#111115]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Status */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-base tracking-wide">ri4y</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-zinc-400">
                ADMIN
              </span>
            </Link>
          </div>

          {/* User info & quick links */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors"
            >
              <span>Сайт</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{session.user?.email || "admin@ri4y.dev"}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-mono text-rose-400 transition-colors cursor-pointer"
              title="Выйти из админки"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none py-2 border-t border-white/[0.04]">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === "leads"
                ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Заявки с форм</span>
            {countNew > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-black font-bold text-[10px]">
                {countNew}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("add-project")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === "add-project"
                ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Добавить проект</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === "projects"
                ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Все проекты</span>
            <span className="text-[10px] text-zinc-500">({projects.length})</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ========================================================================= */}
        {/* TAB 1: LEADS (ВХОДЯЩИЕ ЗАЯВКИ С ФОРМ) */}
        {/* ========================================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.08]">
                <div className="text-xs font-mono text-zinc-400 uppercase">Всего заявок</div>
                <div className="text-2xl font-bold text-white mt-1 font-mono">
                  {leads.length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111115] border border-emerald-500/20">
                <div className="text-xs font-mono text-emerald-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Новые
                </div>
                <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                  {countNew}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111115] border border-amber-500/20">
                <div className="text-xs font-mono text-amber-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  В работе
                </div>
                <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">
                  {countInProgress}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.08]">
                <div className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  Завершенные
                </div>
                <div className="text-2xl font-bold text-zinc-300 mt-1 font-mono">
                  {countCompleted}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Поиск по имени, контакту, компании..."
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto scrollbar-none">
                {[
                  { id: "all", label: "Все" },
                  { id: "new", label: "Новые" },
                  { id: "in_progress", label: "В работе" },
                  { id: "completed", label: "Завершенные" },
                  { id: "archived", label: "Архив" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setLeadFilterStatus(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      leadFilterStatus === st.id
                        ? "bg-white/[0.12] text-white font-medium border border-white/[0.12]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}

                <button
                  onClick={fetchLeads}
                  disabled={leadsLoading}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
                  title="Обновить список"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${leadsLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Leads List */}
            {leadsLoading ? (
              <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin mb-3 text-emerald-400" />
                <span>Загрузка заявок из базы данных...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-20 text-center rounded-2xl bg-[#111115] border border-white/[0.08] text-zinc-500 font-mono text-xs">
                <Inbox className="w-10 h-10 mx-auto mb-3 text-zinc-600 stroke-[1.2]" />
                <p>Заявок не найдено</p>
                {leadSearch && (
                  <button
                    onClick={() => setLeadSearch("")}
                    className="mt-2 text-emerald-400 hover:underline"
                  >
                    Сбросить поисковый фильтр
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-xl bg-[#111115] border border-white/[0.08] hover:border-white/[0.14] transition-colors relative"
                  >
                    {/* Header line: Date & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          {formatLeadDate(lead.created_at)}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                          {lead.source || "Форма на сайте"}
                        </span>
                        {lead.page && (
                          <span className="text-[11px] font-mono text-zinc-500">
                            {lead.page}
                          </span>
                        )}
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(lead.id, e.target.value as any)
                          }
                          className={`text-xs font-mono rounded-lg px-2.5 py-1 border transition-colors cursor-pointer bg-black/60 focus:outline-none ${
                            lead.status === "new"
                              ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                              : lead.status === "in_progress"
                              ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                              : lead.status === "completed"
                              ? "text-blue-400 border-blue-500/30 bg-blue-500/10"
                              : "text-zinc-400 border-zinc-700 bg-zinc-800/40"
                          }`}
                        >
                          <option value="new" className="bg-[#111115] text-emerald-400">
                            ● Новая
                          </option>
                          <option value="in_progress" className="bg-[#111115] text-amber-400">
                            ● В работе
                          </option>
                          <option value="completed" className="bg-[#111115] text-blue-400">
                            ● Завершена
                          </option>
                          <option value="archived" className="bg-[#111115] text-zinc-400">
                            ● Архив
                          </option>
                        </select>

                        <button
                          onClick={() => deleteLead(lead.id, lead.name)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Удалить заявку"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Client & Contact details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Column 1: Client & Contact */}
                      <div className="space-y-1.5">
                        <div className="text-base font-bold text-white tracking-tight">
                          {lead.name}
                        </div>
                        {lead.company && (
                          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                            <span className="text-zinc-600 font-mono">Компания:</span>
                            <span className="text-zinc-300 font-medium">
                              {lead.company}
                            </span>
                          </div>
                        )}
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {lead.contact}
                          </span>

                          {/* Quick contact buttons */}
                          {lead.contact.startsWith("@") ||
                          lead.contact.includes("t.me") ? (
                            <a
                              href={
                                lead.contact.startsWith("http")
                                  ? lead.contact
                                  : `https://t.me/${lead.contact.replace("@", "")}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-mono transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              <span>Написать в TG</span>
                            </a>
                          ) : lead.contact.includes("@") ? (
                            <a
                              href={`mailto:${lead.contact}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-mono transition-colors"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </a>
                          ) : (
                            <a
                              href={`tel:${lead.contact.replace(/[^\d+]/g, "")}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Позвонить</span>
                            </a>
                          )}

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(lead.contact);
                              toast.info("Контакт скопирован");
                            }}
                            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                            title="Скопировать контакт"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Column 2: Services / Scope */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                          Направление задачи
                        </div>
                        {Array.isArray(lead.services) && lead.services.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {lead.services.map((srv, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-500 italic">
                            Консультация / Не указано
                          </span>
                        )}
                      </div>

                      {/* Column 3: Message / Details */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                          Описание задачи
                        </div>
                        {lead.message ? (
                          <div className="text-xs text-zinc-300 bg-black/40 p-3 rounded-lg border border-white/[0.04] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto font-sans">
                            {lead.message}
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-600 italic">
                            Без сопроводительного текста
                          </span>
                        )}
                      </div>
                    </div>

                    {/* IP & Device telemetry footer */}
                    {(lead.device || lead.ip) && (
                      <div className="mt-4 pt-2.5 border-t border-white/[0.04] flex items-center gap-3 text-[11px] font-mono text-zinc-500">
                        {lead.device && <span>Устройство: {lead.device}</span>}
                        {lead.ip && <span>IP: {lead.ip}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ADD PROJECT (ДОБАВИТЬ НОВЫЙ ПРОЕКТ) */}
        {/* ========================================================================= */}
        {activeTab === "add-project" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-2">
                <Plus className="w-3.5 h-3.5" />
                <span>Конструктор кейса</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Добавить новый проект в портфолио
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Проект сразу запишется в базу данных Supabase и появится на сайте и в каталоге кейсов.
              </p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-8">
              {/* Section 1: Основная информация */}
              <div className="p-6 rounded-2xl bg-[#111115] border border-white/[0.08] space-y-5">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                    1. Основная информация
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Название проекта <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Например: Завод Агромаш — официальный сайт и каталог спецтехники"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-zinc-400 uppercase">
                        URL Slug (адрес кейса) <span className="text-rose-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSlugManual(false);
                          setProjectSlug(slugify(projectTitle));
                        }}
                        className="text-[11px] font-mono text-emerald-400 hover:underline"
                      >
                        Автогенерация
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600 font-mono">
                        /cases/
                      </span>
                      <input
                        type="text"
                        required
                        value={projectSlug}
                        onChange={(e) => {
                          setIsSlugManual(true);
                          setProjectSlug(e.target.value);
                        }}
                        placeholder="traktor-agromash"
                        className="w-full pl-18 pr-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Краткий слоган / Подзаголовок
                    </label>
                    <input
                      type="text"
                      value={projectTagline}
                      onChange={(e) => setProjectTagline(e.target.value)}
                      placeholder="Оптово-розничный каталог, фильтрация и интеграции"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Категория проекта
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_PRESETS.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setProjectCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            projectCategory === cat
                              ? "bg-emerald-500 text-black font-semibold shadow-sm"
                              : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.08]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setProjectCategory("custom")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          projectCategory === "custom"
                            ? "bg-emerald-500 text-black font-semibold shadow-sm"
                            : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/[0.08]"
                        }`}
                      >
                        + Другая
                      </button>
                    </div>

                    {projectCategory === "custom" && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Введите свое название категории..."
                        className="mt-3 w-full px-4 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    )}
                  </div>

                  {/* Live URL */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Ссылка на живой сайт (Live URL)
                    </label>
                    <input
                      type="url"
                      value={projectLiveUrl}
                      onChange={(e) => setProjectLiveUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    />
                  </div>

                  {/* Repo URL */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Ссылка на репозиторий (опционально)
                    </label>
                    <input
                      type="url"
                      value={projectRepoUrl}
                      onChange={(e) => setProjectRepoUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Визуал, Обложка и Акценты */}
              <div className="p-6 rounded-2xl bg-[#111115] border border-white/[0.08] space-y-5">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                    2. Визуальное оформление и обложка
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Image URL & Upload */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="block text-xs font-mono text-zinc-400 uppercase">
                      Главное изображение / Скриншот обложки
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={projectImageUrl}
                        onChange={(e) => setProjectImageUrl(e.target.value)}
                        placeholder="/projects/traktor-agromash-1.webp или https://..."
                        className="flex-1 px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                      />

                      {/* Direct File Upload button */}
                      <label className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-white transition-colors cursor-pointer flex items-center justify-center gap-2">
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isUploadingImage ? "Загрузка..." : "Загрузить с ПК"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileUpload}
                          disabled={isUploadingImage}
                        />
                      </label>
                    </div>

                    {/* Quick selection chips from existing images */}
                    <div>
                      <div className="text-[11px] font-mono text-zinc-500 mb-1.5">
                        Либо выберите существующий скриншот в 1 клик:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {EXISTING_IMAGES.map((img) => (
                          <button
                            key={img.path}
                            type="button"
                            onClick={() => setProjectImageUrl(img.path)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                              projectImageUrl === img.path
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview thumbnail if image selected */}
                    {projectImageUrl && (
                      <div className="mt-3 p-2 rounded-xl bg-black/50 border border-white/[0.08] inline-block">
                        <div className="text-[10px] font-mono text-zinc-500 mb-1">Предпросмотр обложки:</div>
                        <img
                          src={projectImageUrl}
                          alt="Preview"
                          className="h-28 w-auto object-cover rounded-lg border border-white/[0.06]"
                          onError={(e) => {
                            (e.target as any).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Акцентный цвет
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      {ACCENT_PRESETS.map((acc) => (
                        <button
                          key={acc.hex}
                          type="button"
                          onClick={() => setProjectAccent(acc.hex)}
                          className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
                          style={{
                            backgroundColor: acc.hex,
                            borderColor:
                              projectAccent === acc.hex
                                ? "#ffffff"
                                : "transparent",
                          }}
                          title={acc.label}
                        >
                          {projectAccent === acc.hex && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={projectAccent}
                      onChange={(e) => setProjectAccent(e.target.value)}
                      placeholder="#10b981"
                      className="w-full px-3 py-1.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white font-mono"
                    />
                  </div>

                  {/* Mockup Type */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Тип макета (Mockup Type)
                    </label>
                    <select
                      value={projectMockupType}
                      onChange={(e) => setProjectMockupType(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-mono cursor-pointer"
                    >
                      {MOCKUP_PRESETS.map((m) => (
                        <option key={m.id} value={m.id} className="bg-[#111115]">
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Index & Featured */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/[0.04]">
                    <div>
                      <div className="text-xs font-mono text-white font-semibold">
                        В избранные проекты
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Отображать в топ-кейсах на главной странице
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={projectFeatured}
                      onChange={(e) => setProjectFeatured(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/[0.04]">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Порядковый номер сортировки (Order Index)
                    </label>
                    <input
                      type="number"
                      value={projectOrderIndex}
                      onChange={(e) => setProjectOrderIndex(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Мета-информация */}
              <div className="p-6 rounded-2xl bg-[#111115] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                    3. Мета-информация проекта
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Клиент / Заказчик
                    </label>
                    <input
                      type="text"
                      value={projectClient}
                      onChange={(e) => setProjectClient(e.target.value)}
                      placeholder="ООО Агромаш"
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Год реализации
                    </label>
                    <input
                      type="text"
                      value={projectYear}
                      onChange={(e) => setProjectYear(e.target.value)}
                      placeholder="2025"
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Срок выполнения
                    </label>
                    <input
                      type="text"
                      value={projectDuration}
                      onChange={(e) => setProjectDuration(e.target.value)}
                      placeholder="3 недели"
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Роль
                    </label>
                    <input
                      type="text"
                      value={projectRole}
                      onChange={(e) => setProjectRole(e.target.value)}
                      placeholder="Full-Stack разработчик"
                      className="w-full px-3 py-2 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Описание кейса */}
              <div className="p-6 rounded-2xl bg-[#111115] border border-white/[0.08] space-y-5">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                    4. Содержание кейса (Overview & Challenge)
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Overview */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Обзор проекта (Overview)
                    </label>
                    <textarea
                      rows={4}
                      value={projectOverview}
                      onChange={(e) => setProjectOverview(e.target.value)}
                      placeholder="Подробный рассказ о проекте, назначении, аудитории и результате..."
                      className="w-full p-3 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Challenge */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Бизнес-задача / Проблема (Challenge)
                    </label>
                    <textarea
                      rows={3}
                      value={projectChallenge}
                      onChange={(e) => setProjectChallenge(e.target.value)}
                      placeholder="С какими сложностями столкнулся заказчик и какие требования предъявлялись к разработке..."
                      className="w-full p-3 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Implementation points */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase">
                        Что было реализовано (Implementation points)
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setImplementationItems([...implementationItems, ""])
                        }
                        className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        Добавить пункт
                      </button>
                    </div>

                    <div className="space-y-2">
                      {implementationItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updated = [...implementationItems];
                              updated[idx] = e.target.value;
                              setImplementationItems(updated);
                            }}
                            placeholder={`Пункт реализации #${idx + 1}`}
                            className="flex-1 px-3 py-1.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setImplementationItems(
                                implementationItems.filter((_, i) => i !== idx)
                              )
                            }
                            className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results points */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase">
                        Достигнутые результаты (Results points)
                      </label>
                      <button
                        type="button"
                        onClick={() => setResultItems([...resultItems, ""])}
                        className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        Добавить пункт
                      </button>
                    </div>

                    <div className="space-y-2">
                      {resultItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updated = [...resultItems];
                              updated[idx] = e.target.value;
                              setResultItems(updated);
                            }}
                            placeholder={`Результат #${idx + 1}`}
                            className="flex-1 px-3 py-1.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setResultItems(resultItems.filter((_, i) => i !== idx))
                            }
                            className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Метрики и Стек */}
              <div className="p-6 rounded-2xl bg-[#111115] border border-white/[0.08] space-y-5">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                    5. Ключевые метрики и Стек технологий
                  </h3>
                </div>

                {/* Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase">
                      Ключевые показатели (Метрики)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setMetrics([
                          ...metrics,
                          { label: "", value: "", trend: "" },
                        ])
                      }
                      className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Добавить метрику
                    </button>
                  </div>

                  <div className="space-y-2">
                    {metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-black/30 p-2.5 rounded-lg border border-white/[0.04]"
                      >
                        <input
                          type="text"
                          value={m.label}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].label = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="Название (Конверсия)"
                          className="px-3 py-1 bg-black/40 border border-white/[0.08] rounded text-xs text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={m.value}
                          onChange={(e) => {
                            const updated = [...metrics];
                            updated[idx].value = e.target.value;
                            setMetrics(updated);
                          }}
                          placeholder="Значение (+40%)"
                          className="px-3 py-1 bg-black/40 border border-white/[0.08] rounded text-xs text-white font-mono focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={m.trend || ""}
                            onChange={(e) => {
                              const updated = [...metrics];
                              updated[idx].trend = e.target.value;
                              setMetrics(updated);
                            }}
                            placeholder="Подпись (За 2 месяца)"
                            className="flex-1 px-3 py-1 bg-black/40 border border-white/[0.08] rounded text-xs text-white focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setMetrics(metrics.filter((_, i) => i !== idx))
                            }
                            className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Стек технологий (через запятую)
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="1C-Bitrix, PHP, JavaScript, REST API, Tailwind CSS"
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                  />
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Дополнительные скриншоты галереи (по одному URL на строку)
                  </label>
                  <textarea
                    rows={2}
                    value={galleryImagesInput}
                    onChange={(e) => setGalleryImagesInput(e.target.value)}
                    placeholder="/projects/traktor-agromash-2.webp&#10;/projects/traktor-agromash-3.webp"
                    className="w-full p-3 bg-black/40 border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingProject}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-xl shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingProject ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Публикация проекта в БД...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Опубликовать проект в портфолио</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PROJECTS LIST (ВСЕ ПРОЕКТЫ ИЗ БД) */}
        {/* ========================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Все проекты в базе данных
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Всего проектов в Supabase: {projects.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchProjects}
                  disabled={projectsLoading}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${projectsLoading ? "animate-spin" : ""}`}
                  />
                  <span>Обновить</span>
                </button>

                <button
                  onClick={() => setActiveTab("add-project")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить проект</span>
                </button>
              </div>
            </div>

            {/* Grid of Projects */}
            {projectsLoading ? (
              <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin mb-3 text-emerald-400" />
                <span>Загрузка проектов из Supabase...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="py-20 text-center rounded-2xl bg-[#111115] border border-white/[0.08] text-zinc-500 font-mono text-xs">
                <FolderGit2 className="w-10 h-10 mx-auto mb-3 text-zinc-600 stroke-[1.2]" />
                <p>В базе данных пока нет проектов</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl bg-[#111115] border border-white/[0.08] hover:border-white/[0.16] transition-all overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail banner */}
                    <div className="relative h-36 bg-black/60 border-b border-white/[0.06] overflow-hidden">
                      {proj.image_url ? (
                        <img
                          src={proj.image_url}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top opacity-80 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as any).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono">
                          Без скриншота
                        </div>
                      )}

                      {/* Badges overlay */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-zinc-300 border border-white/[0.1] backdrop-blur">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur font-bold">
                            ★ В избранном
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-zinc-400 border border-white/[0.1]">
                          #{proj.order_index}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight line-clamp-2">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {proj.tagline || proj.overview}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/cases/${proj.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
                          >
                            <span>Кейс</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>

                          {proj.live_url && (
                            <a
                              href={proj.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-blue-400 transition-colors"
                            >
                              <span>Сайт</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => deleteProject(proj.id, proj.title)}
                          className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Удалить проект из БД"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
