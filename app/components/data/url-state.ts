"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

type UseUrlListStateOptions = {
  defaultLimit?: number;
  defaultTab?: string;
};

export type UrlListState = {
  page: number;
  limit: number;
  q: string;
  tab: string | undefined;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setQ: (q: string) => void;
  setTab: (tab: string) => void;
};

function parsePositive(raw: string | null, fallback: number): number {
  if (raw === null || raw === "") return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function useUrlListState({
  defaultLimit = 10,
  defaultTab,
}: UseUrlListStateOptions = {}): UrlListState {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePositive(searchParams.get("page"), 1);
  const limit = parsePositive(searchParams.get("limit"), defaultLimit);
  const q = searchParams.get("q") ?? "";
  const tab = searchParams.get("tab") ?? defaultTab;

  const push = React.useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const setPage = React.useCallback(
    (nextPage: number) => {
      push((params) => {
        if (nextPage <= 1) params.delete("page");
        else params.set("page", String(nextPage));
      });
    },
    [push],
  );

  const setLimit = React.useCallback(
    (nextLimit: number) => {
      push((params) => {
        if (nextLimit === defaultLimit) params.delete("limit");
        else params.set("limit", String(nextLimit));
        params.delete("page");
      });
    },
    [push, defaultLimit],
  );

  const setQ = React.useCallback(
    (nextQ: string) => {
      push((params) => {
        const trimmed = nextQ.trim();
        if (trimmed === "") params.delete("q");
        else params.set("q", trimmed);
        params.delete("page");
      });
    },
    [push],
  );

  const setTab = React.useCallback(
    (nextTab: string) => {
      push((params) => {
        if (!nextTab || nextTab === defaultTab) params.delete("tab");
        else params.set("tab", nextTab);
        params.delete("page");
      });
    },
    [push, defaultTab],
  );

  return { page, limit, q, tab, setPage, setLimit, setQ, setTab };
}
