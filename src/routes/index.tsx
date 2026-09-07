import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Repeat,
  Target,
  Timer,
  Wallet,
  NotebookPen,
  Sparkles,
  ArrowRight,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { DashboardMockup } from "@/components/landing/DashboardMockup";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIFEOS — One system for your entire life" },
      {
        name: "description",
        content:
          "LIFEOS brings tasks, habits, goals, focus, money and notes into one calm workspace, with an AI assistant that plans your day.",
      },
      { property: "og:title", content: "LIFEOS — One system for your entire life" },
      {
        property: "og:description",
        content:
          "Tasks, habits, goals, focus, money and notes in one beautifully simple productivity system.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: CheckCircle2,
    title: "Tasks",
    text: "Capture anything in a second and let LIFEOS sort it into the right day, project and priority.",
  },
  {
    icon: Repeat,
    title: "Habits",
    text: "Build streaks that stick with gentle nudges, flexible schedules and honest weekly reviews.",
  },
  {
    icon: Target,
    title: "Goals",
    text: "Break big ambitions into quarterly milestones and watch progress update itself as you work.",
  },
  {
    icon: Timer,
    title: "Focus",
    text: "Deep-work sessions with ambient timers, distraction blocking and a record of every hour.",
  },
  {
    icon: Wallet,
    title: "Money",
    text: "Track spending, savings targets and subscriptions next to the goals they actually fund.",
  },
  {
    icon: NotebookPen,
    title: "Notes",
    text: "A fast, linked notebook for ideas, journals and meeting notes — searchable across your life.",
  },
];

const steps = [
  {
    n: "01",
    title: "Bring everything in",
    text: "Import your tasks, calendars and notes, or start fresh with a guided five-minute setup.",
  },
  {
    n: "02",
    title: "Let LIFEOS plan",
    text: "Your day is assembled around real energy, deadlines and the habits you promised yourself.",
  },
  {
    n: "03",
    title: "Review and improve",
    text: "Weekly reflections show what moved, what slipped, and the one change worth making next.",
  },
];

const benefits = [
  { stat: "1", label: "app instead of nine", text: "Stop stitching tools together at the end of every week." },
  { stat: "6h", label: "saved per week", text: "Planning, sorting and status-checking handled for you." },
  { stat: "3x", label: "habit consistency", text: "Members keep streaks three times longer after 60 days." },
  { stat: "100%", label: "yours", text: "Private by default, exportable any time, no data resale. Ever." },
];

function Landing() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <nav className="glass grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 sm:flex sm:justify-between">
            <a href="#top" className="flex min-w-0 items-center gap-2.5">
              <span className="gradient-primary grid h-8 w-8 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold text-primary-foreground">
                L
              </span>
              <span className="truncate font-display text-lg font-extrabold tracking-tight">LIFEOS</span>
            </a>
            <div className="hidden items-center gap-7 sm:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <ThemeToggle />
              <a
                href="#get-started"
                className="gradient-primary rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Get Started
              </a>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:hidden">
              <ThemeToggle />
              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>
          {open ? (
            <div className="glass reveal mt-2 space-y-1 rounded-2xl p-3 sm:hidden">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#get-started"
                onClick={() => setOpen(false)}
                className="gradient-primary block rounded-xl px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Get Started
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-canvas relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="reveal mx-auto max-w-3xl text-center">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Now with the LIFEOS AI assistant
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
                One system for <span className="text-gradient">your entire life.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tasks, habits, goals, focus, money and notes finally living in one calm place — planned
                for you each morning, reviewed with you each week.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#get-started"
                  className="gradient-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03]"
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="glass inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-card"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="reveal float-soft mt-14 [animation-delay:120ms]">
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Features</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                Six modules. One connected life.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every part of LIFEOS shares the same data, so finishing a task moves a goal and protecting
                focus protects a habit.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article key={f.title} className="glass lift rounded-3xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="hero-canvas px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-xl font-display text-3xl font-extrabold sm:text-4xl">
              Set up once, and your week runs itself.
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="glass lift rounded-3xl p-7">
                  <span className="font-display text-4xl font-extrabold text-primary-soft">{s.n}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI assistant */}
        <section className="px-4 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">AI assistant</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                A chief of staff for your own life.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Ask it to reshuffle a crowded Tuesday, turn a messy note into a plan, or explain where your
                month actually went. It reads everything you have in LIFEOS — and nothing outside it.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Rebuilds your day when a meeting eats two hours",
                  "Turns rambling notes into tasks, goals and dates",
                  "Weekly summary of focus hours, streaks and spending",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-strong rounded-3xl p-5">
              <div className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-3 text-sm">
                  I lost the morning. Can you fix today?
                </div>
                <div className="gradient-primary max-w-[90%] rounded-2xl rounded-bl-md px-4 py-3 text-sm text-primary-foreground">
                  Done. I moved the budget review to Thursday, kept your 90-minute deep work block at 2pm,
                  and shortened the gym session so your streak survives.
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">Updated plan</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>2:00 pm · Deep work — product spec</p>
                    <p>4:15 pm · Gym, short session</p>
                    <p>6:00 pm · Read 20 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-xl font-display text-3xl font-extrabold sm:text-4xl">
              Less managing your system. More living your life.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div key={b.label} className="glass lift rounded-3xl p-6">
                  <p className="font-display text-4xl font-extrabold text-gradient">{b.stat}</p>
                  <p className="mt-1 text-sm font-semibold">{b.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="get-started" className="px-4 pb-24">
          <div className="hero-canvas mx-auto max-w-5xl overflow-hidden rounded-4xl border border-glass-border px-6 py-16 text-center">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">
              Your whole life, finally in one place.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Free while you set it up. No credit card, no clutter, no starting over on Monday.
            </p>
            <a
              href="#top"
              className="gradient-primary mt-8 inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03]"
            >
              Get started with LIFEOS <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto grid max-w-6xl items-center gap-4 sm:grid-cols-[1fr_auto]">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="gradient-primary grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-xs font-extrabold text-primary-foreground">
              L
            </span>
            <span className="font-display text-sm font-bold">LIFEOS</span>
            <span className="truncate text-sm text-muted-foreground">
              © {new Date().getFullYear()} · One system for your entire life.
            </span>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how-it-works" className="hover:text-foreground">How It Works</a>
            <a href="#get-started" className="hover:text-foreground">Get Started</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
