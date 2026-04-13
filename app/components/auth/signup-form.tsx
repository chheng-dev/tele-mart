"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

import { signupFormSchema, type SignupFormValues } from "./signup-schema";
import { useGoogleLoginMutation } from "./use-login-mutation";
import { useSignupMutation } from "./use-signup-mutation";

/**
 * View: presentational shell + react-hook-form wiring; sign-up side effects live in use-signup-mutation.ts.
 */

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const signupMutation = useSignupMutation();
  const googleLoginMutation = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignupFormValues) {
    signupMutation.mutate(values, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : "Could not create your account.";
        toast.error("Sign up failed", { description: message });
      },
    });
  }

  const isSignupBusy = signupMutation.isPending;
  const isGoogleBusy = googleLoginMutation.isPending;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldContent>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={errors.name ? true : undefined}
                    {...register("name")}
                  />
                  <FieldError errors={[errors.name]} />
                </FieldContent>
              </Field>
              <Field data-invalid={errors.email ? true : undefined}>
                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                <FieldContent>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="m@example.com"
                    aria-invalid={errors.email ? true : undefined}
                    {...register("email")}
                  />
                  <FieldError errors={[errors.email]} />
                </FieldContent>
              </Field>
              <Field data-invalid={errors.password ? true : undefined}>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <FieldContent>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={errors.password ? true : undefined}
                    {...register("password")}
                  />
                  <FieldError errors={[errors.password]} />
                </FieldContent>
              </Field>
              <Field data-invalid={errors.confirmPassword ? true : undefined}>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <FieldContent>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={errors.confirmPassword ? true : undefined}
                    {...register("confirmPassword")}
                  />
                  <FieldError errors={[errors.confirmPassword]} />
                </FieldContent>
              </Field>
              <Field>
                <Button type="submit" disabled={isSignupBusy || isGoogleBusy}>
                  {isSignupBusy ? "Creating account…" : "Create account"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isSignupBusy || isGoogleBusy}
                  onClick={() =>
                    googleLoginMutation.mutate(undefined, {
                      onError: (error) => {
                        const message =
                          error instanceof Error
                            ? error.message
                            : "Could not start Google sign-in.";
                        toast.error("Google sign-up failed", { description: message });
                      },
                    })
                  }
                >
                  {isGoogleBusy ? "Redirecting…" : "Continue with Google"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
