import { Auth, type AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";
import type { User, UserRole } from "@/lib/auth";

const readEnv = (name: string): string | undefined => {
  const runtime = globalThis as typeof globalThis & {
    process?: { env: Record<string, string | undefined> };
  };
  return runtime.process?.env[name];
};
const authSecret = readEnv("AUTH_SECRET");

const demoUsers: User[] = [
  {
    id: "usr_001",
    name: "Dr. Kavya Nair",
    email: "admin@kavyalabs.ai",
    role: "admin",
    createdAt: "2025-01-15T09:00:00.000Z",
    status: "Active",
    company: "Kavya Labs",
    title: "Founder & Chief AI Scientist",
  },
  {
    id: "usr_002",
    name: "Arjun Verma",
    email: "arjun@kavyalabs.ai",
    role: "user",
    createdAt: "2025-03-10T14:30:00.000Z",
    status: "Active",
    company: "Kavya Labs",
    title: "Machine Learning Engineer",
  },
  {
    id: "usr_003",
    name: "Ananya Rao",
    email: "ananya.rao@fintechcorp.in",
    role: "user",
    createdAt: "2025-04-02T10:15:00.000Z",
    status: "Active",
    company: "FintechCorp India",
    title: "Head of Algorithmic Trading",
  },
  {
    id: "usr_004",
    name: "Vikram Sengupta",
    email: "vikram@bengaluru-ventures.ai",
    role: "admin",
    createdAt: "2025-02-18T16:20:00.000Z",
    status: "Active",
    company: "Bengaluru DeepTech Fund",
    title: "Partner & Systems Auditor",
  },
  {
    id: "usr_005",
    name: "Priya Sundaram",
    email: "priya@logisticsmesh.io",
    role: "user",
    createdAt: "2025-05-12T11:45:00.000Z",
    status: "Active",
    company: "LogisticsMesh Global",
    title: "Supply Chain Operations Lead",
  },
  {
    id: "usr_006",
    name: "Rohan Deshmukh",
    email: "rohan@indussystems.org",
    role: "user",
    createdAt: "2025-06-25T08:30:00.000Z",
    status: "Pending",
    company: "Indus Systems",
    title: "Enterprise Solutions Architect",
  },
  {
    id: "usr_007",
    name: "Neha Kulkarni",
    email: "neha@healthbotics.ai",
    role: "user",
    createdAt: "2025-07-04T13:10:00.000Z",
    status: "Active",
    company: "HealthBotics Research",
    title: "Chief Medical Informaticist",
  },
  {
    id: "usr_008",
    name: "Siddharth Iyer",
    email: "siddharth@cloudmesh.in",
    role: "user",
    createdAt: "2025-08-19T17:00:00.000Z",
    status: "Suspended",
    company: "CloudMesh Infra",
    title: "DevOps Director",
  },
];

const roleOverrides = new Map<string, UserRole>();
const knownUsers = new Map(demoUsers.map((user) => [user.email.toLowerCase(), user]));

export function isGoogleOAuthConfigured() {
  return Boolean(
    readEnv("AUTH_GOOGLE_ID") && readEnv("AUTH_GOOGLE_SECRET") && readEnv("AUTH_SECRET"),
  );
}

function getRole(email: string | null | undefined): UserRole {
  if (!email) return "user";
  const normalizedEmail = email.toLowerCase();
  const override = roleOverrides.get(normalizedEmail);
  if (override) return override;
  const admins = (readEnv("ADMIN_EMAILS") ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(normalizedEmail) ? "admin" : "user";
}

export const authConfig: AuthConfig = {
  providers: [
    Google({
      clientId: readEnv("AUTH_GOOGLE_ID") ?? "",
      clientSecret: readEnv("AUTH_GOOGLE_SECRET") ?? "",
    }),
  ],
  basePath: "/api/auth",
  ...(authSecret ? { secret: authSecret } : {}),
  trustHost: true,
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      token["role"] = getRole(token.email);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const authUser = session.user as typeof session.user & {
          role?: UserRole;
          createdAt?: string;
          status?: User["status"];
        };
        const email = authUser.email?.toLowerCase() ?? "";
        const known = knownUsers.get(email);
        const role = getRole(email);
        authUser.id = token.sub ?? email;
        authUser.role = role;
        if (known) {
          authUser.createdAt = known.createdAt;
          authUser.status = known.status;
        } else {
          knownUsers.set(email, {
            id: token.sub ?? email,
            name: authUser.name ?? "Kavya Labs user",
            email,
            ...(authUser.image ? { image: authUser.image } : {}),
            role,
            createdAt: new Date().toISOString(),
            status: "Active",
          });
        }
      }
      return session;
    },
  },
};

export async function handleAuthRequest(request: Request) {
  return Auth(request, authConfig);
}

export async function getAuthenticatedUser(request: Request): Promise<User | null> {
  const hasSessionCookie = (request.headers.get("cookie") ?? "")
    .split(";")
    .some((cookie) => /^\s*(?:__Secure-)?authjs\.session-token(?:\.\d+)?=/.test(cookie));
  if (!hasSessionCookie) return null;
  if (!authSecret) {
    throw new Error("AUTH_SECRET is required to verify Auth.js sessions.");
  }

  const sessionUrl = new URL("/api/auth/session", request.url);
  const sessionRequest = new Request(sessionUrl, { headers: request.headers });
  const response = await Auth(sessionRequest, authConfig);
  if (!response.ok) {
    throw new Error(`Auth.js session verification failed (${response.status}).`);
  }
  const session = (await response.json()) as {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
      createdAt?: string;
      status?: User["status"];
    };
  };
  const current = session.user;
  if (!current?.email) return null;
  const email = current.email.toLowerCase();
  const known = knownUsers.get(email);
  const role = getRole(email);
  const name = current.name ?? known?.name ?? "Kavya Labs user";
  return {
    id: current.id ?? email,
    name,
    email,
    ...(current.image ? { image: current.image } : {}),
    role,
    createdAt: current.createdAt ?? known?.createdAt ?? new Date().toISOString(),
    status: current.status ?? known?.status ?? "Active",
    ...(known?.company ? { company: known.company } : {}),
    ...(known?.title ? { title: known.title } : {}),
  };
}

export function getAdminUsers(currentUser: User) {
  const merged = new Map(knownUsers);
  for (const user of demoUsers) merged.set(user.email.toLowerCase(), user);
  const current = merged.get(currentUser.email.toLowerCase());
  merged.set(currentUser.email.toLowerCase(), {
    ...current,
    ...currentUser,
    role: getRole(currentUser.email),
  });
  return [...merged.values()]
    .map((user) => ({ ...user, role: getRole(user.email) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function setUserRole(email: string, role: UserRole) {
  if (!knownUsers.has(email.toLowerCase())) {
    throw new Error("That user is not in the demo user directory.");
  }
  roleOverrides.set(email.toLowerCase(), role);
}
