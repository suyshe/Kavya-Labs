import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser } from "@/lib/auth.functions";

export type UserRole = "user" | "admin";
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: string;
  status: "Active" | "Suspended" | "Pending";
  company?: string;
  title?: string;
}

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  signIn: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const sessionUser = await getCurrentUser();
      setUser(sessionUser);
      setStatus(sessionUser ? "authenticated" : "unauthenticated");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to verify your session.";
      setError(message);
      setStatus("unauthenticated");
      console.error("Failed to load the current Auth.js session.", cause);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const signIn = useCallback(async (redirectTo = "/dashboard") => {
    const callbackUrl = new URL(redirectTo, window.location.origin);
    if (callbackUrl.origin !== window.location.origin) {
      throw new Error("Sign-in redirects must stay on this application.");
    }
    const csrfResponse = await fetch("/api/auth/csrf");
    if (!csrfResponse.ok) throw new Error("Unable to start secure Google sign-in.");
    const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/auth/signin/google";
    form.hidden = true;
    for (const [name, value] of [
      ["csrfToken", csrfToken],
      ["callbackUrl", callbackUrl.toString()],
    ] as const) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.append(input);
    }
    document.body.append(form);
    form.submit();
  }, []);

  const signOut = useCallback(async () => {
    const csrfResponse = await fetch("/api/auth/csrf");
    if (!csrfResponse.ok) throw new Error("Unable to start sign out. Please try again.");
    const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ csrfToken, callbackUrl: window.location.origin }),
    });
    if (!response.ok) throw new Error("Sign out failed. Please try again.");
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      error,
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated" && user !== null,
      isAdmin: status === "authenticated" && user?.role === "admin",
      refresh,
      signIn,
      signOut,
    }),
    [user, status, error, refresh, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
