import React, { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useCafeStore from "@/store/cafe-store";
import { getProfit } from "@/api/dashboard";

const chartConfig = {
  cost: {
    label: "Cost",
    color: "hsl(var(--chart-1))", // Customize color as needed
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))", // Customize color as needed
  },
};

const LineChart_Multiple = ({ startDate, endDate, groupBy }) => {
  const [chartData, setChartData] = useState([]);
  const token = useCafeStore((s) => s.token);

  useEffect(() => {
    getProfit(token, startDate, endDate, groupBy)
      .then((res) => {
        // เรียงลำดับข้อมูลตามวันที่
        const sortedData = res.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setChartData(sortedData);
        //console.log(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, groupBy]);

  // Format the X-Axis based on the groupBy parameter
  const formatXAxis = (value) => {
    const date = new Date(value); // แปลงค่า value เป็น Date object

    if (groupBy === "day") {
      // แสดงชื่อวัน (เช่น "Mon", "Tue", "Wed")
      const options = { weekday: "short" }; // ใช้ 'short' เพื่อแสดงชื่อวันย่อ
      return date.toLocaleDateString("en-US", options); // 'th-TH'
    } else if (groupBy === "month") {
      // แสดงชื่อเดือน (เช่น "Jan", "Feb", "Mar")
      const options = { month: "short" }; // ใช้ 'short' เพื่อแสดงชื่อเดือนย่อ
      return date.toLocaleDateString("en-US", options);
    } else if (groupBy === "year") {
      // แสดงปีในรูปแบบ 'YYYY'
      return date.getFullYear();
    }

    return value;
  };

  return (
    <Card className="flex flex-col  h-full">
      <CardHeader className="items-center pb-0 ">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto max-h-[400px]  m-0"
          config={chartConfig}
        >
          <LineChart
            data={chartData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <Legend verticalAlign="bottom" align="center" />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // assuming `date` is the key for x-axis in the data
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatXAxis} // Apply dynamic formatting
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickCount={4}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="cost"
              type="monotone"
              stroke={chartConfig.cost.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke={chartConfig.revenue.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChart_Multiple;
