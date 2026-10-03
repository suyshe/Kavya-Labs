import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, Bot, LoaderCircle, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { getOAuthConfiguration } from "@/lib/auth.functions";
import { useAuth } from "@/lib/auth";

interface LoginSearch {
  redirect?: string;
  error?: string;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    ...(typeof search["redirect"] === "string" ? { redirect: search["redirect"] } : {}),
    ...(typeof search["error"] === "string" ? { error: search["error"] } : {}),
  }),
  loader: () => getOAuthConfiguration(),
  head: () => ({
    meta: [
      { title: "Sign in — Kavya Labs" },
      { name: "description", content: "Sign in securely to the Kavya Labs AI workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const configured = Route.useLoaderData();
  const search = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const { signIn, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(search.error ?? "");

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
  }, [isAuthenticated, navigate, user]);

  const startGoogleSignIn = async () => {
    try {
      setAuthError("");
      setLoading(true);
      await signIn(search.redirect ?? "/dashboard");
    } catch (error) {
      setLoading(false);
      setAuthError(error instanceof Error ? error.message : "Unable to start sign in.");
    }
  };

  return (
    <main className="hero-canvas flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold">
          <span className="gradient-primary grid h-10 w-10 place-items-center rounded-xl text-primary-foreground">
            <Bot aria-hidden="true" className="h-5 w-5" />
          </span>
          Kavya Labs
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Back to home</span>
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-7 text-center">
            <span className="gradient-primary mx-auto grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground shadow-lg">
              <Bot aria-hidden="true" className="h-7 w-7" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Kavya Labs Workspace
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to explore your secure AI workspace.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            {authError ? (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            ) : null}

            {!configured ? (
              <div
                role="status"
                className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-foreground"
              >
                Google sign-in is not configured yet. Add the OAuth credentials and Auth.js secret
                from <code className="font-mono text-xs">.env.example</code> to enable it.
              </div>
            ) : null}

            <button
              type="button"
              onClick={startGoogleSignIn}
              disabled={!configured || loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-semibold shadow-sm transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-55"
            >
              {loading ? (
                <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleMark />
              )}
              Continue with Google
            </button>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-primary/5 p-3.5 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                Secure sign-in powered by Google OAuth and Auth.js. Your access level is assigned by
                Kavya Labs, never by the browser.
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              New to Kavya Labs?{" "}
              <Link to="/" className="font-semibold text-primary hover:underline">
                Request early access
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to Kavya Labs&apos; terms and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.2H24v7.9h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.3A20 20 0 0 0 24 44Z"
      />
      <path fill="#1976D2" d="M12.7 27.8a12 12 0 0 1 0-7.6v-5.3H5.8a20 20 0 0 0 0 18.2l6.9-5.3Z" />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.6 1 7.7 3l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.8 14.9l6.9 5.3C14.3 15.5 18.8 12 24 12Z"
      />
    </svg>
  );
}
