import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import type { User } from "@/lib/auth";

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getAuthenticatedUser } = await import("@/lib/auth.server");
  return getAuthenticatedUser(getRequest());
});

export const getOAuthConfiguration = createServerFn({ method: "GET" }).handler(async () => {
  const { isGoogleOAuthConfigured } = await import("@/lib/auth.server");
  return isGoogleOAuthConfigured();
});

export const getAdminUsers = createServerFn({ method: "GET" }).handler(async () => {
  const { getAuthenticatedUser, getAdminUsers: readUsers } = await import("@/lib/auth.server");
  const currentUser = await getAuthenticatedUser(getRequest());
  if (!currentUser) throw new Error("Authentication is required to access user management.");
  if (currentUser.role !== "admin") throw new Error("Administrator access is required.");
  return readUsers(currentUser);
});

const updateRoleInput = z.object({
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});

export const updateAdminUserRole = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof updateRoleInput>) => updateRoleInput.parse(input))
  .handler(async ({ data }): Promise<User[]> => {
    const {
      getAuthenticatedUser,
      getAdminUsers: readUsers,
      setUserRole,
    } = await import("@/lib/auth.server");
    const currentUser = await getAuthenticatedUser(getRequest());
    if (!currentUser) throw new Error("Authentication is required to manage user roles.");
    if (currentUser.role !== "admin") throw new Error("Administrator access is required.");
    if (currentUser.email.toLowerCase() === data.email.toLowerCase()) {
      throw new Error("You cannot change your own administrator role.");
    }
    setUserRole(data.email, data.role);
    return readUsers(currentUser);
  });
