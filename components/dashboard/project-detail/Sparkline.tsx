/** Tiny dependency-free trend line */
export function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  const w = 120;
  const h = 36;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [
    pad + (i * (w - pad * 2)) / Math.max(1, values.length - 1),
    h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2),
  ]);
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <polyline
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--brand)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={3.5} fill="var(--brand)" />
    </svg>
  );
}
