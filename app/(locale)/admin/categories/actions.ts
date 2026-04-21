"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { categories } from "@/db/schema/categories";
import { isUniqueViolation } from "@/lib/api/db-errors";
import { revalidatePath } from "next/cache";

import { categoryFormSchema, type CategoryFormValues } from "./category-schema";

function normalizeDescription(description: string): string | null {
  const trimmed = description.trim();
  return trimmed ? trimmed : null;
}

function toCreateFailure(err: unknown): CreateCategoryResult | UpdateCategoryResult | null {
  if (isUniqueViolation(err)) {
    return {
      ok: false,
      errors: {
        name: "A category with this name already exists.",
      },
    };
  }
  return null;
}

export type CreateCategoryResult =
  | { ok: true }
  | {
      ok: false;
      errors: { name?: string; root?: string };
    };

export type UpdateCategoryResult =
  | { ok: true }
  | {
      ok: false;
      errors: { name?: string; root?: string };
    };

export async function createCategory(input: unknown): Promise<CreateCategoryResult> {
  const parsed = categoryFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: { root: "Invalid form data." },
    };
  }

  const data: CategoryFormValues = parsed.data;
  const description = normalizeDescription(data.description);

  try {
    await db.insert(categories).values({
      name: data.name,
      description,
    });
  } catch (err) {
    const handled = toCreateFailure(err);
    if (handled) {
      return handled;
    }
    return {
      ok: false,
      errors: { root: "Could not create category." },
    };
  }

  revalidatePath("/admin/categories");
  return { ok: true };
}

export async function updateCategory(id: number, input: unknown): Promise<UpdateCategoryResult> {
  const parsed = categoryFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: { root: "Invalid form data." },
    };
  }

  const data: CategoryFormValues = parsed.data;
  const description = normalizeDescription(data.description);

  try {
    const updated = await db
      .update(categories)
      .set({
        name: data.name,
        description,
      })
      .where(eq(categories.id, id))
      .returning();
    if (!updated[0]) {
      return { ok: false, errors: { root: "Category not found." } };
    }
  } catch (err) {
    const handled = toCreateFailure(err);
    if (handled) {
      return handled;
    }
    return {
      ok: false,
      errors: { root: "Could not update category." },
    };
  }

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}/edit`);
  return { ok: true };
}
