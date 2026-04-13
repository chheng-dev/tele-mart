export type AdminNavIconKey = "dashboard" | "users" | "settings" | "message" | "folder";

/** Leaf link (no nested children). */
export type AdminNavLeafItem = {
  label: string;
  href: string;
  icon: AdminNavIconKey;
};

/** Collapsible parent with nested leaf links only (no deeper nesting). */
export type AdminNavCollapsibleItem = {
  label: string;
  icon: AdminNavIconKey;
  items: AdminNavLeafItem[];
};

export type AdminNavItem = AdminNavLeafItem | AdminNavCollapsibleItem;

export function isCollapsibleNavItem(item: AdminNavItem): item is AdminNavCollapsibleItem {
  return "items" in item && Array.isArray(item.items);
}

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};
