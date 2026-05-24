"use client";

import { useMemo, useRef, useState } from "react";
import { Bug, Eraser, Play, RotateCcw, ShieldCheck, TerminalSquare, Wand2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/i18n/i18n-context";
import { cn } from "@/lib/utils";

const demoSnippets = {
  uk: `const projects = [
  { name: 'Sitefishing', status: 'completed', tech: ['Next.js', 'Tailwind'] },
  { name: 'Portfolio Website', status: 'completed', tech: ['React', 'SEO'] },
  { name: 'Win11 CalmMode', status: 'in-progress', tech: ['PowerShell', 'CI'] }
];

const completed = projects.filter((project) => project.status === 'done');

console.log('Completed projects:', completed.length);
console.log(completed.map((project) => project.name).join(' • '));`,
  en: `const projects = [
  { name: 'Sitefishing', status: 'completed', tech: ['Next.js', 'Tailwind'] },
  { name: 'Portfolio Website', status: 'completed', tech: ['React', 'SEO'] },
  { name: 'Win11 CalmMode', status: 'in-progress', tech: ['PowerShell', 'CI'] }
];

const completed = projects.filter((project) => project.status === 'done');

console.log('Completed projects:', completed.length);
console.log(completed.map((project) => project.name).join(' • '));`
} as const;

type RunnerStatus = "ready" | "running" | "success" | "error";

type RunnerResponse = {
  ok: boolean;
  logs: string[];
  error?: string;
};

function runInWorker(source: string): Promise<RunnerResponse> {
  return new Promise((resolve) => {
    const workerSource = `
      const logs = [];
      const format = (value) => {
        if (typeof value === 'string') return value;
        if (typeof value === 'undefined') return 'undefined';
        try { return JSON.stringify(value, null, 2); } catch (_) { return String(value); }
      };
      const safeConsole = {
        log: (...args) => logs.push(args.map(format).join(' ')),
        warn: (...args) => logs.push('⚠ ' + args.map(format).join(' ')),
        error: (...args) => logs.push('✖ ' + args.map(format).join(' '))
      };
      self.onmessage = (event) => {
        try {
          const fn = new Function('console', event.data);
          const result = fn(safeConsole);
          if (typeof result !== 'undefined') logs.push('=> ' + format(result));
          self.postMessage({ ok: true, logs });
        } catch (error) {
          self.postMessage({ ok: false, logs, error: error && error.message ? error.message : String(error) });
        }
      };
    `;

    const blob = new Blob([workerSource], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    const timeout = window.setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, logs: [], error: "Execution timeout: possible infinite loop." });
    }, 1800);

    worker.onmessage = (event: MessageEvent<RunnerResponse>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    };

    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      resolve({ ok: false, logs: [], error: event.message });
    };

    worker.postMessage(source);
  });
}

