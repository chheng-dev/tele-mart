"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

import { loginFormSchema, type LoginFormValues } from "./login-schema";
import { useGoogleLoginMutation, useLoginMutation } from "./use-login-mutation";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const loginMutation = useLoginMutation();
  const googleLoginMutation = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : "Could not sign in.";
        toast.error("Sign-in failed", { description: message });
      },
    });
  }

  const isEmailBusy = loginMutation.isPending;
  const isGoogleBusy = googleLoginMutation.isPending;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Field data-invalid={errors.email ? true : undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  aria-invalid={errors.email ? true : undefined}
                  {...register("email")}
                />
                {errors.email?.message ? (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field data-invalid={errors.password ? true : undefined}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={errors.password ? true : undefined}
                  {...register("password")}
                />
                {errors.password?.message ? (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field>
                <Button type="submit" disabled={isEmailBusy || isGoogleBusy}>
                  {isEmailBusy ? "Signing in…" : "Login"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isEmailBusy || isGoogleBusy}
                  onClick={() =>
                    googleLoginMutation.mutate(undefined, {
                      onError: (error) => {
                        const message =
                          error instanceof Error
                            ? error.message
                            : "Could not start Google sign-in.";
                        toast.error("Google sign-in failed", { description: message });
                      },
                    })
                  }
                >
                  {isGoogleBusy ? "Redirecting…" : "Login with Google"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
