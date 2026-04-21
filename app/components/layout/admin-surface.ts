import { cn } from "@/lib/utils";

/** Base card chrome (no shadow — variants add elevation). */
export const adminSurfaceCardClass =
  "rounded-xl border border-border bg-card ring-1 ring-border/40";

export function adminSurfaceListCardClass(className?: string) {
  return cn(adminSurfaceCardClass, "gap-0 overflow-hidden p-0 shadow-sm", className);
}

/** Form shell: use with `CardContent` for padding (full Card composition). */
export function adminSurfaceFormCardClass(className?: string) {
  return cn(adminSurfaceCardClass, "gap-0 overflow-hidden rounded-2xl py-0 shadow-md", className);
}

/** Muted panel for form sidebars / tips (FormPage `sidePanel`). */
export function adminSurfaceInfoCardClass(className?: string) {
  return cn(adminSurfaceCardClass, "gap-0 rounded-2xl bg-muted/30 py-0 shadow-sm", className);
}

/** Shared padding for form and info cards when using `CardContent`. */
export const adminSurfaceFormCardContentClass = "px-4 py-5 sm:px-6 sm:py-6";
