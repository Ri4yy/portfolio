export interface LeadSubmissionPayload {
  name: string;
  contact: string;
  message?: string;
  details?: string;
  company?: string;
  projectTypes?: string[];
  scope?: string;
  source: string;
  page?: string;
}

export async function sendLeadNotification(
  payload: LeadSubmissionPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  try {
    const pageUrl =
      payload.page ||
      (typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/");

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        page: pageUrl,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Не удалось отправить заявку");
    }

    return { success: true, simulated: data.simulated };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Ошибка соединения с сервером",
    };
  }
}
