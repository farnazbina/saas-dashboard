"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pill } from "@/features/overview/components/Pill";
import { pageWindow } from "@/utils/projects-utils";
import { cn } from "@/lib/utils";

const pageBtn =
  "flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40";

export const PAGE_SIZES = [6, 12, 24];

export function ProjectsPagination({
  page,
  totalPages,
  total,
  from,
  to,
  pageSize,
  selectedCount = 0,
  onPage,
  onPageSize,
  className,
}: {
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  pageSize: number;
  selectedCount?: number;
  onPage: (p: number) => void;
  onPageSize: (n: number) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 text-xs text-muted-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span>
          Showing <b className="text-foreground">{from}</b> to{" "}
          <b className="text-foreground">{to}</b> of{" "}
          <b className="text-foreground">{total}</b> projects
        </span>
        {selectedCount > 0 && (
          <Pill tone="brand">{selectedCount} selected</Pill>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 md:flex">
          <span>Rows per page:</span>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1 rounded-lg bg-panel px-2.5 font-medium text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
              }
            >
              {pageSize} <ChevronDown className="size-3" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-20 bg-card">
              {PAGE_SIZES.map((n) => (
                <DropdownMenuItem key={n} onClick={() => onPageSize(n)}>
                  {n}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(pageBtn, "hover:bg-muted")}
            disabled={page <= 1}
            onClick={() => onPage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden lg:inline">Previous</span>
          </button>

          <span className="px-2 sm:hidden">
            Page {page} of {totalPages}
          </span>
          <div className="hidden items-center gap-1 sm:flex">
            {pageWindow(page, totalPages).map((n, i) =>
              n === "…" ? (
                <span key={`gap-${i}`} className="px-1">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  type="button"
                  aria-current={n === page ? "page" : undefined}
                  onClick={() => onPage(n)}
                  className={cn(
                    pageBtn,
                    n === page
                      ? "bg-brand text-white"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {n}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            className={cn(pageBtn, "hover:bg-muted")}
            disabled={page >= totalPages}
            onClick={() => onPage(page + 1)}
            aria-label="Next page"
          >
            <span className="hidden lg:inline">Next</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
