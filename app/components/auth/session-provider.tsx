"use client";

import { authClient } from "@/lib/auth-client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function SessionProvider({ children }: Props) {
  authClient.useSession();

  return <>{children}</>;
}
