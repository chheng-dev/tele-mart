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
    title: "Categories",
    items: [{ label: "Categories", href: "/admin/categories", icon: "folder" }],
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
    <div className="flex flex-col gap-6 px-3 py-4">
      {adminNavGroups.map((group, index) => (
        <NavGroup
          key={group.title}
          group={group}
          pathname={pathname}
          onNavigate={onNavigate}
          withSeparator={index > 0}
        />
      ))}
    </div>
  );
}

function NavGroup({
  group,
  pathname,
  onNavigate,
  withSeparator,
}: {
  group: AdminNavGroup;
  pathname: string;
  onNavigate?: () => void;
  withSeparator?: boolean;
}) {
  return (
    <section
      className={cn("flex flex-col gap-2", withSeparator && "border-t border-border/50 pt-4")}
    >
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
    </section>
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
          navItemClass({ active: childActive }),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
        )}
        aria-expanded={open}
      >
        <Icon className={iconClass({ active: childActive })} aria-hidden />
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
        <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l border-border/60 pl-3">
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
      <span className={navItemClass({ nested, disabled: true })}>
        <Icon className={iconClass({ disabled: true })} aria-hidden />
        <span className="truncate">{item.label}</span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={navItemClass({ active, nested })}
      aria-current={active ? "page" : undefined}
    >
      <Icon className={iconClass({ active })} aria-hidden />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function navItemClass({
  active,
  nested,
  disabled,
}: {
  active?: boolean;
  nested?: boolean;
  disabled?: boolean;
}) {
  return cn(
    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
    nested && "text-[13px]",
    disabled && "text-muted-foreground/60",
    !disabled && "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
    active && "bg-muted text-foreground shadow-sm",
  );
}

function iconClass({ active, disabled }: { active?: boolean; disabled?: boolean }) {
  return cn(
    "size-4 shrink-0",
    disabled ? "opacity-45" : active ? "text-foreground opacity-100" : "opacity-90",
  );
}
