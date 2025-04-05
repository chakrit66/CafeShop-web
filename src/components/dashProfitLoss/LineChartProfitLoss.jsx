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
import { getlineChartProfitLoss } from "@/api/dashProfitLoss";

const chartConfig = {
  cost: {
    label: "Cost",
    color: "oklch(70.4% 0.191 22.216)",
  },
  revenue: {
    label: "Revenue",
    color: "oklch(79.2% 0.209 151.711)",
  },
};

const LineChartProfitLoss = ({ startDate, endDate, groupBy }) => {
  const [chartData, setChartData] = useState([]);
  const token = useCafeStore((s) => s.token);

  useEffect(() => {
    getlineChartProfitLoss(token, startDate, endDate, groupBy)
      .then((res) => {
        console.log(res.data);
        const formattedData = res.data.map((item) => {
          let label;

          if (groupBy === "hour") {
            const parts = item.date.split("-");
            if (parts.length === 4) {
              const hour = parts[3].padStart(2, "0"); // เติม 0 ข้างหน้า เช่น 9 → 09
              label = `${hour}:00`;
            } else {
              label = item.date;
            }
          } else if (groupBy === "day") {
            const date = new Date(item.date);
            const dayName = getDayNameInShort(date);
            const dayOfMonth = String(date.getDate()).padStart(2, "0");

            label =
              res.data.length > 20 ? dayOfMonth : `${dayOfMonth} ${dayName}`;
          } else if (groupBy === "month") {
            const [year, month] = item.date.split("-");
            const date = new Date(year, month - 1);
            label = getMonthNameInShort(date);
          } else if (groupBy === "year") {
            label = item.date;
          }

          return {
            period: label,
            revenue: item.revenue || 0,
            cost: item.cost || 0,
          };
        });

        if (groupBy === "hour") {
          formattedData.sort((a, b) => {
            const hourA = parseInt(a.date);
            const hourB = parseInt(b.date);
            return hourA - hourB;
          });
        }

        setChartData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate, token, groupBy]);

  const getDayNameInShort = (date) => {
    const options = { weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const getMonthNameInShort = (date) => {
    const options = { month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatXAxis = (tick) => tick;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto h-[300px] w-full "
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
            <XAxis dataKey="period" axisLine={false} tickMargin={8} />

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

export default LineChartProfitLoss;
