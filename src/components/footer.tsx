"use client";

import { useI18n } from "@/i18n/i18n-context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="container-px mx-auto max-w-7xl pb-10">
      <div className="flex flex-col justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
        <p>{t.footer.made}</p>
        <p>© {new Date().getFullYear()} Denys Zahorovskyi. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
