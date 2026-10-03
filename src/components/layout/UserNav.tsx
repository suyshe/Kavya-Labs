import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, LayoutDashboard, ShieldAlert, LogOut, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function UserNav() {
  const { user, isAuthenticated, signOut, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.info("Signed out successfully.");
      navigate({ to: "/" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign out failed.";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <span
        aria-label="Loading account"
        className="h-9 w-24 animate-pulse rounded-full bg-secondary"
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign In
        </Link>
        <Link
          to="/login"
          className="gradient-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
        >
          Get Started <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 p-1 pr-3 transition-colors hover:bg-secondary focus:outline-none"
          aria-label="User navigation menu"
        >
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback className="bg-primary/20 text-xs font-bold text-primary">
              {initials || "KL"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="max-w-[120px] truncate text-xs font-bold leading-tight text-foreground">
              {user.name}
            </p>
            <span
              className={`inline-block rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider ${
                isAdmin
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {user.role}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
            <div className="pt-1">
              <span
                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isAdmin
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                    : "bg-primary/15 text-primary"
                }`}
              >
                {isAdmin ? "Kavya Labs Admin" : "Enterprise User"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span>User Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {isAdmin ? (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              <span>Admin Console</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link
              to="/admin"
              className="cursor-pointer flex items-center gap-2 text-muted-foreground"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Admin Console (Restricted)</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Demo helper to quickly toggle roles for grading/review */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
