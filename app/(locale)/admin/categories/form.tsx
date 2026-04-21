"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createCategory, updateCategory } from "./actions";
import { categoryFormSchema, type CategoryFormValues } from "./category-schema";
import { categoryKeys } from "./query-keys";

export type CategoryFormProps = {
  mode?: "create" | "edit";
  categoryId?: number;
  defaultValues?: Partial<CategoryFormValues>;
};

export function CategoryForm({ mode = "create", categoryId, defaultValues }: CategoryFormProps) {
  const [rootMessage, setRootMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const saveMutation = useMutation({
    mutationFn: async (data: CategoryFormValues) => {
      if (mode === "edit" && categoryId != null) {
        return updateCategory(categoryId, data);
      }
      return createCategory(data);
    },
    onSuccess: (result) => {
      if (!result.ok) {
        return;
      }
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      router.push("/admin/categories");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    setRootMessage(null);
    const result = await saveMutation.mutateAsync(data);
    if (!result.ok) {
      if (result.errors.name) {
        setError("name", { message: result.errors.name });
      }
      if (result.errors.root) {
        setRootMessage(result.errors.root);
      }
    }
  }

  const isPending = saveMutation.isPending;
  const submitLabel =
    mode === "edit"
      ? isPending
        ? "Saving…"
        : "Save changes"
      : isPending
        ? "Creating…"
        : "Create category";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category-name" className="gap-1 text-sm font-medium">
          Category name <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <Tag className="size-4" aria-hidden />
            <span className="sr-only">Category</span>
          </div>
          <Input
            id="category-name"
            type="text"
            placeholder="Category name"
            className="peer pl-9"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
        </div>
        {errors.name?.message ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="category-description"
          placeholder="Optional description"
          rows={4}
          aria-invalid={errors.description ? true : undefined}
          {...register("description")}
        />
        <p className="text-xs text-muted-foreground">
          Shown in the catalog where space allows. Leave blank if you only need a short label.
        </p>
        {errors.description?.message ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      {rootMessage ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Could not save</AlertTitle>
          <AlertDescription>{rootMessage}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/categories">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
