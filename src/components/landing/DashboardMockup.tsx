const tasks = [
  { label: "Ship LIFEOS beta invites", tag: "Work", done: true },
  { label: "Deep work — product spec", tag: "Focus", done: true },
  { label: "Gym: upper body", tag: "Health", done: false },
  { label: "Review monthly budget", tag: "Money", done: false },
];

const habits = [
  { name: "Read 20 min", streak: 42, pct: 92 },
  { name: "Morning run", streak: 18, pct: 74 },
  { name: "No sugar", streak: 9, pct: 61 },
];

export function DashboardMockup() {
  return (
    <div className="glass-strong rounded-3xl p-3 sm:p-4">
      <div className="rounded-2xl bg-card/80 p-4 sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="gradient-primary grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold text-primary-foreground">
              L
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Good morning, Alex</p>
              <p className="truncate text-xs text-muted-foreground">Monday · 4 of 7 done</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Today</p>
              <p className="text-xs text-muted-foreground">Auto-planned</p>
            </div>
            <ul className="mt-3 space-y-2.5">
              {tasks.map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                      t.done
                        ? "gradient-primary border-transparent text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {t.done ? (
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm ${
                      t.done ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {t.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    {t.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-sm font-semibold">Habit streaks</p>
              <div className="mt-3 space-y-3">
                {habits.map((h) => (
                  <div key={h.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{h.name}</span>
                      <span className="text-muted-foreground">{h.streak}d</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="gradient-primary h-full rounded-full" style={{ width: `${h.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs text-muted-foreground">Focus today</p>
                <p className="mt-1 font-display text-2xl font-bold">3h 40m</p>
                <div className="mt-2 flex items-end gap-1">
                  {[40, 70, 55, 90, 62, 78, 46].map((v, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-primary-soft"
                      style={{ height: `${v * 0.4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs text-muted-foreground">Saved this month</p>
                <p className="mt-1 font-display text-2xl font-bold">$1,240</p>
                <p className="mt-2 text-xs font-medium text-primary">+18% vs last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
