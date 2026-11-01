import catalog from "./siteTranslations.json";
import type { Lang } from "./farmerI18n";

const translations: Record<string, string[]> = catalog;

export function translateText(text: string, lang: Lang, values: Record<string, string | number> = {}): string {
  const key = text.replace(/\s+/g, " ").trim();
  const translated = lang === "en" ? text : translations[key]?.[lang === "so" ? 0 : 1] ?? text;
  return translated.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match,
  );
}