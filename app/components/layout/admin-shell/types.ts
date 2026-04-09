export type AdminNavIcon =
  | "barChart"
  | "clipboard"
  | "table"
  | "fileText"
  | "userCircle"
  | "notebook"
  | "ticket"
  | "languages"
  | "clipboardCheck"
  | "layoutTemplate"
  | "creditCard"
  | "panelTop";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminNavIcon;
  /** Show chevron; submenu is visual-only until routes exist */
  hasSubmenu?: boolean;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};
