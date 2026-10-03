import { Link, Outlet } from "@tanstack/react-router";
import { Activity, Bot, LayoutDashboard, Settings2, Users } from "lucide-react";
import { UserNav } from "@/components/layout/UserNav";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: Activity },
  { to: "/admin/settings", label: "Settings", icon: Settings2 },
] as const;

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold">
            <span className="gradient-primary grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
              <Bot aria-hidden="true" className="h-5 w-5" />
            </span>
            Kavya Labs{" "}
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              / Admin
            </span>
          </Link>
          <UserNav />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-border/70 bg-card/40 p-3 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:p-5">
          <p className="hidden px-3 pb-3 pt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground lg:block">
            Workspace
          </p>
          <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto lg:flex-col">
            {items.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-primary text-primary-foreground shadow-sm" }}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary [&.active]:text-primary-foreground sm:px-4 lg:w-full"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 hidden rounded-2xl border border-primary/15 bg-primary/5 p-4 lg:block">
            <p className="text-xs font-bold">Demo environment</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Metrics and seeded user records are sample data. Connect a database before production.
            </p>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
