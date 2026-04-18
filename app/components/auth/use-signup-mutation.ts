"use client";

/**
 * Controller (client): async mutation state + navigation on success.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signUpWithEmail } from "./signup-api";
import type { SignupFormValues } from "./signup-schema";

export function useSignupMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: SignupFormValues) => {
      const result = await signUpWithEmail(values);
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
