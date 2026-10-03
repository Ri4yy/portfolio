import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы и выполненные проекты — Интернет-магазины, порталы и модули",
  description:
    "Портфолио коммерческих проектов веб-разработчика ri4y: интернет-магазины на 1С-Битрикс, корпоративные порталы на MODX Revolution и WordPress, интеграции API и кастомные плагины.",
  keywords: [
    "кейсы веб разработки",
    "примеры интернет магазинов битрикс",
    "портфолио сайтов wordpress",
    "кейсы modx revolution",
    "разработка кастомных модулей примеры",
    "интеграция amocrm кейс",
    "ri4y проекты",
  ],
  openGraph: {
    title: "Кейсы и выполненные проекты | ri4y.dev",
    description:
      "Коммерческие проекты под ключ: e-commerce на 1С-Битрикс, порталы на MODX и WordPress, интеграции сервисов и плагины.",
    url: "https://ri4y.dev/projects",
    type: "website",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
