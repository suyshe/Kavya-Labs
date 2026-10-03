import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { getAdminUsers, updateAdminUserRole } from "@/lib/auth.functions";
import { useAuth, type UserRole } from "@/lib/auth";

export const Route = createFileRoute("/admin/users")({
  loader: () => getAdminUsers(),
  pendingComponent: UsersLoading,
  errorComponent: UsersLoadError,
  head: () => ({ meta: [{ title: "Users — Kavya Labs Admin" }] }),
  component: UserManagement,
});

function UsersLoading() {
  return (
    <div aria-busy="true" role="status" className="space-y-5">
      <span className="sr-only">Loading the user directory</span>
      <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
      <div className="h-16 animate-pulse rounded-2xl bg-card" />
      <div className="h-72 animate-pulse rounded-2xl bg-card" />
    </div>
  );
}

function UsersLoadError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
      <h1 className="text-lg font-bold">The user directory could not be loaded.</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}

function UserManagement() {
  const users = Route.useLoaderData();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const filteredUsers = useMemo(
    () =>
      users.filter((person) => {
        const matchesQuery = `${person.name} ${person.email}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (statusFilter === "All statuses" || person.status === statusFilter);
      }),
    [users, query, statusFilter],
  );

  const changeRole = async (email: string, role: UserRole) => {
    setError("");
    setPendingEmail(email);
    try {
      await updateAdminUserRole({ data: { email, role } });
      await router.invalidate();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update this user's role.");
    } finally {
      setPendingEmail(null);
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Directory</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Users</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review workspace members and manage access levels.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary sm:self-auto">
          <Users aria-hidden="true" className="h-4 w-4" />
          {users.length} members
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <label className="relative block w-full sm:max-w-xs">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <span className="sr-only">Search users</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or email"
              className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>All statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </label>
        </div>

        {error ? (
          <p
            role="alert"
            className="m-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-bold">
                  Member
                </th>
                <th scope="col" className="px-5 py-3 font-bold">
                  Role
                </th>
                <th scope="col" className="px-5 py-3 font-bold">
                  Join date
                </th>
                <th scope="col" className="px-5 py-3 font-bold">
                  Status
                </th>
                <th scope="col" className="px-5 py-3 text-right font-bold">
                  Access
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filteredUsers.map((person) => {
                const isCurrentUser =
                  person.email.toLowerCase() === currentUser?.email.toLowerCase();
                return (
                  <tr key={person.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{person.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{person.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${person.role === "admin" ? "bg-amber-500/15 text-amber-700 dark:text-amber-300" : "bg-primary/10 text-primary"}`}
                      >
                        {person.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {new Date(person.createdAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${person.status === "Active" ? "bg-emerald-500" : person.status === "Pending" ? "bg-amber-500" : "bg-muted-foreground"}`}
                        />
                        {person.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <label>
                        <span className="sr-only">Role for {person.name}</span>
                        <select
                          value={person.role}
                          disabled={isCurrentUser || pendingEmail !== null}
                          onChange={(event) =>
                            void changeRole(person.email, event.target.value as UserRole)
                          }
                          className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                          title={isCurrentUser ? "You cannot change your own role" : undefined}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredUsers.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Users aria-hidden="true" className="mx-auto h-8 w-8 text-muted-foreground/60" />
              <p className="mt-3 text-sm font-semibold">No users found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try another name, email, or status.
              </p>
            </div>
          ) : null}
        </div>
        <div className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
          Role changes are verified on the server. Demo directory changes last only for the lifetime
          of the application process.
        </div>
      </section>
    </div>
  );
}
