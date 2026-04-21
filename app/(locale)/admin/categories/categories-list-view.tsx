"use client";

import { DataTable, type DataTableColumn } from "@/app/components/data/data-table";
import { DataTablePagination } from "@/app/components/data/data-table-pagination";
import { useUrlListState } from "@/app/components/data/url-state";
import { ListPage } from "@/app/components/layout/list-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CategoryRow } from "@/lib/api/repositories/categories.repository";
import { AlertCircle, MoreHorizontal, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useCategoriesQuery } from "./use-categories-query";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type ColumnId = "name" | "description" | "createdAt" | "actions";

const initialVisibility: Record<ColumnId, boolean> = {
  name: true,
  description: true,
  createdAt: true,
  actions: true,
};

export function CategoriesListView() {
  const router = useRouter();
  const url = useUrlListState({ defaultLimit: 10, defaultTab: "all" });
  const page = url.page;
  const limit = Math.min(url.limit, 100);
  const q = url.q;

  const { data, error, isFetching } = useCategoriesQuery({
    page,
    limit,
    q,
  });

  const rows = data?.items ?? [];
  const total = data?.pagination.count ?? 0;
  const isTableLoading = isFetching && data === undefined;

  const [visibility] = React.useState<Record<string, boolean>>(initialVisibility);

  const allColumns = React.useMemo<DataTableColumn<CategoryRow>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        cell: (row) => (
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
              aria-hidden
            >
              <Tag className="size-4" />
            </span>
            <span className="truncate text-sm font-medium">{row.name}</span>
          </div>
        ),
        className: "max-w-[280px]",
      },
      {
        id: "description",
        header: "Description",
        cell: (row) => (
          <p className="line-clamp-2 max-w-[520px] text-sm text-muted-foreground">
            {row.description ?? "—"}
          </p>
        ),
      },
      {
        id: "createdAt",
        header: "Created",
        cell: (row) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
            {dateFormatter.format(new Date(row.createdAt))}
          </span>
        ),
        className: "w-[150px]",
      },
      {
        id: "actions",
        header: <span className="sr-only">Actions</span>,
        align: "right",
        className: "w-[60px]",
        cell: (row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${row.name}`}
                onClick={(event) => event.stopPropagation()}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild className="gap-2">
                <Link href={`/admin/categories/${row.id}/edit`}>
                  <Pencil className="size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" disabled className="gap-2">
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  const visibleColumns = React.useMemo(
    () => allColumns.filter((col) => visibility[col.id] ?? true),
    [allColumns, visibility],
  );

  const emptyState = (
    <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted/70 text-muted-foreground">
        <Tag className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{q ? "No matching categories" : "No categories yet"}</p>
        <p className="text-sm text-muted-foreground">
          {q ? "Try a different search term." : "Create your first category to get started."}
        </p>
      </div>
      {!q ? (
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="size-4" />
            Add category
          </Link>
        </Button>
      ) : null}
    </div>
  );

  return (
    <ListPage
      title="Categories"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Categories", href: "/admin/categories" },
      ]}
      description="Manage the categories in your catalog."
      icon={<Tag />}
      badge={
        <Badge variant="secondary" className="tabular-nums">
          {isFetching && data === undefined ? "—" : total}
        </Badge>
      }
      actions={
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="size-4" />
            Add category
          </Link>
        </Button>
      }
      table={
        error ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Could not load categories</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          <DataTable<CategoryRow>
            data={rows}
            columns={visibleColumns}
            rowKey={(row) => row.id}
            emptyState={emptyState}
            isLoading={isTableLoading}
            onRowClick={(row) => router.push(`/admin/categories/${row.id}/edit`)}
          />
        )
      }
      pagination={
        <DataTablePagination
          page={page}
          pageSize={limit}
          total={total}
          onPageChange={url.setPage}
          onPageSizeChange={url.setLimit}
        />
      }
    />
  );
}
