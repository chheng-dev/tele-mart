import type { Metadata } from "next";

import { NotFoundView } from "@/app/components/http-error-page";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFoundRoutePage() {
  return <NotFoundView />;
}
