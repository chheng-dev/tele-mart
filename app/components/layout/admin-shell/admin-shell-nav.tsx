"use client";

import Link from "next/link";
import { LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminNavGroup, AdminNavItem } from "./types";

const navIconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  settings: Settings,
  message: MessageSquare,
} as const;

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Dashboards",
    items: [{ label: "CRM Dashboard", href: "/admin", icon: "dashboard" }],
  },
  {
    title: "Pages",
    items: [
      { label: "Users", href: "/admin/users", icon: "users" },
      { label: "Settings", href: "/admin/settings", icon: "settings" },
    ],
  },
  {
    title: "Apps",
    items: [{ label: "Inbox (soon)", href: "#", icon: "message" }],
  },
];

export function isNavActive(pathname: string, href: string) {
  if (href === "#") return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  if (href === "/admin") return normalized === "/admin";
  return normalized === href || normalized.startsWith(`${href}/`);
}

export function AdminShellNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-6 px-3 py-4">
      {adminNavGroups.map((group) => (
        <div key={group.title} className="space-y-1.5">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </p>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <AdminShellNavLink
                key={item.href + item.label}
                item={item}
                active={isNavActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}

function AdminShellNavLink({
  item,
  active,
  onNavigate,
}: {
  item: AdminNavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = navIconMap[item.icon];

  if (item.href === "#") {
    return (
      <span className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground/70">
        <Icon className="h-4 w-4 shrink-0 opacity-60" />
        <span className="truncate">{item.label}</span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
