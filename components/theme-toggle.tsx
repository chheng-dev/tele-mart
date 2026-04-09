"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const cycle = () => {
    const next = isDark ? "light" : "dark";
    const apply = () => setTheme(next);
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative shrink-0 overflow-hidden"
      onClick={cycle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted ? isDark : undefined}
    >
      <Sun
        className={`absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ease-out ${
          mounted && isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ease-out ${
          mounted && isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
        aria-hidden
      />
    </Button>
  );
}
