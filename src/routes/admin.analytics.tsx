import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Kavya Labs Admin" }] }),
  component: AdminAnalytics,
});

const monthly = [
  { month: "May", signups: 72, active: 408, completed: 5600 },
  { month: "Jun", signups: 96, active: 512, completed: 7200 },
  { month: "Jul", signups: 118, active: 646, completed: 9400 },
  { month: "Aug", signups: 140, active: 774, completed: 12800 },
  { month: "Sep", signups: 154, active: 982, completed: 16400 },
  { month: "Oct", signups: 183, active: 1190, completed: 21200 },
  { month: "Nov", signups: 209, active: 1426, completed: 28600 },
  { month: "Dec", signups: 236, active: 1693, completed: 35400 },
  { month: "Jan", signups: 264, active: 1924, completed: 48200 },
];

const featureUsage = [
  { feature: "Agent workflows", usage: 68 },
  { feature: "Knowledge search", usage: 54 },
  { feature: "Data connectors", usage: 42 },
  { feature: "Policy reviews", usage: 31 },
  { feature: "API platform", usage: 24 },
];

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
      <h2 className="text-base font-bold">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      <div className="mt-5 h-64" role="img" aria-label={title}>
        {children}
      </div>
    </article>
  );
}

function AdminAnalytics() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Insights</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Adoption, engagement, and product usage at a glance.
        </p>
      </div>

      <section aria-label="Analytics summary" className="grid gap-4 sm:grid-cols-3">
        {[
          ["Monthly signups", "264", "+14.2%"],
          ["Monthly active users", "1,924", "+5.4%"],
          ["Workflow runs", "48.2k", "+21.7%"],
        ].map(([label, value, change]) => (
          <article key={label} className="rounded-2xl border border-border/70 bg-card p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <p className="text-2xl font-extrabold tracking-tight">{value}</p>
              <span className="text-xs font-bold text-primary">{change}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Signups over time" description="New workspace members by month">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar
                dataKey="signups"
                name="Signups"
                fill="var(--color-primary)"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active users" description="Monthly active members across the platform">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="activeUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                name="Active users"
                stroke="#06b6d4"
                fill="url(#activeUsers)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Workflow usage" description="Completed AI workflow runs each month">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                name="Workflow runs"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Feature adoption"
          description="Share of active accounts using each feature"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={featureUsage}
              layout="vertical"
              margin={{ top: 0, right: 14, left: 12, bottom: 0 }}
            >
              <CartesianGrid
                horizontal={false}
                stroke="var(--color-border)"
                strokeDasharray="4 4"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="feature"
                width={108}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Bar
                dataKey="usage"
                name="Adoption %"
                fill="var(--color-primary)"
                radius={[0, 5, 5, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <p className="text-xs text-muted-foreground">
        Charts currently use illustrative demo values and will refresh when connected to a
        production analytics source.
      </p>
    </div>
  );
}
