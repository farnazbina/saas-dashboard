import { FolderSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProjectsEmpty({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
        <FolderSearch className="size-6" aria-hidden />
      </span>
      <h2 className="text-base font-semibold">
        No projects match your filters
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try a different search term or remove some filters to see more projects.
      </p>
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}
