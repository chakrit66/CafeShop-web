import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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
} from "@/components/ui/chart"
import useCafeStore from "@/store/cafe-store";
import { getBestSellingByType } from "@/api/dashboard";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}
const BestSellingByType = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const [chartData, setData] = useState([]);

  useEffect(() => {
    getBestSellingByType(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 21,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total_sold" fill="var(--color-edge)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BestSellingByType;
