"use client";

import { useQuery } from "@tanstack/react-query";

import type { CategoryRow } from "@/lib/api/repositories/categories.repository";

import { categoryKeys } from "./query-keys";

type CategoriesListEnvelope = {
  ok: true;
  status: number;
  message: string;
  data: {
    items: CategoryRow[];
    pagination: {
      page: number;
      limit: number;
      count: number;
      hasMore: boolean;
    };
  };
};

type CategoriesErrorEnvelope = {
  ok: false;
  status: number;
  message: string;
};

function buildCategoriesListUrl(page: number, limit: number, q: string): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  const name = q.trim();
  if (name) params.set("name", name);
  const qs = params.toString();
  return qs ? `/api/categories?${qs}` : "/api/categories";
}

export async function fetchCategoriesList(input: {
  page: number;
  limit: number;
  q: string;
}): Promise<{ items: CategoryRow[]; pagination: CategoriesListEnvelope["data"]["pagination"] }> {
  const page = Math.max(1, input.page);
  const limit = Math.min(Math.max(1, input.limit), 100);
  const url = buildCategoriesListUrl(page, limit, input.q);

  const res = await fetch(url, { credentials: "include" });
  const json = (await res.json()) as CategoriesListEnvelope | CategoriesErrorEnvelope;

  if (!res.ok || !json.ok) {
    const message = "ok" in json && !json.ok ? json.message : "Failed to load categories";
    throw new Error(message);
  }

  return {
    items: json.data.items,
    pagination: json.data.pagination,
  };
}

export function useCategoriesQuery(params: { page: number; limit: number; q: string }) {
  const page = Math.max(1, params.page);
  const limit = Math.min(Math.max(1, params.limit), 100);
  const q = params.q;

  return useQuery({
    queryKey: categoryKeys.list({ page, limit, q: q.trim() }),
    queryFn: () => fetchCategoriesList({ page, limit, q }),
    placeholderData: (previousData) => previousData,
  });
}
