import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type HttpErrorPageProps = {
  statusCode: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function HttpErrorPage({ statusCode, title, description, actions }: HttpErrorPageProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="text-muted-foreground font-mono text-xs tracking-wide">{statusCode}</p>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {actions ? (
          <CardFooter className="flex flex-wrap gap-2 border-t pt-6">{actions}</CardFooter>
        ) : null}
      </Card>
    </div>
  );
}

export function NotFoundView() {
  return (
    <HttpErrorPage
      statusCode="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved."
      actions={
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      }
    />
  );
}
