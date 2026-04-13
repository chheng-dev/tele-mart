import type { ReactNode } from "react";
import { SessionProvider } from "./components/auth/session-provider";
import { QueryProvider } from "./components/providers/query-provider";
import "./globals.css";

export const metadata = {
  title: "TeleMart Admin",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SessionProvider>{children}</SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
