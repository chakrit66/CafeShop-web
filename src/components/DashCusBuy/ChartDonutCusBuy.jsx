import React, { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "oklch(71.2% 0.194 13.428)",
  },
  safari: {
    label: "Safari",
    color: "oklch(74.6% 0.16 232.661)",
  },
};

const ChartDonutCusBuy = ({ totalNonMemberSales, totalMemberSales }) => {
  const [chartData, setChartData] = useState([]);
  const [percentages, setPercentages] = useState({ member: 0, nonMember: 0 });

  useEffect(() => {
    const total = totalMemberSales + totalNonMemberSales;
    const memberPercent = total > 0 ? (totalMemberSales / total) * 100 : 0;
    const nonMemberPercent =
      total > 0 ? (totalNonMemberSales / total) * 100 : 0;

    const formattedData = [
      {
        name: "Non Member",
        visitors: totalNonMemberSales,
        fill: "var(--color-chrome)",
      },
      {
        name: "Member",
        visitors: totalMemberSales,
        fill: "var(--color-safari)",
      },
    ];
    setChartData(formattedData);
    setPercentages({
      member: memberPercent,
      nonMember: nonMemberPercent,
    });
  }, [totalNonMemberSales, totalMemberSales]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 ">
        <CardTitle>สัดส่วนยอดขาย สมาชิก / บุคคลทั่วไป</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[230px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={55}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="xl:flex-row sm:flex-col justify-center gap-4 text-sm">
        <div className="flex gap-2 items-center">
          <span className="w-3 h-3 rounded-full bg-sky-400" />
          <span className="text-muted-foreground">สมาชิก</span>
          <span>{percentages.member.toFixed(1)}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-3 h-3 rounded-full bg-rose-400" />
          <span className="text-muted-foreground">บุคคลทั่วไป</span>
          <span>{percentages.nonMember.toFixed(1)}%</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartDonutCusBuy;
