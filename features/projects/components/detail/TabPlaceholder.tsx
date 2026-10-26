import { TABS, type TabId } from "./ProjectTabs";

export function TabPlaceholder({ tab }: { tab: TabId }) {
  const current = TABS.find((t) => t.id === tab)!;
  const Icon = current.icon;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
        <Icon className="size-6" aria-hidden />
      </span>
      <h2 className="text-base font-semibold">{current.label}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        This section isn&rsquo;t built yet. It will live here.
      </p>
    </div>
  );
}