export function CodeLabSection() {
  const { t, locale } = useI18n();
  const initialCode = demoSnippets[locale];
  const [code, setCode] = useState<string>(initialCode);
  const [status, setStatus] = useState<RunnerStatus>("ready");
  const [output, setOutput] = useState<string[]>([t.codeLab.outputPlaceholder]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stats = useMemo(() => {
    const lines = code.split("\n").length;
    const chars = code.length;
    return { lines, chars };
  }, [code]);

  const runCode = async () => {
    setStatus("running");
    setOutput([t.codeLab.compiling]);
    const result = await runInWorker(code);

    if (result.ok) {
      setStatus("success");
      setOutput(result.logs.length ? result.logs : [t.codeLab.noOutput]);
      return;
    }

    setStatus("error");
    setOutput([...result.logs, `${t.codeLab.errorPrefix} ${result.error ?? t.codeLab.unknownError}`]);
  };

  const resetCode = () => {
    setCode(initialCode);
    setStatus("ready");
    setOutput([t.codeLab.outputPlaceholder]);
  };

  const autoFix = () => {
    setCode((currentCode) =>
      currentCode
        .replace("project.status === 'done'", "project.status === 'completed'")
        .replace('project.status === "done"', 'project.status === "completed"')
    );
    setStatus("ready");
    setOutput([t.codeLab.fixApplied]);
  };

  const deleteCurrentLine = () => {
    const textarea = textareaRef.current;
    const cursorPosition = textarea?.selectionStart ?? code.length;
    const beforeCursor = code.slice(0, cursorPosition);
    const lineStart = beforeCursor.lastIndexOf("\n") + 1;
    const nextLineBreak = code.indexOf("\n", cursorPosition);
    const lineEnd = nextLineBreak === -1 ? code.length : nextLineBreak + 1;
    const nextCode = `${code.slice(0, lineStart)}${code.slice(lineEnd)}`;

    setCode(nextCode);
    setStatus("ready");
    setOutput([t.codeLab.lineDeleted]);
    requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(lineStart, lineStart);
    });
  };

  const statusLabel = t.codeLab.statuses[status];

  return (
    <section id="lab" className="container-px mx-auto max-w-7xl py-20">
      <Reveal>
        <span className="section-kicker">{t.codeLab.kicker}</span>
        <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <h2 className="font-display text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              {t.codeLab.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{t.codeLab.subtitle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {t.codeLab.features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-line/70 bg-panel/70 p-4 shadow-glass backdrop-blur-xl">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{feature.title}</div>
                <div className="mt-2 text-sm leading-6 text-muted">{feature.text}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-line/70 bg-slate-950 text-slate-100 shadow-glow">
          <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                playground.js
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>{stats.lines} {t.codeLab.lines}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{stats.chars} {t.codeLab.chars}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className={cn("rounded-full px-3 py-1 font-semibold", status === "success" && "bg-emerald-400/15 text-emerald-200", status === "error" && "bg-rose-400/15 text-rose-200", status === "running" && "bg-sky-400/15 text-sky-200", status === "ready" && "bg-white/10 text-slate-300")}>{statusLabel}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="absolute left-0 top-0 hidden h-full w-12 select-none border-r border-white/10 bg-white/[0.02] py-4 text-right text-xs leading-6 text-slate-600 sm:block">
                {code.split("\n").map((_, index) => (
                  <div key={index} className="pr-3">{index + 1}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setStatus("ready");
                }}
                spellCheck={false}
                aria-label={t.codeLab.editorLabel}
                className="min-h-[430px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 sm:pl-16"
              />
            </div>

            <div className="flex min-h-[430px] flex-col">
              <div className="grid gap-3 border-b border-white/10 p-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={runCode}
                  disabled={status === "running"}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Play className="h-4 w-4" />
                  {t.codeLab.run}
                </button>
                <button
                  type="button"
                  onClick={autoFix}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <Wand2 className="h-4 w-4" />
                  {t.codeLab.autoFix}
                </button>
                <button
                  type="button"
                  onClick={deleteCurrentLine}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <Eraser className="h-4 w-4" />
                  {t.codeLab.deleteLine}
                </button>
                <button
                  type="button"
                  onClick={resetCode}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t.codeLab.reset}
                </button>
              </div>

              <div className="flex-1 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-200">
                    <TerminalSquare className="h-4 w-4" />
                    {t.codeLab.terminal}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t.codeLab.sandboxed}
                  </div>
                </div>
                <div className="min-h-[260px] rounded-[1.5rem] border border-white/10 bg-black/30 p-4 font-mono text-sm leading-7 text-slate-300">
                  {output.map((line, index) => (
                    <div key={`${line}-${index}`} className="break-words">
                      <span className="mr-2 select-none text-slate-600">$</span>
                      {line}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-400">
                  <div className="mb-2 flex items-center gap-2 font-bold text-slate-200">
                    <Bug className="h-4 w-4" />
                    {t.codeLab.challengeTitle}
                  </div>
                  {t.codeLab.challengeText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
