import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowDownRight, ArrowUpRight, Bot, CreditCard, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Overview — Kavya Labs Admin" }] }),
  component: AdminOverview,
});

const growth = [
  { month: "May", users: 612 },
  { month: "Jun", users: 738 },
  { month: "Jul", users: 920 },
  { month: "Aug", users: 1080 },
  { month: "Sep", users: 1384 },
  { month: "Oct", users: 1650 },
  { month: "Nov", users: 1910 },
  { month: "Dec", users: 2240 },
  { month: "Jan", users: 2486 },
];

function AdminOverview() {
  const cards = [
    { label: "Total users", value: "2,486", delta: "+12.8%", icon: Users, up: true },
    { label: "New users", value: "183", delta: "+8.2%", icon: ArrowUpRight, up: true },
    { label: "Active users", value: "1,924", delta: "+5.4%", icon: Activity, up: true },
    { label: "Feature usage", value: "68%", delta: "+6.2%", icon: Bot, up: true },
  ];

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Control centre</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A live pulse check on the Kavya Labs workspace.
        </p>
      </div>

      <section aria-label="Platform metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, delta, icon: Icon, up }) => (
          <article
            key={label}
            className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-5 flex items-end justify-between gap-2">
              <p className="text-2xl font-extrabold tracking-tight">{value}</p>
              <span
                className={`inline-flex items-center text-xs font-bold ${up ? "text-primary" : "text-amber-600"}`}
              >
                {up ? (
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />
                )}
                {delta}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Compared to last month</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold">User growth</h2>
              <p className="mt-1 text-xs text-muted-foreground">Cumulative workspace members</p>
            </div>
            <span className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary">
              Last 9 months
            </span>
          </div>
          <div
            className="mt-6 h-64"
            role="img"
            aria-label="Line chart showing user growth from 612 to 2,486 over nine months"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growth} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--color-border)"
                  strokeDasharray="4 4"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#userGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Product usage</h2>
              <p className="mt-1 text-xs text-muted-foreground">This month</p>
            </div>
            <CreditCard aria-hidden="true" className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-6 space-y-5">
            {[
              ["Agent workflows", "68%", "bg-primary"],
              ["Knowledge search", "54%", "bg-cyan-500"],
              ["Data connectors", "42%", "bg-violet-500"],
              ["Policy reviews", "31%", "bg-amber-500"],
            ].map(([name, percent, color]) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">{percent}</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-label={name}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Number.parseInt(percent ?? "0", 10)}
                >
                  <div className={`h-full rounded-full ${color}`} style={{ width: percent }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
            Workflow automation remains the most-used capability across active teams.
          </p>
        </article>
      </section>

      <p className="text-xs text-muted-foreground">
        Sample metrics for investor demonstration. Connect a production data source to show live
        activity.
      </p>
    </div>
  );
}
