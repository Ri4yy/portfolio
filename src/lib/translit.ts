/**
 * Преобразование русской строки в транслит URL slug
 */
export function slugify(text: string): string {
  const ruMap: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
    ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
    н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
    ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  return text
    .toLowerCase()
    .trim()
    .split("")
    .map((char) => (ruMap[char] !== undefined ? ruMap[char] : char))
    .join("")
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric chars
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens
}
