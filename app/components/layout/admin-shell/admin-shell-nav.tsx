"use client";

import Link from "next/link";
import {
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Languages,
  LayoutTemplate,
  LayoutPanelTop,
  Notebook,
  Table2,
  Ticket,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminNavGroup, AdminNavItem } from "./types";

const navIconMap = {
  barChart: BarChart3,
  clipboard: ClipboardList,
  table: Table2,
  fileText: FileText,
  userCircle: UserCircle,
  notebook: Notebook,
  ticket: Ticket,
  languages: Languages,
  clipboardCheck: ClipboardCheck,
  layoutTemplate: LayoutTemplate,
  creditCard: CreditCard,
  panelTop: LayoutPanelTop,
} as const;

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Dashboards",
    items: [
      { label: "Analytics", href: "#", icon: "barChart" },
      { label: "CRM Dashboard", href: "/admin", icon: "clipboard" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Tables", href: "#", icon: "table" },
      { label: "Forms", href: "#", icon: "fileText" },
      { label: "User Profile", href: "/admin/users", icon: "userCircle" },
    ],
  },
  {
    title: "Apps",
    items: [
      { label: "Notes", href: "#", icon: "notebook" },
      { label: "Tickets", href: "#", icon: "ticket" },
      { label: "Blogs", href: "#", icon: "languages", hasSubmenu: true },
    ],
  },
  {
    title: "Form Elements",
    items: [
      { label: "Shadcn Forms", href: "#", icon: "clipboardCheck", hasSubmenu: true },
      { label: "Form layouts", href: "#", icon: "layoutTemplate", hasSubmenu: true },
    ],
  },
  {
    title: "Widgets",
    items: [
      { label: "Cards", href: "#", icon: "creditCard", hasSubmenu: true },
      { label: "Banners", href: "#", icon: "panelTop", hasSubmenu: true },
    ],
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
                key={`${group.title}-${item.label}`}
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
  const chevron = item.hasSubmenu ? (
    <ChevronRight
      className={cn(
        "ml-auto h-4 w-4 shrink-0",
        active ? "text-background/70" : "text-foreground/45",
      )}
      aria-hidden
    />
  ) : null;

  const baseRow =
    "flex w-full min-w-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors";

  if (item.href === "#") {
    return (
      <span
        className={cn(
          baseRow,
          "cursor-default text-foreground/90",
          "hover:bg-muted/50",
          item.hasSubmenu && "pr-2",
        )}
      >
        <Icon className="h-4 w-4 shrink-0 text-foreground/80" strokeWidth={1.75} />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {chevron}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        baseRow,
        item.hasSubmenu && "pr-2",
        active ? "bg-foreground text-background shadow-sm" : "text-foreground/90 hover:bg-muted/50",
      )}
    >
      <Icon
        className={cn("h-4 w-4 shrink-0", active ? "text-background" : "text-foreground/80")}
        strokeWidth={1.75}
      />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {chevron}
    </Link>
  );
}
