"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  isCollapsibleNavItem,
  type AdminNavCollapsibleItem,
  type AdminNavGroup,
  type AdminNavItem,
  type AdminNavLeafItem,
} from "./types";

const navIconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  settings: Settings,
  message: MessageSquare,
  folder: FolderOpen,
} as const;

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Dashboard",
    items: [{ label: "CRM Dashboard", href: "/admin", icon: "dashboard" }],
  },
  {
    title: "Pages",
    items: [
      {
        label: "Administration",
        icon: "folder",
        items: [
          { label: "Users", href: "/admin/users", icon: "users" },
          { label: "Settings", href: "/admin/settings", icon: "settings" },
        ],
      },
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

function isCollapsibleGroupActive(pathname: string, item: AdminNavCollapsibleItem) {
  return item.items.some((child) => isNavActive(pathname, child.href));
}

export function AdminShellNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-0 px-3 py-4">
      {adminNavGroups.map((group, index) => (
        <div key={group.title} className={cn(index > 0 && "mt-6")}>
          <div className="space-y-2">
            <p className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/90">
              {group.title}
            </p>
            <nav className="flex flex-col gap-1" aria-label={group.title}>
              {group.items.map((item) => (
                <AdminShellNavItem
                  key={navItemKey(item)}
                  item={item}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              ))}
            </nav>
          </div>
        </div>
      ))}
    </div>
  );
}

function navItemKey(item: AdminNavItem): string {
  if (isCollapsibleNavItem(item)) {
    return `collapsible:${item.label}`;
  }
  return item.href + item.label;
}

function AdminShellNavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  if (isCollapsibleNavItem(item)) {
    return <AdminShellNavCollapsible item={item} pathname={pathname} onNavigate={onNavigate} />;
  }
  return <AdminShellNavLink item={item} pathname={pathname} onNavigate={onNavigate} />;
}

function AdminShellNavCollapsible({
  item,
  pathname,
  onNavigate,
}: {
  item: AdminNavCollapsibleItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = navIconMap[item.icon];
  const childActive = isCollapsibleGroupActive(pathname, item);
  const [open, setOpen] = React.useState(childActive);

  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        type="button"
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg py-2 pr-2 pl-2.5 text-left text-sm font-medium transition-colors",
          "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
          childActive && "text-foreground",
        )}
        aria-expanded={open}
      >
        <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground/70 transition-transform duration-200",
            open && "rotate-90",
          )}
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-1 flex flex-col gap-0.5 border-l border-border/60 pl-3 ml-2.5">
          {item.items.map((child) => (
            <AdminShellNavLink
              key={child.href + child.label}
              item={child}
              pathname={pathname}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function AdminShellNavLink({
  item,
  pathname,
  onNavigate,
  nested,
}: {
  item: AdminNavLeafItem;
  pathname: string;
  onNavigate?: () => void;
  nested?: boolean;
}) {
  const Icon = navIconMap[item.icon];
  const active = isNavActive(pathname, item.href);

  if (item.href === "#") {
    return (
      <span
        className={cn(
          "flex items-center gap-2.5 rounded-lg py-2 pr-2 pl-2.5 text-sm text-muted-foreground/60",
          nested && "pl-2",
        )}
      >
        <Icon className="size-4 shrink-0 opacity-45" aria-hidden />
        <span className="truncate">{item.label}</span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "relative flex items-center gap-2.5 rounded-lg py-2 pr-2 pl-2.5 text-sm font-medium transition-colors",
        "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        active &&
          "bg-foreground text-background shadow-sm hover:bg-foreground hover:text-background dark:bg-foreground dark:text-background",
        nested && "text-[13px]",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        className={cn(
          "size-4 shrink-0",
          active ? "text-background opacity-100 dark:text-background" : "opacity-90",
        )}
        aria-hidden
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
