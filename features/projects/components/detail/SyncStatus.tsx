"use client";

import * as React from "react";
import { RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

export function SyncStatus({
  initialLabel,
  className,
}: {
  initialLabel: string;
  className?: string;
}) {
  const [label, setLabel] = React.useState(initialLabel);
  const [syncing, setSyncing] = React.useState(false);

  React.useEffect(() => {
    if (!syncing) return;
    const t = setTimeout(() => {
      setSyncing(false);
      setLabel("just now");
    }, 900);
    return () => clearTimeout(t);
  }, [syncing]);

  return (
    <div
      className={cn(
        "items-center gap-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <span aria-live="polite">Last synced {label}</span>
      <button
        type="button"
        onClick={() => setSyncing(true)}
        disabled={syncing}
        aria-label="Sync now"
        className="rounded-md p-1 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
      >
        <RefreshCw className={cn("size-3.5", syncing && "animate-spin")} />
      </button>
    </div>
  );
}
