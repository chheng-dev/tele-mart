import { SignupForm } from "@/app/components/auth/signup-form";
import { auth } from "@/lib/auth";
import { safeInternalPath } from "@/lib/safe-internal-path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const { from } = await searchParams;
    const target = safeInternalPath(from);
    redirect(target ?? "/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
