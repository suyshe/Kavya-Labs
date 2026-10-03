import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  Network,
  Lock,
  ArrowRight,
  Menu,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MapPin,
  Flame,
  Binary,
  Workflow,
  Server,
} from "lucide-react";
import { useState } from "react";
import { DashboardMockup } from "@/components/landing/DashboardMockup";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { EarlyAccessModal } from "@/components/landing/EarlyAccessModal";
import { UserNav } from "@/components/layout/UserNav";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kavya Labs — Autonomous Enterprise AI Systems | Bengaluru" },
      {
        name: "description",
        content:
          "Kavya Labs builds sovereign autonomous multi-agent intelligence and foundation reasoning models engineered in Bengaluru, India.",
      },
      {
        property: "og:title",
        content: "Kavya Labs — Autonomous Enterprise AI Systems | Bengaluru",
      },
      {
        property: "og:description",
        content:
          "Autonomous intelligence and foundation agents engineered for mission-critical enterprise workflows in Bengaluru, India.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Workflow,
    title: "Autonomous Multi-Agent Mesh",
    badge: "Kavya-1 Core",
    text: "Decompose complex multi-step enterprise workflows into parallel micro-agent execution DAGs with automatic self-correction and validation.",
  },
  {
    icon: ShieldCheck,
    title: "Sovereign VPC & Zero-Retention Enclave",
    badge: "Data Sovereignty",
    text: "Strict data privacy by design. Deploy on-premises or inside your private AWS/GCP/Azure VPC with zero model retraining on customer logs.",
  },
  {
    icon: Cpu,
    title: "Bengaluru Low-Latency Inference",
    badge: "Sub-40ms P99",
    text: "Optimized on specialized GPU clusters in India. Achieve ultra-low latency token generation and high concurrency for mission-critical operations.",
  },
  {
    icon: Network,
    title: "250+ Deterministic Enterprise Connectors",
    badge: "Tool Sandbox",
    text: "Safe, typed execution environments connecting Postgres, Snowflake, Salesforce, SAP, GitHub, and custom REST APIs with rollback capabilities.",
  },
  {
    icon: Layers,
    title: "Continuous Memory & Knowledge Graphs",
    badge: "Context Persistence",
    text: "Hybrid vector memory combined with dynamic enterprise knowledge graphs that retain state and domain nuance across months of operation.",
  },
  {
    icon: Lock,
    title: "Human-in-the-Loop Governance",
    badge: "Safety & Audit",
    text: "Granular role-based guardrails with real-time approval gates for high-risk operations, audited via immutable cryptographic event ledgers.",
  },
];

const architectureSteps = [
  {
    step: "01",
    title: "Sovereign Enclave Connect",
    desc: "Connect your enterprise database, VPC network, and identity providers with zero external data exposure.",
  },
  {
    step: "02",
    title: "Multi-Agent DAG Synthesis",
    desc: "Kavya-1 Pro autonomously decomposes business logic into resilient, cooperative reasoning agents.",
  },
  {
    step: "03",
    title: "Real-Time Verified Execution",
    desc: "Agents execute tools in sandboxes, verify results against compliance policies, and return auditable outputs.",
  },
];

