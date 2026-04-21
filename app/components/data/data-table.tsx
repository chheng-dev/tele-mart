import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { ReactNode } from "react";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
};

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string | number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyState?: ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
  onRowClick?: (row: T) => void;
  className?: string;
};

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function DataTable<T>({
  data,
  columns,
  rowKey,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting your search or filters.",
  emptyState,
  isLoading = false,
  skeletonRows = 6,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const visibleColumns = columns;
  const columnCount = visibleColumns.length;

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          {visibleColumns.map((col) => (
            <TableHead
              key={col.id}
              className={cn(alignClass[col.align ?? "left"], col.headerClassName)}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: skeletonRows }).map((_, rowIndex) => (
            <TableRow key={`skeleton-${rowIndex}`} className="hover:bg-transparent">
              {visibleColumns.map((col) => (
                <TableCell key={col.id} className={col.className}>
                  <Skeleton className="h-4 w-full max-w-[220px]" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : data.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columnCount} className="py-16">
              {emptyState ?? (
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted/70 text-muted-foreground">
                    <Inbox className="size-5" />
                  </div>
                  <p className="text-sm font-medium">{emptyTitle}</p>
                  <p className="text-sm text-muted-foreground">{emptyDescription}</p>
                </div>
              )}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {visibleColumns.map((col) => (
                <TableCell
                  key={col.id}
                  className={cn(alignClass[col.align ?? "left"], col.className)}
                >
                  {col.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
