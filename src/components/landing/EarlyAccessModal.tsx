import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, ArrowRight, CheckCircle2, Shield, Bot } from "lucide-react";
import { submitEarlyAccessRequest } from "@/lib/early-access.functions";

interface EarlyAccessModalProps {
  children?: React.ReactNode;
}

export function EarlyAccessModal({ children }: EarlyAccessModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "Autonomous Multi-Agent Workflows",
    volume: "1M - 10M tokens/month",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Please fill in your name, work email, and company.");
      return;
    }

    setLoading(true);
    try {
      await submitEarlyAccessRequest({ data: formData });
      setSubmitted(true);
      toast.success("Your early-access request was added to the demo queue.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to submit your early-access request.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      useCase: "Autonomous Multi-Agent Workflows",
      volume: "1M - 10M tokens/month",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="gradient-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]">
            Request Early Access <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card/95 backdrop-blur-xl sm:max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </span>
                <DialogTitle className="font-display text-xl font-bold">
                  Request Kavya-1 Early Access
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm text-muted-foreground mt-1.5">
                Join select enterprise engineering teams in Bengaluru and globally testing our
                sovereign autonomous agent mesh.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="early-access-name"
                    className="text-xs font-semibold text-foreground"
                  >
                    Your Full Name
                  </label>
                  <input
                    id="early-access-name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="early-access-email"
                    className="text-xs font-semibold text-foreground"
                  >
                    Work Email
                  </label>
                  <input
                    id="early-access-email"
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="early-access-company"
                  className="text-xs font-semibold text-foreground"
                >
                  Company / Organization
                </label>
                <input
                  id="early-access-company"
                  type="text"
                  required
                  placeholder="e.g. Swiggy Labs / PhonePe Engineering / Global SaaS"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="early-access-use-case"
                    className="text-xs font-semibold text-foreground"
                  >
                    Primary AI Use Case
                  </label>
                  <select
                    id="early-access-use-case"
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Autonomous Multi-Agent Workflows">Autonomous Agent Mesh</option>
                    <option value="Fintech & Ledger Reconciliation">Fintech & Settlement</option>
                    <option value="Enterprise Sovereign AI Deployment">
                      Sovereign On-Prem / VPC
                    </option>
                    <option value="Code Synthesis & QA">Code Synthesis & QA</option>
                    <option value="Customer Intelligence">Customer Intelligence</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="early-access-volume"
                    className="text-xs font-semibold text-foreground"
                  >
                    Anticipated Workload
                  </label>
                  <select
                    id="early-access-volume"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="< 1M tokens/mo">Pilot (&lt; 1M tokens/mo)</option>
                    <option value="1M - 10M tokens/month">Growth (1M - 10M tokens/mo)</option>
                    <option value="10M - 100M tokens/month">
                      Enterprise (10M - 100M tokens/mo)
                    </option>
                    <option value="> 100M tokens/month">Hyperscale (&gt; 100M tokens/mo)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3 text-xs text-muted-foreground flex items-start gap-2.5">
                <Shield className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>
                  <strong>Zero Data Retention Enclave:</strong> Kavya Labs does not train foundation
                  models on your corporate customer data or proprietary logs.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gradient-primary w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Submitting Priority Request...
                  </span>
                ) : (
                  <>
                    Submit Early Access Application <Sparkles className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold">Application Received!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-foreground">{formData.name}</span>.
              We've added <span className="font-semibold text-foreground">{formData.company}</span>{" "}
              to the early-access demo queue.
            </p>
            <div className="rounded-xl border border-border/80 bg-background/60 p-3 text-xs text-muted-foreground">
              No email is sent yet. Demo requests stay in server memory until restart; connect a CRM
              or email provider before production.
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="gradient-primary rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
