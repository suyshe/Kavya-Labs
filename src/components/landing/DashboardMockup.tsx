import { useState, useEffect } from "react";
import {
  Cpu,
  Activity,
  Bot,
  Zap,
  ShieldCheck,
  Database,
  ArrowUpRight,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface AgentMetric {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "completed";
  latency: string;
  tokens: string;
  accuracy: string;
}

const mockAgents: AgentMetric[] = [
  {
    id: "ag-01",
    name: "Kavya Orchestrator",
    role: "DAG Execution & Multi-Agent Planner",
    status: "running",
    latency: "28ms",
    tokens: "48.2k",
    accuracy: "99.8%",
  },
  {
    id: "ag-02",
    name: "Bengaluru Fintech Reconciler",
    role: "Autonomous Settlement & Ledger Audit",
    status: "running",
    latency: "34ms",
    tokens: "82.5k",
    accuracy: "99.9%",
  },
  {
    id: "ag-03",
    name: "Sovereign Compliance Guard",
    role: "VPC Data Boundary & PII Filtering",
    status: "idle",
    latency: "12ms",
    tokens: "21.0k",
    accuracy: "100%",
  },
  {
    id: "ag-04",
    name: "Neural Code Synthesizer",
    role: "Full-Stack Generation & Verification",
    status: "completed",
    latency: "45ms",
    tokens: "115.4k",
    accuracy: "99.4%",
  },
];

const mockLogs = [
  {
    time: "14:32:01.04",
    agent: "Orchestrator",
    event: "Decomposing 12-step enterprise pipeline for BLR-Cluster-04",
  },
  {
    time: "14:32:02.18",
    agent: "Compliance",
    event: "Zero-retention enclave validated · 0 telemetry leaks detected",
  },
  {
    time: "14:32:03.45",
    agent: "Reconciler",
    event: "Cross-verified 14,200 transaction anomalies via Kavya-1 Pro",
  },
  {
    time: "14:32:04.91",
    agent: "Synthesizer",
    event: "Emitted typed AST artifacts with zero runtime warnings",
  },
];

export function DashboardMockup() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-3 sm:p-5 shadow-2xl transition-all">
      <div className="rounded-2xl border border-border/80 bg-card/90 p-4 sm:p-6 backdrop-blur-md">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="gradient-primary grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold tracking-tight">
                  Kavya Agentic Console
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Kavya-1 Pro Online
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Cluster:{" "}
                <span className="font-medium text-foreground">BLR-East-01 (Bengaluru)</span> ·
                Sovereign VPC Enclave
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-4 rounded-xl border border-border/60 bg-background/60 px-3 py-1.5 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Cpu className="h-3.5 w-3.5 text-primary" /> 34ms p99
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> 142k tok/s
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> 99.98% SLA
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: Active Agent Pipeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-bold tracking-tight">Active Multi-Agent Mesh</h4>
              </div>
              <span className="text-xs text-muted-foreground">4 nodes synchronized</span>
            </div>

            <div className="grid gap-2.5">
              {mockAgents.map((ag, i) => {
                const isActive = pulse === i;
                return (
                  <div
                    key={ag.id}
                    className={`rounded-xl border p-3.5 transition-all ${
                      isActive
                        ? "border-primary/50 bg-primary/5 shadow-sm scale-[1.01]"
                        : "border-border/70 bg-background/50 hover:bg-background/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                            isActive
                              ? "gradient-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{ag.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{ag.role}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-right">
                        <div className="hidden sm:block">
                          <span className="text-xs font-semibold">{ag.latency}</span>
                          <p className="text-[10px] text-muted-foreground">{ag.tokens} tokens</p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            ag.status === "running"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : ag.status === "completed"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {ag.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick KPI Bar */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl border border-border/70 bg-background/50 p-3">
                <span className="text-[11px] text-muted-foreground">Daily Agent Calls</span>
                <p className="mt-0.5 font-display text-lg font-bold">2.84M</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  +24.8% BLR
                </span>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/50 p-3">
                <span className="text-[11px] text-muted-foreground">Inference Speed</span>
                <p className="mt-0.5 font-display text-lg font-bold">31.2 ms</p>
                <span className="text-[10px] text-primary font-medium">Sub-50ms target</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/50 p-3">
                <span className="text-[11px] text-muted-foreground">Task Accuracy</span>
                <p className="mt-0.5 font-display text-lg font-bold">99.7%</p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Verified audit
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Neural Stream & Telemetry */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Live Telemetry Stream
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Realtime
                </span>
              </div>

              <div className="mt-3 space-y-2.5 font-mono text-[11px] leading-relaxed">
                {mockLogs.map((log, idx) => (
                  <div key={idx} className="rounded-lg bg-card/60 p-2 border border-border/40">
                    <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                      <span>{log.time}</span>
                      <span className="font-semibold text-primary">@{log.agent}</span>
                    </div>
                    <p className="mt-1 text-foreground/90">{log.event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-card/70 to-background/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Bengaluru AI Benchmark
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    Kavya-1 Pro vs Legacy LLM Workflows
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Task Execution Efficiency</span>
                <span className="font-bold text-foreground">3.8x faster</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="gradient-primary h-full rounded-full w-[88%]" />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Enterprise Cost Reduction</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  68% Lower Cloud Spend
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
