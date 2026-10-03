import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Файл не передан" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Неподдерживаемый формат (разрешены PNG, JPG, WEBP, SVG)",
        },
        { status: 400 }
      );
    }

    // Limit file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Файл слишком большой (максимум 10 МБ)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const ext = path.extname(file.name) || ".webp";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);
    const uniqueSuffix = Date.now().toString(36);
    const finalFilename = `${baseName || "project"}-${uniqueSuffix}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "projects");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, finalFilename);
    await writeFile(filePath, buffer);

    const publicUrl = `/projects/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Ошибка загрузки файла" },
      { status: 500 }
    );
  }
}
