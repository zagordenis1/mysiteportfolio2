"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";
import { useI18n } from "@/i18n/i18n-context";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 container-px pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-line/70 bg-panel/75 px-4 py-3 shadow-glass backdrop-blur-2xl">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-sm font-black text-white shadow-glow transition group-hover:scale-105">
            DZ
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-sm font-bold">Denys Zahorovskyi</span>
            <span className="block text-xs text-muted">Software Engineering</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <LanguageSwitcher label={t.actions.language} />
          <ThemeToggle label={t.actions.theme} />
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-ink lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.5rem] border border-line/70 bg-panel/90 shadow-glass backdrop-blur-2xl transition-all lg:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <div className="grid gap-2 p-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10"
            >
              {t.nav[item.key]}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2 sm:hidden">
            <LanguageSwitcher label={t.actions.language} />
            <ThemeToggle label={t.actions.theme} />
          </div>
        </div>
      </div>
    </header>
  );
}
