import { supabase } from "@/lib/supabase";

export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
  trend?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Интернет-магазины" | "Корпоративные сайты" | "Модули и плагины" | "Чат-боты и сервисы" | string;
  client: string;
  year: string;
  duration: string;
  role: string;
  team: string;
  featured: boolean;
  accent: string;
  mockupType: "fintech" | "ai-kernel" | "luxury-3d" | "telemetry" | "design-system" | string;
  imageUrl?: string;
  galleryImages?: string[];
  liveUrl?: string;
  repoUrl?: string;
  orderIndex?: number;
  metrics: ProjectMetric[];
  overview: string;
  challenge: string;
  architecture: {
    summary: string;
    highlights: string[];
    diagramNodes: { name: string; type: string; desc: string }[];
  };
  implementation: string[];
  results: string[];
  techStack: { category: string; items: string[] }[];
}

/**
 * Все проекты загружаются динамически из базы данных Supabase.
 * Статический массив в коде больше не используется.
 */
export const PROJECTS: ProjectItem[] = [];

export const CLIENT_TESTIMONIALS = [
  {
    id: "1",
    author: "Сергей Васильев",
    role: "Руководитель интернет-магазина",
    avatar: "СВ",
    text: "ri4y разработал полностью кастомный шаблон на Битриксе и одношаговый чекаут. Заказы больше не теряются, оформление стало в разы быстрее, а покупатели отмечают удобство корзины.",
    project: "Интернет-магазин «Яркая Птица»",
    impact: "+41% заказов через корзину",
  },
  {
    id: "2",
    author: "Михаил Григорьев",
    role: "Руководитель дилерского направления",
    avatar: "МГ",
    text: "Нужен был строгий и быстрый каталог спецтехники с подробными техническими спецификациями машин. ri4y сдал работу точно в срок. Заказчикам очень удобно сравнивать модели и запрашивать коммерческие предложения.",
    project: "Каталог спецтехники «Завод Агромаш»",
    impact: "PageSpeed 95/100 и рост заявок +52%",
  },
  {
    id: "3",
    author: "Анна Кравцова",
    role: "Директор по развитию ВЭД",
    avatar: "АК",
    text: "Перевели сайт на чистую тему WordPress с ACF. Теперь международный каталог открывается моментально, а мы сами спокойно добавляем новые позиции сырья и спецификаций без программистов.",
    project: "B2B каталог «IVEKTA»",
    impact: "PageSpeed 99/100 и прямой экспорт",
  },
];

export const WORK_EXPERIENCE = [
  {
    period: "2020 — ПО СЕЙ ДЕНЬ",
    duration: "Более 4 лет",
    role: "Веб-разработчик",
    company: "Фриланс и проектная разработка сайтов",
    location: "Удаленно / Москва (UTC+3)",
    description:
      "Создание сайтов под ключ, разработка кастомных плагинов и модулей для CMS, доработка существующего функционала и техническая поддержка. Разработка интернет-магазинов, корпоративных сайтов, интеграции с CRM и эквайрингом, создание Telegram-ботов и ускорение сайтов.",
    achievements: [
      "Успешно реализовано и запущено более 50 сайтов и модулей различной сложности",
      "Специализация на популярных CMS: 1С-Битрикс, WordPress, MODX",
      "Вывод сайтов в зеленую зону Google PageSpeed (90+ баллов) и оптимизация под поисковики",
      "Настройка интеграций с 1С, AmoCRM, Битрикс24, ЮKassa, СДЭК и службами доставки",
    ],
    tech: ["1С-Битрикс", "WordPress", "MODX", "PHP", "JavaScript", "HTML5 / CSS3", "Tailwind CSS", "MySQL", "Telegram Bot API", "React / Next.js"],
  },
  {
    period: "ОСНОВНЫЕ НАПРАВЛЕНИЯ",
    duration: "Специализация",
    role: "Сайты под ключ и доработка",
    company: "Коммерческие проекты",
    location: "Все регионы",
    description:
      "Полный цикл веб-разработки: от аккуратной адаптивной верстки по макетам Figma до посадки на CMS, написания кастомных скриптов, интеграции сторонних сервисов и переноса на рабочий хостинг клиента с гарантией.",
    achievements: [
      "Разработка сайтов-каталогов и e-commerce с фильтрацией и корзиной",
      "Разработка кастомных плагинов и модулей, когда готовые решения не подходят",
      "Исправление чужих ошибок в коде, чистка от вирусов и рефакторинг",
      "Создание Telegram чат-ботов для автоматизации приема заявок",
    ],
    tech: ["ACF Pro", "pdoTools / Fenom", "D7 Битрикс", "REST API", "Git", "Nginx", "Figma to Code"],
  },
];

