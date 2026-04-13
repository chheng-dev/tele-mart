import type { Metadata } from "next";
import Link from "next/link";

import { HttpErrorPage } from "@/app/components/http-error-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Forbidden",
};

export default function ForbiddenPage() {
  return (
    <HttpErrorPage
      statusCode="403"
      title="Forbidden"
      description="You don't have permission to view this page. Contact an administrator if you need access."
      actions={
        <>
          <Button asChild variant="default">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin">Dashboard</Link>
          </Button>
        </>
      }
    />
  );
}
