"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createCategory } from "./actions";
import { categoryKeys } from "./query-keys";

/**
 * Controller (client): async mutation state + cache invalidation + navigation on success.
 */
export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (result) => {
      if (!result.ok) {
        return;
      }
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      router.push("/admin/categories");
    },
  });
}
