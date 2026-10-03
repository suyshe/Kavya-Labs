import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, LockKeyhole, ShieldCheck, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Kavya Labs Admin" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Workspace</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review platform access and administrator preferences.
        </p>
      </div>

      <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">Role-based access</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Administrator roles are assigned on the server using the{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
                ADMIN_EMAILS
              </code>{" "}
              allowlist and administrator-approved changes in the Users directory.
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm">
          <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-muted-foreground">
            Role updates are held in memory for this demo. Configure persistent storage before
            deploying a multi-instance production environment.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground">
            <Bell aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">Notifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose which admin updates to receive.
            </p>
          </div>
        </div>
        <div className="mt-5 divide-y divide-border/70">
          <SettingToggle
            label="Security and access alerts"
            description="Important changes to user access and account security."
            enabled={notifications}
            onChange={setNotifications}
          />
          <SettingToggle
            label="Weekly workspace digest"
            description="A weekly summary of usage, signups, and workflow activity."
            enabled={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </div>
      </section>

      <section className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
        <SlidersHorizontal aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <h2 className="font-bold">Product configuration</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Workflow-level controls, integrations, and audit retention will appear here when a
            production data store is connected.
          </p>
        </div>
      </section>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}
