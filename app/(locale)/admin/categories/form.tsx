"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { categoryFormSchema, type CategoryFormValues } from "./category-schema";
import { useCreateCategoryMutation } from "./use-create-category-mutation";

export function CategoryForm() {
  const [rootMessage, setRootMessage] = useState<string | null>(null);
  const createCategoryMutation = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    setRootMessage(null);
    const result = await createCategoryMutation.mutateAsync(data);
    if (!result.ok) {
      if (result.errors.name) {
        setError("name", { message: result.errors.name });
      }
      if (result.errors.root) {
        setRootMessage(result.errors.root);
      }
    }
  }

  const isPending = createCategoryMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6">
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
        <textarea
          id="category-description"
          placeholder="Optional description"
          rows={4}
          className={cn(
            "border-input bg-transparent placeholder:text-muted-foreground flex w-full min-w-0 rounded-lg border px-2.5 py-2 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            "min-h-[88px] resize-y",
          )}
          aria-invalid={errors.description ? true : undefined}
          {...register("description")}
        />
        {errors.description?.message ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      {rootMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {rootMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create category"}
        </Button>
      </div>
    </form>
  );
}
