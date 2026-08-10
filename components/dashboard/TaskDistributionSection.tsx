"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
    { browser: "To Do", visitors: 7, fill: "var(--task-todo)" },
    { browser: "In Progress", visitors: 23, fill: "var(--task-progress)" },
    { browser: "In Review", visitors: 34, fill: "var(--task-inreview)" },
    { browser: "Done", visitors: 67, fill: "var(--task-done)" },
    { browser: "Blocked", visitors: 19, fill: "var(--task-blocked)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    "To Do": {
        label: "To Do",
        color: "var(--task-todo)",
    },
    "In Progress": {
        label: "In Progress",
        color: "var(--task-progress)",
    },
    "In Review": {
        label: "In Review",
        color: "var(--task-inreview)",
    },
    "Blocked": {
        label: "Blocked",
        color: "var(--task-blocked)",
    },
    "Done": {
        label: "Done",
        color: "var(--task-done)",
    },
} satisfies ChartConfig

export function TaskDistributionSection() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-col h-90 rounded-lg">
            <CardHeader className="items-center pb-0">
                <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-85 -mt-8"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={90}
                            strokeWidth={4}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={props.dominantBaseline}
                                        fill="var(--foreground)"
                                    >
                                        {payload.visitors} %
                                    </text>
                                )
                            }}
                            labelLine={false}

                        >
                            <Label
                                
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Tasks
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="browser" />}
                            className="text-black -translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
