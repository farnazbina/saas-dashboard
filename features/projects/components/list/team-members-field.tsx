"use client";

import { Plus, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PEOPLE, shortName, type Person } from "./create-project-modal";

function Dot({ person }: { person: Person }) {
  return (
    <span
      className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ background: person.color }}
      aria-hidden
    >
      {person.name[0]}
    </span>
  );
}

export function TeamMembersField({
  value,
  onChange,
  labelledBy,
}: {
  value: string[];
  onChange: (ids: string[]) => void;
  labelledBy: string;
}) {
  const members = value
    .map((id) => PEOPLE.find((p) => p.id === id))
    .filter((p): p is Person => !!p);
  const available = PEOPLE.filter((p) => !value.includes(p.id));

  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg bg-panel p-1.5"
    >
      {members.map((p) => (
        <span
          key={p.id}
          className="inline-flex items-center gap-1.5 rounded-full bg-card py-0.5 pr-1.5 pl-0.5 text-xs font-semibold ring-1 ring-border"
        >
          <Dot person={p} />
          {shortName(p.name)}
          <button
            type="button"
            aria-label={`Remove ${p.name}`}
            onClick={() => onChange(value.filter((id) => id !== p.id))}
            className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={!available.length}
          render={
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-brand-ink hover:bg-brand-soft focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            />
          }
        >
          <Plus className="size-3.5" aria-hidden /> Add
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-64 min-w-48 bg-card ">
          {available.map((p) => (
            <DropdownMenuItem
              key={p.id}
              onClick={() => onChange([...value, p.id])}
              className="gap-2"
            >
              <Dot person={p} />
              <span className="flex flex-col leading-tight">
                <span className="font-medium">{p.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {p.role}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