const metrics = [
  {
    stat: "34ms",
    label: "p99 Inference Latency",
    desc: "Engineered for high-frequency operations",
  },
  {
    stat: "99.8%",
    label: "Task Completion Accuracy",
    desc: "Autonomous self-correcting error recovery",
  },
  {
    stat: "68%",
    label: "Infrastructure Cost Savings",
    desc: "Compared to legacy unoptimized LLM calls",
  },
  { stat: "0 B", label: "Customer Data Retention", desc: "Complete data sovereignty in your VPC" },
];

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Bengaluru R&D", href: "#about" },
    { label: "Metrics", href: "#metrics" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
          <nav className="glass grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 sm:flex sm:justify-between shadow-lg">
            {/* Brand Logo */}
            <a href="#top" className="flex min-w-0 items-center gap-2.5 group">
              <span className="gradient-primary grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                <Bot className="h-5 w-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="truncate font-display text-lg font-extrabold tracking-tight text-foreground">
                  Kavya Labs
                </span>
                <span className="hidden xs:inline-block text-[10px] font-semibold uppercase tracking-widest text-primary">
                  Bengaluru AI
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <span className="h-4 w-px bg-border/80" />
              <ThemeToggle />
              <EarlyAccessModal>
                <button className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                  Request Access
                </button>
              </EarlyAccessModal>
              <UserNav />
            </div>

            {/* Mobile Actions */}
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card/60"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          {mobileMenuOpen ? (
            <div
              id="mobile-navigation"
              className="glass reveal mt-2 space-y-2 rounded-2xl border border-border/70 p-4 shadow-xl md:hidden"
            >
              {navLinks.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
                <EarlyAccessModal>
                  <button className="gradient-primary w-full rounded-xl py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm">
                    Request Early Access
                  </button>
                </EarlyAccessModal>
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl bg-secondary px-3 py-2 text-center text-sm font-medium"
                  >
                    Open Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl border border-border px-3 py-2 text-center text-sm font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero-canvas relative overflow-hidden px-4 pb-20 pt-14 sm:pt-20 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mx-auto max-w-3xl text-center">
              {/* Badges */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground border border-primary/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Kavya-1 Pro Model Preview Active
                </span>
                <span className="glass hidden xs:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3 w-3 text-primary" /> Koramangala, Bengaluru
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Autonomous AI Systems for <span className="text-gradient">Enterprise Scale.</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Engineered in Bengaluru. Kavya Labs powers next-generation autonomous multi-agent
                workflows, sovereign neural reasoning, and enterprise-grade intelligence with zero
                data retention.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <EarlyAccessModal>
                  <button className="gradient-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03] cursor-pointer">
                    Request Early Access <ArrowRight className="h-4 w-4" />
                  </button>
                </EarlyAccessModal>

                <Link
                  to="/login"
                  className="glass inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-card border border-border"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  Explore Demo Platform
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> SOC2 Type II Aligned
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Sub-40ms P99 Latency
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> 100% Indian Data Sovereignty
                </span>
              </div>
            </div>

            {/* Dashboard / Product Mockup */}
            <div className="reveal float-soft mt-12 sm:mt-16 [animation-delay:150ms]">
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Core Capabilities
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
                Engineered for the demanding modern enterprise.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Generic chatbots cannot run business-critical operations. Kavya Labs builds
                deterministic, verifiable multi-agent architectures that execute with mathematical
                precision.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="glass lift group relative flex flex-col justify-between rounded-3xl p-7 border border-border/80"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition-transform group-hover:scale-105">
                        <f.icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold">{f.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-primary flex items-center gap-1">
                    <span>Explore architecture</span>{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture / How It Works */}
        <section
          id="architecture"
          className="hero-canvas px-4 py-24 sm:px-6 border-y border-border/60"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Architecture Blueprint
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
                How Kavya Labs Operates Inside Your Stack
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Designed to run alongside your databases and microservices without intrusive code
                refactoring.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {architectureSteps.map((s) => (
                <div
                  key={s.step}
                  className="glass lift rounded-3xl p-8 border border-border/70 relative"
                >
                  <span className="font-display text-5xl font-extrabold text-primary-soft">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bengaluru R&D / Mission Section */}
        <section id="about" className="px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Bengaluru Deep-Tech Corridor
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl leading-tight">
                From Koramangala to the World: Building Sovereign AI Systems.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Kavya Labs was founded in Bengaluru by Dr. Kavya Nair with a clear charter: global
                enterprises deserve sovereign, high-throughput autonomous agents that run on their
                own terms, under strict data confidentiality.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Harnessing India's premier engineering talent, we've developed low-latency
                foundation models benchmarked specifically on real-world enterprise reasoning,
                automated financial settlements, and continuous compliance audits.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                  <p className="font-display text-2xl font-extrabold text-foreground">18+</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                    Peer-Reviewed AI Papers
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                  <p className="font-display text-2xl font-extrabold text-foreground">450M+</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                    Agentic Reasoning Cycles
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <EarlyAccessModal>
                  <button className="gradient-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]">
                    Meet Our Research Team <ArrowRight className="h-4 w-4" />
                  </button>
                </EarlyAccessModal>
              </div>
            </div>

            {/* Visual Card */}
            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-border/80 space-y-6">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold">
                    KL
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Kavya Labs Research Foundry</h4>
                    <p className="text-xs text-muted-foreground">Indiranagar & Koramangala Hubs</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Cluster Online
                </span>
              </div>

              <div className="space-y-4 text-sm text-foreground/90">
                <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-primary">
                      Sovereignty Architecture
                    </span>
                    <span className="text-[10px] text-muted-foreground">Certified Enclave</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Private VPC deployment ensures no training on customer records. In-region data
                    processing conforms to Indian and international sovereign frameworks.
                  </p>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-primary">Silicon Acceleration</span>
                    <span className="text-[10px] text-muted-foreground">NVIDIA H100 Mesh</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Custom CUDA kernels engineered for sub-50ms deterministic multi-agent chain of
                    thought.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section id="metrics" className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-4xl border border-glass-border hero-canvas p-8 sm:p-14">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                  Benchmark-beating performance across every enterprise axis.
                </h2>
                <p className="mt-3 text-muted-foreground text-sm sm:text-base">
                  Real numbers tested against demanding production workloads in fintech, healthtech,
                  and logistics.
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label} className="glass rounded-2xl p-6 border border-border/70">
                    <p className="font-display text-4xl font-extrabold text-gradient">{m.stat}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">{m.label}</p>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="get-started" className="px-4 pb-24 sm:px-6">
          <div className="hero-canvas mx-auto max-w-5xl overflow-hidden rounded-4xl border border-glass-border px-6 py-16 text-center shadow-2xl">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Ready for Sandbox Onboarding?
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">
              Power Your Operations with Kavya Autonomous Agents.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-sm sm:text-base">
              Request priority sandbox access for your engineering team or explore the live
              interactive dashboard right now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <EarlyAccessModal>
                <button className="gradient-primary inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03] cursor-pointer">
                  Request Early Access <ArrowRight className="h-4 w-4" />
                </button>
              </EarlyAccessModal>
              <Link
                to="/login"
                className="glass inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-card border border-border"
              >
                Sign In to Platform
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/70 bg-card/40 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2.5">
                <span className="gradient-primary grid h-8 w-8 place-items-center rounded-xl text-primary-foreground font-bold">
                  <Bot className="h-4 w-4" />
                </span>
                <span className="font-display text-lg font-bold">Kavya Labs</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground max-w-sm">
                Kavya Labs AI Technologies Pvt. Ltd. Engineered in Bengaluru, India. Pioneering
                sovereign autonomous agentic systems and foundation models.
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" /> Koramangala 4th Block, Bengaluru, KA
                560034
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Platform
              </h5>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Kavya-1 Pro Engine
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-foreground">
                    Autonomous Agent Mesh
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Sovereign VPC Enclaves
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Enterprise Sandbox
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Solutions
              </h5>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <span>Bengaluru Fintech &amp; Settlement</span>
                </li>
                <li>
                  <span>Healthcare Reasoning</span>
                </li>
                <li>
                  <span>Supply Chain Automation</span>
                </li>
                <li>
                  <span>Developer APIs</span>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Navigation
              </h5>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Sign In / Register
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-foreground">
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-foreground">
                    Admin Console
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Kavya Labs AI Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                className="transition-colors hover:text-foreground"
                href="mailto:privacy@kavyalabs.ai"
              >
                Privacy
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href="mailto:legal@kavyalabs.ai"
              >
                Terms
              </a>
              <a
                className="transition-colors hover:text-foreground"
                href="mailto:security@kavyalabs.ai"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
