"use client";

import * as React from "react";
import {
  CalendarDays,
  ChevronDown,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function OverviewHeader({ userName }: { userName: string }) {
  // Time-based greeting without a hydration mismatch (server renders the fallback)
  const greeting = React.useSyncExternalStore(
    () => () => {},
    getGreeting,
    () => "Welcome back",
  );
  const [range, setRange] = React.useState(RANGES[1]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {userName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&rsquo;s what&rsquo;s happening with your projects today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2 bg-card" />
            }
          >
            <CalendarDays className="size-4" />
            {range}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {RANGES.map((r) => (
              <DropdownMenuItem key={r} onClick={() => setRange(r)}>
                {r}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="gap-2 bg-card">
          <SlidersHorizontal className="size-4" />
          Filter
        </Button>

        <Button
          size="sm"
          className="gap-2 bg-primary text-white hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
}
