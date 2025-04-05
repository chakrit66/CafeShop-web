import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart, Cell, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useCafeStore from "@/store/cafe-store";
import { getCustomerPurchases } from "@/api/dashboard";
import numeral from "numeral";

// ข้อมูลของกราฟ
// const chartData = [
//   { name: "not-member", price: 7260, fill: "var(--color-chrome)" },
//   { name: "member", price: 3200, fill: "var(--color-safari)" },
// ];

// กำหนดค่าของ config
const chartConfig = {
  price: { label: "Price" },
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  safari: { label: "Safari", color: "hsl(var(--chart-2))" },
  firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
  edge: { label: "Edge", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
};

const PieChart_Donut = ({ startDate, endDate }) => {
  const token = useCafeStore((s) => s.token);
  const [chartData, setChartData] = useState([]);
  const totalPrice = chartData.reduce((acc, curr) => acc + curr.price, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerPurchases(token, startDate, endDate);
        const data = response.data;

        const formattedData = [
          {
            name: "Not Member",
            price: data.totalNonMemberSales,
            fill: "var(--color-chrome)",
          },
          {
            name: "Member",
            price: data.totalMemberSales,
            fill: "var(--color-safari)",
          },
        ];

        setChartData(formattedData);
        //console.log(chartData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, startDate, endDate]);
  return (
    <Card className="flex flex-col min-w-[450px]">
      
      <CardContent className="flex-1 pb-0">
        {/* ใช้ ChartContainer พร้อม config ที่ส่งไป */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            {/* ใช้ ChartTooltip โดยระบุ content เป็น ChartTooltipContent */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Legend verticalAlign="bottom" align="center" />
            <Pie
              data={chartData}
              dataKey="price"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              label={({ value, percent }) =>
                `${value} (${(percent * 100).toFixed(1)}%)`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
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
                          {numeral(totalPrice.toLocaleString()).format('0a')}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total price
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default PieChart_Donut;
