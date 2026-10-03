import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getCurrentUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({ to: "/login", search: { redirect: "/admin" } });
    }
    if (user.role !== "admin") throw redirect({ to: "/dashboard" });
  },
  component: AdminLayout,
});
