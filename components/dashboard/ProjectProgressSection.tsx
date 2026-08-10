"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

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
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

const chartData = [
    { month: "Website Redesign", desktop: 78, fill: "var(--task-todo)" },
    { month: "Mobile App", desktop: 12, fill: "var(--task-progress)" },
    { month: "API Gateway", desktop: 45, fill: "var(--task-inreview)" },
    { month: "Dashboard v2", desktop: 38, fill: "var(--task-blocked)" },
    { month: "Auth system", desktop: 69, fill: "var(--task-todo)" },
    { month: "Payment Module", desktop: 92, fill: "var(--task-inreview)" },
]

const chartConfig = {
    desktop: {
        label: "Desktop %",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ProjectProgressSection() {
    return (
        <Card className="rounded-lg h-90">
            <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="h-90 w-full mt-8">
                <ChartContainer config={chartConfig} className="h-60 w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 20 }}
                        barCategoryGap="10px" 
                        barGap={0}
                        height={400}
                    >
                        <XAxis type="number" dataKey="desktop" />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={-50}
                            tickSize={70}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} barSize={20}> 
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}