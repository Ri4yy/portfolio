import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2, Mail, Send } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Политика конфиденциальности и обработки персональных данных (152-ФЗ) — ri4y.dev",
  description:
    "Политика в отношении обработки персональных данных пользователей сайта ri4y.dev в соответствии с Федеральным законом РФ № 152-ФЗ.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "02 октября 2026 г.";

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors py-1 px-3 rounded-full bg-white/[0.03] border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Вернуться на главную</span>
            </Link>
          </div>

          {/* Header */}
          <FadeIn className="space-y-3 mb-10 pb-8 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ФЕДЕРАЛЬНЫЙ ЗАКОН № 152-ФЗ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Политика конфиденциальности и обработки персональных данных
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Действующая редакция от {lastUpdated} · Сайт: ri4y.dev
            </p>
          </FadeIn>

          {/* Key Summary Card */}
          <FadeIn delay={0.08}>
            <SpotlightCard className="p-6 sm:p-7 mb-10 border-emerald-500/30 bg-emerald-500/[0.02]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <div className="font-bold text-white font-mono text-sm">
                    Кратко о главном:
                  </div>
                  <p>
                    Я уважаю ваше право на частную жизнь. Ваши контакты (Telegram, Email, телефон) используются <b>исключительно</b> для ответа на вашу заявку, оценки проекта и обсуждения технического задания. Я никогда не передаю данные третьим лицам, не занимаюсь спамом и удаляю переписку по первому вашему запросу.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          {/* Document Content Sections */}
          <FadeInStagger className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {/* 1. Общие положения */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[01]</span> Общие положения
                </h2>
                <p>
                  1.1. Настоящая Политика в отношении обработки персональных данных (далее — «Политика») составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые веб-разработчиком Антоном (самозанятый, никнейм: ri4y, далее — «Оператор»).
                </p>
                <p>
                  1.2. Оператор ставит важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                </p>
                <p>
                  1.3. Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта <code>ri4y.dev</code> (включая все поддомены и формы обратной связи).
                </p>
              </section>
            </FadeInItem>

            {/* 2. Категории данных */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[02]</span> Состав собираемых персональных данных
                </h2>
                <p>
                  2.1. Оператор может обрабатывать следующие персональные данные Пользователя, добровольно предоставляемые при заполнении форм обратной связи на сайте:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
                  <li>Фамилия, имя, отчество (или никнейм/псевдоним);</li>
                  <li>Идентификатор мессенджера Telegram (username вида @username или ссылка);</li>
                  <li>Адрес электронной почты (E-mail);</li>
                  <li>Номер контактного телефона (при указании Пользователем);</li>
                  <li>Название компании / организации (необязательное поле);</li>
                  <li>Информация о проекте, задачах разработки и технические требования.</li>
                </ul>
                <p>
                  2.2. Также на сайте происходит сбор и обработка обезличенных технических данных о посетителях (в т.ч. файлов «cookie», IP-адреса, данных о типе устройства, операционной системе и браузере) для корректной работы сайта и защиты от спама.
                </p>
              </section>
            </FadeInItem>

            {/* 3. Цели обработки */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[03]</span> Цели обработки персональных данных
                </h2>
                <p>
                  3.1. Персональные данные Пользователя обрабатываются исключительно в следующих законных целях:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
                  <li>Установление обратной связи по запросу Пользователя (ответ на заявку, бриф или вопрос);</li>
                  <li>Предварительная оценка стоимости, сроков и технической архитектуры проекта;</li>
                  <li>Направление коммерческих предложений и согласование технического задания (ТЗ);</li>
                  <li>Заключение договоров на оказание услуг веб-разработки и сопровождения.</li>
                </ul>
                <p>
                  3.2. Оператор <b>не использует</b> персональные данные для массовых рекламных рассылок, холодных звонков и маркетингового спама.
                </p>
              </section>
            </FadeInItem>

            {/* 4. Правовые основания и согласие */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[04]</span> Правовые основания и порядок согласия
                </h2>
                <p>
                  4.1. Правовым основанием обработки персональных данных является согласие Пользователя на обработку его персональных данных (ст. 9 Федерального закона № 152-ФЗ).
                </p>
                <p>
                  4.2. Пользователь дает согласие на обработку персональных данных <b>свободно, своей волей и в своем интересе</b> путем проставления соответствующей отметки (галочки) в неотмеченном по умолчанию чекбоксе под любой формой заявки на сайте <code>ri4y.dev</code> перед отправкой данных.
                </p>
              </section>
            </FadeInItem>

            {/* 5. Порядок сбора, хранения и передачи */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[05]</span> Порядок сбора, хранения и конфиденциальности
                </h2>
                <p>
                  5.1. Безопасность персональных данных обеспечивается применением правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства.
                </p>
                <p>
                  5.2. Персональные данные Пользователя <b>ни при каких условиях не передаются третьим лицам</b>, за исключением случаев, установленных действующим законодательством РФ.
                </p>
                <p>
                  5.3. Срок обработки и хранения персональных данных определяется достижением целей, для которых они были собраны (как правило, период согласования и выполнения проекта), либо до момента отзыва согласия Пользователем.
                </p>
              </section>
            </FadeInItem>

            {/* 6. Файлы Cookie */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[06]</span> Использование файлов Cookie
                </h2>
                <p>
                  6.1. Сайт <code>ri4y.dev</code> использует файлы cookie для сохранения пользовательских настроек (например, статуса закрытия модальных окон и уведомлений), обеспечения корректного отклика анимаций и защиты от автоматического спама.
                </p>
                <p>
                  6.2. Пользователь может в любой момент отключить или ограничить сохранение файлов cookie в настройках используемого веб-браузера.
                </p>
              </section>
            </FadeInItem>

            {/* 7. Права пользователя и отзыв согласия */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[07]</span> Права субъекта данных и отзыв согласия
                </h2>
                <p>
                  7.1. Пользователь имеет право на получение информации, касающейся обработки его персональных данных, а также право требовать уточнения, блокирования или полного уничтожения своих данных.
                </p>
                <p>
                  7.2. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив уведомление Оператору по электронной почте или в Telegram:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email:</span>
                    <a
                      href="mailto:maksimov.191313@gmail.com"
                      className="text-white hover:text-emerald-400 transition-colors underline"
                    >
                      maksimov.191313@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Telegram:</span>
                    <a
                      href="https://t.me/anton_webdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 transition-colors underline"
                    >
                      @anton_webdev
                    </a>
                  </div>
                </div>
                <p className="text-zinc-400 text-xs">
                  Запрос на отзыв согласия или удаление переписки исполняется Оператором в срок не более 3 (трех) рабочих дней.
                </p>
              </section>
            </FadeInItem>

            {/* 8. Заключительные положения */}
            <FadeInItem>
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-emerald-400">[08]</span> Заключительные положения
                </h2>
                <p>
                  8.1. Оператор имеет право вносить изменения в настоящую Политику в одностороннем порядке. Новая редакция вступает в силу с момента ее размещения на данной странице.
                </p>
                <p>
                  8.2. Информация об услугах, размещенная на сайте <code>ri4y.dev</code>, носит исключительно ознакомительный характер и не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ.
                </p>
              </section>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </main>

      <Footer />
    </div>
  );
}
