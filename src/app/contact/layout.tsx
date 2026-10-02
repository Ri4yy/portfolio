import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и бриф на разработку — Обсудить проект с ri4y (Антон)",
  description:
    "Прямая связь с веб-разработчиком Антоном (ri4y) в Telegram и форма для отправки технического задания. Быстрая оценка сроков и фиксированной стоимости разработки сайта или модуля.",
  keywords: [
    "контакты веб разработчика",
    "заказать сайт на битрикс",
    "заказать разработку плагина wordpress",
    "оценка стоимости разработки сайта",
    "бриф на создание интернет магазина",
    "ri4y контакты telegram",
  ],
  openGraph: {
    title: "Контакты и бриф на разработку | ri4y.dev",
    description:
      "Обсудите создание сайта, разработку модуля или ускорение текущего проекта напрямую с разработчиком.",
    url: "https://ri4y.dev/contact",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
