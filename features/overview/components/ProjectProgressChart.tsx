"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PROGRESS_AVERAGE, PROGRESS_SERIES } from "@/data/overview-data";
import { Pill } from "./Pill";
import { SectionCard } from "./SectionCard";

type Point = {
  label: string;
  value: number;
  delta: number | null;
  prev: string | null;
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Point }[];
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg bg-foreground px-3 py-2 text-center text-xs text-background shadow-lg">
      <div className="font-mono font-semibold">{p.value}% Completed</div>
      {p.delta !== null && (
        <div className="font-mono text-emerald-400 dark:text-emerald-600">
          {p.delta >= 0 ? "+" : ""}
          {p.delta}% vs {p.prev}
        </div>
      )}
    </div>
  );
}

export function ProjectProgressChart({ className }: { className?: string }) {
  const data = React.useMemo<Point[]>(
    () =>
      PROGRESS_SERIES.map((d, i) => ({
        ...d,
        delta: i ? d.value - PROGRESS_SERIES[i - 1].value : null,
        prev: i ? PROGRESS_SERIES[i - 1].label : null,
      })),
    [],
  );

  return (
    <SectionCard
      title="Project Progress"
      subtitle="Workspace completion trajectory"
      action={
        <Pill tone="brand" className="rounded-md font-mono">
          Avg: {PROGRESS_AVERAGE}%
        </Pill>
      }
      className={className}
    >
      <div
        className="h-[220px] w-full sm:h-[260px]"
        role="img"
        aria-label="Line chart of workspace completion over time"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 28, right: 12, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="progress-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 4"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[25, 100]}
              ticks={[25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              content={<ChartTooltip />}
              defaultIndex={4}
              cursor={{
                stroke: "var(--brand)",
                strokeDasharray: "3 3",
                strokeOpacity: 0.4,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand)"
              strokeWidth={2}
              fill="url(#progress-fill)"
              dot={{
                r: 3,
                fill: "var(--card)",
                stroke: "var(--brand)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "var(--brand)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
