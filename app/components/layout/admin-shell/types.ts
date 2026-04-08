export type AdminNavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "users" | "settings" | "message";
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};
