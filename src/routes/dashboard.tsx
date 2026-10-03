import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Activity, ArrowUpRight, Bot, Clock3, ShieldCheck, Workflow } from "lucide-react";
import { UserNav } from "@/components/layout/UserNav";
import { getCurrentUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({ to: "/login", search: { redirect: "/dashboard" } });
    }
    return { user };
  },
  head: () => ({ meta: [{ title: "Workspace — Kavya Labs" }] }),
  component: UserDashboard,
});

function UserDashboard() {
  const { user } = Route.useRouteContext();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold">
            <span className="gradient-primary grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
              <Bot aria-hidden="true" className="h-5 w-5" />
            </span>
            Kavya Labs
          </Link>
          <UserNav />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">Your workspace</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Good to see you, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Kavya Labs AI workspace is ready when you are.
            </p>
          </div>
          {user.role === "admin" ? (
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Open admin console <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <section
          aria-label="Workspace summary"
          className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            icon={Workflow}
            label="Active workflows"
            value="12"
            detail="Across 4 connected systems"
          />
          <SummaryCard
            icon={Activity}
            label="Tasks completed"
            value="2,481"
            detail="+18.4% this month"
          />
          <SummaryCard
            icon={Clock3}
            label="Time returned"
            value="186 hrs"
            detail="Estimated this month"
          />
          <SummaryCard
            icon={ShieldCheck}
            label="Governance status"
            value="Healthy"
            detail="All guardrails enabled"
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="glass-strong rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Agent workspace
                </p>
                <h2 className="mt-2 text-xl font-bold">Your operations, in sync.</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Monitor trusted AI agents, review their work, and keep every workflow moving from
                  one secure workspace.
                </p>
              </div>
              <span className="hidden h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary sm:grid">
                <Bot aria-hidden="true" className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ["Settlement review", "14,208 records reconciled", "Running"],
                ["Support triage", "96 requests prioritized", "Healthy"],
                ["Risk monitoring", "No policy exceptions", "Healthy"],
                ["Knowledge sync", "Updated 8 minutes ago", "Complete"],
              ].map(([name, description, state]) => (
                <div key={name} className="rounded-2xl border border-border/70 bg-card/70 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                      {state}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Account</p>
            <h2 className="mt-2 text-xl font-bold">Workspace profile</h2>
            <div className="mt-6 flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/15"
                />
              ) : (
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 font-bold text-primary">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Access level</span>
                <span className="font-semibold capitalize">{user.role}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Account status</span>
                <span className="font-semibold text-primary">{user.status}</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Workflow;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}
