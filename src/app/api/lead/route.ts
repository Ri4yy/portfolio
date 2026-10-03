import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Escape HTML characters to prevent Telegram parse errors & injection
function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Generate clickable link if contact is TG or Email
function formatContactLink(contact: string): string {
  const clean = contact.trim();
  if (clean.startsWith("@")) {
    const handle = clean.replace("@", "");
    return `<a href="https://t.me/${handle}">${escapeHtml(clean)}</a>`;
  }
  if (clean.startsWith("https://t.me/") || clean.startsWith("t.me/")) {
    const url = clean.startsWith("http") ? clean : `https://${clean}`;
    return `<a href="${url}">${escapeHtml(clean)}</a>`;
  }
  if (clean.includes("@") && clean.includes(".")) {
    return `<a href="mailto:${clean}">${escapeHtml(clean)}</a>`;
  }
  if (/^\+?[0-9\s\-()]{7,18}$/.test(clean)) {
    const phone = clean.replace(/[^\d+]/g, "");
    return `<a href="tel:${phone}">${escapeHtml(clean)}</a>`;
  }
  return `<code>${escapeHtml(clean)}</code>`;
}

// Human-friendly User-Agent summary
function parseUserAgent(ua: string): string {
  if (!ua) return "Неизвестно";
  let os = "Desktop";
  if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/mac os/i.test(ua)) os = "macOS";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "Browser";
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/opera|opr/i.test(ua)) browser = "Opera";

  return `${os} · ${browser}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const contact = String(body.contact || "").trim();
    const message = String(body.message || body.details || "").trim();
    const company = body.company ? String(body.company).trim() : "";
    const source = String(body.source || "Форма на сайте").trim();
    const page = String(body.page || "/").trim();

    // Project types or scope
    let services: string[] = [];
    if (Array.isArray(body.projectTypes) && body.projectTypes.length > 0) {
      services = body.projectTypes.map((s: string) => String(s).trim());
    } else if (body.scope) {
      services = [String(body.scope).trim()];
    }

    // Basic validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Пожалуйста, укажите имя (минимум 2 символа)" },
        { status: 400 }
      );
    }
    if (!contact || contact.length < 3) {
      return NextResponse.json(
        { success: false, error: "Пожалуйста, укажите контакт для связи" },
        { status: 400 }
      );
    }

    // IP & Device
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const deviceSummary = parseUserAgent(userAgent);

    // Moscow Timestamp
    const now = new Date();
    const timeMsk = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);

    // Build formatted HTML message for Telegram
    const servicesBlock =
      services.length > 0
        ? services.map((s) => `  ▪️ <b>${escapeHtml(s)}</b>`).join("\n")
        : "  ▪️ <i>Не указано / консультация</i>";

    const companyLine = company
      ? `🏢 <b>Компания:</b> ${escapeHtml(company)}\n`
      : "";

    const messageContent = message
      ? `\n📝 <b>Описание задачи:</b>\n<blockquote>${escapeHtml(message)}</blockquote>`
      : "";

    const telegramMessage = `
⚡️ <b>НОВАЯ ЗАЯВКА С САЙТА RI4Y.DEV</b>
━━━━━━━━━━━━━━━━━━━━

👤 <b>Клиент:</b> <b>${escapeHtml(name)}</b>
💬 <b>Связь:</b> ${formatContactLink(contact)}
${companyLine}
🛠 <b>Направление задачи:</b>
${servicesBlock}
${messageContent}

━━━━━━━━━━━━━━━━━━━━
📍 <b>Источник:</b> ${escapeHtml(source)}
🔗 <b>Страница:</b> <code>${escapeHtml(page)}</code>
📅 <b>Время:</b> <code>${timeMsk} (МСК)</code>
🌐 <b>Клиент:</b> <code>${escapeHtml(ip)}</code> · ${escapeHtml(deviceSummary)}
`.trim();

    // 1. Save lead to Supabase database concurrently
    let dbSaved = false;
    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name,
        contact,
        company: company || null,
        message: message || null,
        source,
        page,
        services,
        ip,
        device: deviceSummary,
        status: "new",
      });

      if (dbError) {
        console.error("⚠️ [SUPABASE LEADS INSERT ERROR]:", dbError);
      } else {
        dbSaved = true;
        console.log("✅ [SUPABASE LEADS] Заявка успешно сохранена в БД!");
      }
    } catch (dbEx: any) {
      console.error("⚠️ [SUPABASE LEADS EXCEPTION]:", dbEx);
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    const baseUrl =
      process.env.TELEGRAM_API_URL?.trim() || "https://api.telegram.org";

    // If bot token is not configured yet, simulate delivery and log to console
    if (!botToken || !chatId) {
      console.log("\n=======================================================");
      console.log("⚡️ [LEAD DISPATCHER — DEV SIMULATION (TOKEN NOT SET)]");
      console.log("=======================================================");
      console.log(telegramMessage.replace(/<[^>]*>/g, ""));
      console.log("=======================================================\n");

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Заявка успешно получена (тестовый режим без Telegram-токена)",
      });
    }

    // Send to Telegram Bot API with 4s timeout
    const tgUrl = `${baseUrl.replace(/\/$/, "")}/bot${botToken}/sendMessage`;

    try {
      const tgRes = await fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(4500),
      });

      const tgData = await tgRes.json();

      if (!tgRes.ok || !tgData.ok) {
        console.error("[TELEGRAM API ERROR]:", tgData);
        return NextResponse.json(
          {
            success: false,
            error:
              "Ошибка Telegram: " +
              (tgData.description || "Неверный токен или chat_id"),
          },
          { status: 502 }
        );
      }

      console.log("✅ [LEAD DISPATCHER] Заявка успешно отправлена в Telegram!");
      return NextResponse.json({ success: true });
    } catch (networkErr: any) {
      // Handle ISP/TSPU blocks (ECONNRESET, ETIMEDOUT, AbortError)
      console.warn("\n=======================================================");
      console.warn("⚠️  [TELEGRAM NETWORK NOTICE: ISP / VPN REQUIRED]");
      console.warn("=======================================================");
      console.warn("Соединение с api.telegram.org сброшено локальным провайдером (ECONNRESET / Timeout).");
      console.warn("Заявка сохранена локально:");
      console.log(telegramMessage.replace(/<[^>]*>/g, ""));
      console.warn("💡 Подсказка:");
      console.warn("1. При локальной разработке включите VPN на ПК, чтобы бот присылал сообщения в TG.");
      console.warn("2. На боевом хостинге (Vercel, зарубежный сервер и т.д.) отправка работает автоматически без VPN.");
      console.warn("=======================================================\n");

      // In dev mode, return 200 with simulated: true so the UI doesn't crash
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({
          success: true,
          simulated: true,
          warning:
            "Провайдер блокирует прямой доступ к api.telegram.org (ECONNRESET). Заявка сохранена в логи сервера.",
        });
      }

      return NextResponse.json(
        {
          success: false,
          error:
            "Сервис Telegram временно недоступен из текущей сети. Пожалуйста, напишите напрямую в Telegram.",
        },
        { status: 502 }
      );
    }
  } catch (err: any) {
    console.error("[LEAD API EXCEPTION]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
