"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { LEGEND_COLUMNS, STATUS_BREAKDOWN } from "@/data/overview-data";
import { SectionCard } from "./SectionCard";

export function TasksByStatusChart({ className }: { className?: string }) {
  const total = STATUS_BREAKDOWN.reduce((sum, s) => sum + s.value, 0);

  return (
    <SectionCard
      title="Tasks by Status"
      subtitle="Distribution balance"
      className={className}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div
          className="relative h-[180px] w-[180px] shrink-0"
          role="img"
          aria-label={`Donut chart of ${total} tasks by status`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value, name) => [`${value} tasks`, name]}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                itemStyle={{ color: "var(--card-foreground)" }}
              />
              <Pie
                data={STATUS_BREAKDOWN}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={2}
                cornerRadius={4}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {STATUS_BREAKDOWN.map((s) => (
                  <Cell key={s.key} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl leading-none font-bold">{total}</span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              Total Tasks
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-6 text-xs">
          {LEGEND_COLUMNS.map((keys, i) => (
            <ul key={i} className="flex flex-col gap-2">
              {keys.map((k) => {
                const s = STATUS_BREAKDOWN.find((x) => x.key === k)!;
                return (
                  <li key={k} className="flex items-center gap-2">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: s.color }}
                      aria-hidden
                    />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-mono font-medium tabular-nums">
                      {s.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
