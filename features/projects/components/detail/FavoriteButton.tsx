"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function FavoriteButton({ initial }: { initial: boolean }) {
  const [on, setOn] = React.useState(initial);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Remove from favorites" : "Add to favorites"}
      onClick={() => setOn((v) => !v)}
      className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
    >
      <Star
        className={cn(
          "size-5",
          on ? "fill-warning text-warning" : "text-muted-foreground",
        )}
      />
    </button>
  );
}
