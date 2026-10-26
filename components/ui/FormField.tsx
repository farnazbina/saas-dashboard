import { cn } from "@/lib/utils";

/** Shared look for inputs, textareas and select triggers */
export const controlClass =
  "h-10 w-full rounded-lg border border-transparent bg-panel px-3 text-sm outline-none transition-shadow " +
  "placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand/30 " +
  "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/25";

export function Field({
  id,
  htmlFor,
  label,
  required,
  hint,
  error,
  aside,
  className,
  children,
}: {
  /** Base id: error/hint get `${id}-error` / `${id}-hint`; label span gets `${id}-label` */
  id: string;
  /** Pass for single controls; omit for composite controls (they use aria-labelledby) */
  htmlFor?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const text = (
    <>
      {label}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden>
          *
        </span>
      )}
    </>
  );
  return (
    <div className={cn("min-w-0 space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="text-[13px] font-semibold">
            {text}
          </label>
        ) : (
          <span id={`${id}-label`} className="text-[13px] font-semibold">
            {text}
          </span>
        )}
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger-ink">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
