/**
 * Model (client): thin calls to Better Auth; normalized results for the controller.
 */

import { authClient } from "@/lib/auth-client";

import type { LoginFormValues } from "./login-schema";

export type SignInEmailResult = { ok: true } | { ok: false; message: string };

export async function signInWithEmail(values: LoginFormValues): Promise<SignInEmailResult> {
  const { error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return {
      ok: false,
      message: error.message ?? "Could not sign in.",
    };
  }

  return { ok: true };
}

export type SignInSocialResult = { ok: true } | { ok: false; message: string };

export async function signInWithGoogle(options: {
  callbackURL: string;
}): Promise<SignInSocialResult> {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: options.callbackURL,
  });

  if (error) {
    return {
      ok: false,
      message: error.message ?? "Could not start Google sign-in.",
    };
  }

  return { ok: true };
}
