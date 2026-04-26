"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ label }: { label: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-panel/70 text-muted shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-brand-400/70 hover:text-ink"
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4 transition group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 transition group-hover:-rotate-12" />
      )}
    </button>
  );
}
