"use client";

import { Code2, Cpu, Wrench } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { Reveal } from "@/components/reveal";

const icons = [Code2, Cpu, Wrench];

export function SkillsSection() {
  const { t } = useI18n();

  return (
    <section id="skills" className="container-px mx-auto max-w-7xl py-20">
      <Reveal className="text-center">
        <span className="section-kicker">{t.skills.kicker}</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-black tracking-[-0.045em] sm:text-5xl">
          {t.skills.title}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {t.skills.groups.map((group, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={group.title} delay={index * 0.08}>
              <div className="glass group h-full rounded-[2.2rem] p-6 transition hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-canvas transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{group.title}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line/70 bg-canvas/60 px-3 py-2 text-sm font-semibold text-muted transition hover:border-brand-400 hover:text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
