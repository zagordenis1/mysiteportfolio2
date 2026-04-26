"use client";

import { localeLabels, locales } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/i18n-context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ label }: { label: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      aria-label={label}
      className="inline-flex rounded-full border border-line/70 bg-panel/70 p-1 shadow-sm backdrop-blur-xl"
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition",
            locale === item
              ? "bg-ink text-canvas shadow-sm"
              : "text-muted hover:text-ink"
          )}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
