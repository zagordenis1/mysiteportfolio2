"use client";

import { GraduationCap, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { Reveal } from "@/components/reveal";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="container-px mx-auto max-w-7xl py-20">
      <Reveal>
        <span className="section-kicker">{t.about.kicker}</span>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <h2 className="font-display text-4xl font-black tracking-[-0.045em] sm:text-5xl">
            {t.about.title}
          </h2>
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>{t.about.body}</p>
            <div className="glass rounded-[2rem] p-6">
              <div className="flex items-center gap-3 text-ink">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold">{t.about.educationTitle}</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-muted">{t.about.education}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {t.about.qualities.map((quality, index) => (
          <Reveal key={quality} delay={index * 0.08}>
            <div className="h-full rounded-[2rem] border border-line/70 bg-panel/65 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-glow">
              <Sparkles className="h-5 w-5 text-brand-500" />
              <p className="mt-4 text-sm font-medium leading-7 text-muted">{quality}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
