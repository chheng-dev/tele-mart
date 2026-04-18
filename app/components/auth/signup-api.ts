/**
 * Model (client): thin calls to Better Auth; normalized results for the controller.
 */

import { authClient } from "@/lib/auth-client";

import type { SignupFormValues } from "./signup-schema";

export type SignUpEmailResult = { ok: true } | { ok: false; message: string };

export async function signUpWithEmail(values: SignupFormValues): Promise<SignUpEmailResult> {
  const { error } = await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
  });

  if (error) {
    return {
      ok: false,
      message: error.message ?? "Could not create account.",
    };
  }

  return { ok: true };
}
