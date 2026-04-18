"use client";

/**
 * Controller (client): async mutation state + navigation on success.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signInWithEmail, signInWithGoogle } from "./login-api";
import type { LoginFormValues } from "./login-schema";

export function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const result = await signInWithEmail(values);
      if (!result.ok) {
        throw new Error(result.message);
      }
    },
    onSuccess: () => {
      router.refresh();
      router.push("/admin");
    },
  });
}

export function useGoogleLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const callbackURL =
        typeof window !== "undefined" ? `${window.location.origin}/admin` : "/admin";
      const result = await signInWithGoogle({ callbackURL });
      if (!result.ok) {
        throw new Error(result.message);
      }
    },
    onSuccess: () => {
      router.refresh();
      router.push("/admin");
    },
  });
}
