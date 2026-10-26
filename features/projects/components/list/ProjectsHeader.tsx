"use client";

import { ChevronDown, Download, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pill } from "@/features/overview/components/Pill";

export function ProjectsHeader({
  total,
  onCreate,
}: {
  total: number;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Projects
          </h1>
          <Pill tone="neutral" className="font-mono">
            {total} projects
          </Pill>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your projects, track progress, and keep your team aligned.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2 bg-card" />
            }
          >
            <Download className="size-4" />
            Import Projects
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>From CSV</DropdownMenuItem>
            <DropdownMenuItem>From Trello</DropdownMenuItem>
            <DropdownMenuItem>From Jira</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          onClick={onCreate}
          className="gap-2 bg-brand text-white hover:bg-brand/90"
        >
          <Plus className="size-4" />
          Create Project
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                className="bg-card"
                aria-label="More actions"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>View archived</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
