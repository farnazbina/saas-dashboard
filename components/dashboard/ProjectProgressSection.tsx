"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
    { month: "January", desktop: 186, fill: "#7a13f0" },
    { month: "February", desktop: 305, fill: "#aa7dff" },
    { month: "March", desktop: 237, fill: "#19724f" },
    { month: "April", desktop: 73, fill: "#155dfc" },
    { month: "May", desktop: 209, fill: "#00786f" },
    { month: "June", desktop: 214, fill: "#ff6b6b" },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
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
                        margin={{ left: -20 }}
                        barCategoryGap="10px"   // 👈 change this
                        barGap={0}
                        height={400}
                    >
                        <XAxis type="number" dataKey="desktop"  />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={6}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        // ❌ Remove height prop from YAxis – it doesn't affect bars
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="color"          // 👈 reads color from each data item
                            radius={5}
                            barSize={20}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}