export const CORE_PRINCIPLES = [
  {
    number: "01",
    code: "CLEAN_CODE",
    title: "ПОНЯТНЫЙ КОД БЕЗ КОСТЫЛЕЙ",
    description: "Пишу аккуратный код, который легко поддерживать и развивать любому другому специалисту в будущем.",
  },
  {
    number: "02",
    code: "ON_TIME",
    title: "ТОЧНО В СРОК И БЮДЖЕТ",
    description: "Фиксирую стоимость и дедлайны до старта работ. Показываю промежуточный прогресс на тестовом сервере.",
  },
  {
    number: "03",
    code: "SPEED_SEO",
    title: "СКОРОСТЬ И ПРАВИЛЬНАЯ РАЗМЕТКА",
    description: "Быстрая загрузка страниц, оптимизация ассетов и чистая семантика для успешного продвижения в поисковиках.",
  },
  {
    number: "04",
    code: "ALL_DEVICES",
    title: "АДАПТИВНОСТЬ ПОД ВСЕ ЭКРАНЫ",
    description: "Идеальное отображение и удобное использование на смартфонах, планшетах, ноутбуках и мониторах.",
  },
];

export function mapSupabaseProject(row: any): ProjectItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    category: row.category,
    client: row.client,
    year: row.year,
    duration: row.duration,
    role: row.role,
    team: row.team,
    featured: Boolean(row.featured),
    accent: row.accent || "#10b981",
    mockupType: row.mockup_type || "fintech",
    imageUrl: row.image_url || undefined,
    galleryImages: Array.isArray(row.gallery_images) && row.gallery_images.length > 0
      ? row.gallery_images
      : (row.image_url ? [row.image_url] : []),
    liveUrl: row.live_url || undefined,
    repoUrl: row.repo_url || undefined,
    orderIndex: row.order_index ?? 0,
    metrics: Array.isArray(row.metrics) ? row.metrics : [],
    overview: row.overview || "",
    challenge: row.challenge || "",
    architecture: row.architecture || { summary: "", highlights: [], diagramNodes: [] },
    implementation: Array.isArray(row.implementation) ? row.implementation : [],
    results: Array.isArray(row.results) ? row.results : [],
    techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
  };
}

/**
 * Получить все проекты напрямую из Supabase
 */
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase fetch projects error:", error.message);
      return [];
    }

    if (data && data.length > 0) {
      return data.map(mapSupabaseProject);
    }
  } catch (err) {
    console.error("Supabase query exception:", err);
  }

  return [];
}

/**
 * Получить избранные проекты для главной страницы напрямую из Supabase
 */
export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("order_index", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map(mapSupabaseProject);
    }
  } catch (err) {
    console.error("Supabase query exception for featured:", err);
  }

  const all = await getProjects();
  return all.slice(0, 4);
}

/**
 * Получить детальную информацию о проекте по slug напрямую из Supabase
 */
export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Supabase fetch project by slug error:", error.message);
      return null;
    }

    if (data) {
      return mapSupabaseProject(data);
    }
  } catch (err) {
    console.error("Supabase query exception for project slug:", err);
  }

  return null;
}

/**
 * Получить отзывы клиентов из Supabase
 */
export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.error("Supabase query exception for testimonials:", err);
  }

  return CLIENT_TESTIMONIALS;
}
