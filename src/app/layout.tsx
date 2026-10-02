import type { Metadata } from "next";
import "./globals.css";
import { LeadModalProvider } from "@/context/lead-modal-context";
import { LeadModal } from "@/components/modals/lead-modal";
import { Preloader } from "@/components/layout/preloader";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://ri4y.dev"),
  title: {
    default: "ri4y (Антон) — Разработка сайтов под ключ, плагинов и модулей",
    template: "%s | ri4y.dev",
  },
  description:
    "Портфолио веб-разработчика ri4y (Антон). Разработка сайтов под ключ на 1С-Битрикс, WordPress и MODX Revolution, создание кастомных плагинов, интеграции по REST API, Telegram-боты и ускорение сайтов с 2020 года.",
  keywords: [
    "ri4y",
    "ri4y dev",
    "веб разработчик антон",
    "создание сайтов под ключ",
    "разработка сайтов 1с-битрикс",
    "разработка интернет магазина битрикс",
    "разработка сайтов wordpress",
    "кастомные темы acf pro",
    "разработка на modx revolution",
    "интернет-магазин minishop2",
    "разработка модулей 1с-битрикс",
    "кастомные плагины wordpress",
    "интеграция rest api amocrm битрикс24",
    "подключение эквайринга юкасса сбер",
    "ускорение сайтов google pagespeed",
    "telegram боты для бизнеса",
    "доработка сайтов на cms",
  ],
  authors: [{ name: "Антон (ri4y)", url: "https://ri4y.dev" }],
  creator: "Антон (ri4y)",
  publisher: "ri4y engineering",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ri4y.dev",
    siteName: "ri4y.dev — Портфолио веб-разработчика",
    title: "ri4y (Антон) — Разработка сайтов под ключ, плагинов и модулей",
    description:
      "Создание современных сайтов и модулей для бизнеса: 1С-Битрикс, WordPress, MODX Revolution, REST API интеграции и ускорение до 90+ в Google PageSpeed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ri4y (Антон) — Веб-разработчик сайтов, плагинов и модулей",
    description:
      "Разработка сайтов под ключ на 1С-Битрикс, WordPress и MODX, кастомные плагины, чат-боты и оптимизация скорости.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ri4y.dev/#person",
      name: "Антон (ri4y)",
      alternateName: ["ri4y", "Антон"],
      jobTitle: "Веб-разработчик / Fullstack Engineer",
      description:
        "Веб-разработчик с коммерческой практикой с 2020 года. Специализация: 1С-Битрикс, WordPress, MODX Revolution, кастомные модули, интеграции по API и Telegram-боты.",
      url: "https://ri4y.dev",
      sameAs: [
        "https://t.me/anton_webdev",
      ],
      knowsAbout: [
        "1C-Bitrix",
        "WordPress",
        "MODX Revolution",
        "PHP",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "REST API",
        "Web Performance Optimization",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://ri4y.dev/#service",
      name: "ri4y.dev — Разработка сайтов и модулей",
      url: "https://ri4y.dev",
      founder: { "@id": "https://ri4y.dev/#person" },
      priceRange: "$$",
      currenciesAccepted: "RUB",
      paymentAccepted: "Безналичный расчет, перевод",
      areaServed: "RU",
      serviceArea: "Россия и страны СНГ",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги веб-разработки",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Интернет-магазин под ключ",
              description: "Разработка интернет-магазина на 1С-Битрикс или WordPress с каталогом, корзиной, эквайрингом по 54-ФЗ и доставкой.",
            },
            price: "50000",
            priceCurrency: "RUB",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Корпоративный сайт / Каталог",
              description: "Создание функционального корпоративного сайта для бизнеса на 1С-Битрикс, WordPress или MODX.",
            },
            price: "30000",
            priceCurrency: "RUB",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Кастомный плагин / Модуль / API",
              description: "Разработка нестандартных модулей под CMS, интеграция с AmoCRM, Битрикс24, эквайрингом и службами доставки.",
            },
            price: "15000",
            priceCurrency: "RUB",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ускорение сайта (Google PageSpeed 90+)",
              description: "Комплексная оптимизация скорости загрузки сайта, серверное кеширование, сжатие ассетов.",
            },
            price: "12000",
            priceCurrency: "RUB",
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-white">
        <LeadModalProvider>
          <SmoothScroll>
            {/* Initial System Load Preloader */}
            <Preloader />

            {/* Global Lead Generation Modal */}
            <LeadModal />

            {/* Notification Toaster */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#111115",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#f4f4f5",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono, monospace)",
                },
              }}
            />

            {/* Cookie Notification Banner for RKN Compliance */}
            <CookieBanner />

            {children}
          </SmoothScroll>
        </LeadModalProvider>
      </body>
    </html>
  );
}
