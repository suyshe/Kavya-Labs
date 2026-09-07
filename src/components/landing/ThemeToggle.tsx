import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lifeos-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored ? stored === "dark" : prefers);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => {
        const next = !dark;
        setDark(next);
        localStorage.setItem("lifeos-theme", next ? "dark" : "light");
      }}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card/60 text-foreground transition-colors hover:bg-secondary"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
