"use client";

import { Copy, Link2, MoreVertical, Archive, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProjectActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="More project actions"
          />
        }
      >
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem>
          <Link2 className="size-4" /> Copy link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="size-4" /> Duplicate project
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive className="size-4" /> Archive
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-danger-ink">
          <Trash2 className="size-4" /> Delete project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
