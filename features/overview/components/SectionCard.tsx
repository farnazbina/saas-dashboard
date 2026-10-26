import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  /** No body padding: used by the table so it can run edge to edge */
  flush?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  subtitle,
  badge,
  action,
  flush,
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col rounded-2xl border bg-card text-card-foreground shadow-xs",
        !flush && "p-4 sm:p-5",
        className,
      )}
    >
      <header
        className={cn(
          "mb-4 flex items-start justify-between gap-3",
          flush && "px-4 pt-4 sm:px-5 sm:pt-5",
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[15px] font-semibold">{title}</h2>
            {badge}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function ViewAllLink({
  href = "#",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="shrink-0 text-sm font-medium text-brand-ink hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
    >
      {children}
    </a>
  );
}
